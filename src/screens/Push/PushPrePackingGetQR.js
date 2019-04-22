import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, FlatList, } from 'react-native';
import styled from 'styled-components/native';
import { Constants } from 'expo';
import { Button } from '../../components';
import { connect } from 'react-redux';
import { connection } from '../../utils/constants';
import { Picker } from 'react-native-picker-dropdown'; //picker to fix in ios
import QRCode from 'react-native-qrcode'; //Generate QR Code

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

class PushPrePackingGetQRScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pushKey: '',
            approved: '',
            reason: '',
            pin: '',
            QRGenerated: '',
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

    // getPin(){
    //     var url = connection.SERVER + 'auth/CreatePIN?token=' + this.props.token +
    //                 '&repoID=' + this.props.repoID
    //     console.log("URL=" + url)
    //     fetch(url)
    //         .then((response) => {
    //             if (response.status === 404) {
    //                 return { status: false, token: "Null" }
    //             }
    //             else {
    //                 return response.json()
    //             }

    //         })
    //         .then((responseJson) => {
    //             if (responseJson.status === true) {
    //                 // //let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    //                 this.setState({
    //                     pin: responseJson.data
    //                 });
    //                //this.getQR();
    //             }
    //             else {
    //                 // this.setState({
    //                 //     dsInstance: []
    //                 // })
    //                 console.log('Invalid or expired PIN')
    //                 alert(responseJson.err)
    //                 //this.props.navigation.navigate('Login')
    //             }

    //         })
    //         .catch((error) => {
    //             alert("There is something wrong! " + error)
    //         });
    // }

    getQR() {
        var url = connection.SERVER + 'push/PrePacking?token=' + this.props.token +
                   '&PIN=' + this.state.pin
        //  var url = 'http://192.168.33.48:5006/push/PrePacking?token=' + this.props.token +
        //              '&PIN=' + this.state.pin
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
                    this.setState({
                        QRGenerated: responseJson.data
                    });
                    console.log(responseJson.data)
                }
                else {
                    // this.setState({
                    //     dsInstance: []
                    // })
                    console.log('Invalid or expired PIN')
                    alert(responseJson.err)
                    //this.props.navigation.navigate('Login')
                }

            })
            .catch((error) => {
                alert("There is something wrong! " + error)
            });
    }

    componentWillMount() {
        this.getInstaKey();
    }

    onValueChangeApprove(value) {
        this.setState({ approved: value })
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
        return (
            <ScrollView style={styles.container}>
                <ContainerView>
                    <TitleText> </TitleText>
                   
                    <Text>PIN:</Text>
                    <TextInput style={styles.inputText} onChangeText={(text)=>this.setState({ pin:text })}
                        value={this.state.pin} />
                   
                    <ButtonContainer>
                        <Button text="Get QR" onPress={()=>{this.getQR()}}/>
                    </ButtonContainer>
                   
                    <View style={styles.qrContainer}>
                        <QRCode
                            value={this.state.QRGenerated}
                            size={250}
                            bgColor='purple'
                            fgColor='white' />
                    </View> 
                    <ButtonContainer>
                        {/* <Button text="Save" onPress={() => { this.tryPacking() }} /> */}
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
    qrContainer: {
        width: 260, height: 260, justifyContent: "center", alignSelf: "center",
        borderColor: '#000000', borderWidth: 1
    },
});


const mapStateToProps = (state) => {
    return {
        username: state.reducerLogin.username,
        mobile: state.reducerLogin.mobile,
        token: state.reducerLogin.token,
        pushKey: state.reducerPush.pushKey,
        instance: state.reducerPush.instance,
        time: state.reducerPush.time,
        execdate: state.reducerPush.execdate,
        pushname: state.reducerPush.pushname,
        pushnik: state.reducerPush.pushnik,
        repoID: state.reducerPush.repoID
    };
}
export default connect(mapStateToProps)(PushPrePackingGetQRScreen);