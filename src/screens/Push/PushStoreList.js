import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Constants } from 'expo';
import { Button } from '../../components';
import { connect } from 'react-redux';
import { connection } from '../../utils/constants';
import { Store,storeInit } from '../../actions/push';

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

class PushStoreListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dsPushStoreList: [],
            storagekey:'',
            secretKey: ''
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
                    this.getPushStoreList();
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


    getPushStoreList() {
        var url = connection.SERVER + 'push/list/storable?token=' + this.props.token
        //var url = 'http://192.168.33.48:5006/push/StoringList?token=' + this.props.token
        console.log("URL=" + url)
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
                    return response.json()
                }

            })
            .then((responseJson) => {
                if (responseJson.status === true) {
                    this.setState({
                        dsPushStoreList: responseJson.data
                    })
                }
                else {
                    console.log('Data could not be found')
                    alert("Failed to Retrieve Data! " + responseJson.err)
                    this.props.navigation.navigate('Home')
                }
            })
            .catch((error) => {
                console.log(error);
                alert("There is something wrong! " + error)
            });
    }

    PushStoreInit(token,key) {
        var url = connection.SERVER + 'push/store/init'
        //var url = 'http://192.168.33.48:5005/push/app'
        console.log("URL=" + url)
        var formData = new FormData();
        formData.append('token', token);
        formData.append('pushkey', key);

        console.log('token=' + token);
        console.log('pushkey=' + key);

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
                    //this.props.sealedPush(this.props.token, this.state.secretKey,'store');
                    this.props.storeInit(token,key,this.state.secretKey,this.state.storagekey,'store');
                    
                    if(responseJson.skip === true){
                        this.StoreProcess();
                    }
                    else{                            
                        this.props.navigation.navigate("TwoWayVerificationInitiator");
                    }
                    console.log('Secret Key = ' + this.state.secretKey);
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

    componentWillMount() {
        this.getInstaKey();

    }

    componentDidMount() {

    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <ContainerView>
                    <TitleText> </TitleText>
                    <ScrollView horizontal={true}>
                        <View style={{ justifyContent: 'flex-start' }}>
                            <View style={styles.tableContainer}>
                                {/* <View style={styles.tableContent}>
                                    <Text>Key :  </Text>
                                </View> */}
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Number : </Text>
                                </View>
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Trx Type : </Text>
                                </View>
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Instance : </Text>
                                </View>
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Repo Count : </Text>
                                </View>
                                <View style={styles.tableContent} >
                                    <Text style={styles.tableHeader}>Requested :</Text>
                                </View>
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Requested By : </Text>
                                </View>
                                <View style={styles.tableContent} >
                                    <Text style={styles.tableHeader}>Requested By NIK :</Text>
                                </View>
                                <View style={styles.tableContent} >
                                    <Text style={styles.tableHeader}>Sealed :</Text>
                                </View>
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Sealed By : </Text>
                                </View>
                                <View style={styles.tableContent} >
                                    <Text style={styles.tableHeader}>Sealed By NIK :</Text>
                                </View>
                            </View>

                            <FlatList
                                data={this.state.dsPushStoreList}
                                renderItem={({ item }) => //<View style={{ flex: 1, flexDirection: 'row',justifyContent:'flex-start' }}>
                                    <TouchableOpacity onPress={() => {

                                        this.props.Store(this.props.token, item.key, item.number,item.trxtype,item.instance,item.repocount,item.requested,
                                            item.requestedby,item.requestedbyNIK,item.sealed,item.sealedby,item.sealedbyNIK)                                        
                                        this.PushStoreInit(this.props.token, item.key)
                                        //this.props.storeInit(this.props.token,item.key,'')
                                        //this.props.navigation.navigate('TwoWayVerificationInitiator');
                                        //this.props.navigation.navigate("PushStore", { key: item.key });
                                    }}>
                                        <View style={styles.tableContainer}>
                                            {/* <View style={styles.tableContent}>
                                                <Text>{item.key} </Text>
                                            </View> */}
                                            <View style={styles.tableContent}>
                                                <Text>{item.number}</Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.trxtype}</Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.instance}</Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.repocount}</Text>
                                            </View>
                                            <View style={styles.tableContent} >
                                                <Text>{item.requested}</Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.requestedby}</Text>
                                            </View>
                                            <View style={styles.tableContent} >
                                                <Text>{item.requestedbyNIK}</Text>
                                            </View>
                                            <View style={styles.tableContent} >
                                                <Text>{item.sealed}</Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.sealedby}</Text>
                                            </View>
                                            <View style={styles.tableContent} >
                                                <Text>{item.sealedbyNIK}</Text>
                                            </View>
                                        </View>

                                    </TouchableOpacity>
                                    //</View>
                                }
                                keyExtractor={(item, index) => index.toString()}
                                ItemSeparatorComponent={this.renderSeparator}
                            />
                        </View>
                    </ScrollView>
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
    tableContainer: { flexDirection: 'row' },
    //tableContent: { borderColor: '#003366', borderWidth: 1, width: 100, height: 40 },
    tableContent: { width: 120, height: 40, padding: 3, backgroundColor: 'lightgrey' },
    tableHeader: { backgroundColor: '#4d4dff', height: 40, color: '#f5f5f5' },
});


const mapStateToProps = (state) => {
    return {
        username: state.reducerLogin.username,
        mobile: state.reducerLogin.mobile,
        token: state.reducerLogin.token,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        Store: (token, key, number,trxtype,instance,repocount,requested,requestedby,requestedbyNIK,sealed,sealedby,sealedbyNIK) => {
            dispatch(Store(token, key, number,trxtype,instance,repocount,requested,requestedby,requestedbyNIK,sealed,sealedby,sealedbyNIK))
        },
        storeInit: (token,key,secretkey,storagekey,step)=>{
            dispatch(storeInit(token,key,secretkey,storagekey,step))
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(PushStoreListScreen);