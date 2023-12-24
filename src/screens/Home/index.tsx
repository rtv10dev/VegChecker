import Scanner from "components/Scanner";
import { BarCodeScannerResult } from "expo-barcode-scanner";
import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { getProductInfo } from "services";
import { Props } from "./props";

const Home: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const load = useRef(false);
  const onScanProduct = async (productInfo: BarCodeScannerResult) => {
    console.log("QUEEEEEEEEE", productInfo.data);
    if (!load.current && productInfo.data) {
      load.current = true;
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
          load.current = false;
        } else {
          setLoading(false);
          load.current = false;
          navigation.navigate("Product", { productInfo: productData });
        }
      } else {
        Toast.show({
          type: "error",
          text1: "🔎 Product not found",
          position: "bottom",
        });
        load.current = false;
        setLoading(false);
      }
    }
  };

  // useEffect(() => {
  //   setTimeout(async () => {
  //     const productInfo = await getProductInfo("7622210449283");

  //     const productExists =
  //       !productInfo.errors.filter(
  //         (error) => error.message.id === "product_not_found"
  //       ).length || !productInfo.product.ingredients_analysis_tags;

  //     if (!productExists) {
  //       Toast.show({
  //         type: "error",
  //         text1: "🔎 Product not found",
  //         position: "bottom",
  //       });
  //     } else {
  //       navigation.navigate("Product", { productInfo });
  //     }
  //   }, 3000);
  // }, []);

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
