import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Constants, Camera, Permissions, ImagePicker, FileSystem, ImageManipulator, takePictureAsync } from 'expo';

import DatePicker from 'react-native-datepicker';
import { Picker } from 'react-native-picker-dropdown'; //picker to fix in ios
import QRCode from 'react-native-qrcode';
import { Button } from '../../components';
import ActionButton from 'react-native-action-button'; //floating action button
import Icon from 'react-native-vector-icons/Ionicons'; //iconpacks
import ActionSheet from 'react-native-actionsheet';
import { connection } from '../../utils/constants';
import { manifestedPush } from '../../actions/push';


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

class PullManifestedScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            since: dateNow,
            dsManifested: [],
            dsRepoID: [],
            repoID: this.props.repoID,
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
                    //this.getRepoID();
                    //this.getPushManifestable();
                    this.getPushManifested();
                    //this.bindDataTable();
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

    getRepoID() {
        var url = connection.SERVER + 'repo/list/pushable?token=' + this.props.token
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
                        dsRepoID: responseJson.data
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

    getPushManifestable() {
        var url = connection.SERVER + 'push/list/manifestable?token=' + this.props.token
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
                        dsRepoID: responseJson.data
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

    getPushManifested() {

        var url = connection.SERVER + 'push/manifest/list?token=' + this.props.token +
            '&pushkey=' + this.props.pushKey
        //var url = 'http://192.168.33.48:5006/push/PackingList?token=' + this.props.token 
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
                        dsManifested: responseJson.data
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

    pushManifested() {
        var url = connection.SERVER + 'push/Manifest'
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
                    console.log("Push has been Manifested.");
                    alert("Push has been Manifested");
                    this.props.navigation.navigate('PushManifestingList');
                }
                else {
                    console.log("Push Manifested Failed! " + responseJson.err);
                    alert("Push Manifested Failed! " + responseJson.err);
                }
            })
            .catch((error) => {
                console.log(error)
                alert("There is something wrong! " + error)
            })
    }

    componentWillMount() {
        this.getInstaKey();
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this.setState({
            since: dateNow,
            dsManifested: [],
            dsRepoID: [],
            repoID: '',
        })
    }

    bindDataTable() {
        this.setState({ dsManifested: [] });
        this.getPushManifested();
        //{this.renderTable()}

    }

    onValueChangeRepoID(value) {
        this.setState({ repoID: value })
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

        let serviceRepoID = this.state.dsRepoID.map((item, key) => {
            return <Picker.Item key={key} value={item.key} label={item.key} />
        });

        return (
            
            <View style={styles.container}>
            <ContainerView>
                    <TitleText></TitleText>

                    <ScrollView horizontal={true}>
                        <View style={{ justifyContent: 'flex-start' }}>
                            <View style={styles.tableContainer}>
                                {/* <View style={styles.tableContent}>
                                    <Text>Key :  </Text>
                                </View> */}
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Repo ID : </Text>
                                </View>
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Repo Kind: </Text>
                                </View>
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Created : </Text>
                                </View>
                                <View style={styles.tableContent} >
                                    <Text style={styles.tableHeader}>Creator :</Text>
                                </View>

                            </View>

                            <FlatList
                                data={this.state.dsManifested}
                                renderItem={({ item }) =>
                                    <TouchableOpacity onPress={() => {

                                        this.props.manifestedPush(this.props.token, this.props.pushKey,item.key);
                                        this.props.navigation.navigate("PushManifest", { key: item.key });
                                    }}>
                                        <View style={styles.tableContainer}>
                                            {/* <View style={styles.tableContent}>
                                                <Text>{item.key} </Text>
                                            </View> */}
                                            <View style={styles.tableContent}>
                                                <Text>{item.fmtID}</Text>
                                            </View>
                                            <View style={styles.tableContent} >
                                                <Text>{item.kind}</Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.created}</Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.creator}</Text> 
                                            </View>

                                        </View>

                                    </TouchableOpacity>

                                }
                                keyExtractor={(item, index) => index.toString()}
                                ItemSeparatorComponent={this.renderSeparator}
                            />
                        </View>
                    </ScrollView>

                    {/* </View> */}

                    {/* </ScrollView> */}
           
                </ContainerView>       



                {/* Rest of the app comes ABOVE the action button component !*/}
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#9b59b6' title="Add Manifest" onPress={() => {
                        this.props.navigation.navigate('PushManifest');
                        console.log("notes tapped!"); }}>
                        <Icon name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    {/* <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => { }}>
                        <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => { }}>
                        <Icon name="md-done-all" style={styles.actionButtonIcon} />
                    </ActionButton.Item> */}
                </ActionButton>

            </View>
            
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
    tableContent: { width: 100, height: 40, padding: 3, backgroundColor: 'lightgrey' },
    tableHeader: { backgroundColor: '#4d4dff', height: 40, color: '#f5f5f5' },
    actionButtonIcon: { fontSize: 20, height: 22, color: 'white', },
});


const mapStateToProps = (state) => {
    return {
        token: state.reducerLogin.token,
        repoID: state.reducerPush.repoID,
        pushKey: state.reducerPush.key
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        manifestedPush: (token, pushkey, repoID) => {
            dispatch(manifestedPush(token, pushkey, repoID))
        },        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PullManifestedScreen);