import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, } from 'react-native';
import styled from 'styled-components/native';
import { Constants } from 'expo';
import { Button } from '../../components';
import { connect } from 'react-redux';
import { connection } from '../../utils/constants';
import { Picker } from 'react-native-picker-dropdown'; //picker to fix in ios

const ContainerView = styled.View`
  flex: 1;  
  alignItems: center;
`;

const TitleText = styled.Text`
  fontSize: 30;
  color: #000099;
`;
// color: ${props => props.theme.WHITE};
const ButtonContainer = styled.View`
    top: 10;
    flex: 1;
    margin :10px;
`

class RegisterRequestScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: "",
            NIK: "",
            mobileNo: "",
            instakey: "",
            dsInstance: [],
        }
    }

    getInstaKey() {
        var url = connection.SERVER + 'master/instance/list/strict?token=' + this.props.token
        //var url = connection.SERVER + 'master/instance/list/strict?token=' + this.props.token
        console.log("URL=" + url)
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };
        fetch(url, config)
            .then((response) => {
                if (response.status === 404) {
                    return { status: false, token: "Null" }
                }
                else {
                    return response.json()
                }

            })
            .then((responseJson) => {
                if (responseJson.status === true) {
                    //let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                    this.setState({
                        dsInstance: responseJson.data,
                    });

                }
                else {
                    this.setState({
                        dsInstance: []
                    })
                    console.log('token expired')
                    alert("Token expired, Please Login again!")
                    this.props.navigation.navigate('Login')
                }

            })
            .catch((error) => {
                alert("There is something wrong! " + error)
            });

    }

    registerNew() {
        if (this.state.instakey !== "") {
            var url = connection.SERVER + "register/req"
            //var url = "http://192.168.33.48:5006/register/req"
            //var url = "http://192.168.33.39:5000/asset/Bayar"
            console.log('URL=' + url)

            var formData = new FormData();
            formData.append('token', this.props.token);
            formData.append('instakey', this.state.instakey);

            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },

                body: formData
            };

            console.log('formData=' + formData)

            fetch(url, config)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.status === true) {
                        console.log('Data has been Saved.');
                        alert("User has been Created");
                        this.props.navigation.navigate('Home');
                    }
                    else {
                        console.log('Save Failed!' + responseJson.err);
                        alert('Failed to Save Data! ' + responseJson.err);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert(error);
                })
        }
        else {
            console.log('Select Instance First!');
            alert('Select Instance First! ');
        }

    }

    registerNewUser() {
        var url = connection.SERVER + "register/req"
        //var url = "http://192.168.33.48:5006/register/req"
        //var url = "http://192.168.33.39:5000/asset/Bayar"
        console.log('URL=' + url)

        var details = {
            'token': this.props.token,
            'instakey': this.state.instakey
        };

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        //const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');
        const config = {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },

            body: formBody
        };

        console.log('formBody=' + formBody)

        fetch(url, config)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === true) {
                    console.log('Data has been Saved.');
                    alert("User has been Created");
                    this.props.navigation.navigate('Home');
                }
                else {
                    console.log('Save Failed!' + responseJson.err);
                    alert('Failed to Save Data! ' + responseJson.err);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    cancelRegister() {
        this.setState({
            userName: "",
            NIK: "",
            mobileNo: "",
        })
        this.props.navigation.navigate('Home');
    }

    // onValueChange(value) {
    //     if (value) {
    //         this.setState({
    //             userName: "",
    //             NIK: "",
    //             mobileNo: "",
    //             instakey: "9999990140",
    //             dsInstance: [],
    //         });

    //     }
    // }

    componentWillMount() {
        this.getInstaKey();
    }

    render() {

        let serviceInstance = this.state.dsInstance.map((item, key) => {
            return <Picker.Item key={key} value={item.key} label={item.name} />
        });

        return (
            <ScrollView style={styles.container}>
                <ContainerView>
                    <TitleText> </TitleText>
                    {/* <Text>Nama:</Text>
                    <TextInput style={styles.inputText} placeholder="Nama"
                        onChangeText={(Nama) => this.setState({ userName: Nama })}
                        value={this.state.userName} />
                    <Text>NIK:</Text>
                    <TextInput style={styles.inputText} placeholder="NIK"
                        onChangeText={(NIK) => this.setState({ NIK: NIK })} keyboardType={"numeric"}
                        value={this.state.NIK} />
                    <Text>No Handphone:</Text>
                    <TextInput style={styles.inputText} placeholder="mobileNo"
                        onChangeText={(mobileNo) => this.setState({ mobileNo: mobileNo })} keyboardType={"numeric"}
                        value={this.state.mobileNo} /> */}
                    <Text style={styles.labelText}>Instance :</Text>

                    <Picker
                        selectedValue={this.state.instakey.toString()}
                        onValueChange={(serviceProject) => {
                            this.setState({ instakey: serviceProject })
                        }}
                        //onValueChange={this.onValueChange.bind(this)}
                        //prompt="Choose Instance"
                        style={styles.picker}
                        textStyle={styles.pickerText}
                        cancel
                    >
                        <Picker.Item key={0} value="" label={"Select Instance"} />
                        {serviceInstance}

                    </Picker>
                    <ButtonContainer>
                        <Button text="Submit" onPress={() => this.registerNew()} />
                        <Button text="Cancel" onPress={() => this.cancelRegister()} />
                    </ButtonContainer>

                </ContainerView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    labelText: {color: '#000099'},
    labelDefaultText: {backgroundColor: '#b8fcf9', color: '#fff'},
    container: { flex: 1, paddingTop: Constants.statusBarHeight },
    inputText: { width: 260, backgroundColor: "#fff", marginBottom: 3 },
    picker: { alignSelf: 'center', width: 260, height: 40, backgroundColor: '#fff' },
    pickerText: { backgroundColor: '#fff' },
});



const mapStateToProps = (state) => {
    return {
        username: state.reducerLogin.username,
        mobile: state.reducerLogin.mobile,
        token: state.reducerLogin.token,
    };
}

export default connect(mapStateToProps)(RegisterRequestScreen);