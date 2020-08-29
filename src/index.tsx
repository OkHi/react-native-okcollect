import { NativeModules } from 'react-native';

type ReactNativeOkcollectType = {
  multiply(a: number, b: number): Promise<number>;
};

const { ReactNativeOkcollect } = NativeModules;

export default ReactNativeOkcollect as ReactNativeOkcollectType;
