import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, FlatList, Alert, Image } from 'react-native';
import styled from 'styled-components/native';
import { Constants, Camera, BarCodeScanner, Permissions } from 'expo';
import { Button } from '../../components';
import { connect } from 'react-redux';
import { connection } from '../../utils/constants';
import { Picker } from 'react-native-picker-dropdown'; //picker to fix in ios
import { sealedPush,storeInit } from '../../actions/push';

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

class PushStoreScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pushKey: '',
            dsTrx: [],
            dsUser2PIN: [],
            user2PIN: '',
            dsStorageKey: [],
            storagekey: '',
            dsStorageChild: [],
            storageChild: '',
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            resultImage: '',
            secretkey: this.props.secretKey,
            key2: '',
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
                    //this.getUser2Key();
                    this.getFinalisableList();
                    
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
                console.log(error);
                alert("There is something wrong! " + error)
            });

    }

    getFinalisableList(){
        var url = connection.SERVER + 'push/list/finalizable?token=' + this.props.token
        console.log('URL=' + url);
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
                        dsTrx: responseJson.data
                    });
                   
                }
                else {
                    this.setState({
                        dsTrx: []
                    })
                    console.log("Store Data couldn't be found! " + responseJson.err);
                    alert("Store Data couldn't be found! Or " + responseJson.err);
                }

            })
            .catch((error) => {
                console.log(error);
                alert("There is something wrong! " + error)
            });
    }

    // getUser2Key() {
    //     var url = connection.SERVER + 'auth/User2List?token=' + this.props.token
    //     console.log("URL=" + url);

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
    //                 this.setState({
    //                     dsUser2Key: responseJson.data,
    //                 });
    //             }
    //             else {
    //                 this.setState({
    //                     dsUser2Key: [],
    //                 });
    //                 console.log("User 2 Key Data couldn't be found");
    //                 alert("User 2 Key Data couldn't be found");
    //             }
    //         })
    //         .catch((error)=>{
    //             console.log(error);
    //             alert("There is something wrong! " + error)
    //         })

    //         //this.getStorageKey();
    // }

    getStorageList() {
        var url = connection.SERVER + 'master/storage/list?token=' + this.props.token
        console.log("URL=" + url);
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
                    this.setState({
                        dsStorageKey: responseJson.data,
                    });
                }
                else {
                    this.setState({
                        dsStorageKey: [],
                    });
                    console.log("Storage Key Data couldn't be found");
                    alert("Storage Key Data couldn't be found");
                }
            })
            .catch((error) => {
                console.log(error);
                alert("There is something wrong! " + error)
            })
    }

    getStorageChild() {
        var url = connection.SERVER + 'auth/StorageList?token=' + this.props.token
        console.log("URL=" + url);
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
                    this.setState({
                        dsStorageChild: responseJson.data,
                    });
                }
                else {
                    this.setState({
                        dsStorageChild: [],
                    });
                    console.log("Storage Key Data couldn't be found");
                    alert("Storage Key Data couldn't be found");
                }
            })
            .catch((error) => {
                console.log(error);
                alert("There is something wrong! " + error)
            })
    }

    Store() {
        var url = connection.SERVER + 'push/store/final'
        //var url = 'http://192.168.23.105:5005/push/store/final'

        console.log("URL=" + url)
        var formData = new FormData();
        formData.append('token', this.props.token);
        formData.append('pushkey', this.state.pushKey);
        formData.append('storagekey', this.state.storagekey);

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
                    alert("Push Store has been Saved");
                    this.props.navigation.navigate("Home");
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

    onValueChangeTrx(value){
        if(value){
            this.setState({
                pushKey: value,
            })
            this.getStorageList();
        }
        else if (value === '') {
            this.setState({
                pushKey: '',
                storagekey: '',
                dsStorageKey: [],
            })
        }
    }

    onValueChangeStorage(value) {
        if (value) {
            this.setState({
                storagekey: value,
                // storageChild: '',
                // dsStorageChild: [],
            })
            // this.getStorageChild();
        }
    }

    onValueChangeStorageChild(value) {
        this.setState({ storageChild: value })

    }

   

    PushStoreInit() {
        var url = connection.SERVER + 'push/store/init'
        //var url = 'http://192.168.33.48:5005/push/app'
        console.log("URL=" + url)
        var formData = new FormData();
        formData.append('token', this.props.token);
        formData.append('pushkey', this.props.pushKey);

        console.log('token=' + this.props.token);
        console.log('pushkey=' + this.props.pushKey);

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
                    this.props.sealedPush(this.props.token, this.state.secretKey,'store');
                    this.props.storeInit(this.props.token,this.props.pushKey,this.state.secretkey,this.state.storagekey,'store');

                    if(responseJson.skip === true){
                        this.StoreProcess();
                    }
                    else{
                        this.props.navigation.navigate("TwoWayVerificationInitiator");
                    }
                    
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

    StoreAlert() {
        Alert.alert("Store", "Are You Sure?", [
            { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            {
                text: 'OK', onPress: () => {
                    console.log('OK Pressed');
                    this.Store();
                }
            },
        ],
            { cancelable: false })
    }

    StoreProcess(){
        var url = connection.SERVER + 'push/store'
        console.log("URL=" + url)

        let strgkey = this.props.storagekey ? this.props.storagekey : ''
        var formData = new FormData();
        formData.append('secretKey', this.state.secretKey);
        formData.append('storagekey', strgkey);

        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },

            body: formData
        };

        console.log('secretKey=' + this.state.secretKey);
        console.log('storageKey=' + strgkey);

        fetch(url, config)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === true) {
                    // console.log('Data has been Saved.');
                    // alert("Push has been Sealed");
                    this.setState({ secretKey: responseJson.key });
                    this.props.storeInit(this.props.token,this.state.trxKey,this.state.secretKey,strgkey,'store')
                    this.props.navigation.navigate("BeginVerification");
                    // this.props.navigation.navigate("TwoWayVerificationInitiator");
                    
                    // this.props.navigation.navigate("PushStore", { key: item.key });
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

    _handleBarCodeRead = obj => {

        this.setState({ user2PIN: obj.data });
        { this.state.user2PIN !== '' ? (this.Store()) : alert("PIN not found! Please Scan Again!") }

    }

    render() {
        let serviceTransaction = this.state.dsTrx.map((item, key) => {
            return <Picker.Item key={key} value={item.key} label={item.number} />
        });
        let serviceStorageKey = this.state.dsStorageKey.map((item, key) => {
            return <Picker.Item key={key} value={item.key} label={item.name} />
        });
        let serviceStorageChild = this.state.dsStorageChild.map((item, key) => {
            return <Picker.Item key={key} value={item.key} label={item.name} />
        });
        return (
            <ScrollView style={styles.container}>
                <ContainerView>
                    <TitleText> </TitleText>
                    {/* <Text>PushKey:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.props.pushKey} /> */}

                    {/* <Text>Number:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.props.number} />
                    <Text>Trx Type:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.props.trxtype} />
                    <Text>Instance:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.props.instance} />
                    <Text>Repo Count:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.props.repocount.toString()} />
                    <Text>Requested:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.props.requested} />
                    <Text>Requested By:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.props.requestedby} />
                    <Text>Requested By NIK:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.props.requestedbyNIK} />
                    <Text>Sealed:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.state.sealed} />
                    <Text>Sealed By:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.props.sealedby} />
                    <Text>Sealed By NIK:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.props.sealedbyNIK} /> */}
                   
                    <Text style={styles.labelText}>Number :</Text>
                    <Picker
                        selectedValue={this.state.pushKey}
                        style={styles.picker}//{{ alignSelf: 'center', width: 250, height: 35, backgroundColor: '#92f3ef' }}
                        textStyle={styles.pickerText}//{{ backgroundColor: '#92f3ef' }}
                        prompt="Choose Transaction"
                        onValueChange={this.onValueChangeTrx.bind(this)}
                        //onValueChange= {(value) => {this.setState({approved: value})}}
                        cancel >
                        <Picker.Item value={''} label={'===Select Transaction==='}/>
                        {serviceTransaction}
                    </Picker>
                    <Text style={styles.labelText}>Storage :</Text>
                    <Picker
                        selectedValue={this.state.storagekey}
                        style={styles.picker}//{{ alignSelf: 'center', width: 250, height: 35, backgroundColor: '#92f3ef' }}
                        textStyle={styles.pickerText}//{{ backgroundColor: '#92f3ef' }}
                        prompt="Choose Storage"
                        onValueChange={this.onValueChangeStorage.bind(this)}
                        //onValueChange= {(value) => {this.setState({approved: value})}}
                        cancel >
                        <Picker.Item value={''} label={'===Select Storage==='}/>
                        {serviceStorageKey}
                    </Picker>
                    <Text> </Text>
                    {/*
                    <Picker
                        selectedValue={this.state.storageChild}
                        style={styles.picker}//{{ alignSelf: 'center', width: 250, height: 35, backgroundColor: '#92f3ef' }}
                        textStyle={styles.pickerText}//{{ backgroundColor: '#92f3ef' }}
                        prompt="Choose Storage Child"
                        onValueChange={this.onValueChangeStorageChild.bind(this)}
                        //onValueChange= {(value) => {this.setState({approved: value})}}
                        cancel >
                        {serviceStorageChild}
                    </Picker> */}
                    {/* <Picker
                        selectedValue={this.state.approved}
                        style={styles.picker}//{{ alignSelf: 'center', width: 250, height: 35, backgroundColor: '#92f3ef' }}
                        textStyle={styles.pickerText}//{{ backgroundColor: '#92f3ef' }}
                        prompt="Choose User 2 PIN"
                        onValueChange={this.onValueChangeApprove.bind(this)}
                        //onValueChange= {(value) => {this.setState({approved: value})}}
                        cancel >
                        {serviceUser2Key}
                         <Picker.Item label="Choose User 2" value='' />
                        <Picker.Item label="Approved" value={true} />
                        <Picker.Item label="Rejected" value={false} /> 
                    </Picker> */}
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
                    } */}
                    

                    {/* // {this.state.approved === false ? (
                    //     <View style={styles.textAreaContainer}>
                    //         <Text>Reason for Rejection:</Text>
                    //         <TextInput
                    //             style={styles.textArea}
                    //             multiline={true}
                    //             numberOfLines={4}
                    //             onChangeText={(reason) => this.setState({ reason: reason })}
                    //             value={this.state.reason}
                    //         />
                    //     </View>) : null
                    // }  */}
                    <ButtonContainer>
                        <Button text="Store" onPress={() => { this.Store() }} />
                        <Button text="Cancel" onPress={() => { this.props.navigation.popToTop() }} />
                    </ButtonContainer>
                </ContainerView>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: { flex: 1, },//paddingTop: Constants.statusBarHeight, marginBottom: 3 },
    labelText: {color: '#000099'},
    labelDefaultText: {width: 260, backgroundColor: '#b8fcf9', color: '#000099', maxHeight: 80, },
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
        token: state.reducerLogin.token,
        pushKey: state.reducerPush.key,        
        number: state.reducerPush.number,
        trxtype: state.reducerPush.trxtype,
        instance: state.reducerPush.instance,
        repocount: state.reducerPush.repocount,
        requested: state.reducerPush.requested,
        requestedby: state.reducerPush.requestedby,
        requestedbyNIK: state.reducerPush.requestedbyNIK,
        sealed: state.reducerPush.sealed,
        sealedby: state.reducerPush.sealedby,
        sealedbyNIK: state.reducerPush.sealedbyNIK,
        secretKey: state.reducerPush.secretKey
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        sealedPush: (token, secretkey, step) => {
            dispatch(sealedPush(token, secretkey, step))        
        },
        storeInit: (token,key,secretKey,storagekey,step) => {
            dispatch(storeInit(token,key,secretKey,storagekey,step))
        }
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(PushStoreScreen);