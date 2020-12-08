import {StyleSheet} from 'react-native';
import {colors} from '../colors/colors';

export const styles = StyleSheet.create({
  basicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },

  baslicBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.fbBlue,
    marginVertical: 5,
    justifyContent: 'center',
  },

  crud: {
    backgroundColor: 'red',
    borderWidth: 0,
    minWidth: 70,
    height: '45%',
  },

  childItem: {
    marginVertical: 2,
    borderLeftWidth: 1,
    // borderBottomWidth: 1,
    borderColor: colors.fbBlue,
    paddingLeft: 5,
    // alignSelf: 'flex-start',
  },

  flatItemSeparator: {
    height: 3,
    width: '100%',
    backgroundColor: colors.phGray,
    alignSelf: 'center',
  },

  homeItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    elevation: 10,
  },

  listItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: 300,
    padding: 5,
    marginVertical: 5,
  },

  itemMainChild: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  modalView: {
    backgroundColor: 'rgba(11,23,44,.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalViewChild: {
    width: '95%',
    backgroundColor: colors.backGColor,
    padding: 5,
    borderRadius: 10,
    elevation: 10,
  },

  modalViewSubChild: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  roundBtn: {
    position: 'absolute',
    right: 45,
    bottom: 55,
    borderRadius: 50,
    width: 60,
    height: 60,
    backgroundColor: 'yellow',
    borderWidth: 0,
    elevation: 10,
    zIndex: 99,
  },

  renderItemSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.phGray,
  },

  selfAlign: {
    width: '100%',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },

  subChildItem: {color: colors.phGray, fontSize: 10},

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  underlineText: {
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    marginLeft: 5,
  },

  whiteBtn: {
    borderRadius: 0,
    borderWidth: 0,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
});
