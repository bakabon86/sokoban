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
import { unverifiedRepo, storeInit } from '../actions/push';


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

class RepoReaderScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            pushKey: '',
            repoIDX: '',
            name: '',
            nik: '',
            resultImage: '',
            QRGenerated: '',
            switchValue: false,
            instance: [],
            secretKey: this.props.secretKey,
            accepted: true,
            reason: '',
            scanned: false,
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
                        switchValue: true,
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


    _handleBarCodeRead = obj => {
        
        if (this.props.pushKeyBefore !== '') {
            this.setState({ pushKey: this.props.pushKeyBefore })
        }
        else if (this.props.pullKeyBefore !== '') {
            this.setState({ pushKey: this.props.pullKeyBefore })
        }
        this.setState({
            repoIDX: obj.data,
            switchValue: false,
        })
        console.log('repoIDX=' + this.state.repoIDX)
        if (this.state.repoIDX === '') {
            //alert('Please Scan Repo Again.');
            this.setState({ switchValue: true });
        } else {
            this.manifestVerify();
        }
    }

_handleBarCodeRead1 = obj => {
    if (this.props.pushKeyBefore !== '') {
        this.setState({ pushKey: this.props.pushKeyBefore })

        this.setState({
            repoIDX: obj.data,
            switchValue: false,
        })
        console.log('Key=' + this.state.pushKey)
        console.log('repoIDX=' + this.state.repoIDX)
        if (this.state.repoIDX === '') {
            alert('Repo Unreadable.');
        } else {
            this.manifestVerify();
        }
    }
    else if (this.props.pullKeyBefore !== '') {
        this.setState({ pushKey: this.props.pullKeyBefore })

        this.setState({
            repoIDX: obj.data,
            switchValue: false,
        })
        console.log('Key=' + this.state.pushKey)
        console.log('repoIDX=' + this.state.repoIDX)
        if (this.state.repoIDX === '') {
            alert('Repo Unreadable.');
        } else {
            this.manifestVerify();
        }
    }
    else {
        if (this.state.pushKey === '') {
            this.setState({
                pushKey: obj.data,
                switchValue: false,
            })
            console.log('pushKey=' + this.state.pushKey)
        }
        else {
            if (this.state.pushKey === obj.data) {
                alert('Key has been Scanned, Scan Repo Now.')
            }
            if (this.state.pushKey === this.state.repoIDX) {
                alert('Key has been Scanned, Scan Repo Now.')
                this.setState({ repoIDX: '' })
            }
            else {
                this.setState({
                    repoIDX: obj.data,
                    switchValue: false,
                })
                console.log('Key=' + this.state.pushKey)
                console.log('repoIDX=' + this.state.repoIDX)
                if (this.state.repoIDX === '') {
                    alert('Repo Unreadable.');
                } else {
                    this.manifestVerify();
                }
            }
        }
    }
}

handleBarCodeScanned1 = ({ type, data }) => {
    if (this.props.pushKeyBefore !== '') {
        this.setState({ pushKey: this.props.pushKeyBefore })

        this.setState({
            repoIDX: data,
            switchValue: false,
            scanned: false,
        })
        console.log('Key=' + this.state.pushKey)
        console.log('repoIDX=' + this.state.repoIDX)
        if (this.state.repoIDX === '') {
            alert('Please Scan Repo Again.');
        } else {
            this.manifestVerify();
        }
    }
    else if (this.props.pullKeyBefore !== '') {
        this.setState({ pushKey: this.props.pullKeyBefore })

        this.setState({
            repoIDX: data,
            switchValue: false,
            scanned: false
        })
        console.log('Key=' + this.state.pushKey)
        console.log('repoIDX=' + this.state.repoIDX)
        if (this.state.repoIDX === '') {
            alert('Please Scan Repo Again.');
        } else {
            this.manifestVerify();
        }
    }
    else {
        if (this.state.pushKey === '') {
            this.setState({
                pushKey: data,
                switchValue: false,
                scanned: false,
            })
            console.log('pushKey=' + this.state.pushKey)
        }
        else {
            if (this.state.pushKey === data) {
                alert('Key has been Scanned, Scan Repo Now.')
            }
            if (this.state.pushKey === this.state.repoIDX) {
                alert('Key has been Scanned, Scan Repo Now.')
                this.setState({ repoIDX: '' })
            }
            else {
                this.setState({
                    repoIDX: data,
                    switchValue: false,
                    scanned: false,
                })
                console.log('Key=' + this.state.pushKey)
                console.log('repoIDX=' + this.state.repoIDX)
                if (this.state.repoIDX === '') {
                    alert('Please Scan Repo Again.');
                } else {
                    this.manifestVerify();
                }
            }
        }
    }
}

handleBarCodeScanned = (obj) => {
    if (this.props.pushKeyBefore !== '') {
        this.setState({ pushKey: this.props.pushKeyBefore })
    }
    else if (this.props.pullKeyBefore !== '') {
        this.setState({ pushKey: this.props.pullKeyBefore })
    }
    if(this.state.pushKey === ''){
        alert('Please repeat the process!');
        console.log('Please repeat the process!');
        this.props.navigation.navigate('Home');
    }
    this.setState({
        repoIDX: obj.data,
        switchValue: false,
        scanned: false
    })
    if (this.state.repoIDX === '') {
        alert('Repo Unreadable.');
    } else {
        this.manifestVerify();
    }
}

manifestVerify() {
    //var url = 'http://192.168.23.105:5005/trx/manifest/verify'
    var url = connection.SERVER + 'trx/manifest/verify'
    console.log("URL=" + url)
    var formData = new FormData();
    formData.append('token', this.props.token);
    formData.append('trxkey', this.state.pushKey);
    formData.append('RepoIDX', this.state.repoIDX);


    console.log('token=' + this.props.token);
    console.log('trxkey=' + this.state.pushKey);
    console.log('RepoIDX=' + this.state.repoIDX);

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
            if (responseJson.complete === true) {
                // console.log('Completed.');
                // alert("Repo Scan has been Completed");
                if (this.props.step === 'seal') {
                    console.log('Seal Completed')
                    alert('Seal Completed')
                    this.props.navigation.navigate('Home');
                }
                if (this.props.step === 'store') {
                    console.log('Store Completed')
                    alert('Store Completed')
                    this.props.storeInit(this.props.token, this.state.pushKey, this.state.secretKey, '', 'store')
                    this.props.navigation.navigate('PushStore')
                }
                if ((this.props.step === 'drop') || (this.props.stepPull === 'drop')) {
                    console.log('Drop Completed')
                    alert('Drop Completed')
                    this.props.navigation.navigate("Home")
                }
                if ((this.props.step === 'unseal') || (this.props.stepPull === 'unseal')) {
                    console.log('UnSeal Completed')
                    alert('UnSeal Completed')
                    this.props.navigation.navigate("Home")
                }
                if ((this.props.step === 'pick') || (this.props.stepPull === 'pick')) {
                    console.log('Pick Completed')
                    alert('Pick Completed')
                    this.props.navigation.navigate("Home")
                }
                if ((this.props.step === 'restore') || (this.props.stepPull === 'restore')) {
                    console.log('Restore Completed')
                    alert('Restore Completed')
                    this.props.navigation.navigate("Home")
                }
                if ((this.props.step === 'burn') || (this.props.stepPull === 'burn')) {
                    console.log('Burn Completed')
                    alert('Burn Completed')
                    this.props.navigation.navigate("Home")
                }
            }
            else {
                if (responseJson.status === true) {
                    console.log('Repo Data has been Saved.');
                    alert(" Repo Data has been Saved");
                    this.setState({ repoIDX: '', 
                                    switchValue: false });
                    //this.setState({ secretKey: responseJson.key });
                    // this.props.sealedPush(this.props.token, this.state.secretKey,'seal')
                    // this.props.navigation.navigate("TwoWayVerificationInitiator");
                }
                else {
                    console.log('Save Failed!' + responseJson.err);
                    alert('Failed to Save Data! Please scan the QR again! ' + responseJson.err);
                    
                    this.setState({ repoIDX: '', 
                                    switchValue: false });
                }
            }
        })
        .catch((error) => {
            console.error(error);
            alert(error);
        })
}

Continue() {
    this.manifestVerify();
}

viewScanner() {
    if (this.state.switchValue === false) {
        this.setState({
            switchValue: true,
            scanned: true,
        })

    }
    else if (this.state.switchValue === true) {
        this.setState({
            switchValue: false,
            scanned: false,
        })
    }
    console.log(this.state.switchValue)
}

generateQR() {
    this.setState({
        QRGenerated: this.props.secretKey ? this.props.secretKey : '',
        switchValue: true,
        scanned: true,
    })
    this.waitingVerification();
}


ViewUnverifiedRepo() {
    // var url = connection.SERVER + 'trx/manifest/list/unverified?token=' + this.props.token
    // console.log("URL=" + url)
    // const config = {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    // };
    // fetch(url, config)
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
    //             // //let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    //             // this.setState({
    //             //     dsInstance: responseJson.data
    //             // });

    //         }
    //         else {
    //             // this.setState({
    //             //     dsInstance: []
    //             // })
    //             console.log('token expired')
    //             alert("Token expired, Please Login again!")
    //             this.props.navigation.navigate('Login')
    //         }

    //     })
    //     .catch((error) => {
    //         alert("There is something wrong! " + error)
    //     });
    this.props.unverifiedRepo(this.props.token, this.state.pushKey);
    this.props.navigation.navigate('UnverifiedRepoList');
}

componentDidMount() {
    // this.timer = setInterval(() => this.getData(), 1000)

}

componentWillReceiveProps (){

}

componentWillUnmount() {

    //this.timer = clearInterval(()=> this.setState({ instance: [] }),2000 )
}

cancelVerification() {
    this.setState({
        pushKey: '',
        repoIDX: '',
        name: '',
        nik: '',
        resultImage: '',
        QRGenerated: '',
        switchValue: false,
        instance: [],
        secretKey: this.props.secretKey,
        accepted: true,
        reason: '',
        scanned: false,
    });
    this.props.navigation.popToTop();
}

render() {
    const { hasCameraPermission, scanned } = this.state;

    let serviceInstanceKey = this.state.instance.map((item, key) => {
        return <Picker.Item key={key} value={item.key} label={item.name} />
    });

    return (
        <ScrollView style={styles.container}>
            <ContainerView>
                <TitleText> </TitleText>
                <View>
                    {this.state.switchValue === true ? (
                        <View style={styles.scannerContainer}>
                            {this.state.hasCameraPermission === null ?
                                <Text>Requesting for camera permission</Text> :
                                this.state.hasCameraPermission === false ?
                                    <Text>Camera permission is not granted</Text> :
                                    <BarCodeScanner inputText=""
                                        onBarCodeRead={this._handleBarCodeRead}
                                        style={{ height: 200, width: 200 }}
                                        //onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned()}
                                    />

                            }
                        </View>
                    ) : (
                            <View style={styles.scannerContainer}>
                            </View>
                        )}
                    {/* ) : (<Image style={{ width: 200, height: 200 }}
                                 source={{ uri: `data:image/png;base64,${this.state.resultImage}` }} />
                                 )
                             } */}
                </View>

                {/* ): (
                            <Image style={{ width: 200, height: 200 }}
                            source={{ uri: `data:image/png;base64,${this.state.resultImage}` }} /> */}

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
                {/* <Text>Key :</Text>
                <TextInput style={styles.inputText} editable={false} 
                    value ={this.state.pushKey} /> */}

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
                {/* <Text>RepoIDX :</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.state.repoIDX} /> */}
                {/*<Text>Nama:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.state.name} />
                    <Image style={{ width: 200, height: 200 }}
                        source={{ uri: `data:image/png;base64,${this.state.resultImage}` }} /> */}
                {/* {this.state.accepted !== true ? (
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
                    } */}

                <ButtonContainer>
                    <Button text="Scan" onPress={() => { this.viewScanner() }} />
                    <Button text="View Unverified Repo" onPress={() => { this.ViewUnverifiedRepo() }} />

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
        pushKeyBefore: state.reducerPush.key,
        pullKeyBefore: state.reducerPull.key,
        step: state.reducerPush.step,
        stepPull: state.reducerPull.step,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        unverifiedRepo: (token, key) => {
            dispatch(unverifiedRepo(token, key))
        },
        storeInit: (token, key, secretKey, storagekey, step) => {
            dispatch(storeInit(token, key, secretKey, storagekey, step))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RepoReaderScreen);