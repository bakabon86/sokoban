import React, { Component } from 'react';
import { View, TextInput, StyleSheet,TouchableOpacity,Text } from 'react-native';
import { connect } from 'react-redux';
import { colors,connection } from '../utils/constants';
import styled from 'styled-components/native';
import { Constants } from 'expo';
import { FormattedWrapper, FormattedMessage } from 'react-native-globalize';
import { login,signup } from '../actions/login';
import { Button } from '../components';
import messages from '../Messages';

const ContainerView = styled.View`
  flex: 1;  
  alignItems: center;
`;

const TitleText = styled.Text`
  fontSize: 30;
  color: #000099;
`;
// color: ${props => props.theme.WHITE};
const ButtonContainer = styled.View`
  top: 60;
  margin :10px;
`
class LoginScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            userName: '',
            password: '',
            mobile: true,
        }
    }
    checkUser(){
        const { onLogin } = this.props;
        // var url = 'http://10.10.1.80:5005/auth/login?username=' + this.state.userName +
        //   '&password=' + this.state.password + '&mobile=' + this.state.mobile
        var url = connection.SERVER + 'auth/login?username=' + this.state.userName +
              '&password=' + this.state.password + '&mobile=' + this.state.mobile
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
              console.log('berhasil')    
              this.setState({
                token: responseJson.data,
              })
              onLogin(this.state.userName, this.state.password, this.state.mobile ,this.state.token);
              
              this.props.navigation.navigate('Home')
            }
            else {
              console.log('user not found')
              alert("User Name or Password Incorrect!")
            }
          })
          .catch((error) => {
                alert("There is something wrong! " + error)
            });
    }

    registerNewUser(){
      // const { onSignUp } = this.props;
      // onSignUp(this.state.userName,this.state.password, this.state.mobile);
      this.props.navigation.navigate('FormSignUp');
    }

    render() {
        return (
            <View style={styles.container}>
                <ContainerView>
                    <TitleText>
                        Login
                    </TitleText>
                    <TextInput style={styles.inputText} placeholder="User Name"
                        onChangeText={(userName) => this.setState({ userName })} />
                    <TextInput style={styles.inputText} placeholder="Password" secureTextEntry={true}
                        onChangeText={(password) => this.setState({ password })} />
                    <ButtonContainer>
                        <Button text="Login" onPress={() => this.checkUser()} />
                    </ButtonContainer>
                    {/* <TouchableOpacity style={styles.btnText} onPress={()=>{this.props.navigation.navigate('FormSignUp')}}>
                        <Text style={{color: '#a020f0',}}>Sign Up</Text>
                    </TouchableOpacity> */}
                </ContainerView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: Constants.statusBarHeight },
    inputText: { width: 260, backgroundColor: "#fff", marginBottom: 3 },
    btnText: {  paddingTop: 50, borderRadius: 5,margin: 5 },
});

const mapDispatchToProps = (dispatch) => {
    return {
      onLogin: (username, password, mobile, token) => { dispatch(login(username, password, mobile, token)); },
      onSignUp: (username, password, mobile) => { dispatch(signup(username, password, mobile)); },
      //onGetUserInfo: (token, status, nik, nama, idxuser, picture) => { dispatch(getuserinfo(token, status, nik, nama, idxuser, picture)); },
    }
  }

export default connect(null, mapDispatchToProps)(LoginScreen);