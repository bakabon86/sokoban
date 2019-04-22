import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Constants, ImagePicker } from 'expo';
import { Button } from '../components';
import ActionSheet from 'react-native-actionsheet';


const ContainerView = styled.View`
  flex: 1;  
  alignItems: center;
`;

const TitleText = styled.Text`
  fontSize: 30;
  color: ${props => props.theme.WHITE};
`;

const ButtonContainer = styled.View`
  top: 10;
  flex: 1;
  margin :10px;
`

const ActionSheetoptions = [
    'Cancel',
    'Take Photo...',
    'Choose from Library...'
]

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

class PaymentEvidenceScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            foto: 'null',
            fileUrl: './assets/icons/loading.png',
            fileName: '',
            width: imageWidth,
            height: imageHeight,
        }
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

                    this._getBayarPicture(this.props.pembayarankey)
                }
                else {
                    console.log('token expired')
                    alert("Token expired, Please Login again!")
                    this.props.navigation.navigate('Login')
                }
            });
    }

    _getBayarPicture(index) {
        var url = 'http://10.10.1.80:5000/asset/GetBayarPicture?token=' + this.props.token +
            '&key=' + index//key
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
                    this.setState({
                        foto: responseJson.data
                    })
                    this.imageSetup();
                }
                // else {
                //     console.log('Picture data could not be found')
                //     alert("Data not Found!, Please Retry!")
                //     this.props.navigation.goBack();
                // }
            });
    }

    _setBayarPicture() {
        // var url = 'http://10.10.1.80:5000/asset/SetBayarPicture?token=' + this.props.token +
        //     '&key=' + this.props.pembayarankey + '&picture=' + this.state.foto
        var url = 'http://10.10.1.80:5000/asset/SetBayarPicture'
        //var url = 'http://192.168.33.39:5000/asset/SetBayarPicture'
        console.log("URL=" + url)

        var formData = new FormData();
        formData.append('token', this.props.token);
        formData.append('key', this.props.pembayarankey);
        formData.append('picture', this.state.foto);

        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }
        fetch(url, config)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === true) {
                    console.log('Picture has been Changed.')
                    alert("Picture has been Changed.")
                    this.props.navigation.goBack();
                }
                else {
                    console.log('Picture data could not be changed' + responseJson.err)
                    alert("Picture could not be Changed!" + responseJson.err)

                }
            })
            .catch((error) => {
                console.error(error);
                alert("Error!" + error);
            });
    }
    componentDidMount() {
        //this.checkToken();
       
    }

    imageSetup(){
        const encodedData = this.state.foto ? this.state.foto : this.props.fotofromcamera;
        var myUri = `data:image/png;base64,${encodedData}`
        Image.getSize(myUri, (width, height) => {this.setState({width, height})},
        () => {this.setState({ width: '100%', height: 200 })});
        console.log('width:'+this.state.width +'height:'+this.state.height);
    }

    componentWillReceiveProps(){
        
        const encodedData = this.state.foto ? this.state.foto : this.props.fotofromcamera;
        var myUri = `data:image/png;base64,${encodedData}`
        Image.getSize(myUri, (width, height) => {this.setState({width, height})},
        () => {this.setState({ width: '100%', height: 200 })});
        console.log('width:'+this.state.width +'height:'+this.state.height);
    }

    _onOpenActionSheet = () => {
        this.ActionSheet.show()
    }
    handleActionSheetPress(index) {
        if (index === 1) {
            //this._takePicture();            
            this.props.navigation.navigate("FormCamera");
            this.setState({
                foto: this.props.fotofromcamera ?
                    this.props.fotofromcamera : this.state.foto
            });
        }
        if (index === 2) {
            this._pickImage();
        }
        if (index === 3) {
            //this._pickImage();
        }
    }
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
        });

        alert(result.uri);
        console.log(result)

        if (!result.cancelled) {
            this.setState({
                fileUrl: result.uri,
                fileName: result.uri.split('/').pop(),
                foto: result.base64,
            });
        }
    };

    render() {
        const encodedData = this.state.foto ? this.state.foto : this.props.fotofromcamera;
        var lebar = this.state.width;
        var panjang = this.state.height;

        return (

            <ScrollView style={styles.container}>
                <ContainerView>
                    <TitleText>Foto Bukti Pembayaran</TitleText>
                    
                        <Image style={{ width: lebar, height:panjang }}
                            source={{ uri: `data:image/png;base64,${encodedData}` }}
                            resizeMode={'cover'}
                        />
                    
                    <ButtonContainer>
                        <Button text="Change Picture" onPress={() => { this._onOpenActionSheet() }} />
                        <ActionSheet
                            ref={o => this.ActionSheet = o}
                            title={<Text style={{ color: '#000', fontSize: 18 }}>Choose Picture from?</Text>}
                            options={ActionSheetoptions}
                            cancelButtonIndex={0}
                            destructiveButtonIndex={4}
                            onPress={(index) => {
                                this.setState({
                                    fileUrl: './assets/icons/loading.png',
                                })
                                this.handleActionSheetPress(index)
                            }}
                        />
                    </ButtonContainer>
                    <ButtonContainer>
                        <Button text="Save Picture" onPress={() => { this._setBayarPicture() }} />
                    </ButtonContainer>
                </ContainerView>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: { flex: 1, },// paddingTop: Constants.statusBarHeight, marginBottom: 3 },
    inputText: { width: 260, backgroundColor: '#fff', marginBottom: 3 },
    picker: { alignSelf: 'center', width: 260, height: 40, backgroundColor: '#fff' },
    pickerText: { backgroundColor: '#fff' },
    imageStyle: { width: '100%', height: 200 },//width: imageWidth , height: imageHeight },
});

const mapStateToProps = (state) => {
    return {
        token: state.reducerLogin.token,
        mobile: state.reducerLogin.mobile,
        pembayarankey: state.reducerPembayaran.key,
        fotofromcamera: state.reducerPembayaran.picture,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        saveBuktiPembayaran: (token, key, fileName, fileUrl, picture) => {
            dispatch(buktiPembayaran(token, key, fileName, fileUrl, picture))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentEvidenceScreen);