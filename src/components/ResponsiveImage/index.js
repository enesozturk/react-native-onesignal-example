import React, {useState, useEffect} from 'react';

import {View, Image, Dimensions} from 'react-native';

export const FULL_WIDTH = Dimensions.get('window').width;

export const ResponsiveImage = ({
  parentWidth = FULL_WIDTH,
  src,
  fromLocal,
  widthPercentage = 1,
  imageStyles,
}) => {
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);

  useEffect(() => {
    if (fromLocal) {
      const {width, height} = Image.resolveAssetSource(src);
      setImageWidth(width);
      setImageHeight(height);
    } else
      Image.getSize(src, (width, height) => {
        setImageWidth(width);
        setImageHeight(height);
      });
  }, []);

  return (
    <View
      style={[
        {
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'transparent',
          marginVertical: 10,
        },
      ]}>
      {imageWidth && imageHeight && (
        <Image
          style={{
            flex: 1,
            alignSelf: 'center',
            height:
              (parentWidth * widthPercentage) / (imageWidth / imageHeight),
            resizeMode: 'cover',
            ...imageStyles,
          }}
          resizeMode="contain"
          source={fromLocal ? src : {uri: src}}
        />
      )}
    </View>
  );
};
