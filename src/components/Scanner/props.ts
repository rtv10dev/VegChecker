import { BarCodeScannerResult } from "expo-barcode-scanner";

export type Props = {
  onScanProduct: (productInfo: BarCodeScannerResult) => void;
  navigation: any;
};
