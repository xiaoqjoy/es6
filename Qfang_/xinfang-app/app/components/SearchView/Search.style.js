
import { StyleSheet } from 'react-native';

import { screen, system } from '../../utils';

const iosTop = system.isIphoneX ? 50 : 20;

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 46,
  },

  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: system.isIOS ? iosTop : 0,
    height: screen.height - 20,
    backgroundColor: '#fff',
  },

  inputContainerStyle: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: '#e5e5e5',
  },

  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    backgroundColor: '#f4f4f4',
    borderRadius: 6,
    borderWidth: 0,

    marginTop: 7,
    marginBottom: 7,
  },
  searchIcon: {
    marginLeft: 10,
    marginRight: 5,
  },
  searchText: {
    fontSize: 14,
    color: '#7e7e7e',
  },
  inputStyleContainer: {
    width: screen.width - 76,
    height: 30,
    padding: 0,
    marginLeft: 15,
  },
  inputStyle: {
    width: screen.width - 110,
    height: 30,
    padding: 0,
    backgroundColor: '#f5f5f9',
  },

  button: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    marginHorizontal: 15,
    marginLeft: 0,
    color: '#3a3a3a',
  },

  listContainerStyle: {
  },
  listStyle: {
    borderWidth: 0,
    margin: 0,
  },
  itemRow: {
    marginLeft: 15,
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  itemText: {
    fontSize: 16,
    margin: 10,
    marginLeft: 0,
    color: '#9a9a9a',
  },
});
