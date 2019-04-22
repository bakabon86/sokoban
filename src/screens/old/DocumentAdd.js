import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, FlatList, } from 'react-native';
import styled from 'styled-components/native';
import { Constants, DocumentPicker } from 'expo';
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

class PushDocumentAddScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: this.props.token,
            repoID: this.props.repoID,
            dsRepoID: [],
            doctype: '',
            doctitle: '',
            metadata: [],
            dockey: this.props.dockey,
            boxID: this.props.boxID ? this.props.boxID : '',
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
        fetch(url, config)
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

                    this.getRepoID();                   

                }
                else {
                    // this.setState({
                    //     dsInstance: []
                    // })
                    console.log('Failed to get data instance')
                    alert(responseJson.err)
                    this.props.navigation.navigate('Login')
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
        fetch(url, config)
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
                    console.log('Repo Data could not be found')
                    alert(responseJson.err)

                }
            })
            .catch((error) => {
                alert("There is something wrong! " + error)
            })
    }

    getMetaData() {
        var url = connection.SERVER + 'push/manifest?token=' + this.props.token +
            '&repoID=' + this.state.repoID
        console.log("URL=" + url);
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };
        fetch(url, config)
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
                        metadata: responseJson.data
                    })
                }
                else {
                    console.log('Meta Data could not be found')
                    alert(responseJson.err)

                }
            })
            .catch((error) => {
                alert("There is something wrong! " + error)
            })
    }

    addDocument() {
        var url = connection.SERVER + 'push/AddDoc'
        //var url = 'http://192.168.33.48:5006/push/AddDoc'
        console.log("URL=" + url)

        var met = JSON.stringify(this.state.myObj)
        //console.log(met);
        var ta = JSON.parse(met)
        //console.log(ta);
        console.log('Token=' + this.props.token)
        console.log('RepoId=' + this.state.repoID)
        console.log('doctype=' + this.state.doctype)
        console.log('doctittle=' + this.state.doctitle)
        console.log('metadata=' + this.state.myObj)
        console.log('strmetadata=' + met)

        var formData = new FormData();
        formData.append('token', this.props.token);
        formData.append('repoID', this.state.repoID);
        formData.append('doctype', this.state.doctype);
        formData.append('doctitle', this.state.doctitle);
        formData.append('metadata', this.state.myObj);
        formData.append('strmetadata', met);

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
                    console.log('Data has been Added.');
                    alert("Push Document has been Added");
                    //this.props.navigation.goBack();
                }
                else {
                    console.log('Add Document Failed! ' + responseJson.err);
                    alert('Failed to Add Document! ' + responseJson.err);
                }
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            })


    }

    editDocument() {
        var url = connection.SERVER + 'push/ModDoc'
        console.log("URL=" + url)

        var met = JSON.stringify(this.state.myObj)
        var ta = JSON.parse(met)

        var formData = new FormData();
        formData.append('token', this.props.token)
        formData.append('dockey', this.state.dockey)
        formData.append('doctype', this.state.doctype);
        formData.append('doctitle', this.state.doctitle);
        formData.append('metadata', this.state.metadata);
        formData.append('strmetadata', met);

        const config = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        };

        fetch(url, config)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === true) {
                    console.log("Edit Document Success.");
                    alert("Edit Document Success");
                }
                else {
                    console.log("Edit Document Failed! " + responseJson.err);
                    alert("Edit Document Failed! " + responseJson.err);
                }
            })
            .catch((error) => {
                console.log(error)
                alert("There is something wrong! " + error)
            })
        //this.props.navigation.navigate.goBack();
    }

    deleteDocument() {
        var url = connection.SERVER + 'push/DelDoc'
        console.log("URL=" + url)

        var formData = new FormData();
        formData.append('token', this.props.token)
        formData.append('dockey', this.state.dockey)


        const config = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        };

        fetch(url, config)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === true) {
                    console.log("Delete Document Success.");
                    alert("Delete Document Success");
                }
                else {
                    console.log("Delete Document Failed! " + responseJson.err);
                    alert("Delete Document Failed! " + responseJson.err);
                }
            })
            .catch((error) => {
                console.log(error)
                alert("There is something wrong! " + error)
            })
        //this.props.navigation.navigate.goBack();
    }

    verifyDocument() {
        var url = connection.SERVER + 'push/VerifyDoc'
        console.log("URL=" + url)

        var formData = new FormData();
        formData.append('token', this.props.token)
        formData.append('dockey', this.state.dockey)
        formData.append('boxID', this.state.boxID)

        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        };

        fetch(url, config)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === true) {
                    console.log("Verify Document Success.");
                    alert("Verify Document Success");
                    this.props.navigation.navigate("PushManifested");
                }
                else {
                    console.log("Verify Document Failed! " + responseJson.err);
                    alert("Verify Document Failed! " + responseJson.err);
                }
            })
            .catch((error) => {
                console.log(error)
                alert("There is something wrong! " + error)
            })
        //this.props.navigation.navigate.goBack();
    }

    componentWillMount() {
        this.getInstaKey();

    }

    componentWillUnmount(){
        this.setState({ metadata:[], })
    }
    // onValueChangeInstance(value) {
    //     this.setState({ instance: value })
    // }

    onValueChangeRepoID(value) {
        this.setState({ repoID: value, })
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
    bindDataTable(){
        this.setState({ metadata: [] })
        this.getMetaData()
    }

    _pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        alert(result.uri);
        console.log(result);
        this.setState({ metadata: result });
    }

    addKey() {
        // this.setState({ index: this.state.index + 1 });
        // console.log(this.state.index);
        return (

            <View>
                <Text>Key:</Text>
                <TextInput style={styles.inputText} onChangeText={(text) => { this.setState({ myObj: 'key:' + text }) }}
                />
                <Text>Value:</Text>
                <TextInput style={styles.inputText} onChangeText={(text) => { this.setState({ myObj: 'value:' + text }) }}
                />
            </View>
        );
    }

    // addTextInput = (key) => {
    //     let textInput = this.state.textInput;
    //     // textInput.push(<TextInput key={key}
    //     //     style={styles.inputText} onChangeText={(text) => { this.setState({ myObjKey: 'key:' + text }) }}
    //     // />);
    //     textInput.push(
    //         <View key={key}>
    //             <Text>Key:</Text>
    //             {/* <TextInput style={styles.inputText} onChangeText={(text) => { this.setState({ myObj: [...this.state.myObj, 'key:' + text] }) }}
    //             />                 */}
    //             <TextInput style={styles.inputText} onChangeText={(text) => { this.setState({ myObj: this.state.myObj.concat(['key:' + text]) }) }}
    //             />
    //             <Text>Value:</Text>
    //             <TextInput style={styles.inputText} onChangeText={(text) => { this.setState({ myObj: [...this.state.myObj, 'value:' + text] }) }}
    //             />
    //             {/* <TextInput style={styles.inputText} onChangeText={(text) => { this.setState({ myObjValue: this.state.myObjValue.concat(['value:' + text]) }) }}
    //             />  */}
    //         </View>);
    //     this.setState({ textInput })

    // }
    addTextInput = (index) => {
        let textInput = this.state.textInput;

        textInput.push(
            <View key={index}>
                <Text>Key:</Text>
                {/* <TextInput style={styles.inputText} onChangeText={(text) => {
                    const updatedArray = [...this.state.myObj];
                    updatedArray[index] = "key:" + text;
                    this.setState({
                         myObj: updatedArray,
                     });
                 }}
                /> */}
                <TextInput style={styles.inputText} onChangeText={(text) => {
                    this.setState({ holderKey: text })
                }}
                    onEndEditing={() => { this.pushToArray(index) }} />
                <Text>Value:</Text>
                {/* <TextInput style={styles.inputText} onChangeText={(text) => {
                     const updatedArray = [...this.state.myObj];
                     updatedArray[index] = "value:" + text;
                     this.setState({
                          myObj: updatedArray,
                      });
                }}
                />                 */}
                <TextInput style={styles.inputText} onChangeText={(text) => {
                    this.setState({ holderValue: text })
                }}
                    onEndEditing={() => { this.pushToArray(index) }} />
            </View>);
        this.setState({ textInput })


    }

    pushToArray(index) {
        const updatedArray = [...this.state.myObj];
        //updatedArray[index] = "key:" + this.state.holderKey + " value:" + this.state.holderValue;
        updatedArray[index] = { ...updatedArray[index], key: this.state.holderKey, value: this.state.holderValue }

        this.setState({
            myObj: updatedArray,
        });
    }

    removeTextInput = (key) => {
        let textInput = this.state.textInput;
        //textInput.push(<TextInput key={key} />);
        textInput.pop(
            <View key={key}>
                <Text>Key:</Text>
                <TextInput style={styles.inputText} onChangeText={(text) => { this.setState({ myObj: [...this.state.myObj, text] }) }}
                    onEndEditing={() => { this.pushToArray(index) }}
                />
                <Text>Value:</Text>
                <TextInput style={styles.inputText} onChangeText={(text) => { this.setState({ myObj: [...this.state.myObj, text] }) }}
                    onEndEditing={() => { this.pushToArray(index) }}
                />
            </View>);
        this.setState({ textInput })

        // let obj = this.state.myObj;
        // obj.pop()
        // this.setState({ myObj: obj })
        let objArray = [...this.state.myObj];
        objArray.pop()
        this.setState({ myObj: objArray })
    }

    render() {

        // let serviceInstance = this.state.dsInstance.map((item,key) =>{
        //     return <Picker.Item key={key} value={item.key} label={item.name} />
        // });

        let serviceRepoID = this.state.dsRepoID.map((item, key) => {
            return <Picker.Item key={key} value={item.repoID} label={item.fmtID} />
        });

        return (
            <ScrollView style={styles.container}>
                <ContainerView>
                    <TitleText> </TitleText>
                    <Text>Repo ID:</Text>
                    <Picker
                        selectedValue={this.state.repoID}
                        style={styles.picker}//{{ alignSelf: 'center', width: 250, height: 35, backgroundColor: '#92f3ef' }}
                        textStyle={styles.pickerText}//{{ backgroundColor: '#92f3ef' }}
                        prompt="Choose Repo ID"
                        onValueChange={this.onValueChangeRepoID.bind(this)}
                        //onValueChange= {(value) => {this.setState({approved: value})}}
                        cancel >
                        <Picker.Item value={''} label={'==Select Repo=='} />
                        {serviceRepoID}
                    </Picker>
                    <Text>Document Type:</Text>
                    <TextInput style={styles.inputText} onChangeText={(tipe) => { this.setState({ doctype: tipe }) }}
                        value={this.props.doctype} />
                    <Text>Document Title:</Text>
                    <TextInput style={styles.inputText} onChangeText={(title) => { this.setState({ doctitle: title }) }}
                        value={this.props.doctitle} />
                    {/* <Text>Document Key:</Text>
                    <TextInput style={styles.inputText} onChangeText={(dokey) => { this.setState({ dockey: dokey }) }}
                        value={this.props.dockey} /> */}

                    {/* <ButtonContainer>
                        <Button text="Get Metadata" onPress={()=>{ this.bindDataTable() }} />
                    </ButtonContainer>
                    <Text>Metadata:</Text>
                    <FlatList data={this.state.metadata}
                        renderItem={({item})=>{
                            <Text>{item.metadata}</Text>
                        }}
                    /> */}
                    {/* <Button text='+' onPress={() => this.addTextInput(this.state.textInput.length)} />
                    {this.state.textInput.map((value, index) => {
                        return value
                    })}
                    <Button text='-' onPress={() => this.removeTextInput(this.state.textInput.length)} />

                    <Button text="Submit" onPress={() => { 
                        // this.pushToArray(this.state.textInput.length);
                        console.log(this.state.myObj)
                        } } /> */}
                    <Text>Box ID:</Text>
                    <TextInput style={styles.inputText} onChangeText={(text) => { this.setState({ boxID: text }) }}
                        value={this.state.boxID}
                    />
                    {/*  <Text>Value:</Text>
                    <TextInput style={styles.inputText} onChangeText={(text)=>{this.setState({ myObj: text })}}
                        /> */}


                    {/* <Button text="Select Document" onPress={() => { this._pickDocument() }} /> */}
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
                        {/* <Button text="Add Key" onPress={() => { this.addKey() }} /> */}
                        {/* <Button text="Add Document" onPress={() => { this.addDocument() }} />
                        <Button text="Modify Document" onPress={() => { this.editDocument() }} />*/}
                        <Button text="Delete Document" onPress={() => { this.deleteDocument() }} /> 
                        <Button text="Verify Document" onPress={() => { this.verifyDocument() }} />
                        {/* <Button text="Abort" onPress={() => { this.Abort() }} /> */}
                        <Button text="Cancel" onPress={() => { this.props.navigation.goBack() }} />
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
        repoID: state.reducerPush.repoID,
        doctitle: state.reducerPush.doctitle,
        doctype: state.reducerPush.doctype,
        dockey: state.reducerPush.dockey,
        boxID: state.reducerPush.boxID
    };
}
export default connect(mapStateToProps)(PushDocumentAddScreen);