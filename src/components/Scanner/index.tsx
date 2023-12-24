import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";
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
      // do something - for example: reset states, ask for camera permission
      setHasPermission(false);
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
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

  const scanHandler = async (productInfo: BarCodeScannerResult) => {
    console.log("SCANN");
    await delay(500);
    console.log(read.current, productInfo.data);
    if (read.current == productInfo.data) return;
    read.current = productInfo.data;
    console.log(read.current);
    onScanProduct(productInfo);
  };

  return (
    <BarCodeScanner
      onBarCodeScanned={scanHandler}
      style={StyleSheet.absoluteFillObject}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Scanner;
