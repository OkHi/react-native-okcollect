import type { ViewStyle } from 'react-native';
import type {
  OkHiUser,
  OkHiLocation,
  OkHiException,
} from '@okhi/react-native-core';

/**
 * The OkCollect Success Response object contains information about the newly created user and location once an address has been successfully created.
 * It can be used to extract information about the address and/or start address verification process.
 */
export interface OkCollectSuccessResponse {
  /**
   * The [OkHiUser](https://okhi.github.io/react-native-core/interfaces/okhiuser.html) object containing information about the newly created user.
   */
  user: OkHiUser;
  /**
   * The [OkHiLocation](https://okhi.github.io/react-native-core/interfaces/okhilocation.html) object containing information about the newly created user.
   */
  location: OkHiLocation;
}

/**
 * The OkHiLocationManager exposes props that you can use to customise it's functionality and appearance.
 */
export interface OkHiLocationManagerProps {
  /**
   * **Required:** A boolean flag that determines whether or not to show the Location Manager.
   */
  launch: boolean;
  /**
   * **Required:** A defined [OkHiUser](https://okhi.github.io/react-native-core/interfaces/okhiuser.html) object, with a mandatory "phone" key property.
   */
  user: OkHiUser;
  /**
   * **Optional:** A custom JSX.Element that'll be used as a loading indicator.
   */
  loader?: JSX.Element;
  /**
   * **Optional:** Used to customise the appearance of the Container that wraps the location manager.
   */
  style?: ViewStyle;
  /**
   * **Required:** A callback that'll be invoked with an {@link OkCollectSuccessResponse} once an accurate OkHi address has been successfully created.
   */
  onSuccess: (response: OkCollectSuccessResponse) => any;
  /**
   * **Required:** A callback that'll be invoked whenever an error occurs during the address creation process.
   */
  onError: (error: OkHiException) => any;
  /**
   * **Required:** A callback that'll be invoked whenever a user taps on the close button.
   */
  onCloseRequest: () => any;
  /**
   * **Optional:** An object that'll be used to customise the appearance of the Location Manager to better match your branding requirements.
   */
  theme?: {
    appBar?: {
      backgroundColor?: string;
      logo?: string;
    };
    colors?: {
      primary?: string;
    };
  };
  /**
   * **Optional:** An object that'll be used to customise the functionality of the Location Manager. This object dictates whether you want some features on or off.
   */
  config?: {
    streetView?: boolean;
    appBar?: {
      visible?: boolean;
    };
  };
}

/**
 * @ignore
 */
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

/**
 * @ignore
 */
export type OkHiLocationManagerStartMessage = 'select_location' | 'start_app';

/**
 * @ignore
 */
export interface OkHiLocationManagerResponse {
  message:
    | 'location_selected'
    | 'location_created'
    | 'location_updated'
    | 'exit_app'
    | 'fatal_exit';
  payload: { user: any; location: any };
}
