import Text from "components/Text";
import { BarCodeScanningResult, Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Props } from "./props";

const delay = (time) => {
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(true), time);
  });
};

const Scanner: React.FC<Props> = ({ onScanProduct, navigation }) => {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const read = useRef(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setHasPermission(false);
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const scanHandler = async (productInfo: BarCodeScanningResult) => {
    await delay(500);

    if (read.current == productInfo.data) return;
    read.current = productInfo.data;

    onScanProduct(productInfo);
  };

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <Text
        style={{
          position: "absolute",
          top: "15%",
          left: "7%",

          zIndex: 20,
        }}
      >
        Scan a barcode to know if it's{" "}
        <Text style={{ fontWeight: "bold" }}>VEGAN</Text> or/and{" "}
        <Text style={{ fontWeight: "bold" }}>VEGETARIAN</Text>
      </Text>
      <Camera
        onBarCodeScanned={scanHandler}
        ratio="16:9"
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

export default Scanner;
