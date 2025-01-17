declare module '@wz-mobile/rn-gauge';
declare module 'react-native-speedometer' {
  const content: any;
  export default content;
}
declare module 'react-native-config' {
  export interface NativeConfig {
    API_TWELVEDATA?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
