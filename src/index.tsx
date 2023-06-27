import React from 'react';

import App from './App';
import AppProvider from './AppProvider';

const Index: React.FC = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

export default Index;
