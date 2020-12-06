import ImagePicker from 'react-native-image-crop-picker';

export const pickImageFromGallery = (setIData, setImgData) => {
  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true,
    includeBase64: true,
  })
    .then((image) => {
      setIData(image.data);
      setImgData(image.data);
    })
    .catch((err) => alert('Canceled by user', err));
};

export const getImageFromCamera = (setIData, setImgData) => {
  ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: true,
    includeBase64: true,
  })
    .then((image) => {
      setIData(image.data);
      setImgData(image.data);
    })
    .catch((err) => alert(err));
};
