import React from "react";
import {
    StyleSheet,
    Text, ScrollView,
    View,
    Switch,
    TouchableOpacity,
    Image
} from "react-native";
import { Camera, Permissions } from "expo";
//import { RNS3 } from "react-native-aws3";
import { connect } from 'react-redux';

import styled from 'styled-components/native';

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

class AppCamera extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            switchValue: false,
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            imageuri: "",
            url: "",
            fileName: "",
            fileUrl: "",
            picture: "",
        };
    }


    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === "granted" });
    }

    cameraChange = () => {
        this.setState({
            imageuri: "",
            url: "",
            type:
                this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
        });
    };

    snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({
                base64: true
            });
            if (photo) {
                this.setState({ imageuri: photo.uri });
            }
            this.setState({
                fileName: photo.uri.split('/').pop(),
                fileUrl: photo.uri,
                picture: photo.base64,
            })
        }
    };

    upload = () => {
        const file = {
            uri: this.state.imageuri,
            name: `${new Date().getTime()}.jpg`,
            type: "image/jpeg"
        };
        const options = {
            keyPrefix: "ts/",
            bucket: "..name..",
            region: "eu-west-1",
            accessKey: "..acesskey..",
            secretKey: "..secretkey..",
            successActionStatus: 201
        };
        return RNS3.put(file, options)
            .then(response => {
                if (response.status !== 201)
                    throw new Error("Failed to upload image to S3");
                else {
                    console.log(
                        "Successfully uploaded image to s3. s3 bucket url: ",
                        response.body.postResponse.location
                    );
                    this.setState({
                        url: response.body.postResponse.location,
                        switchValue: false
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    savePhotoToState() {

        // this.setState({
        //     fileName: this.state.imageuri.split('/').pop(),
        //     fileUrl: this.state.imageuri,
        //     picture: this.state.imageuri,
        // })

        // this.props.saveBuktiPembayaran(this.props.token, this.props.pembayaranKey ? this.props.pembayaranKey : '1'
        //     , this.state.fileName, this.state.fileUrl, this.state.picture);
        //this.props.navigation.navigate("FormPembayaran",{fileName: this.state.fileName});
        //this.props.navigation.goBack();
        this.upload();
        this.props.navigation.navigate("Home");
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return (
                <View>
                    <Text>No access to camera</Text>
                </View>
            );
        } else {
            return (
                <ScrollView style={styles.container}>
                    <ContainerView>
                        <View style={styles.switchview}>
                            <Text>Show camera</Text>
                            <Switch
                                onValueChange={value => {
                                    this.setState({ switchValue: value });
                                }}
                                value={this.state.switchValue}
                                style={styles.switch}
                            />
                        </View>
                        {this.state.switchValue ? (
                            <View style={styles.cameraview}>
                                {this.state.imageuri != "" ? (
                                    <Image
                                        source={{
                                            uri: this.state.imageuri
                                        }}
                                        style={styles.uploadedImage}
                                        resizeMode="contain"
                                    />
                                ) : (
                                        <Camera
                                            style={styles.camera}
                                            type={this.state.type}
                                            ref={ref => {
                                                this.camera = ref;
                                            }}
                                        >
                                            <View style={styles.camerabuttonview}>
                                                <TouchableOpacity
                                                    style={styles.cameraButtons}
                                                    onPress={this.cameraChange}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 18,
                                                            marginBottom: 10,
                                                            color: "white"
                                                        }}
                                                    >
                                                        Flip
                      </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </Camera>
                                    )}
                            </View>
                        ) : (
                                <View style={styles.cameraview}>
                                    {this.state.url != "" ? (
                                        <Text>Uploaded url : {this.state.url}</Text>
                                    ) : null}
                                    <Text>Camera off</Text>
                                </View>
                            )}
                        {this.state.switchValue ? (
                            <View style={styles.buttonsView}>
                                {this.state.imageuri == "" ? (
                                    <View style={styles.captureButtonView}>
                                        <TouchableOpacity
                                            style={styles.cameraButtons}
                                            onPress={this.snap}
                                        >
                                            <Text
                                                style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                                            >
                                                Capture
                    </Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : null}
                                <View style={styles.captureButtonView}>
                                    <TouchableOpacity
                                        style={styles.cameraButtons}
                                        onPress={() => { this.savePhotoToState() }}//this.upload}
                                    >
                                        <Text
                                            style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                                        >
                                            Upload
                  </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : null}
                    </ContainerView>
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#1dd1a1",
        // alignItems: "center",
        // justifyContent: "flex-start"
    },
    switchview: {
        marginTop: 50,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
        borderRadius: 5,
        marginBottom: 5
    },
    switch: {
        padding: 5
    },
    cameraview: {
        height: 400,
        width: "90%",
        backgroundColor: "white",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    camera: {
        height: "95%",
        width: "95%",
        backgroundColor: "white",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    camerabuttonview: {
        height: "100%",
        backgroundColor: "transparent"
    },
    cameraButtons: {
        borderColor: "#41bce6",//"#fff",
        backgroundColor: "#41bce6",
        borderWidth: 2,
        padding: 10,
        borderRadius: 5,
        margin: 5
    },
    captureButtonView: {
        height: 200
    },
    buttonsView: {
        height: 200,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center"
    },
    uploadedImage: {
        height: "90%",
        width: "90%",
        padding: 10
    }
});

const mapStateToProps = (state) => {
    return {
        username: state.reducerLogin.username,
        mobile: state.reducerLogin.mobile,
        token: state.reducerLogin.token,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        saveBuktiPembayaran: (token, key, fileName, fileUrl, picture) => {
            dispatch(buktiPembayaran(token, key, fileName, fileUrl, picture))
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(AppCamera);