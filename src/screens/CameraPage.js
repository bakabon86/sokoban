import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Switch,
    TouchableOpacity,
    Image
} from "react-native";
import { Camera, Permissions } from "expo";
//import { RNS3 } from "react-native-aws3";
import { connect } from 'react-redux';




class CameraPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            imageuri: "",
            url: "",
            fileName: "",
            fileUrl: "",
            picture: "",
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cameraview}>
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
                </View>

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
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1dd1a1",
        alignItems: "center",
        justifyContent: "flex-start"
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
        borderColor: "#fff",
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


export default (CameraPage);