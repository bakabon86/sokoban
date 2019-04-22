import React, { Component } from 'react';
import {
    View, ScrollView, StyleSheet, Text, TextInput, Image,
    TouchableOpacity, Alert, ListView, FlatList, Vibration
} from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Constants, Camera, Permissions, ImagePicker, FileSystem, ImageManipulator, takePictureAsync } from 'expo';
import { FormattedWrapper, FormattedMessage } from 'react-native-globalize';
import DatePicker from 'react-native-datepicker';
import { Picker } from 'react-native-picker-dropdown'; //picker to fix in ios

import { Button } from '../components';
import ActionSheet from 'react-native-actionsheet';
import { AppCamera } from './Camera';
import { connection } from '../utils/constants';

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

class formPullScreen extends Component {
    constructor(props) {
        super(props)
        //const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            token: '',
            execplandate: dateNow,
            instakey: '9999990140',
            dsInstance: [],
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
        fetch(url)
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
                        dsInstance: responseJson.data
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
            });
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

    savePull() {
        var url = connection.SERVER + "pull/req"
        //var url = "http://192.168.33.48:5005/pull/req"
        //var url = "http://10.10.1.80:5005/register/req"
        //var url = "http://192.168.33.39:5000/asset/Bayar"
        console.log('URL=' + url)

        var formData = new FormData();
        formData.append('token', this.props.token);
        formData.append('instakey', this.state.instakey);
        formData.append('execplandate', this.state.execplandate);

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
                    alert("Pull has been Requested");
                    this.props.navigation.navigate('Home');
                }
                else {
                    console.log('Save Failed!' + responseJson.err);
                    alert('Failed to Pull Request! ' + responseJson.err);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    cancelPull(){
        this.setState({
            token: '',
            execplandate: '',
            instakey: '9999990140',
        })
        this.props.navigation.navigate('Home');
    }
    
    scanQR() {
        this.props.navigation.navigate('FormScanQR');
    }

    onValueChange(value) {
        if (value) {
            this.setState({
                instakey: value,
            });
        }
    }


    render() {

        let serviceProject = this.state.dsInstance.map((item, key) => {
            return <Picker.Item key={key} value={item.key} label={item.name} />
        });

        //let { image } = this.state.fileUrl ? this.state.fileUrl : this.props.fileUrl;

        return (
            <ScrollView style={styles.container}>
                <ContainerView>
                    <TitleText> </TitleText>
                    <Text>Token:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.props.token} />
                    <Text>Owner :</Text>
                    <Picker
                        selectedValue={this.state.instakey.toString()}
                        // onValueChange={(serviceProject) => {
                        //     this.setState({ project: serviceProject })
                        // }}
                        onValueChange={this.onValueChange.bind(this)}
                        prompt="Choose Instance"
                        style={styles.picker}
                        textStyle={styles.pickerText}
                        cancel
                    >
                        {serviceProject}
                    </Picker>
                    <Text>Exec Plan Date :</Text>
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

                    <ButtonContainer>
                        <Button text="Scan QR" onPress={() =>  this.scanQR() } />
                        <Button text="Send" onPress={() =>  this.savePull() } />
                        <Button text="Cancel" onPress={() => this.cancelPull()} />
                    </ButtonContainer>
                </ContainerView>
            </ScrollView>
        );
    }

}



const styles = StyleSheet.create({
    container: { flex: 1, },//paddingTop: Constants.statusBarHeight },
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
});

const mapStateToProps = (state) => {
    return {
        username: state.reducerLogin.username,
        mobile: state.reducerLogin.mobile,
        token: state.reducerLogin.token,
        // picture: state.reducerPembayaran.picture,
        // fileName: state.reducerPembayaran.fileName,
        // fileUrl: state.reducerPembayaran.fileUrl,
    };
}
export default connect(mapStateToProps)(formPullScreen);