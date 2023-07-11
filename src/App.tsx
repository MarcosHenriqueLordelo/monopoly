import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

import useUi from './contexts/ui/useUi';

import RootNav from './navigators/RootNav';

import SnackBar from './components/SnackBar';

import { BANNER_ID_ANDROID } from './utils/keys';

const App: React.FC = () => {
  const { theme } = useUi();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor={theme.colors.action} />
      <View
        style={{
          height: insets.top,
          width: '100%',
          backgroundColor: theme.colors.action,
        }}
      />
      <RootNav />
      <BannerAd
        unitId={__DEV__ ? TestIds.BANNER : BANNER_ID_ANDROID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
      <SnackBar position="bottom" />
      <View
        style={{
          height: insets.bottom,
          width: '100%',
          backgroundColor: theme.colors.action,
        }}
      />
    </View>
  );
};

export default App;
