import React, { useEffect } from 'react';
import 'expo-dev-client';

import App from './App';
import AppProvider from './AppProvider';

import mobileAds from 'react-native-google-mobile-ads';

//teste

const Index: React.FC = () => {
  useEffect(() => {
    mobileAds().initialize();
  }, []);

  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};

export default Index;
