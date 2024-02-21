import Analysis from "components/Analysis";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { STATUS } from "./constants";
import {
  getAnalysisHeader,
  getAnalysisImage,
  getAnalysisIngredients,
  getColorByStatus,
} from "./logic";
import { Props } from "./props";

const Product: React.FC<Props> = ({ route, navigation }) => {
  const [analysis, setAnalysis] = useState([]);

  useEffect(() => {
    const product = route.params.productInfo.product;
    navigation.setOptions({ title: product.product_name });
    setAnalysis(
      product.ingredients_analysis_tags
        .filter(
          (item) =>
            item.includes(STATUS.vegan) || item.includes(STATUS.vegetarian)
        )
        .map((item) => {
          const status = item.split(":")[1];

          return {
            key: status,
            header: getAnalysisHeader(status),
            image: getAnalysisImage(status),
            color: getColorByStatus(status),
            ingredients: getAnalysisIngredients(
              item,
              product.ingredients_analysis
            ),
          };
        })
    );
  }, []);

  return (
    <View style={styles.container}>
      {analysis.map((item) => (
        <Analysis
          key={item.key}
          className={item.color}
          header={item.header}
          image={item.image}
          subtext={item.ingredients}
        ></Analysis>
      ))}
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

export default Product;
