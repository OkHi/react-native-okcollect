import * as React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import OkHiLocationManager, {
  canStartAddressCreation,
} from '@okhi/react-native-okcollect';

export default function App() {
  const [launch, setLaunch] = React.useState(false);

  return (
    <View style={styles.container}>
      <Button
        title="Create Address"
        onPress={async () => {
          const canStart = await canStartAddressCreation({
            requestServices: true,
          });
          if (canStart) {
            setLaunch(!launch);
          }
        }}
      />
      <OkHiLocationManager
        launch={launch}
        user={{
          phone: '+254700110590',
          firstName: 'Kiano',
          lastName: 'Julius',
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
        config={{ appBar: { visible: true }, streetView: true }}
        loader={<Text>Loading..</Text>}
        style={styles.locationManager}
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
  locationManager: {
    padding: 30,
    backgroundColor: 'red',
  },
});
