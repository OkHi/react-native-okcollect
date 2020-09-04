# @okhi/react-native-okcollect

The OkCollect React Native library enables you to launch OkHi from your app and collect accurate addresses from your users.

## Installation

```sh
npm install @okhi/react-native-okcollect
```

## Usage

```js
import React, { useState } from 'react';
import { Button } from 'react-native';
import {
  OkHiException,
  OkHiUser,
  requestLocationPermission,
} from '@okhi/react-native-core';
import OkHiLocationManager, {
  OkCollectSuccessResponse,
} from '@okhi/react-native-okcollect';
import auth from 'OkHiAuth.js';

function App() {
  const [launch, setLaunch] = React.useState(false);

  useEffect(() => {
    // location permission is required to enable users to create
    // addresses at their current location
    async function requestPermission() {
      await requestLocationPermission({
        message:
          'Hey, we need permissions to enable you create addresses at your current location',
        title: 'Location permission required',
        buttonPositive: 'Grant',
      });
    }
    requestPermission();
  }, []);

  const user: OkHiUser = {
    firstName: 'Bob',
    lastName: 'Mark',
    phone: '+254712345678', // Make sure its in MSISDN standard format
  };

  const handleOnSuccess = async (response: OkCollectSuccessResponse) => {
    setLaunch(false);
    // perform any logic you'd wish with user and location objects
    const { user, location } = response;
  };

  const handleOnError = (error: OkHiException) => {
    setLaunch(false);
    console.log(error.code);
    console.log(error.message);
  };

  // called when user taps on the top right close button
  const handleOnCloseRequest = () => {
    setLaunch(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Button onPress={() => setLaunch(true)} title="Start Verification" />
      <OkHiLocationManager
        auth={auth}
        user={user}
        onSuccess={handleOnSuccess}
        onError={handleOnError}
        onCloseRequest={handleOnCloseRequest}
        launch={launch}
      />
    </View>
  );
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
