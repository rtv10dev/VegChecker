import { Text as RNText } from "react-native";
import { Props } from "./props";

const Text: React.FC<Props> = ({ style, children }) => {
  return <RNText style={{ ...style, fontFamily: "Kreon" }}>{children}</RNText>;
};

export default Text;
