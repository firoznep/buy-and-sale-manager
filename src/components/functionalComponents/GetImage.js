import React, {useState} from 'react';
import {Image, View} from 'react-native';

import {
  getImageFromCamera,
  pickImageFromGallery,
} from '../../util/cropImagePicker';
import BasicButton from '../basicComponents/BasicButton';

const GetImage = ({setImgData}) => {
  const [iData, setIData] = useState('');

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          marginVertical: 5,
          justifyContent: 'space-between',
          // padding: 15,
        }}>
        {iData === '' ? (
          <>
            <BasicButton
              iconName="images"
              title="Pick From Gallery"
              onPress={() => pickImageFromGallery(setIData, setImgData)}
            />
            <BasicButton
              iconName="camera"
              title="Open Camera"
              onPress={() => getImageFromCamera(setIData, setImgData)}
            />
          </>
        ) : (
          <>
            <Image
              source={{
                uri: `data:${'image/jpeg'};base64,${iData}`,
              }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 10,
                // backgroundColor: 'gray',
              }}
            />
            <BasicButton
              title="Reset Image"
              onPress={() => setIData('')}
              style={{alignSelf: 'center'}}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default GetImage;
