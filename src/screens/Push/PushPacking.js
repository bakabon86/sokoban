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

class PushPackingScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pushKey: '',
            passkey: '',
            instance: '',
            dsInstance: [],
            repoID: '',
            dsRepoID: [],
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
                    this.setState({
                        dsInstance: responseJson.data
                    });

                    this.getRepoID();

                }
                else {
                    this.setState({
                        dsInstance: []
                    })
                    console.log('Failed to get data instance')
                    alert(responseJson.err)
                    //this.props.navigation.navigate('Login')
                }

            })
            .catch((error) => {
                alert("There is something wrong! " + error)
            });
            
    }

    getRepoID() {
        var url = connection.SERVER + 'auth/repolist?token=' + this.props.token 
        console.log("URL=" + url);
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
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson.status === true) {
                    this.setState({
                        dsRepoID: responseJson.data
                    })
                }
                else {
                    console.log('token expired')
                    alert(responseJson.err)
                    
                }
            })
            .catch((error) => {
                alert("There is something wrong! " + error)
            })
    }

    Packing() {
        var url = connection.SERVER + 'push/Packing'
        //var url = 'http://192.168.33.48:5006/push/Packing'
        console.log("URL=" + url)
        var formData = new FormData();
        formData.append('token', this.props.token);
        formData.append('repoID', this.props.repoID);

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
                        alert("Push Packing has been Saved");
                        this.props.navigation.navigate('Home');
                    }
                    else {
                        console.log('Save Failed! ' + responseJson.err);
                        alert('Failed to Save Data! ' + responseJson.err);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert(error);
                })
       
       
    }

    Abort() {
        var url = connection.SERVER + 'push/AbortPacking'
        console.log("URL=" + url)
        
        var formData = new FormData();
        formData.append('token', this.props.token)
        formData.append('repoID', this.props.repoID)

        const config = {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'multipart/form-data'
            },
            body: formData
        };

        fetch(url,config)
        .then((response)=> response.json())
        .then((responseJson)=>{
            if(responseJson.status === true) {
                console.log("Abort Packing Success.");
                alert("Abort Packing Success");
            }
            else{
                console.log("Abort Packing Failed! " + responseJson.err);
                alert("Abort Packing Failed! " + responseJson.err);
            }
        })
        .catch((error)=>{
            console.log(error)
            alert("There is something wrong! " + error)
        })
        //this.props.navigation.navigate.goBack();
    }

    componentWillMount() {
        this.getInstaKey();
        
    }

    onValueChangeInstance(value) {
        this.setState({ instance: value })
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

    onValueChangeRepoID(value) {
        this.setState({ repoID: value })
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

        // let serviceInstance = this.state.dsInstance.map((item,key) =>{
        //     return <Picker.Item key={key} value={item.key} label={item.name} />
        // });

        let serviceRepoID = this.state.dsRepoID.map((item,key) =>{
            return <Picker.Item key={key} value={item.repoID} label={item.fmtID} />
        });

        return (
            <ScrollView style={styles.container}>
                <ContainerView>
                    <TitleText> </TitleText>
                    {/* <Text>Instance :</Text>
                    <Picker
                                selectedValue={this.props.instance}
                                style={styles.picker}//{{ alignSelf: 'center', width: 250, height: 35, backgroundColor: '#92f3ef' }}
                                textStyle={styles.pickerText}//{{ backgroundColor: '#92f3ef' }}
                                prompt="Choose Instance"
                                onValueChange={this.onValueChangeInstance.bind(this)}
                                //onValueChange= {(value) => {this.setState({approved: value})}}
                                cancel >
                                {serviceInstance}
                            </Picker>
                        */}
                    <Text>Repo ID:</Text> 
                    <TextInput style={styles.inputText} editable={false}
                            value={this.props.repoID} />
                    {/* {this.props.repoID != '' ?
                        (<TextInput style={styles.inputText}
                            value={this.props.repoID != '' ? this.props.repoID : ''} />)
                        : (
                            <Picker
                                selectedValue={this.props.repoID}
                                style={styles.picker}//{{ alignSelf: 'center', width: 250, height: 35, backgroundColor: '#92f3ef' }}
                                textStyle={styles.pickerText}//{{ backgroundColor: '#92f3ef' }}
                                prompt="Choose Repo ID"
                                onValueChange={this.onValueChangeRepoID.bind(this)}
                                //onValueChange= {(value) => {this.setState({approved: value})}}
                                cancel >
                                {serviceRepoID}
                            </Picker>
                        )
                    } */}

                    {/*
                    {this.state.approved === false ? (
                        <View style={styles.textAreaContainer}>
                            <Text>Reason for Rejection:</Text>
                            <TextInput
                                style={styles.textArea}
                                multiline={true}
                                numberOfLines={4}
                                onChangeText={(reason) => this.setState({ reason: reason })}
                                value={this.state.reason}
                            />
                        </View>) : null
                    } */}
                    <ButtonContainer>
                        <Button text="Packing" onPress={() => { this.Packing() }} />
                        {/* <Button text="Abort" onPress={() => { this.Abort() }} /> */}
                        <Button text="Cancel" onPress={() => { this.props.navigation.navigate('PushPackingList') }} />
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
});


const mapStateToProps = (state) => {
    return {
        token: state.reducerLogin.token,
        pushKey: state.reducerPush.pushKey,       
        passkey: state.reducerPush.passkey,
        instance: state.reducerPush.instance,
        repoID: state.reducerPush.repoID
    };
}
export default connect(mapStateToProps)(PushPackingScreen);