import React, {useState, useEffect} from 'react';

import {View, Image, Text, StyleSheet} from 'react-native';
import SwipeablePanel from 'rn-swipeable-panel';

import {ResponsiveImage} from '../ResponsiveImage';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const BottomPanel = ({panelState, notificationDataProp}) => {
  const [notificationData, setNotificationData] = useState();

  useEffect(() => {
    setNotificationData(notificationDataProp);
    console.log('NOTIFICATION', notificationDataProp);
  }, [notificationDataProp]);

  return (
    <SwipeablePanel {...panelState}>
      {notificationData && (
        <View style={PanelStyles.ContentWrapper}>
          <Text style={PanelStyles.Title}>{notificationData.title}</Text>
          <Text style={PanelStyles.Description}>{notificationData.body}</Text>
          {notificationData.additionalData && (
            <>
              <Text style={[PanelStyles.SubTitle, {marginTop: 10}]}>
                Additional Datas:
              </Text>
              <Text style={PanelStyles.Description}>
                {notificationData.additionalData.data1}
              </Text>
            </>
          )}
        </View>
      )}
    </SwipeablePanel>
  );
};

const PanelStyles = StyleSheet.create({
  ContentWrapper: {
    width: '100%',
    padding: 10,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  Title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark,
    fontWeight: '600',
  },
  SubTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.dark,
    fontWeight: '600',
  },
  Description: {
    marginTop: 10,
    fontSize: 18,
  },
});
