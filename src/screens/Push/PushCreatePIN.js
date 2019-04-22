import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, FlatList, } from 'react-native';
import styled from 'styled-components/native';
import { Constants } from 'expo';
import { Button } from '../../components';
import { connect } from 'react-redux';
import { connection } from '../../utils/constants';
import { Picker } from 'react-native-picker-dropdown'; //picker to fix in ios
import QRCode from 'react-native-qrcode'; //Generate QR Code
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

class PushCreatePINScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pushKey: '',
            dsInstance: [],
            instance: '',
            dsRepoID: [],
            repoID: '',
            pin: '',
            QRGenerated: '',
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
                    this.setState({ dsInstance: responseJson.data });                    

                }
                else {
                   
                    console.log('token expired')
                    alert("Token expired, Please Login again!")
                    this.props.navigation.navigate('Login')
                }

            })
            .catch((error) => {
                alert("There is something wrong! " + error)
            });

    }

    getRepoID(){
        var url = connection.SERVER + 'auth/RepoList?token=' + this.props.token
        console.log("URL=" +url);
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };
        fetch(url,config)
        .then((response)=>{
            if(response.status === 404){
                return{status: false, token: "Null"}
            }
            else{
                return response.json()
            }
        })
        .then((responseJson)=>{
            if(responseJson.status === true){
                this.setState({
                    dsRepoID: responseJson.data,
                    //repoID: responseJson.data.repoID
                })
            }
            else{
                this.setState({
                    dsRepoID: [],
                    repoID: ''
                })
                console.log("RepoID not Found");
                alert(responseJson.err);
            }
        })
        .catch((error)=>{
            console.log("There is something wrong! " + error);
            alert("There is something wrong! " + error);
        })
    }

    getPin(){
        if(this.state.repoID !== ''){
            var url = connection.SERVER + 'auth/CreatePIN?token=' + this.props.token +
            '&repoID=' + this.state.repoID
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
                    // //let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                    this.setState({
                        pin: responseJson.data
                    });
                    //this.getQR();
                    this.props.prePacking(this.props.token,'',this.state.instance,this.state.repoID,this.state.pin)
                    this.props.navigation.navigate('PushTryPacking') 
                }
                else {
                    // this.setState({
                    //     dsInstance: []
                    // })
                    console.log('Invalid or expired PIN ' + responseJson.err)
                    alert(responseJson.err)
                    //this.props.navigation.navigate('Login')
                }

            })
            .catch((error) => {
                alert("There is something wrong! " + error)
            });
        }
        else{
            alert('Select Repo First! ');
            console.log('Select Repo First!');
        }
    }



    componentWillMount() {
        this.getInstaKey();
    }

    onValueChangeInstance(value){
        if(value){
            this.setState({instance: value});
            this.getRepoID();
        }
        else if(value === ''){
            this.setState({instance: ''});
        }
    }

    onValueChangeRepoID(value){
        if(value){
            this.setState({repoID: value});
        }
        else if(value === ''){
            this.setState({repoID: ''});
        }
    }

    render() {
        let serviceInstance = this.state.dsInstance.map((item,key)=>{
            return <Picker.Item key={key} value={item.key} label={item.name}/>
        })
        let serviceRepoID = this.state.dsRepoID.map((item,key)=>{
            return <Picker.Item key={key} value={item.repoID} label={item.fmtID}/>
        })
        return (
            <ScrollView style={styles.container}>
                <ContainerView>
                    <TitleText> </TitleText>

                    {/* <Text>PIN:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.state.pin} /> */}
                    <Text>Instance:</Text>
                    <Picker
                        selectedValue={this.state.instance}
                        style={styles.picker}//{{ alignSelf: 'center', width: 250, height: 35, backgroundColor: '#92f3ef' }}
                        textStyle={styles.pickerText}//{{ backgroundColor: '#92f3ef' }}
                        //prompt="Choose Repo ID"
                        onValueChange={this.onValueChangeInstance.bind(this)}
                        //onValueChange= {(value) => {this.setState({approved: value})}}
                        cancel >

                        <Picker.Item key={0} label='Select Instance' value= ''/>
                        {serviceInstance}
                    </Picker>
                    <Text>Repo ID:</Text>
                    <Picker
                        selectedValue={this.state.repoID}
                        style={styles.picker}//{{ alignSelf: 'center', width: 250, height: 35, backgroundColor: '#92f3ef' }}
                        textStyle={styles.pickerText}//{{ backgroundColor: '#92f3ef' }}
                        //prompt="Choose Repo ID"
                        onValueChange={this.onValueChangeRepoID.bind(this)}
                        //onValueChange= {(value) => {this.setState({approved: value})}}
                        cancel >

                        <Picker.Item key={0} label='Select Repo' value= ''/>
                        {serviceRepoID}
                    </Picker>

                    <ButtonContainer>
                        <Button text="Get PIN" onPress={() => { this.getPin() }} />
                        {/* <Button text="Save" onPress={() => { this.prePacking() }} /> */}
                        <Button text="Back" onPress={() => { this.props.navigation.goBack() }} />
                    </ButtonContainer>
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
    textAreaContainer: { width: 260, borderColor: '#000000', borderWidth: 1, padding: 5, backgroundColor: '#fff', top: 10 },
    textArea: { height: 75, justifyContent: "center" },
    tableContainer: { flexDirection: 'row' },
    tableContent: { borderColor: '#000000', borderWidth: 1, width: 100, height: 40 },
    qrContainer: {
        width: 200, height: 200, justifyContent: "center", alignSelf: "center",
        borderColor: '#000000', borderWidth: 1
    },
});


const mapStateToProps = (state) => {
    return {
        token: state.reducerLogin.token,
    };
}
const mapDispatchToProps = (dispatch) => {
    return{
        prePacking: (token, pushKey,instance,repoID,pin) => {
            dispatch(prePacking(token, pushKey,instance,repoID,pin))
        }
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(PushCreatePINScreen);