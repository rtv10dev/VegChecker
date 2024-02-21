import Text from "components/Text";
import { COLORS } from "constants/colors";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Props } from "./props";

const Analysis: React.FC<Props> = ({ className, header, image, subtext }) => {
  return (
    <View style={[styles.container, styles[className]]}>
      <Text style={styles.text}>{header}</Text>
      <Image style={styles.image} source={image}></Image>
      <Text style={styles.subtext} numberOfLines={5}>
        {subtext}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    gap: 10,
  },
  success: {
    backgroundColor: COLORS.green,
  },
  error: {
    backgroundColor: COLORS.red,
  },
  warning: {
    backgroundColor: COLORS.orange,
  },
  info: {
    backgroundColor: COLORS.gray,
  },
  image: {
    width: 90,
    height: 90,
  },
  text: {
    position: "absolute",
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    top: 15,
    left: 20,
  },
  subtext: {
    marginTop: 15,
    paddingLeft: 50,
    paddingRight: 50,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default Analysis;
