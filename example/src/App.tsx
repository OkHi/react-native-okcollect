import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ReactNativeOkcollect from '@okhi/react-native-okcollect';
import { WebView } from 'react-native-webview';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    ReactNativeOkcollect.multiply(3, 7).then(setResult);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <WebView
        source={{ uri: 'https://infinite.red' }}
        style={{ marginTop: 20, height: 300, width: 300 }}
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
