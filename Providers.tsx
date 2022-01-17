import React from 'react';
import {MoralisProvider} from 'react-moralis';
import Moralis from 'moralis/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WalletConnectProvider, {
  WalletConnectProviderProps,
} from './src/WalletConnect';
import {Platform} from 'react-native';
import Qrcode from './Qrcode';
import {enableViaWalletConnect} from './src/Moralis/enableViaWalletConnect';
import {MoralisDappProvider} from './src/providers/MoralisDappProvider/MoralisDappProvider';

interface ProvidersProps {
  readonly children: JSX.Element;
}

/**
 * Initialization of Moralis
 */
const appId = '88T8fH1Iysq7RBD4cZKU6QWY3lUqJMClGmwQ3AyW';
const serverUrl = 'https://2x8anbmzqe6x.usemoralis.com:2053/server';
const environment = 'native';
// Initialize Moralis with AsyncStorage to support react-native storage
Moralis.setAsyncStorage(AsyncStorage);
// Replace the enable function to use the react-native WalletConnect
// @ts-ignore
Moralis.enable = enableViaWalletConnect;

const walletConnectOptions: WalletConnectProviderProps = {
  redirectUrl:
    Platform.OS === 'web' ? window.location.origin : `com.awesomeproject://`,
  storageOptions: {
    // @ts-ignore
    asyncStorage: AsyncStorage,
  },
  qrcodeModalOptions: {
    mobileLinks: [
      'rainbow',
      'metamask',
      'argent',
      'trust',
      'imtoken',
      'pillar',
    ],
  },
  // Uncomment to show a QR-code to connect a wallet
  // renderQrcodeModal: Qrcode,
};

export const Providers = ({children}: ProvidersProps) => {
  return (
    <WalletConnectProvider {...walletConnectOptions}>
      <MoralisProvider
        appId={appId}
        serverUrl={serverUrl}
        environment={environment}>
        <MoralisDappProvider>{children}</MoralisDappProvider>
      </MoralisProvider>
    </WalletConnectProvider>
  );
};
