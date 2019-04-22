import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Constants } from 'expo';
import { Button } from '../../components';
import { connect } from 'react-redux';
import { connection } from '../../utils/constants';
import { dropPull } from '../../actions/pull';

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

class DisposeBurnableListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dsPullDropableList: [],
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
                    this.getBurnableList();
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


    getBurnableList() {
        //var url = connection.SERVER + 'register/apprlist?token=' + this.props.token
        var url = connection.SERVER + 'dispose/list/burnable?token=' + this.props.token
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
                        dsPullDropableList: responseJson.data
                    })
                }
                else {
                    console.log('Data could not be found ' + responseJson.err)
                    alert("Data not Found!" + responseJson.err)
                    //this.props.navigation.navigate('Home')
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
       // this.getInstaKey();
    }
     
    render() {
        return (
            <ScrollView horizontal={true}>
                <ContainerView>
                    <TitleText> </TitleText>
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
                            <View style={styles.tableContent} >
                                <Text style={styles.tableHeader}>Requested By :</Text>
                            </View>
                            <View style={styles.tableContent} >
                                <Text style={styles.tableHeader}>Requested By NIK:</Text>
                            </View>
                            <View style={styles.tableContent} >
                                <Text style={styles.tableHeader}>Approved :</Text>
                            </View>
                            <View style={styles.tableContent} >
                                <Text style={styles.tableHeader}>Approved By :</Text>
                            </View>
                            <View style={styles.tableContent} >
                                <Text style={styles.tableHeader}>Approved By NIK:</Text>
                            </View>
                            <View style={styles.tableContent} >
                                <Text style={styles.tableHeader}>Accepted :</Text>
                            </View>
                            <View style={styles.tableContent} >
                                <Text style={styles.tableHeader}>Accepted By :</Text>
                            </View>
                            <View style={styles.tableContent} >
                                <Text style={styles.tableHeader}>Accepted By NIK:</Text>
                            </View>
                        </View>

                        <FlatList
                            data={this.state.dsPullDropableList}
                            renderItem={({ item }) => //<View style={{ flex: 1, flexDirection: 'row',justifyContent:'flex-start' }}>
                                <TouchableOpacity onPress={() => {
                                    //alert(item.nik + ',' + item.name);
                                    this.props.dropPull(this.props.token, item.key, item.number, item.trxtype, item.instance, 
                                        item.repocount, item.requested,item.requestedby,item.requestedbyNIK,item.approved,item.approvedby,
                                        item.approvedbyNIK,item.accepted,item.acceptedby,item.acceptedbyNIK);
                                    this.props.navigation.navigate("DisposeBurn", { key: item.key });
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
                                        <View style={styles.tableContent} >
                                            <Text>{item.requestedby}</Text>
                                        </View>
                                        <View style={styles.tableContent} >
                                            <Text>{item.requestedbyNIK}</Text>
                                        </View>
                                        <View style={styles.tableContent} >
                                            <Text>{item.approved}</Text>
                                        </View>
                                        <View style={styles.tableContent} >
                                            <Text>{item.approvedby}</Text>
                                        </View>
                                        <View style={styles.tableContent} >
                                            <Text>{item.approvedbyNIK}</Text>
                                        </View>
                                        <View style={styles.tableContent} >
                                            <Text>{item.accepted}</Text>
                                        </View>
                                        <View style={styles.tableContent} >
                                            <Text>{item.acceptedby}</Text>
                                        </View>
                                        <View style={styles.tableContent} >
                                            <Text>{item.acceptedbyNIK}</Text>
                                        </View>
                                    </View>

                                </TouchableOpacity>
                                //</View>
                            }
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={this.renderSeparator}
                        />
                    </View>
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
    tableContent: { width: 120, height: 40, padding: 3, backgroundColor:'lightgrey' },
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
        dropPull: (token, key, number, trxtype, instance, repocount, requested,requestedby,requestedbyNIK,approved,approvedby,approvedbyNIK,accepted,acceptedby,acceptedbyNIK) => {
            dispatch(dropPull(token, key, number, trxtype, instance, repocount, requested,requestedby,requestedbyNIK,approved,approvedby,approvedbyNIK,accepted,acceptedby,acceptedbyNIK))
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(DisposeBurnableListScreen);