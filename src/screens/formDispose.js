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

class DisposeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            instakey: "9999990140",
            dsInstance: [],
        }
    }

    getInstaKey() {
        var url = connection.SERVER + 'master/instance/list/strict?token=' + this.props.token 
        console.log("URL=" + url)
        fetch(url)
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
                    //let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                    this.setState({
                        dsInstance: responseJson.data
                    });

                }
                else {
                    this.setState({
                        dsInstance: []
                    })
                    console.log('token expired')
                    alert("Token expired, Please Login again!")
                    this.props.navigation.navigate('Login')
                }

            });

    }

    componentWillMount(){
        this.getInstaKey();
    }

    render() {
        
        let serviceInstance = this.state.dsInstance.map((item, key) => {
            return <Picker.Item key={key} value={item.key} label={item.name} />
        });

        return (
            <ScrollView style={styles.container}>
                <ContainerView>
                    <TitleText>Dispose</TitleText>
                    <Text>Instance</Text>
                    <Picker
                        selectedValue={this.state.instakey.toString()}
                        onValueChange={(srvcinstance) => {
                            this.setState({ instakey: srvcinstance })
                        }}
                        //onValueChange={this.onValueChange.bind(this)}
                        prompt="Choose Instance"
                        style={styles.picker}
                        textStyle={styles.pickerText}
                        cancel
                    >
                        {serviceInstance}
                    </Picker>
                    <Text>Push Number</Text>
                    <Picker 
                        prompt="Choose Push Number"
                        style={styles.picker}
                        textStyle={styles.pickerText}
                        cancel
                    >
                        {serviceInstance}
                    </Picker>
                    <ButtonContainer>
                        <Button text="Submit" onPress={() => this.dispose()} />
                        <Button text="Cancel" onPress={() => this.cancelDispose()} />
                    </ButtonContainer>
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

export default connect(mapStateToProps)(DisposeScreen);