import React, {Component} from "react";
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";


export default class TransactionScreen extends Component{

    constructor(props){
        super(props);
        this.state = {
        domState : "normal",
        hasCameraPermissions: null,
        scanned: false,
        scannedData: ""
}
    }

    getCameraPermissions = async domState => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
        /*status === "granted" is true when user has granted permission
        status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        domState: domState,
        scanned: false
        });
        };

    handleBarCodeScanned = async ({ type, data }) => {
            this.setState({
            scannedData: data,
            domState: "normal",
            scanned: true
        });
         };
            


  render(){

    const { domState, hasCameraPermissions, scannedData, scanned } = this.state;
    if (domState === "scanner") {
        return (
        <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        />
        );
        }
        
      return (
        <View style={styles.container}>

            <Text style={styles.text}>
            {hasCameraPermissions ? scannedData : "Request for Camera Permission"}
            </Text>

            <TouchableOpacity style={styles.button}
            onPress={() => this.getCameraPermissions("scanner")}
            >
            <Text style={styles.buttonText}>
                Scan QR Code
            </Text>
            </TouchableOpacity>
        </View>
      );
  }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#5653D4"
    },
    text: {
        color:"#ffff",
        fontSize:30
    },
    button:{
        width: "100%",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F48D20",
        borderRadius: 15,
        marginTop:25
    },
    buttonText:{
        fontSize: 20,
        color: "#FFFFFF"
    }
});