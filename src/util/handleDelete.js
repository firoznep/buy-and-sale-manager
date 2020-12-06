import {Alert} from 'react-native';
import {Products} from '../database';

export const dltAllPro = () => {
  Products.perform(function (db) {
    Products.data().forEach(function (item) {
      db.remove(item);
    });
  });
  alert('deleted all');
};

export const handleDelete = (products, item) => {
  Alert.alert(
    'Are you sure you want to delete this item?',
    'Item will be deleted permanently!',
    [
      {
        text: 'Cancel',
        onPress: () => {
          return;
        },
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          let id = products.get({id: item.id});
          products.remove(id);
          alert('Deleted');
        },
      },
    ],
    {cancelable: false},
  );
};
