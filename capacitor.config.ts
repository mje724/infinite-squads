import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.infinitesquads.game',
  appName: 'Infinite Squads',
  webDir: 'out',
  backgroundColor: '#020617',
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#020617',
  },
  android: {
    backgroundColor: '#020617',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: '#020617',
      showSpinner: false,
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#020617',
    },
  },
};

export default config;
