import { BarCodeScanningResult } from "expo-camera";

export type Props = {
  onScanProduct: (productInfo: BarCodeScanningResult) => void;
  navigation: any;
};
