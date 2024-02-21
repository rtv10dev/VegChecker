import { Text as RNText } from "react-native";
import { Props } from "./props";

const Text: React.FC<Props> = ({ style, children, numberOfLines }) => {
  const maxLines = numberOfLines ?? 0;

  return (
    <RNText style={{ ...style, fontFamily: "Kreon" }} numberOfLines={maxLines}>
      {children}
    </RNText>
  );
};

export default Text;
