/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import './shim';
import {useWalletConnect} from './src/WalletConnect';
import {useMoralis} from 'react-moralis';
import ERC20Balance from './src/components/ERC20Balance';
import NativeBalance from './src/components/NativeBalance';

const App: () => React$Node = () => {
  const connector = useWalletConnect();
  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated,
    logout,
    Moralis,
    user,
  } = useMoralis();
  console.log({user});
  const getChain = () => {
    // Moralis.onChainChanged(function (chain) {
    //   // setChainId(chain);
    //   console.log(chain);
    // });
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text> {user?.getUsername()}</Text>
          <Text> {user?.getEmail()}</Text>
          <Text> {user?.getUsername()}</Text>
        </View>
        {user ? (
          <>
            <NativeBalance chain="0x1" />
            <ERC20Balance />
          </>
        ) : null}
        <Button
          title={'connect'}
          onPress={() => authenticate({connector})}
          styles={{width: 200, height: 100, flex: 1}}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
