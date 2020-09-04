import type { OkHiUser } from '@okhi/react-native-core';

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
