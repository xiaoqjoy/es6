import { StyleSheet } from 'react-native';
import screen from '../../utils/screen';

const detailStyles = StyleSheet.create({
  block: {
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingLeft: 15,
  },
  mtblock: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingLeft: 15,
  },
  f18: {
    fontSize: 18,
  },
  f16: {
    fontSize: 16,
  },
  f14: {
    fontSize: 14,
  },
  f12: {
    fontSize: 12,
  },
  ca8a8a8: {
    color: '#a8a8a8',
  },
  c3a3a3a: {
    color: '#3a3a3a',
  },
  cffc601: {
    color: '#ffc601',
  },
  cffa200: {
    color: '#ffa200',
  },
  address: {
    color: '#00afec',
    fontSize: 14,
    paddingRight: 15,
    lineHeight: 20,
  },
  agentContent: {
    flexDirection: 'row',
    height: 50,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#e7e8ea',
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
  },
  agentMain: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: '#e7e8ea',
  },
  borderTop: {
    borderColor: '#e7e8ea',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  borderBottom: {
    borderColor: '#e7e8ea',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  borderToporange: {
    borderColor: '#ffa200',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  ptb20: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  mt20: {
    marginTop: 20,
  },
  orange: {
    color: '#ffa200',
  },

  textView: {
    // flex: 1,
    flexDirection: 'column',
  },
  moreView: {
    alignItems: 'center',
  },
  leftText: {
    width: 90,
  },
  rightText: {
    flex: 1,
  },
  innerMargin: {
    marginRight: 15,
  },
  inner: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingRight: 15,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexleftContainer: {
    flexDirection: 'row',
  },
  flexRow: {
    flexDirection: 'row',
    marginTop: 15,
  },
  flexCol: {
    flexDirection: 'column',
  },
  flexPadd: {
    paddingRight: 15,
  },
  txt: {
    color: '#a8a8a8',
    fontSize: 14,
    lineHeight: 20,
  },
  txtRight: {
    paddingRight: 15,
  },
  subtxt: {
    fontSize: 14,
    lineHeight: 20,
    color: '#3a3a3a',
  },
  rslink: {
    lineHeight: 22,
  },
  titletxt: {
    color: '#3a3a3a',
    fontSize: 18,
    lineHeight: 22,
  },
  titletip: {
    fontSize: 14,
    color: '#a8a8a8',
    lineHeight: 22,
  },
  lists: {
    fontSize: 16,
    color: '#a8a8a8',
    paddingTop: 18,
    paddingBottom: 18,
    backgroundColor: '#fff',
    paddingRight: 15,
  },
  more: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  vc: {
    alignItems: 'center',
  },
  hc: {
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#f5f5f9',
  },
  overlay: {
    justifyContent: 'center',
    backgroundColor: 'rgba(56, 56, 56, 0.8)',
    position: 'absolute',
    width: screen.width,
    height: screen.height,
    left: 0,
    top: 0,
    zIndex: 99,
    elevation: 99,
  },
});

export default detailStyles;
