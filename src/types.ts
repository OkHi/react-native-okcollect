import type { ViewStyle } from 'react-native';
import type {
  OkHiAuth,
  OkHiException,
  OkHiUser,
  OkHiLocation,
} from '@okhi/react-native-core';

export interface OkCollectSuccessResponse {
  user: OkHiUser;
  location: OkHiLocation;
  auth: OkHiAuth;
}

export interface OkHiLocationManagerProps {
  auth: OkHiAuth;
  launch: boolean;
  user: OkHiUser;
  loader?: JSX.Element;
  style?: ViewStyle;
  onSuccess: (response: OkCollectSuccessResponse) => any;
  onError: (error: OkHiException) => any;
  onCloseRequest: () => any;
  theme?: {
    appBar?: {
      backgroundColor?: string;
      logo?: string;
    };
    colors?: {
      primary?: string;
    };
  };
  config?: {
    streetView?: boolean;
    appBar?: {
      visible?: boolean;
    };
  };
}

export interface OkHiLocationManagerStartDataPayload {
  style?: {
    base?: {
      color?: string;
      logo?: string;
      name?: string;
    };
  };
  auth: {
    authToken: string;
  };
  context: {
    container?: {
      name?: string;
      version?: string;
    };
    developer: {
      name: string;
    };
    library: {
      name: string;
      version: string;
    };
    platform: {
      name: 'react-native';
    };
  };
  config?: {
    streetView?: boolean;
    appBar?: {
      color?: string;
      visible?: boolean;
    };
  };
  user: OkHiUser;
}

export type OkHiLocationManagerStartMessage = 'select_location' | 'start_app';

export interface OkHiLocationManagerResponse {
  message:
    | 'location_selected'
    | 'location_created'
    | 'location_updated'
    | 'exit_app'
    | 'fatal_exit';
  payload: { user: any; location: any };
}
