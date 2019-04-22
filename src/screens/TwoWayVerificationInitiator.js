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
import { tryPacking } from '../actions/push';


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

class TwoWayVerificationInitiatorScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            passkey: '',
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            repoID: '',
            name: '',
            nik: '',
            tujuan: '',
            transaksi: '',
            resultImage: '',
            QRGenerated: '',
            command: '',
            switchValue: false,
            instance: [],
            secretKey: this.props.secretKey,
            accepted: true,
            reason: '',
            storageKey: '',
            tolak: false,
            stepNow: '',
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



    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === "granted" });
        this.getInstaKey();
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


    }
    onValueChange(value) {
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

        this.setState({ passkey: obj.data });
        { this.state.passkey !== '' ? (this.tryPacking()) : alert("Passkey not found! Please Scan Again!") }
        return (this.state.passkey)
    }


    readQRtoKnowStep() {
        var scrtKey = this.state.secretKey ? this.state.secretKey : this.props.secretKey
        var url = connection.SERVER + 'trx/keyinfo?secretkey=' + scrtKey
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
                }
                else {
                    // console.log('Failed to Get Data ' + responseJson.err);
                    // alert('Failed to Get Data! ' + responseJson.err);
                }
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            })
    }


    Continue() {
        //this.props.tryPackingPasskey(this.props.token, this.props.pushKey, this.state.passkey, this.state.repoID)
        //this.props.navigation.navigate("VerificationInitiator");
        // this.setState({
        //     accepted: true,
        //     reason: '',
        // })        
        this.setState({ reason: '', tolak: false });
        this.Accepted();
    }

    Rejected() {
        this.setState({
            tolak: true,
        })
        this.Reject();
    }

    async waitingVerification() {

        var scrtKey = this.state.secretKey ? this.state.secretKey : (this.props.secretKey ? this.props.secretKey : this.props.pullSecretKey)
        var url = connection.SERVER + 'auth/verify2/discover/wait?secretkey=' + scrtKey
        console.log("URL=" + url)

        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        };

        console.log("token=" + this.props.token + " secretkey=" + scrtKey);

        await fetch(url, config)
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
                }
                else {
                    console.log('Press Again to generate! ' + responseJson.err);
                    alert('Press Again to generate! ' + responseJson.err);
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
        var scrtKey = this.state.secretKey ? this.state.secretKey : (this.props.secretKey ? this.props.secretKey : this.props.pullSecretKey)
        var formData = new FormData();
        formData.append('token', this.props.token);
        formData.append('secretkey', scrtKey);
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

        console.log("token=" + this.props.token + "secretkey=" + scrtKey);

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

                    // this.readQRtoKnowStep();
                    // if(this.state.stepNow ==='seal'){
                    //     this.Seal();
                    // }
                    // else if(this.state.stepNow ==='store'){
                    //     //this.Store();
                    //     //this.props.storeInit(this.props.token,this.props.pushKey,this.state.secretKey,'')
                    //     //this.props.navigation.navigate('PushStore');
                    // }

                    console.log('Data has been Verified.');
                    alert("Data has been Verified.");
                    this.props.navigation.popToTop();
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
        if (this.state.reason !== '') {
            var url = connection.SERVER + 'auth/verify2/accept'
            console.log("URL=" + url)
            var formData = new FormData();
            formData.append('token', this.props.token);
            formData.append('secretkey', this.state.secretKey);
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

            console.log("token=" + this.props.token + "secretkey=" + this.state.secretKey);

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
        else {
            console.log('Reason could not be empty!');
            alert('Reason could not be empty!');
        }

    }

    //push
    Seal() {
        var url = connection.SERVER + 'push/seal'
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

    Store() {
        // var url = connection.SERVER + 'push/store'
        // console.log("URL=" + url)
        // var formData = new FormData();
        // formData.append('secretkey', this.state.secretKey);
        // formData.append('storagekey', this.props.storagekey);

        // const config = {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'multipart/form-data',
        //     },

        //     body: formData
        // };

        // console.log('formData=' + formData)

        // fetch(url, config)
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         if (responseJson.status === true) {
        //             // console.log('Data has been Saved.');
        //             // alert("Push has been Sealed");
        //             this.setState({ secretKey: responseJson.key });
        //             // this.props.sealedPush(this.props.token, this.state.secretKey)
        //             // this.props.navigation.navigate("TwoWayVerificationInitiator");
        //             //this.props.navigation.navigate("BeginVerification");
        //         }
        //         else {
        //             console.log('Save Failed!' + responseJson.err);
        //             alert('Failed to Save Data! ' + responseJson.err);
        //         }
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //         alert(error);
        //     })
    }

    //pull
    Droppable() {
        var url = connection.SERVER + 'pull/drop'
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
        var url = connection.SERVER + 'pull/unseal'
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

    viewScanner() {
        if (this.state.switchValue === false) {
            this.setState({ switchValue: true })

        }
        else if (this.state.switchValue === true) {
            this.setState({ switchValue: false })
        }
        console.log(this.state.switchValue)
    }


    generateQR() {
        if (this.props.secretKey !== '') {
            if (this.props.pullSecretKey === '') {
                this.setState({
                    QRGenerated: this.props.secretKey ? this.props.secretKey : '',
                    switchValue: true,

                })
            }
        }
       else if (this.props.pullSecretKey !== '') {
            if (this.props.secretKey === '') {
                this.setState({
                    QRGenerated: this.props.pullSecretKey ? this.props.pullSecretKey : '',
                    switchValue: true,

                })
            }
        }
        this.waitingVerification();
    }
    //discoverWait

    cancelVerification() {
        this.setState({
            name: '',
            nik: '',
            resultImage: '',
            secretKey: '',
            reason: '',
            QRGenerated: '',
            tolak: false,
        })
        this.props.navigation.goBack();
    }

    componentDidMount() {
        // this.timer = setInterval(() => this.getData(), 1000)

    }

    componentWillUnmount() {

        //this.timer = clearInterval(()=> this.setState({ instance: [] }),2000 )
    }

    render() {
        let serviceInstanceKey = this.state.instance.map((item, key) => {
            return <Picker.Item key={key} value={item.key} label={item.name} />
        });
        // let servicePushKey = this.state.dsPushKey.map((item, key) => {
        //     return <Picker.Item key={key} value={item.key} label={item.key} />
        // });


        return (
            <ScrollView style={styles.container}>
                <ContainerView>
                    <TitleText> </TitleText>
                    {/* <Text>Step :</Text>  
                    <TextInput style={styles.inputText} editable={false}
                        value= {this.props.secretKey} />                  
                    <Picker
                        selectedValue={this.state.instance.toString()}
                        onValueChange={this.onValueChange.bind(this)}
                        //prompt="Choose Instance"
                        style={styles.picker}
                        textStyle={styles.pickerText}
                        cancel
                    >
                        {serviceInstanceKey}
                    </Picker> 
                    <Picker
                        selectedValue={this.state.command.toString()}
                        // onValueChange={(serviceProject) => {
                        //     this.setState({ project: serviceProject })
                        // }}
                        onValueChange={this.onValueChange.bind(this)}
                        //prompt="Choose Instance"
                        style={styles.picker}
                        textStyle={styles.pickerText}
                        cancel
                    >
                        <Picker.Item key={0} label='Select Step' value='' />
                        {serviceProject} 
                    </Picker>
                    <Text>Transaction No :</Text>
                    <Picker
                        selectedValue={this.state.command.toString()}
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
                        {serviceProject} 
                    </Picker> */}
                    <ButtonContainer>
                        {/* <Button text="Show QR Code" onPress={() => { this.viewScanner() }} /> 
                        {this.state.switchValue ? <Button text="Generate QR Code" onPress={()=> {this.generateQR()}}/> 
                            :null }*/}
                        <Button text="Generate QR Code" onPress={() => { this.generateQR() }} />
                    </ButtonContainer>

                    {this.state.resultImage === '' ? (
                        <View>
                            {this.state.switchValue === true ? (
                                <View style={styles.qrContainer}>
                                    <QRCode
                                        value={this.state.QRGenerated}
                                        size={200}
                                        bgColor='purple'
                                        fgColor='white' />
                                </View>
                            ) : null}
                        </View>
                    ) : (
                            <View>
                                <Image style={{ width: 200, height: 200 }}
                                    source={{ uri: `data:image/png;base64,${this.state.resultImage}` }} />
                                <Text>Nama:</Text>
                                <TextInput style={styles.inputText} editable={false}
                                    value={this.state.name} />
                                <Text>NIK:</Text>
                                <TextInput style={styles.inputText} editable={false}
                                    value={this.state.nik} />
                            </View>
                        )}
                    {/* {this.state.switchValue?(
                             <View>
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
                             </View>
                            
                        ): (
                            <Image style={{ width: 200, height: 200 }}
                            source={{ uri: `data:image/png;base64,${this.state.resultImage}` }} />
                        )}  */}
                    {/* {this.state.resultImage === '' ? (
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
                    }  */}


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
                    </View> */}
                    {/*<Text>RepoID:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.state.repoID} />
                    <Text>Nama:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.state.name} />
                    <Image style={{ width: 200, height: 200 }}
                        source={{ uri: `data:image/png;base64,${this.state.resultImage}` }} /> */}
                    {this.state.tolak === true ? (
                        <View style={styles.textAreaContainer}>
                            <Text>Reason for Rejected :</Text>
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
        secretKey: state.reducerPush.secretKey,
        step: state.reducerPush.step,
        storagekey: state.reducerPush.storagekey,
        pullKey: state.reducerPull.key,
        pullNumber: state.reducerPull.number,
        pullSecretKey: state.reducerPull.secretKey
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        tryPackingPasskey: (token, pushKey, passkey, repoID) => {
            dispatch(tryPacking(token, pushKey, passkey, repoID))
        }
    }
}
export default connect(mapStateToProps, null)(TwoWayVerificationInitiatorScreen);