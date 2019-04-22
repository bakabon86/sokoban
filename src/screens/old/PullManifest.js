import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Constants, Camera, Permissions, ImagePicker, FileSystem, ImageManipulator, takePictureAsync } from 'expo';

import DatePicker from 'react-native-datepicker';
import { Picker } from 'react-native-picker-dropdown'; //picker to fix in ios
import QRCode from 'react-native-qrcode';
import { Button } from '../../components';
import ActionSheet from 'react-native-actionsheet';
import { connection } from '../../utils/constants';
import { prePacking, documentPush } from '../../actions/push';


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

class PullManifestScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            since: dateNow,
            dsInstance: [],
            dsManifested: [],
            dsRepoID: [],
            repoID: this.props.repoID ? this.props.repoID : '',
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
                    this.setState({
                        dsInstance: responseJson.data
                    });
                    this.getRepoID();
                    //this.getPushManifestable();
                    //this.getPushManifested();
                    //this.bindDataTable();
                }
                else {
                    this.setState({
                        dsInstance: []
                    })
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

    getPushManifestable(){
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

    pushManifestAdd() {
        if(this.state.repoID !== ''){
            var url = connection.SERVER + 'push/manifest/add'
            console.log("URL=" + url)
    
            var formData = new FormData();
            formData.append('token', this.props.token)
            formData.append('pushkey', this.props.pushKey)
            formData.append('repoID', this.state.repoID)
    
            console.log('token=' + this.props.token);
            console.log('pushkey=' + this.props.pushKey);
            console.log('repoID=' + this.state.repoID);

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
        else{
            alert("Select Repo ID First!");
            console.log("Select Repo ID First!");
        }
        
    }

    pushManifestDelete() {
        if(this.state.repoID !== ''){
            var url = connection.SERVER + 'push/manifest/del'
            console.log("URL=" + url)
    
            var formData = new FormData();
            formData.append('token', this.props.token)
            formData.append('pushkey', this.props.pushKey)
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
                        console.log("Push Manifested has been deleted.");
                        alert("Push Manifested has been deleted");
                        this.props.navigation.navigate('PushManifestingList');
                    }
                    else {
                        console.log("Push Manifested Delete Failed! " + responseJson.err);
                        alert("Push Manifested Delete Failed! " + responseJson.err);
                    }
                })
                .catch((error) => {
                    console.log(error)
                    alert("There is something wrong! " + error)
                })
        }
        else{
            alert("Select Repo ID First!");
            console.log("Select Repo ID First!");
        }
        
    }

    componentWillMount() {
        this.getInstaKey();
    }

    componentDidMount() {

    }

    componentWillUnmount(){
        this.setState({
            since: dateNow,
            dsInstance: [],
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
            return <Picker.Item key={key} value={item.key} label={item.fmtID} />
        });

        return (
            <ScrollView style={styles.container}>
                <ContainerView>
                    <TitleText></TitleText>                   
                    <Text style={styles.labelText}>RepoID :</Text>
                    <Picker
                        selectedValue={this.state.repoID}
                        style={styles.picker}//{{ alignSelf: 'center', width: 250, height: 35, backgroundColor: '#92f3ef' }}
                        textStyle={styles.pickerText}//{{ backgroundColor: '#92f3ef' }}
                        prompt="Choose Repo ID"
                        onValueChange={this.onValueChangeRepoID.bind(this)}
                        //onValueChange= {(value) => {this.setState({approved: value})}}
                        cancel >
                        <Picker.Item value={''} label={'==Select Repo=='} />
                        {serviceRepoID}
                    </Picker>
                   
                    <ButtonContainer>
                        <Button text="Add" onPress={() => { this.pushManifestAdd() }} /> 
                        <Button text="Delete" onPress={() => { this.pushManifestDelete() } } />
                      <Button text="Verify" onPress={() => { this.props.navigation.navigate('PushManifestingList') }} />  
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
    tableContainer: { flexDirection: 'row' },
    //tableContent: { borderColor: '#003366', borderWidth: 1, width: 100, height: 40 },
    tableContent: { width: 100, height: 40, padding: 3, backgroundColor:'lightgrey' },
    tableHeader: { backgroundColor: '#4d4dff' , height:40, color: '#f5f5f5'},
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
        prePacking: (token, pushkey, repoID) => {
            dispatch(prePacking(token, pushkey, repoID))
        },
        documentPush: (token,doctitle,doctype,dockey,boxID) => {
            dispatch(documentPush(token,doctitle,doctype,dockey,boxID))
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PullManifestScreen);