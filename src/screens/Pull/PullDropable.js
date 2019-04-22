import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, FlatList, } from 'react-native';
import styled from 'styled-components/native';
import { Constants } from 'expo';
import { Button } from '../../components';
import { connect } from 'react-redux';
import { connection } from '../../utils/constants';
import { Picker } from 'react-native-picker-dropdown'; //picker to fix in ios
import { dropPull,dropInit } from '../../actions/pull';
import { sealedPush } from '../../actions/push';

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

class PullDropableScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
           secretKey: '',
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
                alert("There is something wrong! " + error)
            });

    }

    Drop() {
        var url = connection.SERVER + 'pull/drop/init'
        //var url = 'http://192.168.23.105:5005/pull/drop/init'
        console.log("URL=" + url)
        var formData = new FormData();
        formData.append('token', this.props.token);
        formData.append('pullkey', this.props.pullKey);

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
                        // console.log('Data has been Saved.');
                        // alert("Push has been Sealed");
                        this.setState({ secretKey: responseJson.key });
                        this.props.dropInit(this.props.token, this.props.pullKey ,this.state.secretKey,'drop')
                        if(responseJson.skip === true){
                            this.DropProcess();
                        }
                        else{
                            this.props.navigation.navigate("TwoWayVerificationInitiator");
                        }
                        
                    }
                    else {
                        console.log('Save Failed!' + responseJson.err);
                        alert('Failed to Save Data! ' + responseJson.err);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert(error);
                })       
    }

    componentWillMount() {
        this.getInstaKey();
    }

    onValueChangeApprove(value) {
        this.setState({ key1: '',
                        key2: ''
                    })
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

    //pull
    DropProcess(){ 
        var url = connection.SERVER + 'pull/drop'
        console.log("URL=" + url)
        var formData = new FormData();
        formData.append('secretkey', this.state.secretKey);

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
                    // console.log('Data has been Saved.');
                    // alert("Push has been Sealed");
                    this.setState({ secretKey: responseJson.key });
                    // this.props.sealedPush(this.props.token, this.state.secretKey)
                    // this.props.navigation.navigate("TwoWayVerificationInitiator");
                    this.props.navigation.navigate("BeginVerification");
                }
                else {
                    console.log('Save Failed!' + responseJson.err);
                    alert('Failed to Save Data! ' + responseJson.err);
                }
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            })
    }
   

    render() {
        return (
            <ScrollView style={styles.container}>
                <ContainerView>
                    <TitleText> </TitleText>
                    {/* <Text>PushKey:</Text>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.props.pushKey} /> */}
                    <Text style={styles.labelText}>Number :</Text>
                    <TextInput style={styles.labelDefaultText} editable={false}
                        value={this.props.number} />
                    <Text style={styles.labelText}>Trx Type :</Text>
                    <TextInput style={styles.labelDefaultText} editable={false}
                        value={this.props.trxtype} />
                    <Text style={styles.labelText}>Instance :</Text>
                    <TextInput style={styles.labelDefaultText} editable={false}
                        multiline={true}
                        value={this.props.instance} />
                    <Text style={styles.labelText}>Repo Count :</Text>
                    <TextInput style={styles.labelDefaultText} editable={false}
                        value={this.props.repocount.toString()} />  
                    <Text style={styles.labelText}>Requested :</Text>
                    <TextInput style={styles.labelDefaultText} editable={false}
                        value={this.props.requested} />  
                    <Text style={styles.labelText}>Requested By :</Text>
                    <TextInput style={styles.labelDefaultText} editable={false}
                        value={this.props.requestedby} />  
                    <Text style={styles.labelText}>Requested By NIK :</Text>
                    <TextInput style={styles.labelDefaultText} editable={false}
                        value={this.props.requestedbyNIK} /> 
                     <Text style={styles.labelText}>Approved :</Text>
                    <TextInput style={styles.labelDefaultText} editable={false}
                        value={this.props.approved} />  
                    <Text style={styles.labelText}>Approved By :</Text>
                    <TextInput style={styles.labelDefaultText} editable={false}
                        value={this.props.approvedby} />  
                    <Text style={styles.labelText}>Approved By NIK :</Text>
                    <TextInput style={styles.labelDefaultText} editable={false}
                        value={this.props.approvedbyNIK} />  
                     <Text style={styles.labelText}>Accepted :</Text>
                    <TextInput style={styles.labelDefaultText} editable={false}
                        value={this.props.accepted} />  
                    <Text style={styles.labelText}>Accepted By :</Text>
                    <TextInput style={styles.labelDefaultText} editable={false}
                        value={this.props.acceptedby} />  
                    <Text style={styles.labelText}>Accepted By NIK :</Text>
                    <TextInput style={styles.labelDefaultText} editable={false}
                        value={this.props.acceptedbyNIK} /> 
                    {/* <Text>Approved:</Text>
                    <Picker
                        selectedValue={this.state.approved}
                        style={styles.picker}//{{ alignSelf: 'center', width: 250, height: 35, backgroundColor: '#92f3ef' }}
                        textStyle={styles.pickerText}//{{ backgroundColor: '#92f3ef' }}
                        prompt="Choose Approval"
                        onValueChange={this.onValueChangeApprove.bind(this)}
                        //onValueChange= {(value) => {this.setState({approved: value})}}
                        cancel >
                        <Picker.Item label="Choose Approval" value='' />
                        <Picker.Item label="Approved" value={true} />
                        <Picker.Item label="Rejected" value={false} />
                    </Picker>

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
                        <Button text="Drop" onPress={() => { this.Drop() }} />
                        <Button text="Cancel" onPress={() => { this.props.navigation.navigate('PullDropableList') }} />
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
        username: state.reducerLogin.username,
        mobile: state.reducerLogin.mobile,
        token: state.reducerLogin.token, 
        pullKey: state.reducerPull.key,               
        number: state.reducerPull.number,
        trxtype: state.reducerPull.trxtype,
        instance: state.reducerPull.instance,
        repocount: state.reducerPull.repocount,
        requested: state.reducerPull.requested,
        requestedby: state.reducerPull.requestedby,
        requestedbyNIK: state.reducerPull.requestedbyNIK,
        approved: state.reducerPull.approved,
        approvedby: state.reducerPull.approvedby,
        approvedbyNIK: state.reducerPull.approvedbyNIK,
        accepted: state.reducerPull.accepted,
        acceptedby: state.reducerPull.acceptedby,
        acceptedbyNIK: state.reducerPull.acceptedbyNIK
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dropPull: (token, key, number, trxtype, instance, repocount, requested,requestedby,requestedbyNIK,approved,approvedby,approvedbyNIK,accepted,acceptedby,acceptedbyNIK) => {
            dispatch(dropPull(token, key, number, trxtype, instance, repocount, requested,requestedby,requestedbyNIK,approved,approvedby,approvedbyNIK,accepted,acceptedby,acceptedbyNIK))
        },
        dropInit: (token,key,secretKey,step) =>{
            dispatch(dropInit(token,key,secretKey,step))
        },
        sealedPush: (token,secretKey,step) => {
            dispatch(sealedPush(token,secretKey,step))
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(PullDropableScreen);