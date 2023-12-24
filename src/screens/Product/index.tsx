import Analysis from "components/Analysis";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Props } from "./props";

const Product: React.FC<Props> = ({ route, navigation }) => {
  const [analysis, setAnalysis] = useState([]);
  useEffect(() => {
    const product = route.params.productInfo.product;
    navigation.setOptions({ title: product.product_name });
    setAnalysis(
      product.ingredients_analysis_tags
        .filter((item) => item.includes("vegan") || item.includes("vegetarian"))
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

  const getColorByStatus = (status: string) => {
    let color;
    switch (status) {
      case "vegan":
        color = "success";
        break;
      case "vegetarian":
        color = "success";
        break;
      case "maybe-vegan":
        color = "warning";
        break;
      case "maybe-vegetarian":
        color = "warning";
        break;
      case "non-vegan":
        color = "error";
        break;
      case "non-vegetarian":
        color = "error";
        break;
      case "vegan-status-unknown":
        color = "info";
        break;
      case "vegetarian-status-unknown":
        color = "info";
        break;
      default:
        color = "info";
        break;
    }

    return color;
  };

  const getAnalysisImage = (analysis: string) => {
    return analysis.includes("vegan")
      ? require(`assets/images/leaf.png`)
      : require(`assets/images/bottle.png`);
  };

  const getAnalysisHeader = (analysis: string) => {
    let header;
    switch (analysis) {
      case "vegan":
        header = "Vegan";
        break;
      case "vegetarian":
        header = "Vegetarian";
        break;
      case "maybe-vegan":
        header = "Maybe Vegan";
        break;
      case "maybe-vegetarian":
        header = "Maybe Vegetarian";
        break;
      case "non-vegan":
        header = "Non Vegan";
        break;
      case "non-vegetarian":
        header = "Non Vegetarian";
        break;
      case "vegan-status-unknown":
        header = "Unknown Vegan";
        break;
      case "vegetarian-status-unknown":
        header = "Unknown Vegetarian";
        break;
      default:
        header = "Unknown";
        break;
    }
    return header;
  };

  const getAnalysisIngredients = (analysis: string, ingredients: any) => {
    const ingredientsList = ingredients[analysis]
      ?.map((ingredient) => {
        const name = ingredient.split(":")[1].replaceAll("-", " ");

        return name[0].toUpperCase() + name.slice(1);
      })
      .join(", ");

    return ingredientsList ?? "";
  };

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
