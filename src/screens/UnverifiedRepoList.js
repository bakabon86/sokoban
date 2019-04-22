import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Constants } from 'expo';
import { Button } from '../components';
import { connect } from 'react-redux';
import { connection } from '../utils/constants';


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

class UnverifiedRepoListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dsUnverifiedRepoList: [],
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
                    this.getUnverifiedRepoList();
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


    getUnverifiedRepoList() {
        
        var url = connection.SERVER + 'trx/manifest/list/unverified?token=' + this.props.token +
                 '&trxkey=' + this.props.trxkey
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
                        dsUnverifiedRepoList: responseJson.data
                    })
                }
                else {
                    console.log('Data could not be found')
                    alert("Data not Found!, Or there is No Repo Unverified!")
                    //this.props.navigation.goBack();
                }
            })
            .catch((error) => {
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
                                {/* <View style={styles.tableContent}>
                                <Text>Key :  </Text>
                            </View> */}
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Repo : </Text>
                                </View>
                                {/* <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Name : </Text>
                                </View>
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>NIK : </Text>
                                </View> */}
                                {/* <View style={styles.tableContent}>
                                    <Text>Document Time : </Text>
                                </View>
                                <View style={styles.tableContent} >
                                    <Text>Nomor Bukti :</Text>
                                </View> */}
                            </View>

                            <FlatList
                                data={this.state.dsUnverifiedRepoList}
                                renderItem={({ item }) => //<View style={{ flex: 1, flexDirection: 'row',justifyContent:'flex-start' }}>
                                    <TouchableOpacity onPress={() => {
                                        //alert(item.nik + ',' + item.name);
                                        // this.props.approveRegistration(this.props.token, item.key, item.name, item.nik, item.instance);
                                        // this.props.navigation.navigate("RegisterApproval", { key: item.key });
                                    }}>
                                        <View style={styles.tableContainer}>
                                            {/* <View style={styles.tableContent}>
                                            <Text>{item.key} </Text>
                                        </View> */}
                                            <View style={styles.tableContent}>
                                                <Text>{item}</Text>
                                            </View>
                                            {/* <View style={styles.tableContent}>
                                                <Text>{item.name}</Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.nik}</Text>
                                            </View> */}
                                            {/* <View style={styles.tableContent}>
                                                <Text>{item.doctime}</Text>
                                            </View>
                                            <View style={styles.tableContent} >
                                                <Text>{item.nomorbukti}</Text>
                                            </View> */}
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
    //tableContent: { borderColor: '#003366', borderWidth: 1, width: 100, height: 40 },
    tableContent: { width: 100, height: 40, padding: 3, backgroundColor: 'lightgrey' },
    tableHeader: { backgroundColor: '#4d4dff', height: 40, color: '#f5f5f5' },
});


const mapStateToProps = (state) => {
    return {
        username: state.reducerLogin.username,
        mobile: state.reducerLogin.mobile,
        token: state.reducerLogin.token,
        trxkey: state.reducerPush.key,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        approveRegistration: (token, regkey, registeredname, registerednik, instance) => {
            dispatch(registerApproval(token, regkey, registeredname, registerednik, instance))
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(UnverifiedRepoListScreen);