import React, { Component } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { FormattedWrapper, FormattedMessage } from 'react-native-globalize';
import { logout } from '../actions/login';
import { Button } from '../components';
import messages from '../Messages';

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

const TitleText = styled.Text`
  fontSize: 30;
  color: ${props => props.theme.WHITE};
`;

const ButtonContainer = styled.View`
  top: 20;
  flex: 1;
  margin :10px;
`
class LogoutScreen extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount = async () => {
    const { onLogout } = this.props;
    console.log('ClearAll');
    //this.doLogout();
    await onLogout();
    //this.checkToken();
    //BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentDidMount() {
    const { onLogout } = this.props;
    console.log('ClearAll');
    onLogout();
    //this.doLogout();
   // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }


  handleBackButton() {
    // ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  }

  checkToken() {
    var url = 'http://10.10.1.80:5000/asset/CheckToken?token=' + this.props.token +
      '&mobile=' + this.props.mobile
    console.log("URL=" + url)
    return fetch(url)
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

        }
        else {
          console.log('token expired')
          this.props.navigation.navigate('Login')
        }
      });
  }

  doLogout() {
    var url = 'http://10.10.1.80:5000/asset/Logout?token=' + this.props.token
    console.log("URL=" + url)
    return fetch(url)
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

          this.props.navigation.navigate('Login')
        }
        else {
          console.log('token expired')
          this.props.navigation.navigate('Login')
        }
      });
  }

  _handleBacktoLogin() {
    const { onLogout } = this.props;
    //this.doLogout();
    onLogout();
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.container}>
        <ContainerView>
          <TitleText>
            You've Been Logout
            </TitleText>
          <ButtonContainer>
            <Button text="Back to Login" onPress={() => this._handleBacktoLogin()} />
            <Button text="Exit" onPress={() => BackHandler.exitApp()} />
          </ButtonContainer>
        </ContainerView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Constants.statusBarHeight },
  inputText: { width: 260, backgroundColor: '#fff', marginBottom: 3 },
});

const mapStatetoProps = (state) => {
  return {
    token: state.reducerLogin.token,
    mobile: state.reducerLogin.mobile,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => { dispatch(logout()); },
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(LogoutScreen);
