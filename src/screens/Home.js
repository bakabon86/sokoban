import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { connection } from '../utils/constants';

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

// const TitleText = styled.Text`
//   fontSize: 30;
//   color: ${props => props.theme.WHITE};
// `;


const TitleText = styled.Text`
  fontSize: 30;
  color: #000099;
`;


class HomeScreen extends Component {

  checkToken() {
    // var url = 'http://10.10.1.80:5000/asset/CheckToken?token=' + this.props.token +
    //   '&mobile=' + this.props.mobile
    var url = connection.SERVER + 'CheckToken?token=' + this.props.token +
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
          alert("Token expired, Please Login again!")
          this.props.navigation.navigate('Login')
        }
      });
  }

  componentDidMount() {
    //this.checkToken();
  }
  render() {
    return (
      <ContainerView>
        <TitleText>Home</TitleText>
      </ContainerView>
    );
  }
}


const mapStateToProps = ( state ) => {
  return {   
    username: state.reducerLogin.username,
    mobile: state.reducerLogin.mobile,
    token: state.reducerLogin.token,
  };
}

export default connect(mapStateToProps)(HomeScreen);
