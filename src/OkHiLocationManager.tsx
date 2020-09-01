import React, { useState, useEffect } from 'react';
import { Modal, SafeAreaView, Platform } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { Spinner } from './Spinner';
import type {
  OkHiLocationManagerProps,
  OkHiLocationManagerResponse,
} from './types';
import { OkHiLocationManagerCore } from './OkHiLocationManagerCore';
import {
  getFrameUrl,
  generateJavaScriptStartScript,
  generateStartDataPayload,
  parseOkHiLocation,
} from './Util';
import { OkHiException } from '@okhi/react-native-core';

export const OkHiLocationManager = (props: OkHiLocationManagerProps) => {
  const [token, setToken] = useState<string | null>(null);
  const defaultStyle = { flex: 1 };
  const style = props.style
    ? { ...props.style, ...defaultStyle }
    : defaultStyle;

  const {
    auth,
    user,
    onSuccess,
    onCloseRequest,
    onError,
    loader,
    launch,
  } = props;

  useEffect(() => {
    if (launch && user.phone) {
      const core = new OkHiLocationManagerCore(auth);
      core.getBearerToken(user.phone).then(setToken).catch(onError);
    }
  }, [auth, user?.phone, launch, onError]);

  const handleOnMessage = ({ nativeEvent: { data } }: WebViewMessageEvent) => {
    try {
      const response: OkHiLocationManagerResponse = JSON.parse(data);
      if (response.message === 'fatal_exit') {
        onError(
          new OkHiException({
            code: OkHiException.UNKNOWN_ERROR_CODE,
            message: response.payload.toString(),
          })
        );
      } else if (response.message === 'exit_app') {
        onCloseRequest();
      } else {
        onSuccess({
          ...response.payload,
          location: parseOkHiLocation(response.payload.location),
          auth: auth,
        });
      }
    } catch (error) {
      onError(
        new OkHiException({
          code: OkHiException.UNKNOWN_ERROR_CODE,
          message: error.message,
        })
      );
    }
  };

  const handleOnError = () => {
    onError(
      new OkHiException({
        code: OkHiException.NETWORK_ERROR_CODE,
        message: OkHiException.NETWORK_ERROR_MESSAGE,
      })
    );
  };

  const renderContent = () => {
    if (token === null) {
      return loader || <Spinner />;
    }

    const { jsAfterLoad, jsBeforeLoad } = generateJavaScriptStartScript({
      message: 'select_location',
      payload: generateStartDataPayload(props, token),
    });

    return (
      <SafeAreaView style={style}>
        <WebView
          source={{ uri: getFrameUrl(auth) }}
          injectedJavaScriptBeforeContentLoaded={
            Platform.OS === 'ios' ? jsBeforeLoad : undefined
          }
          injectedJavaScript={Platform.OS === 'ios' ? undefined : jsAfterLoad}
          onMessage={handleOnMessage}
          onError={handleOnError}
          onHttpError={handleOnError}
          geolocationEnabled={true}
          allowsBackForwardNavigationGestures={true}
        />
      </SafeAreaView>
    );
  };

  return (
    <Modal animationType="slide" transparent={false} visible={launch}>
      {launch ? renderContent() : null}
    </Modal>
  );
};
