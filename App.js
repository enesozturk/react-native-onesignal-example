/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, StatusBar} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import OneSignal from 'react-native-onesignal';
import {ResponsiveImage} from './src/components/ResponsiveImage';
import {BottomPanel} from './src/components/BottomPanel';

const App: () => React$Node = () => {
  const [oneSignalInitialized, setOneSignalInitialized] = useState(false);
  const [openedNotification, setOpenedNotification] = useState(null);
  const [panelState, setPanelState] = useState({
    isActive: false,
    onClose: () => _closePanel(),
  });

  const _closePanel = () => {
    setPanelState({
      isActive: false,
      onClose: _closePanel,
    });
    setOpenedNotification(null);
  };

  const _openPanel = () => {
    setPanelState({
      isActive: true,
      fullWidth: true,
      onlyLarge: true,
      showCloseButton: true,
      closeOnTouchOutside: true,
      onClose: () => _closePanel(),
    });
  };

  const onReceived = () => {};

  const onOpened = (openResult) => {
    const payload = openResult.notification.payload;
    setOpenedNotification(payload);
    _openPanel();
  };

  const onIds = (device) => {
    if (device.pushToken) setOneSignalInitialized(true);
  };

  useEffect(() => {
    if (!oneSignalInitialized) {
      OneSignal.inFocusDisplaying(2);
      OneSignal.init('YOUR_ONESIGNAL_APP_ID');

      OneSignal.addEventListener('received', onReceived);
      OneSignal.addEventListener('opened', onOpened);
      OneSignal.addEventListener('ids', onIds);
    }

    return () => {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    };
  }, []);

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
        <ResponsiveImage
          widthPercentage={0.8}
          fromLocal
          src={require('./src/resources/images/header_image.png')}
        />
        <Text style={AppStyles.Title}>React Native OneSignal Example</Text>
      </SafeAreaView>

      <BottomPanel
        panelState={panelState}
        notificationDataProp={openedNotification}
      />
    </>
  );
};

const AppStyles = StyleSheet.create({
  Title: {
    width: '100%',
    textAlign: 'center',
    fontSize: 30,
    color: Colors.dark,
    fontWeight: '600',
  },
});

export default App;
