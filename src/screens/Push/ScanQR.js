import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, Alert, TextInput } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Button } from '../../components';
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


export default class ScanQRScreen extends Component {
    state = {
        hasCameraPermission: null,
        resultScan: '',
    };

    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    _handleBarCodeRead = data => {
        Alert.alert(
            'Scan successful!',
            JSON.stringify(data)
        );
        this.setState({ resultScan: data });
    };

    _retryScan() {
        this.setState({ resultScan: '' });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <ContainerView>
                    <View style={styles.scannerContainer}>
                        {this.state.hasCameraPermission === null ?
                            <Text>Requesting for camera permission</Text> :
                            this.state.hasCameraPermission === false ?
                                <Text>Camera permission is not granted</Text> :
                                <BarCodeScanner
                                    onBarCodeRead={this._handleBarCodeRead}
                                    style={{ height: 200, width: 200 }}
                                />
                        }
                    </View>
                    <TextInput style={styles.inputText} editable={false}
                        value={this.state.resultScan === '' ? '' : this.state.resultScan}
                    />
                    <ButtonContainer>
                        <Button text="Retry" onPress={() => this._retryScan()} />
                        <Button text="Cancel" onPress={()=>{this.props.navigation.goBack()}} />
                    </ButtonContainer>
                </ContainerView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1 },//, paddingTop: Constants.statusBarHeight },
    scannerContainer: {
        //flex: 1,
        // alignSelf: 'center',
        // justifyContent: 'center',
        //paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        borderColor: '#000000',
        borderWidth: 1,
    },
    inputText: { width: 260, backgroundColor: '#fff', marginBottom: 3, paddingTop: 10 },
});