import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput, } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Constants, Camera, Permissions, ImagePicker, FileSystem, ImageManipulator, takePictureAsync } from 'expo';
import { FormattedWrapper, FormattedMessage } from 'react-native-globalize';
import DatePicker from 'react-native-datepicker';
import { Picker } from 'react-native-picker-dropdown'; //picker to fix in ios
import QRCode from 'react-native-qrcode';
import { Button } from '../../components';
import ActionSheet from 'react-native-actionsheet';

import { AppCamera } from '../Camera';

import { connection } from '../../utils/constants';


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


class formRepoScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            token: '',
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <ContainerView>
                    <TittleText> </TittleText>
                    <Text>Instance:</Text>
                </ContainerView>
            </ScrollView>
        );
    }
}



const styles = StyleSheet.create({
    container: { flex: 1, },//paddingTop: Constants.statusBarHeight },
    inputText: { width: 260, backgroundColor: '#fff', marginBottom: 3 },
    picker: { alignSelf: 'center', width: 260, height: 40, backgroundColor: '#fff' },
    pickerText: { backgroundColor: '#fff' },
    textAreaContainer: { width: 260, borderColor: '#000000', borderWidth: 1, padding: 5, backgroundColor: '#fff' },
    textArea: { height: 75, justifyContent: "center" },
    textContainer: {
        width: 260, height: 200, justifyContent: "flex-start",
        borderColor: '#000000', borderWidth: 1
    },
    textViewContainer: { textAlignVertical: 'center', color: '#000', },
    qrContainer: {
        width: 200, height: 200, justifyContent: "center", alignSelf: "center",
        borderColor: '#000000', borderWidth: 1
    },
    tableContainer: { flexDirection: 'row' },
    //tableContent: { borderColor: '#003366', borderWidth: 1, width: 100, height: 40 },
    tableContent: { width: 100, height: 40, padding: 3, backgroundColor: 'lightgrey' },
    tableHeader: { backgroundColor: '#4d4dff', height: 40, color: '#f5f5f5' },
});

export default (connect)(formRepoScreen)