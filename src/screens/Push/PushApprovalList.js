import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Constants } from 'expo';
import { Button } from '../../components';
import { connect } from 'react-redux';
import { connection } from '../../utils/constants';
import { approvalPush } from '../../actions/push';
import { Picker } from 'react-native-picker-dropdown'; //picker to fix in ios

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

class PushApprovalListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dsPushApprovalList: [],
            trxtype: '',
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
                    this.getPushApprovalList();
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


    getPushApprovalList(trxtype) {
        //var url = connection.SERVER + 'register/apprlist?token=' + this.props.token
        var url = connection.SERVER + 'trx/list/approvable?token=' + this.props.token
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
                    if (trxtype === '') {
                        this.setState({ dsPushApprovalList: responseJson.data })
                    }
                    else {
                        const tipe = responseJson.data.filter(x => x.trxtype === trxtype)
                        this.setState({
                            dsPushApprovalList: tipe
                        })
                    }
                }
                else {
                    console.log('Data could not be found')
                    alert("Data not Found!, Please Retry!")
                    this.props.navigation.navigate('Home')
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

    onValueChange(value) {
        if (value !== '') {
            this.setState({
                trxtype: value,
            });
        }
        else {
            this.setState({ trxtype: '' })
        }
    }

    bindDataTable() {
        this.setState({ dsPushApprovalList: [] });
        this.getPushApprovalList(this.state.trxtype);
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <ContainerView>
                    <TitleText> </TitleText>
                    <Text style={styles.labelText}>Trx Type :</Text>
                    <Picker
                        selectedValue={this.state.trxtype.toString()}
                        //onValueChange={(val) =>{this.setState({ status: val })}}
                        onValueChange={this.onValueChange.bind(this)}
                        prompt="Choose Trx Type"
                        style={styles.picker}
                        textStyle={styles.pickerText}
                        cancel
                    >
                        <Picker.Item key={0} label='== All ==' value='' />
                        <Picker.Item key={1} label='Penyimpanan' value='PUSH' />
                        <Picker.Item key={2} label='Penarikan' value='PULL' />
                        <Picker.Item key={3} label='Peminjaman' value='CHECKIN' />
                        <Picker.Item key={4} label='Pemusnahan' value='DISPOSE' />

                    </Picker>
                    <ButtonContainer>
                        <Button text="Get List" onPress={() => this.bindDataTable()} />
                    </ButtonContainer>
                    <ScrollView horizontal={true}>
                        <View style={{ justifyContent: 'flex-start' }}>
                            <View style={styles.tableContainer}>
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Trx Type :  </Text>
                                </View>  
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Number :  </Text>
                                </View>  
                                 <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Time : </Text>
                                </View>  
                                 <View style={styles.tableContent} >
                                    <Text style={styles.tableHeader}>Exec Date :</Text>
                                </View>                           
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Name : </Text>
                                </View>
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>NIK : </Text>
                                </View>  
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Trx Ops :  </Text>
                                </View>
                            </View>

                            <FlatList
                                data={this.state.dsPushApprovalList}
                                renderItem={({ item }) => //<View style={{ flex: 1, flexDirection: 'row',justifyContent:'flex-start' }}>
                                    <TouchableOpacity onPress={() => {
                                        //alert(item.nik + ',' + item.name);
                                        this.props.approvePush(this.props.token, item.key, item.trxtype, item.number, item.time, item.execdate, item.name, item.nik, item.ops, item.reason);
                                        this.props.navigation.navigate("PushApproval", { key: item.key });
                                    }}>
                                        <View style={styles.tableContainer}>
                                            <View style={styles.tableContent}>
                                                <Text>{item.trxtype} </Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.number} </Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.time}</Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.execdate}</Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.name}</Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.nik}</Text>
                                            </View>
                                            <View style={styles.tableContent} >
                                                <Text>{item.ops}</Text>
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
    labelText: { color: '#000099' },
    labelDefaultText: { width: 260, backgroundColor: '#b8fcf9', color: '#000099', maxHeight: 80, },
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
        approvePush: (token, key, trxtype, number, time, execdate, name, nik, ops, reason) => {
            dispatch(approvalPush(token, key, trxtype, number, time, execdate, name, nik, ops, reason))
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(PushApprovalListScreen);