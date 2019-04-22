import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Constants, Camera, Permissions, ImagePicker, FileSystem, ImageManipulator, takePictureAsync } from 'expo';

import DatePicker from 'react-native-datepicker';
import { Picker } from 'react-native-picker-dropdown'; //picker to fix in ios
import QRCode from 'react-native-qrcode';
import { Button } from '../../components';
import ActionSheet from 'react-native-actionsheet';
import { connection } from '../../utils/constants';
import { prePacking } from '../../actions/push';


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

class PushPackingListScreen extends Component {
    constructor(props) {
        super(props)
        this.state={
            since: dateNow,
            dsPackingList: [],
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
                    this.getPushPackingList();
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


    getPushPackingList() {
       
        var url = connection.SERVER + 'push/PackingList?token=' + this.props.token 
        //var url = 'http://192.168.33.48:5006/push/PackingList?token=' + this.props.token 
        console.log("URL=" + url)
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };
        return fetch(url,config)
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
                        dsPackingList: responseJson.data
                    })
                }
                else {
                    console.log('Data could not be found')
                    alert(responseJson.err)
                    
                }
            })
            .catch((error) => {
                console.log(error);
                alert("There is something wrong! " + error)
            });
    }

    componentWillMount() {
        this.getInstaKey();
    }

    componentDidMount() {

    }

    bindDataTable() {
        this.setState({ dsPackingList: [] });
        this.getPushPackingList();
        //{this.renderTable()}

    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <ContainerView>
                    <TitleText></TitleText>
                    

                    <ScrollView horizontal={true}>
                        <View style={{ justifyContent: 'flex-start' }}>
                            <View style={styles.tableContainer}>
                                {/* <View style={styles.tableContent}>
                                    <Text>Key :  </Text>
                                </View> */}
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Instance : </Text>
                                </View>
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Time : </Text>
                                </View>
                                <View style={styles.tableContent} >
                                    <Text style={styles.tableHeader}>Packing Plan :</Text>
                                </View>
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Requester Name: </Text>
                                </View>
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Requester NIK : </Text>
                                </View>
                                <View style={styles.tableContent} >
                                    <Text style={styles.tableHeader}>Accepted :</Text>
                                </View>
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Accepted by: </Text>
                                </View>
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Accepted by NIK : </Text>
                                </View>
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Repo ID : </Text>
                                </View>
                            </View>

                            <FlatList
                                data={this.state.dsPackingList}
                                renderItem={({ item }) => 
                                    <TouchableOpacity onPress={() => {
                                       
                                         this.props.prePacking(this.props.token, item.key,item.instance,item.repoID,'');
                                         this.props.navigation.navigate("PushPrePacking", { key: item.key });
                                    }}>
                                        <View style={styles.tableContainer}>
                                            {/* <View style={styles.tableContent}>
                                                <Text>{item.key} </Text>
                                            </View> */}
                                            <View style={styles.tableContent}>
                                                <Text>{item.instance}</Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.time}</Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.packingplan}</Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.reqname}</Text>
                                            </View>
                                            <View style={styles.tableContent} >
                                                <Text>{item.preqNIK}</Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.accepted}</Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.scceptedby}</Text>
                                            </View>
                                            <View style={styles.tableContent} >
                                                <Text>{item.acceptedbyNIK}</Text>
                                            </View>
                                            <View style={styles.tableContent} >
                                                <Text>{item.repoID}</Text>
                                            </View>
                                        </View>

                                    </TouchableOpacity>
                                   
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
    inputText: { width: 260, backgroundColor: '#fff', marginBottom: 3 },
    picker: { alignSelf: 'center', width: 260, height: 40, backgroundColor: '#fff' },
    pickerText: { backgroundColor: '#fff' },
    tableContainer: { flexDirection: 'row' },
    //tableContent: { borderColor: '#003366', borderWidth: 1, width: 100, height: 40 },
    tableContent: { width: 100, height: 40, padding: 3, backgroundColor:'lightgrey' },
    tableHeader: { backgroundColor: '#4d4dff' , height:40, color: '#f5f5f5'},
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
        prePacking: (token, pushKey, instance,repoID,pin) => {
            dispatch(prePacking(token, pushKey, instance,repoID,pin))
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(PushPackingListScreen);