import React from 'react';
import { ActivityIndicator, View, ViewStyle } from 'react-native';

export const Spinner = () => {
  const style: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  };
  return (
    <View style={style}>
      <ActivityIndicator color="teal" size="small" />
    </View>
  );
};
