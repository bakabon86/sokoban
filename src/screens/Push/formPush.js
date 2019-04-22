import React, { Component } from 'react';
import {
    View, ScrollView, StyleSheet, Text, TextInput, Image,
    TouchableOpacity, Alert, ListView, FlatList, Vibration,
    CheckBox
} from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Constants, Camera, Permissions, ImagePicker, FileSystem, ImageManipulator, takePictureAsync } from 'expo';
import { FormattedWrapper, FormattedMessage } from 'react-native-globalize';
import DatePicker from 'react-native-datepicker';
import { Picker } from 'react-native-picker-dropdown'; //picker to fix in ios
import QRCode from 'react-native-qrcode';
import { Button, } from '../../components';
import ActionSheet from 'react-native-actionsheet';

//import { AppCamera } from '../Camera';

import { connection } from '../../utils/constants';
import CheckBoxScreen from '../../components/CheckBox';

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

var date = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();
var dateNow = (year + '-' + month + '-' + date);

class formPushScreen extends Component {
    constructor(props) {
        super(props)
        //const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            token: '',
            execplandate: dateNow,
            instakey: '',
            repocount: '' ,
            dsInstance: [],
            QRGenerated: '',
            repokey: '',
            dsRepoID: [],
            checked: false,
        }        
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    onChangedSekuens(text) {
        this.setState({
            sekuens: text.replace(/[^0-9]/g, ''),
        });
    }

    onlyNumbers(text) {
        let occurences = text.match(/[0-9]/g, "") || [];
        return occurences.join("");
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
                    alert("Token expired or you don't have permission! "+ responseJson.err)
                    this.props.navigation.navigate('Login')
                }
            })
            .catch((error) => {
                alert("There is something wrong! " + error)
            });
    }

    getRepoID() {
        //var url = connection.SERVER + 'auth/repolist?token=' + this.props.token
        var url = connection.SERVER + 'repo/list?token=' + this.props.token
        console.log("URL=" + url);
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };
        return fetch(url, config)
            .then((response) => {
                if (response.status === 404) {
                    return { status: false, token: "Null" }
                }
                else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson.status === true) {
                    this.setState({
                        dsRepoID: responseJson.data
                    })                   
                }
                else {
                    console.log('token expired')
                    alert(responseJson.err)

                }
            })
            .catch((error) => {
                alert("There is something wrong! " + error)
            })
    }

    componentWillMount() {
        this.getInstaKey();

    }

    componentDidMount() {
        // this.checkToken()
        // this.GetProjects(this.props.token);
        // this.GetDesas(this.props.token, this.state.project);
        // this.GetJenisPayments();
    }

    savePush() {
        if(this.state.instakey !== ''){
            var url = connection.SERVER + "push/req"
            //var url = "http://192.168.33.48:5006/push/req"
            //var url = "http://10.10.1.80:5005/register/req"
            //var url = "http://192.168.33.39:5006/push/req"
            console.log('URL=' + url)
    
            var formData = new FormData();
            formData.append('token', this.props.token);
            formData.append('instakey', this.state.instakey);
            formData.append('repocount', this.state.repocount);
            formData.append('execplandate', this.state.execplandate);
            formData.append('returning', this.state.checked);
    
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
    
                body: formData
            };
    
            console.log('token=' + this.props.token)
            console.log('instakey=' + this.state.instakey)
            console.log('repocount=' + this.state.repocount)
            console.log('execplandate=' + this.state.execplandate)
            console.log('returning=' + this.state.checked)
    
            fetch(url, config)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.status === true) {
                        console.log('Data has been Saved.');
                        alert("Push has been Requested");
                        this.props.navigation.navigate('Home');
                    }
                    else {
                        console.log('Save Failed!' + responseJson.err);
                        alert('Failed to Push Request! ' + responseJson.err);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert(error);
                })
        }
        else{
            console.log('Select Instance First!');
            alert('Select Instance First! ');
        }
        
    }

    cancelPush() {
        this.setState({
            //token: '',
            execplandate: dateNow,
            instakey: '',
            repocount: '',
        })
        this.props.navigation.navigate('Home');
    }

    reReqPush() {
        if(this.state.repokey !== ''){
            var url = connection.SERVER + "push/re-req"
            //var url = "http://192.168.33.48:5006/push/req"
            //var url = "http://10.10.1.80:5005/register/req"
            //var url = "http://192.168.33.39:5006/push/req"
            console.log('URL=' + url)
    
            var formData = new FormData();
            formData.append('token', this.props.token);
            formData.append('repokey', this.state.repokey);
            formData.append('execplandate', this.state.execplandate);
    
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
    
                body: formData
            };
    
            console.log('token=' + this.props.token)
            console.log('repokey=' + this.state.repokey)
            console.log('execplandate=' + this.state.execplandate)
    
            fetch(url, config)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.status === true) {
                        console.log('Data has been Saved.');
                        alert("Push has been Requested");
                        this.props.navigation.navigate('Home');
                    }
                    else {
                        console.log('Save Failed!' + responseJson.err);
                        alert('Failed to Re Request Push! ' + responseJson.err);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert(error);
                })
        }
        else{
            console.log('New Push');
            alert('New Push, Press the Request Button! ');
        }
        
    }

    onValueChange(value) {
        if (value) {
            this.setState({
                instakey: value,
            });
            this.getRepoID();
        }
        else if (value === ''){
            this.setState({
                instakey: '',
                dsRepoID: [],
                repokey: ''
            })
        }
    }
    onValueChangeRepoID(value) {
        if (value) {
            this.setState({
                repokey: value,
            });
        }
        else if (value === ''){
            this.setState({
                repokey: ''
            })
        }
    }

    getQRCode() {
        //var url = "http://192.168.33.48:5005/"
        var url = connection.SERVER
        console.log("URL=" + url)
        // fetch(url)
        //     .then((response) => {
        //         if (response.status === 404) {
        //             return { status: false, token: "Null" }
        //         }
        //         else {
        //             return response.json()
        //         }

        //     })
        //     .then((responseJson) => {
        //         if (responseJson.status === true) {
        //             this.setState({
        //                 QRGenerated: responseJson.data
        //             });

        //         }
        //         else {
        //             this.setState({
        //                 QRGenerated: ''
        //             })
        //             console.log('QR Generated error')
        //             alert("QR Generated Failed, Please Try again!")
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
        this.setState({QRGenerated: url});
    }

    onChangeCheck() {
        this.setState({ checked: !this.state.checked})
    }

    render() {

        let serviceProject = this.state.dsInstance.map((item, key) => {
            return <Picker.Item key={key} value={item.key} label={item.name} />
        });

        let serviceRepo = this.state.dsRepoID.map((item, key) => {
            return <Picker.Item key={key} value={item.repoID} label={item.fmtID} />
        });
        
        return (
            <ScrollView style={styles.container}>
                <ContainerView>
                    <TitleText> </TitleText>
                    {/* <Text>Token:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.props.token} /> */}
                    <Text style={styles.labelText}>Owner :</Text>
                    <Picker
                        selectedValue={this.state.instakey.toString()}
                        // onValueChange={(serviceProject) => {
                        //     this.setState({ project: serviceProject })
                        // }}
                        onValueChange={this.onValueChange.bind(this)}
                        //prompt="Choose Instance"
                        style={styles.picker}
                        textStyle={styles.pickerText}
                        cancel
                    >
                        <Picker.Item key={0} label='Select Instance' value='' />
                        {serviceProject}
                    </Picker>
                    {/* <Text>Repo :</Text>
                    <Picker
                        selectedValue={this.state.repokey.toString()}
                        // onValueChange={(serviceProject) => {
                        //     this.setState({ project: serviceProject })
                        // }}
                        onValueChange={this.onValueChangeRepoID.bind(this)}
                        //prompt="Choose Instance"
                        style={styles.picker}
                        textStyle={styles.pickerText}
                        cancel
                    >
                        <Picker.Item key={0} label='Select Repo' value='' />
                        {serviceRepo}
                    </Picker> */}
                    <Text style={styles.labelText}>Max Repo :</Text>
                    <TextInput style={styles.inputText} onChangeText={(text)=>{
                        this.setState({ repocount: text }) }}
                        keyboardType='numeric'
                        value={this.state.repocount}/>
                    <Text style={styles.labelText}>Exec Plan Date :</Text>
                    <DatePicker
                        style={{ width: 260, height: 40 }}
                        date={this.state.execplandate}
                        mode="date"
                        placeholder="Select Date"
                        format="YYYY-MM-DD"
                        minDate="2013-01-01"
                        maxDate="2030-12-31"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36,
                                backgroundColor: '#fff',
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => { this.setState({ execplandate: date }) }}
                    />
                    <Text style={styles.labelText}>Returnable :</Text>                    
                        <CheckBox title='True'
                                value={this.state.checked}
                                onChange={() => this.onChangeCheck()} />
                   
                    {/* <ButtonContainer>
                        <Button text="Get QR Code" onPress={() => this.getQRCode()} />
                    </ButtonContainer>
                    <View style={styles.qrContainer}>
                        {this.state.QRGenerated !== '' ?
                            <QRCode
                                value={this.state.QRGenerated}
                                size={190}
                                bgColor='purple'
                                fgColor='white' />
                            : null
                        }

                    </View> */}
                    <ButtonContainer>
                        <Button text="Request" onPress={() => this.savePush()} />
                        {/* <Button text="Re-Request" onPress={() => this.reReqPush()} /> */}
                        <Button text="Cancel" onPress={() => this.cancelPush()} />
                    </ButtonContainer>
                </ContainerView>
            </ScrollView>
        );
    }

}



const styles = StyleSheet.create({
    container: { flex: 1, },//paddingTop: Constants.statusBarHeight },
    labelText: {color: '#000099'},
    labelDefaultText: {width: 260, backgroundColor: '#b8fcf9', color: '#000099', maxHeight: 80, },
    inputText: { width: 260, backgroundColor: '#fff', marginBottom: 3 },
    picker: { alignSelf: 'center', width: 260, height: 40, backgroundColor: '#fff' },
    pickerText: { backgroundColor: '#fff' },
    textAreaContainer: { width: 260, borderColor: '#000000', borderWidth: 1, padding: 5, backgroundColor: '#fff' },
    textArea: { height: 75, justifyContent: "center" },
    textContainer: {
        width: 260, height: 200, justifyContent: "flex-start",
        borderColor: '#000000', borderWidth: 1
    },
    textViewContainer: { textAlignVertical: 'center', color: '#000', },
    qrContainer: {
        width: 200, height: 200, justifyContent: "center", alignSelf: "center",
        borderColor: '#000000', borderWidth: 1
    },
});

const mapStateToProps = (state) => {
    return {
        username: state.reducerLogin.username,
        mobile: state.reducerLogin.mobile,
        token: state.reducerLogin.token,       
    };
}
export default connect(mapStateToProps)(formPushScreen);