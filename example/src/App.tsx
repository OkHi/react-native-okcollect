import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import OkHiLocationManager from '@okhi/react-native-okcollect';
import { OkHiAuth, OkHiContext } from '@okhi/react-native-core';
import { branchId, clientKey, mode } from './secret.json';

export default function App() {
  const context = new OkHiContext({
    mode,
    app: {
      name: 'My Awesome App',
      build: 1,
      version: '1.0.0',
    },
  });

  const auth = OkHiAuth.withContext(
    {
      branchId,
      clientKey,
    },
    context
  );

  return (
    <View style={styles.container}>
      <OkHiLocationManager
        auth={auth}
        launch={true}
        user={{
          phone: '+254700110590',
        }}
        onError={console.log}
        onSuccess={console.log}
        onCloseRequest={() => console.log('Close me')}
        theme={{
          appBar: {
            backgroundColor: '#333',
            logo:
              'https://gblobscdn.gitbook.com/spaces%2F-LZKFOZdghaDd109RYxt%2Favatar.png?alt=media',
          },
          colors: {
            primary: '#333',
          },
        }}
        config={{ appBar: { visible: false }, streetView: false }}
        loader={<Text>Loading..</Text>}
        // style={{ padding: 30, backgroundColor: 'red' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
