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
import QRCode from 'react-native-qrcode';
import { Button } from '../components';
import ActionSheet from 'react-native-actionsheet';

//import { AppCamera } from '../Camera';

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

class TransactionViewerScreen extends Component {
    constructor(props) {
        super(props)
        //const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            token: '',
            instakey: '',
            repocount: '',
            dsInstance: [],
            dsTransaction: [],
            trxkey: '',
            QRGenerated: '',          
            stateTransaction: '',
            txtype: '',
            dsTxType:[],
            dsVerifiableList: [],
        }
       //this.onValueChangeTxType = this.onValueChangeTxType.bind(this)
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
        var url = connection.SERVER + 'master/instance/list?token=' + this.props.token
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
                        dsInstance: responseJson.data
                    });
                    //this.getTransactionKey();
                }
                else {
                    this.setState({
                        dsInstance: []
                    })
                    console.log('token expired')
                    alert("Token expired or you don't have permission! " + responseJson.err)
                    this.props.navigation.navigate('Login')
                }
            })
            .catch((error) => {
                alert("There is something wrong! " + error)
            });
    }

    getVerifiableStates(token,txtype){
        var url = connection.SERVER + 'trx/' + txtype + '/verifiable/states?token=' + token      
        //var url = 'http://192.168.23.105:5005/' + 'trx/' + txtype + '/verifiable/states?token=' + token             
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
                        dsTxType: responseJson.data
                    })
                }
                else {
                    console.log('Transaction with this Type not Found! ' + responseJson.err)
                    alert('Transaction with this Type not Found! ' + responseJson.err)

                }
            })
            .catch((error) => {
                alert("There is something wrong! " + error)
            })
    }

    getVerifiableList(token,setate,txtype) {         
        var url = connection.SERVER + 'trx/' + txtype + '/list/verifiable?token=' + token +
                    '&state=' + setate + '&txtype=' + txtype
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
                        dsVerifiableList: responseJson.data
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

    // getTransactionKey() {
    //     //var url = connection.SERVER + 'auth/repolist?token=' + this.props.token
    //     var url = connection.SERVER + 'push/list/verifiable?token=' + this.props.token +
    //         '&state=' + this.state.stateTransaction
    //     console.log("URL=" + url);
    //     const config = {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //     };
    //     return fetch(url, config)
    //         .then((response) => {
    //             if (response.status === 404) {
    //                 return { status: false, token: "Null" }
    //             }
    //             else {
    //                 return response.json();
    //             }
    //         })
    //         .then((responseJson) => {
    //             if (responseJson.status === true) {
    //                 this.setState({
    //                     dsTransaction: responseJson.data
    //                 })
    //             }
    //             else {
    //                 console.log('token expired')
    //                 alert(responseJson.err)

    //             }
    //         })
    //         .catch((error) => {
    //             alert("There is something wrong! " + error)
    //         })
    // }

    componentWillMount() {
        this.getInstaKey();

    }

    componentDidMount() {
        // this.checkToken()
        // this.GetProjects(this.props.token);
        // this.GetDesas(this.props.token, this.state.project);
        // this.GetJenisPayments();
    }
    

    onValueChangeTxType(value){       
        if (value) {
            this.setState({
                txtype: value,
            });
            this.getVerifiableStates(this.props.token,value);    
        } 
        else if (value === '') {
            this.setState({
                txtype: '',
                dsTxType: [],
                stateTransaction: '',
                trxkey: '',
            })
        } 
    }

    onValueChangeTrx(value){
        if(value){
            this.setState({
                stateTransaction: value,
            })
            this.getVerifiableList(this.props.token,value,this.state.txtype)
        }
        else if (value === '') {
            this.setState({
                stateTransaction: '',
                dsVerifiableList: [],
                trxkey: '',
            })
        }
        //this.getTransactionKey();
    }

    onValueChange(value) {
        if (value) {
            this.setState({
                trxkey: value,
            });
            //this.getRepoID();
        }
        else if (value === '') {
            this.setState({
                trxkey: '',
            })
        }
    }

    generateQRCode() {
        this.setState({ QRGenerated: this.state.trxkey });
    }

    render() {

        let serviceTrxType = this.state.dsTxType.map((item, key) => {
            return <Picker.Item key={key} value={item} label={item} />
        });

        let serviceTransaction = this.state.dsVerifiableList.map((item, key) => {
            return <Picker.Item key={key} value={item.key} label={item.number} />
        });

        return (
            <ScrollView style={styles.container}>
                <ContainerView>
                    <TitleText> </TitleText>
                    <Text style={styles.labelText}>Transaction Type :</Text>
                    <Picker
                        selectedValue={this.state.txtype}
                        // onValueChange={(sta) => {
                        //     this.setState({ stateTransaction: sta })                            
                        // }}
                        onValueChange={this.onValueChangeTxType.bind(this) }
                        //prompt="Choose Instance"
                        style={styles.picker}
                        textStyle={styles.pickerText}
                        cancel
                    >
                        <Picker.Item  label='Select Transaction Type' value='' />
                        <Picker.Item  label='Penyimpanan' value='push' />                        
                        <Picker.Item  label='Penarikan' value='pull' />
                        <Picker.Item  label='Peminjaman' value='checkin' />
                        <Picker.Item  label='Pemusnahan' value='dispose' />                       
                    </Picker>
                    <Text style={styles.labelText}>Transaction State :</Text>
                    <Picker
                        selectedValue={this.state.stateTransaction}                       
                        onValueChange={this.onValueChangeTrx.bind(this) }
                        //prompt="Choose Instance"
                        style={styles.picker}
                        textStyle={styles.pickerText}
                        cancel
                    >
                        <Picker.Item  label='Select Transaction State' value='' />
                        {serviceTrxType}                
                    </Picker>
                    <Text style={styles.labelText}>Transaction :</Text>
                    <Picker
                        selectedValue={this.state.trxkey.toString()}
                        // onValueChange={(serviceProject) => {
                        //     this.setState({ project: serviceProject })
                        // }}
                        onValueChange={this.onValueChange.bind(this)}
                        //prompt="Choose Instance"
                        style={styles.picker}
                        textStyle={styles.pickerText}
                        cancel
                    >
                        <Picker.Item key={0} label='Select Transaction' value='' />
                        {serviceTransaction}
                    </Picker>
                    <Text></Text>
                    <View style={styles.qrContainer}>
                        <QRCode
                            value={this.state.QRGenerated}
                            size={200}
                            bgColor='purple'
                            fgColor='white' />
                    </View>

                    <ButtonContainer>
                        <Button text="Generate QR" onPress={() => this.generateQRCode()} />
                        {/* <Button text="Re-Request" onPress={() => this.reReqPush()} /> */}
                        <Button text="Cancel" onPress={() => this.props.navigation.popToTop()} />
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
export default connect(mapStateToProps)(TransactionViewerScreen);