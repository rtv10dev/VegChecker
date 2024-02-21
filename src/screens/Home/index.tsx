import Scanner from "components/Scanner";
import { BarCodeScanningResult } from "expo-camera";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { getProductInfo } from "services";
import { Props } from "./props";

const Home: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const onScanProduct = async (productInfo: BarCodeScanningResult) => {
    if (!loading && productInfo.data) {
      setLoading(true);

      const productData = await getProductInfo(productInfo.data);

      if (productData) {
        const productExists =
          productData.status === "success" &&
          productData.product?.ingredients_analysis_tags?.length > 0;

        if (!productExists) {
          Toast.show({
            type: "error",
            text1: "🔎 Product not found",
            position: "bottom",
          });
          setLoading(false);
        } else {
          setLoading(false);
          navigation.navigate("Product", { productInfo: productData });
        }
      } else {
        Toast.show({
          type: "error",
          text1: "🔎 Product not found",
          position: "bottom",
        });
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Scanner onScanProduct={onScanProduct} navigation={navigation}></Scanner>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
