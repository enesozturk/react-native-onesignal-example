/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import OneSignal from 'react-native-onesignal';

const App: () => React$Node = () => {
  const [oneSignalInitialized, setOneSignalInitialized] = useState(false);

  const onReceived = (notification) => {};

  const onOpened = (openResult) => {
    const payload = openResult.notification.payload;
  };

  const onIds = (device) => {
    console.log('REGISTER DEVICE', device);
    if (device.pushToken) {
      setOneSignalInitialized(true);
    }
  };

  useEffect(() => {
    // App componentim her prop değişikliğinde OneSignal kurulumunu tekrar çalıştırmaması için
    // bir state değişkeni ile ve kullanıcının giriş yapmış olduğundan emin olmak için
    // User prop'u ile kontrol ediyorum.
    // Burası sizin senaryonuza göre değişir.
    if (!oneSignalInitialized) {
      // In-Focus özelliği 0,1 veya 2 gibi üç farklı değer alabilir ve default olarak 1 atanmıştır;
      // 0 ve 1 durumlarında bildirimi açtığınızda veya ön plan durumunda bildirim geldiğinde
      // ekranda alert mesajı ile bildiirm detaylarını görürsünüz. Fakat buna çoğu senaryoda ihtiyacınız yok.
      // 2 olarak ayarlayarak bu alert mesajını kaldırabilirsiniz.
      OneSignal.inFocusDisplaying(2);
      // Buraya OneSignal panelinde oluşturduğunuz uygulamanın ID'sini bağlamanız gerekli.
      OneSignal.init('YOUR_ONESIGNAL_APP_ID');

      // İlgili event listener'lar
      OneSignal.addEventListener('received', onReceived);
      OneSignal.addEventListener('opened', onOpened);
      OneSignal.addEventListener('ids', onIds);
    }

    return () => {
      // Component unmount olduğunda bu listenerları silmek gerekir.
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    };
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
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
