import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, FlatList, Image } from 'react-native';
import styled from 'styled-components/native';
import { Constants, Camera, BarCodeScanner, Permissions } from 'expo';
import { Button } from '../../components';
import { connect } from 'react-redux';
import { connection } from '../../utils/constants';
import { Picker } from 'react-native-picker-dropdown'; //picker to fix in ios
import QRCode from 'react-native-qrcode'; //Generate QR Code
// import FlagSecure from 'react-native-flag-secure-android';
import { tryPacking } from '../../actions/push';


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

class PushSealedVerifyScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            passkey: '',
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            repoID: '',
            name: '',
            nik: '',
            resultImage: '',
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

        this.setState({ passkey: obj.data });
        { this.state.passkey !== '' ? (this.tryPacking()) : alert("Passkey not found! Please Scan Again!") }

    }

    tryPacking() {
        var url = connection.SERVER + 'push/TryPacking'
        //var url = 'http://192.168.33.48:5006/push/TryPacking'
        console.log("URL=" + url)
        var formData = new FormData();
        formData.append('token', this.props.token);
        formData.append('passkey', this.state.passkey);

        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },

            body: formData
        };

        console.log("token=" + this.props.token + "passkey=" + this.state.passkey);

        fetch(url, config)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === true) {
                    console.log('Data has been Saved.');
                    alert("Push Try Packing has been Saved");
                    // this.props.navigation.navigate("Home");
                    this.setState({
                        repoID: responseJson.data.repoID,
                        name: responseJson.data.name,
                        //nik: responseJson.data.nik,
                        resultImage: responseJson.data.picture
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



    Continue() {
        this.props.tryPackingPasskey(this.props.token, this.props.pushKey, this.state.passkey, this.state.repoID)
        this.props.navigation.navigate("PushPacking");
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
                    {/* <Text>PIN:</Text>
                    <TextInput style={styles.inputText} editable={false} value={this.props.pin} /> */}
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

                    <Text>RepoID:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.state.repoID} />
                    <Text>Nama:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.state.name} />
                    {/* <Text>NIK:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.state.nik} /> */}
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
                    </View>
                    <Text>RepoID:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.state.repoID} />
                    <Text>Nama:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.state.name} />
                    <Image style={{ width: 200, height: 200 }}
                        source={{ uri: `data:image/png;base64,${this.state.resultImage}` }} /> */}
                    <ButtonContainer>
                        <Button text="Continue" onPress={() => { this.Continue() }} />
                        <Button text="Abort" onPress={() => { this.abortPacking() }} />
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
    scannerContainer: {
        backgroundColor: '#ecf0f1',
        borderColor: '#000000',
        borderWidth: 1,
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
        pin: state.reducerPush.pin
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        tryPackingPasskey: (token, pushKey, passkey, repoID) => {
            dispatch(tryPacking(token, pushKey, passkey, repoID))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PushSealedVerifyScreen);