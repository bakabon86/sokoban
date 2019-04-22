import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, FlatList, } from 'react-native';
import styled from 'styled-components/native';
import { Constants } from 'expo';
import { Button } from '../../components';
import { connect } from 'react-redux';
import { connection } from '../../utils/constants';
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

class PushDisposeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pushKey: '',
            accepted: '',
            reason: '',
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
                    console.log('token expired')
                    alert("Token expired, Please Login again!")
                    this.props.navigation.navigate('Login')
                }

            })
            .catch((error) => {
                console.log(error);
                alert("There is something wrong! " + error)
            });

    }

    Dispose() {
        var url = connection.SERVER + 'push/Dispose'
        //var url = 'http://192.168.33.48:5005/push/Cancel'
        console.log("URL=" + url)
        var formData = new FormData();
        formData.append('token', this.props.token);
        formData.append('repoID', this.props.repoID);
        // formData.append('accepted', this.state.approved);
        formData.append('reason', this.state.reason);

        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },

            body: formData
        };

        console.log('formData=' + formData)
       
            fetch(url, config)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.status === true) {
                        console.log('Data has been Saved.');
                        alert("Push Dispose has been Saved");
                        this.props.navigation.navigate('PushDisposableList');
                    }
                    else {
                        console.log('Save Failed!' + responseJson.err);
                        alert('Failed to Save Data! ' + responseJson.err);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert(error);
                    this.props.navigation.navigate('PushDisposableList');
                })        
    }

    componentWillMount() {
        this.getInstaKey();
    }

    onValueChangeApprove(value) {
        this.setState({ approved: value })
        // if (value === false) {
        //     return (
        //         <View style={styles.textAreaContainer}>
        //             <Text>Reason for Rejection:</Text>
        //             <TextInput
        //                 style={styles.textArea}
        //                 multiline={true}
        //                 numberOfLines={4}
        //                 onChangeText={(reason) => this.setState({ reason: reason })}
        //                 value={this.state.reason}
        //             />
        //         </View>
        //     );
        //}

    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <ContainerView>
                    <TitleText> </TitleText>
                    {/* <Text>Key:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.props.pushKey} /> */}
                    <Text style={styles.labelText}>Instance :</Text>
                    <TextInput style={styles.labelDefaultText} editable={false}
                        multiline={true}
                        value={this.props.instance} />
                    {/* <Text>Repo ID:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.props.repoID} /> */}
                    <Text style={styles.labelText}>Repo ID :</Text>
                    <TextInput style={styles.labelDefaultText} editable={false}
                        value={this.props.fmtID} />
                    <Text style={styles.labelText}>Last Transaction :</Text>
                    <TextInput style={styles.labelDefaultText} editable={false}
                        value={this.props.lastTrx} />
                    <Text style={styles.labelText}>Last State :</Text>
                    <TextInput style={styles.labelDefaultText} editable={false}
                        value={this.props.lastState} />
                    
                    <View style={styles.textAreaContainer}>
                        <Text style={styles.labelText}>Reason for Dispose :</Text>
                        <TextInput
                            style={styles.textArea}
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(reason) => this.setState({ reason: reason })}
                            value={this.state.reason}
                        />
                    </View>
                    <ButtonContainer>
                        <Button text="Save Dispose" onPress={() => { this.Dispose() }} />
                        <Button text="Cancel" onPress={() => { this.props.navigation.navigate('PushDisposableList') }} />
                    </ButtonContainer>
                </ContainerView>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: { flex: 1, },//paddingTop: Constants.statusBarHeight, marginBottom: 3 },
    labelText: {color: '#000099'},
    labelDefaultText: {width: 260, backgroundColor: '#b8fcf9', color: '#000099', maxHeight: 80, },
    inputText: { width: 260, backgroundColor: '#fff', marginBottom: 3 },
    picker: { alignSelf: 'center', width: 260, height: 40, backgroundColor: '#fff' },
    pickerText: { backgroundColor: '#fff' },
    textAreaContainer: { width: 260, borderColor: '#000000', borderWidth: 1, padding: 5, backgroundColor: '#fff', top: 10 },
    textArea: { height: 75, justifyContent: "center" },
    tableContainer: { flexDirection: 'row' },
    tableContent: { borderColor: '#000000', borderWidth: 1, width: 100, height: 40 },
});


const mapStateToProps = (state) => {
    return {

        token: state.reducerLogin.token,
        pushKey: state.reducerPush.key,
        instance: state.reducerPush.instance,
        fmtID: state.reducerPush.fmtID,
        lastTrx: state.reducerPush.lastTrx,
        lastState: state.reducerPush.lastState,
    };
}
export default connect(mapStateToProps)(PushDisposeScreen);