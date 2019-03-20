import { StyleSheet } from 'react-native';
import { screen, system } from '../utils';

const baseStyles = StyleSheet.create({
  fz10: {
    fontSize: 10,
  },

  fz12: {
    fontSize: 12,
  },

  fz14: {
    fontSize: 14,
  },

  fz16: {
    fontSize: 16,
  },

  fz18: {
    fontSize: 18,
  },

  fz20: {
    fontSize: 20,
  },

  fz25: {
    fontSize: 25,
  },

  colorFff: {
    color: '#fff',
  },

  colorCcc: {
    color: '#ccc',
  },

  colorF91: {
    color: '#f91',
  },

  colorF7e: {
    color: '#7e7e7e',
  },

  colorEa5: {
    color: '#ea5532',
  },

  colorA95: {
    color: '#00a95f',
  },

  colorAfe: {
    color: '#00afec',
  },

  colorA3a: {
    color: '#3a3a3a',
  },

  color333: {
    color: '#333',
  },

  colorA8: {
    color: '#a8a8a8',
  },

  colorFfa: {
    color: '#ffa200',
  },


  lightGray: {
    color: '#7e7e7e',
  },


  yellow: {
    color: '#ffc601',
  },

  orange: {
    color: '#ff9911',
  },


  lightOrange: {
    color: '#ffa200',
  },

  red: {
    color: '#ff1515',
  },

  lightBlue: {
    color: '#ebfbff',
  },


  blue: {
    color: '#0ca1ee',
  },

  lightGreen: {
    color: '#e5fff8',
  },

  green: {
    color: '#0ab271',
  },
  purple: {
    color: '#d5a2fc',
  },

  ftBold: {
    fontWeight: 'bold',
  },

  container: {
    backgroundColor: '#f5f5f9',
    flex: 1,
  },


  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  marginB10: {
    marginBottom: 10,
  },

  marginT10: {
    marginTop: 10,
  },

  marginB8: {
    marginBottom: 8,
  },

  marginT8: {
    marginTop: 8,
  },

  marginL15: {
    marginLeft: 15,
  },

  overlay: {
    justifyContent: 'center',
    backgroundColor: '#999',
    opacity: 0.4,
    position: 'absolute',
    width: screen.width,
    height: screen.height,
    left: 0,
    top: 0,
    zIndex: 99,
    elevation: 99,
  },
});

export default baseStyles;
