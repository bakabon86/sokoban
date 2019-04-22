import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Constants } from 'expo';
import { Button } from '../../components';
import { connect } from 'react-redux';
import { connection } from '../../utils/constants';
import { approvalPush } from '../../actions/push';

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

class PushExecListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dsPushExecList: [],
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
                    this.getPushExecList();
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


    getPushExecList() {
        //var url = connection.SERVER + 'register/ExecList?token=' + this.props.token
        var url = 'http://192.168.33.48:5005/push/ExecList?token=' + this.props.token
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
                        dsPushExecList: responseJson.data
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
                                <View style={styles.tableContent}>
                                    <Text>Key :  </Text>
                                </View>
                                <View style={styles.tableContent}>
                                    <Text>Instance : </Text>
                                </View>
                                <View style={styles.tableContent}>
                                    <Text>Name : </Text>
                                </View>
                                <View style={styles.tableContent}>
                                    <Text>NIK : </Text>
                                </View>
                                <View style={styles.tableContent}>
                                    <Text>Time : </Text>
                                </View>
                                <View style={styles.tableContent} >
                                    <Text>Exec Date :</Text>
                                </View>
                            </View>

                            <FlatList
                                data={this.state.dsPushExecList}
                                renderItem={({ item }) => //<View style={{ flex: 1, flexDirection: 'row',justifyContent:'flex-start' }}>
                                    <TouchableOpacity onPress={() => {
                                        alert(item.nik + ',' + item.name);
                                        this.props.approvePush(this.props.token, item.key, item.instance, item.time, item.execdate, item.name, item.nik);
                                        this.props.navigation.navigate("PushApproval", { key: item.key });
                                    }}>
                                        <View style={styles.tableContainer}>
                                            <View style={styles.tableContent}>
                                                <Text>{item.key} </Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.instance}</Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.name}</Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.nik}</Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.time}</Text>
                                            </View>
                                            <View style={styles.tableContent} >
                                                <Text>{item.execdate}</Text>
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
    inputText: { width: 260, backgroundColor: '#fff', marginBottom: 3 },
    picker: { alignSelf: 'center', width: 260, height: 40, backgroundColor: '#fff' },
    pickerText: { backgroundColor: '#fff' },
    tableContainer: { flexDirection: 'row' },
    tableContent: { borderColor: '#000000', borderWidth: 1, width: 100, height: 40 },
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
        approvePush: (token, pushKey, instance, time, execdate, pushname, pushnik) => {
            dispatch(approvalPush(token, pushKey, instance, time, execdate, pushname, pushnik))
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(PushExecListScreen);