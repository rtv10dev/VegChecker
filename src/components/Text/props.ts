import { ReactNode } from "react";
import { TextStyle } from "react-native/types";

export type Props = {
  children: ReactNode;
  style?: TextStyle;
  numberOfLines?: number;
};
