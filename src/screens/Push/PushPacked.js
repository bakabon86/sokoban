import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, FlatList, } from 'react-native';
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
  color: #fff;
`;
// color: ${props => props.theme.WHITE};
const ButtonContainer = styled.View`
    top: 10;
    flex: 1;
    margin :10px;
`

class PushPackedScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pushKey: '',
            approved: '',
            reason: '',
            dspPackedList: [],
        }
    }

    getInstaKey() {
        var url = connection.SERVER + 'master/instance/list/strict?token=' + this.props.token
        console.log("URL=" + url)
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };
        fetch(url,config)
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
                    // //let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                    // this.setState({
                    //     dsInstance: responseJson.data
                    // });

                }
                else {
                    // this.setState({
                    //     dsInstance: []
                    // })
                    console.log('token expired')
                    alert("Token expired, Please Login again!")
                    this.props.navigation.navigate('Login')
                }

            })
            .catch((error) => {
                alert("There is something wrong! " + error)
            });

    }

    getPackedList(){
        var url = connection.SERVER + 'push/getPackedList?token=' + this.props.token +
            '&oldest=' + this.state.oldest
        console.log("URL=" + url);
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };
        fetch(url,config)
        .then((response)=>{
            if(response.status === 404){
                return{ status: false, token: "Null"}
            }
            else{
                return response.json();
            }
        })
        .then((responseJson)=>{
            if(responseJson.status === true){
                this.setState({ dspPackedList: responseJson.data })
            }
            else{
                console.log("Data could not be found!");
                alert(responseJson.err);
            }
        })
        .catch((error)=>{
            console.log(error);
            alert("There is something wrong! " + error);
        });
    }

    Packed() {
        var url = connection.SERVER + 'push/Packed'
        //var url = 'http://192.168.33.48:5006/push/Packed'
        console.log("URL=" + url)
        var formData = new FormData();
        formData.append('token', this.props.token);
        formData.append('repoID', this.props.repoID);
        

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
                        alert("Push Packed has been Saved");
                        this.props.navigation.navigate('PushVerifiedList');
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

    componentWillMount() {
        this.getInstaKey();
    }

    onValueChangePushKey(value) {
        this.setState({ pushKey: value })
        // if (value === false) {
        //     return (
        //         <View style={styles.textAreaContainer}>
        //             <Text>Reason for Rejection:</Text>
        //             <TextInput
        //                 style={styles.textArea}
        //                 multiline={true}
        //                 numberOfLines={4}
        //                 onChangeText={(reason) => this.setState({ reason: reason })}
        //                 value={this.state.reason}
        //             />
        //         </View>
        //     );
        //}

    }

    render() {

        // let servicePushKey = this.state.dsPushKey.map((item,key) =>{
        //     return <Picker.Item key={key} value={item.key} label={item.name} />
        // });

        return (
            <ScrollView style={styles.container}>
                <ContainerView>
                    <TitleText> </TitleText>
                    {/* <Text>Token:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.props.token} /> */}
                   
                    <Text>Repo ID:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.props.repoID} />
                    {/* <Picker
                        selectedValue={this.state.pushKey}
                        style={styles.picker}//{{ alignSelf: 'center', width: 250, height: 35, backgroundColor: '#92f3ef' }}
                        textStyle={styles.pickerText}//{{ backgroundColor: '#92f3ef' }}
                        prompt="Choose Push Key"
                        onValueChange={this.onValueChangePushKey.bind(this)}
                        //onValueChange= {(value) => {this.setState({approved: value})}}
                        cancel >
                        {servicePushKey}
                    </Picker> */}

                    {/* {this.state.approved === false ? (
                        <View style={styles.textAreaContainer}>
                            <Text>Reason for Rejection:</Text>
                            <TextInput
                                style={styles.textArea}
                                multiline={true}
                                numberOfLines={4}
                                onChangeText={(reason) => this.setState({ reason: reason })}
                                value={this.state.reason}
                            />
                        </View>) : null
                    } */}
                    <ButtonContainer>
                        <Button text="Save" onPress={() => { this.Packed() }} />
                        <Button text="Cancel" onPress={() => { this.props.navigation.goBack() }} />
                    </ButtonContainer>
                </ContainerView>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: { flex: 1, },//paddingTop: Constants.statusBarHeight, marginBottom: 3 },
    inputText: { width: 260, backgroundColor: '#fff', marginBottom: 3 },
    picker: { alignSelf: 'center', width: 260, height: 40, backgroundColor: '#fff' },
    pickerText: { backgroundColor: '#fff' },
    textAreaContainer: { width: 260, borderColor: '#000000', borderWidth: 1, padding: 5, backgroundColor: '#fff', top: 10 },
    textArea: { height: 75, justifyContent: "center" },
    tableContainer: { flexDirection: 'row' },
    tableContent: { borderColor: '#000000', borderWidth: 1, width: 100, height: 40 },
});


const mapStateToProps = (state) => {
    return {
        token: state.reducerLogin.token, 
        repoID: state.reducerPush.repoID,               
        instance: state.reducerPush.instance,
    };
}
export default connect(mapStateToProps)(PushPackedScreen);