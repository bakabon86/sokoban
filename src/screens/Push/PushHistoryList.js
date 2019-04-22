import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Constants } from 'expo';
import { Button } from '../../components';
import { connect } from 'react-redux';
import { connection } from '../../utils/constants';
import { historyPush } from '../../actions/push';
import DatePicker from 'react-native-datepicker';
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

var dateToday = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();
var dateNow = (year + '-' + month + '-' + dateToday);

function getParsedDate(date){
    date = String(date).split(' ');
    var days = String(date[0]).split('-');
    var hours = String(date[1]).split(':');
    return [parseInt(days[0]), parseInt(days[1])-1, parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])];
  }

class PushHistoryListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'Active',
            dsPushHistoryList: [],
            since: dateNow,
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

                }
                else {
                    // this.setState({
                    //     dsInstance: []
                    // })
                    console.log('token expired!' + responseJson.err)
                    alert("Token Expired, Please Login Again!" + responseJson.err)
                    this.props.navigation.navigate('Login')
                }

            })
            .catch((error) => {
                alert("There is something wrong! " + error)
            });

    }


    getPushHistoryList(token, status) {
        //var url = connection.SERVER + 'register/apprlist?token=' + this.props.token
        var act
        if(status === 'Active'){
            act = true
        }
        else{
            act = false
        }
        var url = connection.SERVER +'trx/list?token=' + token +
            '&activeonly=' + act
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
                        dsPushHistoryList: responseJson.data
                    })
                }
                else {
                    console.log('Data could not be found' + responseJson.err)
                    alert("Data not Found!, Please Retry!" + responseJson.err)
                    
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

    onValueChange(value) {
        if (value) {
            this.setState({
                status: value,
            });
        }         
    }

    bindDataTable() {
        this.setState({ dsPushHistoryList: [] });
        this.getPushHistoryList(this.props.token, this.state.status);
        //{this.renderTable()}

    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <ContainerView>
                    <TitleText> </TitleText>
                   
                        {/* <Text style={styles.labelText}>Since Date :</Text>
                        <DatePicker
                            style={{ width: 260, height: 40 }}
                            date={this.state.since}
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
                                this.setState({ since: date, })
                            }}
                        /> */}
                        <Text style={styles.labelText}>Active Only :</Text>
                        <Picker
                        selectedValue={this.state.status.toString()}
                        //onValueChange={(val) =>{this.setState({ status: val })}}
                        onValueChange={this.onValueChange.bind(this)}
                        prompt="Choose Active Only"
                        style={styles.picker}
                        textStyle={styles.pickerText}
                        cancel
                    >
                        <Picker.Item key={0} label='Active Only' value='Active' />
                        <Picker.Item key={1} label='InActive' value='Non Active' />
                        
                    </Picker>
                        <ButtonContainer>
                            <Button text="Get List" onPress={() => this.bindDataTable()} />
                        </ButtonContainer>
                    
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
                                <View style={styles.tableContent} >
                                    <Text style={styles.tableHeader}>Instance :</Text>
                                </View>
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>State : </Text>
                                </View>
                                <View style={styles.tableContent}>
                                    <Text style={styles.tableHeader}>State Time : </Text>
                                </View>
                            </View>

                            <FlatList
                                data={this.state.dsPushHistoryList}
                                renderItem={({ item }) => //<View style={{ flex: 1, flexDirection: 'row',justifyContent:'flex-start' }}>
                                    <TouchableOpacity onPress={() => {
                                        // alert(item.nik + ',' + item.name);
                                        this.props.historyPush(this.props.token, item.key, item.number, item.trxtype, item.instance, item.state, item.statetime);
                                        this.props.navigation.navigate("PushHistory", { key: item.key });
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
                                                <Text>{item.state}</Text>
                                            </View>
                                            <View style={styles.tableContent} >
                                                <Text>{item.statetime}</Text>
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
    labelDefaultText: {color: '#b8fcf9'},
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
        historyPush: (token, key, number, trxtype, instance, state, statetime) => {
            dispatch(historyPush(token, key, number, trxtype, instance, state, statetime))
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(PushHistoryListScreen);