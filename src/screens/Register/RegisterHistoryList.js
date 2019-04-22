import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Constants } from 'expo';
import { Button } from '../../components';
import { connect } from 'react-redux';
import { connection } from '../../utils/constants';
import DatePicker from 'react-native-datepicker';

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

class RegisterHistoryListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            oldest: dateNow,
            dsRegisterHistoryList: [],
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
                    this.getRegisterHistoryList();

                }
                else {
                    // this.setState({
                    //     dsInstance: []
                    // })
                    console.log('token expired!'+ responseJson.err)
                    alert("Token Expired!" + responseJson.err)
                    this.props.navigation.navigate('Login')
                }

            })
            .catch((error) => {
                alert("There is something wrong! " + error)
            });

    }


    getRegisterHistoryList() {
        var url = connection.SERVER + 'register/histlist?token=' + this.props.token +
            '&oldest=' + this.state.oldest
        // var url = 'http://192.168.33.48:5006/register/HistList?token=' + this.props.token +
        // '&oldest=' + this.state.oldest
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
                        dsRegisterHistoryList: responseJson.data
                    })
                }
                else {
                    console.log('Data could not be found' + responseJson.err)
                    alert("Data not Found!, Please Retry!" + responseJson.err)
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

    }

    bindDataTable() {
        this.setState({ dsRegisterHistoryList: [] });
        this.getRegisterHistoryList();
        //{this.renderTable()}

    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <ContainerView>
                    <Text style={styles.labelText}>Since Date :</Text>
                    <DatePicker
                        style={{ width: 260, height: 40 }}
                        date={this.state.oldest}
                        mode="date"
                        placeholder="Select Date"
                        format="YYYY-MM-DD"
                        minDate="2013-01-01"
                        maxDate="2030-12-31"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36,
                                backgroundColor: '#fff',
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {
                            this.setState({ oldest: date, })
                        }}
                    />
                    <ButtonContainer>
                        <Button text="Get History" onPress={() => this.bindDataTable()} />
                    </ButtonContainer>

                    <ScrollView horizontal={true}>
                        <View style={{ justifyContent: 'flex-start' }}>
                            <View style={styles.tableContainer}>
                                {/* <View style={styles.tableContent}>
                                    <Text>Key :  </Text>
                                </View> */}
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Time : </Text>
                                </View>
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Approve Time : </Text>
                                </View>
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>approved : </Text>
                                </View>
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>Reason : </Text>
                                </View>
                                <View style={styles.tableContent} >
                                    <Text style={styles.tableHeader}>Approve User :</Text>
                                </View>
                            </View>

                            <FlatList
                                data={this.state.dsRegisterHistoryList}
                                renderItem={({ item }) => //<View style={{ flex: 1, flexDirection: 'row',justifyContent:'flex-start' }}>
                                    <TouchableOpacity onPress={() => {
                                        // alert(item.nik + ',' + item.name);
                                        // this.props.approveRegistration(this.props.token, item.key, item.name, item.nik, item.instance);
                                        // this.props.navigation.navigate("RegisterApproval", { key: item.key });
                                    }}>
                                        <View style={styles.tableContainer}>
                                            {/* <View style={styles.tableContent}>
                                                <Text>{item.key} </Text>
                                            </View> */}
                                            <View style={styles.tableContent}>
                                                <Text>{item.time}</Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.apprtime}</Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.approved}</Text>
                                            </View>
                                            <View style={styles.tableContent}>
                                                <Text>{item.reason}</Text>
                                            </View>
                                            <View style={styles.tableContent} >
                                                <Text>{item.appruser}</Text>
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
    container: { flex: 1, paddingTop: Constants.statusBarHeight },// marginBottom: 3 },
    labelText: {color: '#000099'},
    labelDefaultText: {width: 260, backgroundColor: '#b8fcf9', color: '#000099', maxHeight: 80, },
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
        approveRegistration: (token, regkey, registeredname, registerednik, instance) => {
            dispatch(registerApproval(token, regkey, registeredname, registerednik, instance))
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterHistoryListScreen);