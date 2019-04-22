import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, } from 'react-native';
import styled from 'styled-components/native';
import { Constants } from 'expo';
import { Button } from '../components';
import { connect } from 'react-redux';
import { connection } from '../utils/constants';
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

class CheckInScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: "",
            NIK: "",
            mobileNo: "",
            instakey: "9999990140",
            dsInstance: [],
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <ContainerView>
                    <TitleText>Check In</TitleText>

                </ContainerView>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: Constants.statusBarHeight },
    inputText: { width: 260, backgroundColor: "#fff", marginBottom: 3 },
    picker: { alignSelf: 'center', width: 260, height: 40, backgroundColor: '#fff' },
    pickerText: { backgroundColor: '#fff' },
});



const mapStateToProps = (state) => {
    return {
        username: state.reducerLogin.username,
        mobile: state.reducerLogin.mobile,
        token: state.reducerLogin.token,
    };
}

export default connect(mapStateToProps)(CheckInScreen);