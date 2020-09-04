import type { OkHiLocationManagerProps } from './OkHiLocationManager';
import type { OkHiAuth, OkHiLocation } from '@okhi/react-native-core';
import { OkHiMode } from '@okhi/react-native-core';
import type {
  OkHiLocationManagerStartDataPayload,
  OkHiLocationManagerStartMessage,
} from './types';
import manifest from './app.json';

export const generateStartDataPayload = (
  props: OkHiLocationManagerProps,
  authToken: string
): OkHiLocationManagerStartDataPayload => {
  const payload: any = {};
  payload.style = !props.theme
    ? undefined
    : {
        base: {
          color: props.theme?.colors?.primary,
          logo: props.theme?.appBar?.logo,
          name: props.auth.getContext().getAppMeta()?.name,
        },
      };
  payload.user = {
    phone: props.user.phone,
    firstName: props.user.firstName,
    lastName: props.user.lastName,
  };
  payload.auth = {
    authToken,
  };
  payload.context = {
    container: {
      name: props.auth.getContext().getAppMeta()?.name,
      version: props.auth.getContext().getAppMeta()?.version,
    },
    developer: {
      name: props.auth.getContext().getDeveloper(),
    },
    library: {
      name: manifest.name,
      version: manifest.version,
    },
    platform: {
      name: 'react-native',
    },
  };
  payload.config = {
    streetView:
      typeof props.config?.streetView === 'boolean'
        ? props.config.streetView
        : true,
    appBar: {
      color: props.theme?.appBar?.backgroundColor,
      visible: props.config?.appBar?.visible,
    },
  };
  return payload;
};

export const getFrameUrl = (auth: OkHiAuth) => {
  const DEV_FRAME_URL = 'https://dev-manager-v5.okhi.io';
  const PROD_FRAME_URL = 'https://manager-v5.okhi.io';
  const SANDBOX_FRAME_URL = 'https://sandbox-manager-v5.okhi.io';
  if (auth.getContext().getMode() === OkHiMode.PROD) {
    return PROD_FRAME_URL;
  }
  if (auth.getContext().getMode() === 'dev') {
    return DEV_FRAME_URL;
  }
  return SANDBOX_FRAME_URL;
};

export const generateJavaScriptStartScript = (startPayload: {
  message: OkHiLocationManagerStartMessage;
  payload: OkHiLocationManagerStartDataPayload;
}) => {
  const jsBeforeLoad = `
      window.isNativeApp = true;
      window.NativeApp = {
        bridge: {
          receiveMessage: window.ReactNativeWebView.postMessage
        },
        data: ${JSON.stringify(startPayload)}
      }
      true;
      `;
  const jsAfterLoad = `
      window.startOkHiLocationManager({ 
        receiveMessage: function(data) { window.ReactNativeWebView.postMessage(data) } }, 
        ${JSON.stringify(startPayload)})
      `;
  return { jsBeforeLoad, jsAfterLoad };
};

export const parseOkHiLocation = (location: any): OkHiLocation => {
  return {
    id: location?.id,
    lat: location?.geo_point?.lat,
    lon: location?.geo_point?.lon,
    placeId: location?.place_id,
    plusCode: location?.plus_code,
    propertyName: location?.property_name,
    streetName: location?.street_name,
    title: location?.title,
    subtitle: location?.subtitle,
    directions: location?.directions,
    otherInformation: location?.other_information,
    url: location?.url,
    streetViewPanoId: location?.street_view?.pano_id,
    streetViewPanoUrl: location?.street_view?.url,
    userId: location?.user_id,
    propertyNumber: location?.propertyNumber,
    photo: location?.photo,
  };
};
