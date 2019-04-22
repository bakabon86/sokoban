import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, FlatList, Image } from 'react-native';
import styled from 'styled-components/native';
import { Constants, Camera, BarCodeScanner, Permissions } from 'expo';
import { Button } from '../components';
import { connect } from 'react-redux';
import { connection } from '../utils/constants';
import { Picker } from 'react-native-picker-dropdown'; //picker to fix in ios
import QRCode from 'react-native-qrcode'; //Generate QR Code
// import FlagSecure from 'react-native-flag-secure-android';
import { tryPacking, storeInit, acceptedPush } from '../actions/push';


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

class VerificationInitiatorScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            repoID: '',
            name: '',
            nik: '',
            resultImage: '',
            QRGenerated: '',
            stepNow: '',
            secretKey: '',
            accepted: true,
            reason: '',
            tolak: false,
            trxKey: '',
            switchValue: false,
        }
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
                    // //let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                    this.setState({
                        switchValue: true
                    });

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

    // flagSecure(enable) {
    //     if (enable) {
    //       FlagSecure.activate();
    //     } else {
    //       FlagSecure.deactivate();
    //     }
    //   }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === "granted" });
        this.getInstaKey();
        // this.flagSecure();
    }

    componentWillUnmount(){
        this.setState({ secretKey: '' });
    }

    cameraChange = () => {
        this.setState({
            resultImage: '',
            type:
                this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
        });
    };

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
    onValueChangeInstanceKey(value) {
        if (value) {
            this.setState({ instance: value });
        }

    }
    onValueChangePushKey(value) {
        if (value) {
            this.setState({ pushKey: value });
        }

    }

    _handleBarCodeRead = obj => {
        if(this.state.secretKey === ''){
            this.setState({ secretKey: obj.data,
                            switchValue: false });            
        }
        else{
             this.verifyInit()
        }                 
        //{ this.state.secretKey !== '' ? (this.verifyInit()) : alert("Failed to read QR! Please Scan Again!") }
        //{ this.state.secretKey !== '' ? (this.verifyInit()) :  this.setState({ secretKey: obj.data }) }
    }

    readQRtoKnowStep() {
        var url = connection.SERVER + 'trx/keyinfo?secretkey=' + this.state.secretKey
        console.log('URL= ' + url);

        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
        };

        fetch(url, config)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === true) {
                    this.setState({
                        stepNow: responseJson.data.step
                    })
                   
                    console.log('Step Data=' + this.state.stepNow)
                    if (this.state.stepNow === 'seal') {
                        this.Seal();
                        //console.log('Step=' + this.state.stepNow)
                    }
                    else if (this.state.stepNow === 'store') {
                        //this.Store();
                        this.props.storeInit(this.props.token,'',this.state.secretKey,'','store')
                        
                        this.props.navigation.navigate('PushStore')
                    }
                }
                else {
                     console.log('Failed to Get Data ' + responseJson.err);
                    // alert('Failed to Get Data! ' + responseJson.err);
                }
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            })
            
    }

    verifyInit() {
        var url = connection.SERVER + 'auth/verify2/discover'
        console.log("URL=" + url)
        var formData = new FormData();
        formData.append('token', this.props.token);
        formData.append('secretKey', this.state.secretKey);

        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },

            body: formData
        };

        console.log("token=" + this.props.token + "secretKey=" + this.state.secretKey);

        fetch(url, config)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === true) {
                    // console.log('Data has been Saved.');
                    // alert("Push Try Packing has been Saved");
                    // this.props.navigation.navigate("Home");
                    this.setState({
                        //repoID: responseJson.data.repoID,
                        name: responseJson.data.username,
                        nik: responseJson.data.usernik,
                        resultImage: responseJson.data.userpic
                    })
                    this.waitAccepted();
                }
                else {
                    console.log('Save Failed! ' + responseJson.err);
                    alert(' ! ' + responseJson.err);
                }
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            })

    }



    async waitAccepted() {
        var url = connection.SERVER + 'auth/verify2/accept/wait'
        console.log("URL=" + url)
        var formData = new FormData();
        //formData.append('token', this.props.token);
        formData.append('secretKey', this.state.secretKey);
        // formData.append('accepted', this.state.accepted);
        // formData.append('reason', this.state.reason);
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },

            body: formData
        };

        console.log("token=" + this.props.token + "secretKey=" + this.state.secretKey);

        await fetch(url, config)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === true) {

                    // this.props.navigation.navigate("Home");
                    this.setState({
                        //repoID: responseJson.data.repoID,
                        accepted: responseJson.data.acc_1,
                        trxKey: responseJson.data.trxkey
                    })
                    console.log('Accept=' + this.state.accepted);
                    console.log('trxKey=' + this.state.trxKey);
                    this.readQRtoKnowStep();

                }
                else {
                    console.log('Save Failed! ' + responseJson.err);
                    alert('Failed to Save Data! ' + responseJson.err);
                }
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            })
    }

    Accepted() {
        var url = connection.SERVER + 'auth/verify2/accept'
        console.log("URL=" + url)
        var formData = new FormData();
        formData.append('token', this.props.token);
        formData.append('secretKey', this.state.secretKey);
        formData.append('accepted', this.state.accepted);
        formData.append('reason', this.state.reason);
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },

            body: formData
        };

        console.log("token=" + this.props.token + "secretKey=" + this.state.secretKey);

        fetch(url, config)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === true) {
                    // console.log('Data has been Saved.');
                    // alert("Push Try Packing has been Saved");
                    // this.props.navigation.navigate("Home");
                    this.setState({
                        //repoID: responseJson.data.repoID,
                        accepted: responseJson.data,
                    })
                   

                    console.log('Data has been Verified.' + this.state.stepNow);
                    alert("Data has been Verified.");

                    // if(this.state.stepNow ==='seal'){
                    //     //this.Seal();
                    // }
                    // else if(this.state.stepNow ==='store'){
                    //     //this.Store();
                    //     //this.props.storeInit(this.props.token,this.props.pushKey,this.state.secretKey,'','store')

                    //     this.props.navigation.navigate('PushStore')
                    // }


                    //this.props.navigation.popToTop();
                }
                else {
                    console.log('Save Failed! ' + responseJson.err);
                    alert('Failed to Save Data! ' + responseJson.err);
                }
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            })
    }

    Reject() {
        var url = connection.SERVER + 'auth/verify2/accept'
        console.log("URL=" + url)
        var formData = new FormData();
        formData.append('token', this.props.token);
        formData.append('secretKey', this.state.secretKey);
        formData.append('accepted', this.state.accepted);
        formData.append('reason', this.state.reason);
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },

            body: formData
        };

        console.log("token=" + this.props.token + "secretKey=" + this.state.secretKey);

        fetch(url, config)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === true) {
                    // console.log('Data has been Saved.');
                    // alert("Push Try Packing has been Saved");
                    // this.props.navigation.navigate("Home");
                    this.setState({
                        //repoID: responseJson.data.repoID,
                        accepted: responseJson.data,
                    })
                }
                else {
                    console.log('Save Failed! ' + responseJson.err);
                    alert('Failed to Save Data! ' + responseJson.err);
                }
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            })
    }

    //push
    Seal() {
        var url = connection.SERVER + 'push/seal'
        console.log("URL=" + url)
        var formData = new FormData();
        formData.append('secretKey', this.state.secretKey);

        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },

            body: formData
        };

        console.log('secretKey=' + formData)

        fetch(url, config)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === true) {
                    // console.log('Data has been Saved.');
                    // alert("Push has been Sealed");
                    this.setState({ secretKey: responseJson.data.secretkey });
                    // this.props.sealedPush(this.props.token, this.state.secretKey)
                    // this.props.navigation.navigate("TwoWayVerificationInitiator");
                    console.log('True, onSeal, SecretKey='+ this.state.secretKey);
                    alert('Push Has been Sealed. ' )
                    this.props.acceptedPush(this.props.token,this.state.trxKey,this.state.secretkey,this.state.stepNow)
                    this.props.navigation.navigate("BeginVerification");
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

    Store() {
        var url = connection.SERVER + 'push/store'
        console.log("URL=" + url)
        var formData = new FormData();
        formData.append('secretKey', this.state.secretKey);
        formData.append('storagekey', this.props.storagekey);

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
                    // console.log('Data has been Saved.');
                    // alert("Push has been Sealed");
                    this.setState({ secretKey: responseJson.key });
                    // this.props.sealedPush(this.props.token, this.state.secretKey)
                    // this.props.navigation.navigate("TwoWayVerificationInitiator");
                    //this.props.navigation.navigate("BeginVerification");
                    this.props.navigation.navigate("PushStore", { key: item.key });
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

    //pull
    Droppable() {
        var url = connection.SERVER + 'pull/droppable'
        console.log("URL=" + url)
        var formData = new FormData();
        formData.append('secretkey', this.state.secretKey);

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
                    // console.log('Data has been Saved.');
                    // alert("Push has been Sealed");
                    this.setState({ secretKey: responseJson.key });
                    // this.props.sealedPush(this.props.token, this.state.secretKey)
                    // this.props.navigation.navigate("TwoWayVerificationInitiator");
                    this.props.navigation.navigate("RepoReader");
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
    
    UnSeal() {
        var url = connection.SERVER + 'pull/seal'
        console.log("URL=" + url)
        var formData = new FormData();
        formData.append('secretKey', this.state.secretKey);

        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },

            body: formData
        };

        console.log('secretKey=' + formData)

        fetch(url, config)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === true) {
                    // console.log('Data has been Saved.');
                    // alert("Push has been Sealed");
                    this.setState({ secretKey: responseJson.data.secretkey });
                    // this.props.sealedPush(this.props.token, this.state.secretKey)
                    // this.props.navigation.navigate("TwoWayVerificationInitiator");
                    console.log('True, onUnSeal, SecretKey='+ this.state.secretKey);
                    alert('Pull Has been UnSealed. ' )
                    this.props.acceptedPush(this.props.token,this.state.trxKey,this.state.secretkey,this.state.stepNow)
                    this.props.navigation.navigate("BeginVerification");
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

    Continue() {
        // this.setState({
        //     accepted: true,
        //     reason: '',
        // })
        this.Accepted();
    }

    Rejected() {
        this.setState({
            tolak: true,
        })
        this.Reject();
    }

    cancelVerification(){
        this.setState({
            name: '',
            nik: '',
            resultImage: '',
            secretKey: ''
        })
        this.props.navigation.goBack();
    }

    abortPacking() {
        var url = connection.SERVER + 'push/AbortPacking'
        console.log("URL=" + url)

        var formData = new FormData();
        formData.append('token', this.props.token)
        formData.append('repoID', this.state.repoID)

        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        };

        fetch(url, config)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === true) {
                    console.log("Abort Packing Success.");
                    alert("Abort Packing Success");
                }
                else {
                    console.log("Abort Packing Failed! " + responseJson.err);
                    alert("Abort Packing Failed! " + responseJson.err);
                }
            })
            .catch((error) => {
                console.log(error)
                alert("There is something wrong! " + error)
            })
        this.props.navigation.navigate('Home');
    }

    render() {
        // let serviceInstanceKey = this.state.dsInstance.map((item, key) => {
        //     return <Picker.Item key={key} value={item.key} label={item.name} />
        // });
        // let servicePushKey = this.state.dsPushKey.map((item, key) => {
        //     return <Picker.Item key={key} value={item.key} label={item.key} />
        // });


        return (
            <ScrollView style={styles.container}>
                <ContainerView>
                    <TitleText> </TitleText>
                    {/* <View style={styles.qrContainer}>
                        <QRCode
                            value={this.state.QRGenerated}
                            size={200}
                            bgColor='purple'
                            fgColor='white' />
                    </View>  */}
                    <Text></Text>
                    {this.state.resultImage === '' ? (
                        <View style={styles.scannerContainer}>
                            {this.state.hasCameraPermission === null ?
                                <Text>Requesting for camera permission</Text> :
                                this.state.hasCameraPermission === false ?
                                    <Text>Camera permission is not granted</Text> :
                                    <BarCodeScanner
                                        onBarCodeRead={this._handleBarCodeRead}
                                        style={{ height: 200, width: 200 }}
                                    />
                            }
                        </View>
                    ) : (<Image style={{ width: 200, height: 200 }}
                        source={{ uri: `data:image/png;base64,${this.state.resultImage}` }} />
                        )
                    }


                    <Text style={styles.labelText}>Nama :</Text>
                    <TextInput style={styles.labelDefaultText} editable={false}
                        value={this.state.name} />
                    <Text style={styles.labelText}>NIK :</Text>
                    <TextInput style={styles.labelDefaultText} editable={false}
                        value={this.state.nik} />
                    {/* <View style={styles.scannerContainer}>
                        {this.state.hasCameraPermission === null ?
                            <Text>Requesting for camera permission</Text> :
                            this.state.hasCameraPermission === false ?
                                <Text>Camera permission is not granted</Text> :
                                <BarCodeScanner
                                    onBarCodeRead={this._handleBarCodeRead}
                                    style={{ height: 200, width: 200 }}
                                />
                        }
                    </View>*/}

                    {/* <Image style={{ width: 200, height: 200 }}
                        source={{ uri: `data:image/png;base64,${this.state.resultImage}` }} />  */}
                    {this.state.tolak === true ? (
                        <View style={styles.textAreaContainer}>
                            <Text style={styles.labelText}>Reason for Rejected :</Text>
                            <TextInput
                                style={styles.textArea}
                                multiline={true}
                                numberOfLines={4}
                                onChangeText={(reason) => this.setState({ reason: reason })}
                                value={this.state.reason}
                            />
                        </View>
                    ) : null
                    }
                    <ButtonContainer>
                        <Button text="Accept" onPress={() => { this.Continue() }} />
                        <Button text="Reject" onPress={() => { this.Rejected() }} />
                        <Button text="Cancel" onPress={() => { this.cancelVerification() }} />
                    </ButtonContainer>
                </ContainerView>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: { flex: 1, },//paddingTop: Constants.statusBarHeight, marginBottom: 3 },    
    inputText: { width: 260, backgroundColor: '#fff', marginBottom: 3 },
    labelText: {color: '#000099'},
    labelDefaultText: {width: 260, backgroundColor: '#b8fcf9', color: '#000099', maxHeight: 80, },
    picker: { alignSelf: 'center', width: 260, height: 40, backgroundColor: '#fff' },
    pickerText: { backgroundColor: '#fff' },
    textAreaContainer: { width: 260, borderColor: '#000000', borderWidth: 1, padding: 5, backgroundColor: '#fff', top: 10 },
    textArea: { height: 75, justifyContent: "center" },
    tableContainer: { flexDirection: 'row' },
    tableContent: { borderColor: '#000000', borderWidth: 1, width: 100, height: 40 },
    scannerContainer: {
        backgroundColor: '#ecf0f1',
        borderColor: '#000000',
        borderWidth: 1,
    },
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
        pushKey: state.reducerPush.key,
        instance: state.reducerPush.instance,
        time: state.reducerPush.time,
        execdate: state.reducerPush.execdate,
        pushname: state.reducerPush.pushname,
        pushnik: state.reducerPush.pushnik,
        pin: state.reducerPush.pin,
        step: state.reducerPush.step,
        storagekey: state.reducerPush.storagekey,
        secretKey: state.reducerPush.secretKey
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        tryPackingPasskey: (token, pushKey, passkey, repoID) => {
            dispatch(tryPacking(token, pushKey, passkey, repoID))
        },
        acceptedPush: (token,key,secretKey,step) => {
            dispatch(acceptedPush(token,key,secretKey,step))
        },
        storeInit: (token, key, secretKey, storagekey, step) => {
            dispatch(storeInit(token, key, secretKey, storagekey, step))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VerificationInitiatorScreen);