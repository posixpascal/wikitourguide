// @ts-ignore
import LottieView from 'lottie-react-native';
import { Platform, View } from 'react-native';
import * as React from 'react';

export function LottieWithFallback(props) {
  return Platform.select({
    web: ({ ...props }) => {
      const WebAnimation = require('./WebAnimation').default;
      return <WebAnimation {...props} />;
    },
    default: ({ ...props }) => <LottieView {...props} />,
  })(props);
}
