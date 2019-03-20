import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import { screen, system } from '../../utils';

export default class TextInputModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      text: '',
      textFlag: false, // 发送按钮是否高亮
    };
  }


  switchDisplay() {
    this.setState({
      display: !this.state.display,
    });
  }

  comment() {
    if (this.state.textFlag) {
      DeviceEventEmitter.emit('Comment', this.state.text);
      this.setState({
        display: !this.state.display,
        text: '',
        textFlag: false,
      });
    }
  }

  updateText(text) {
    this.setState({
      text,
    });
  }

  render() {
    return (
      <View style={[styles.container, { height: this.state.display ? '100%' : 0 }]}>
        <TouchableOpacity
          style={{
            width: '100%', flex: 1,
          }}
          onPress={() => {
            this.switchDisplay();
          }}
        />
        {
          this.state.display ?
            <KeyboardAvoidingView
              behavior="height"
              keyboardVerticalOffset={system.isIOS ? 63.5 : 0}
            >
              <View style={styles.mainContainer}>
                <View style={styles.inputContainer} >
                  <TextInput
                    autoFocus
                    onChangeText={(text) => {
                      const myText = text.trim();
                      if (myText) {
                        this.setState({ text: myText, textFlag: true });
                      } else {
                        this.setState({ text: myText, textFlag: false });
                      }
                    }}
                    onSubmitEditing={() => { // 点击键盘上的 提交按钮
                      this.comment();
                    }}
                    underlineColorAndroid="transparent"
                    placeholder="请输入评论"
                    style={styles.textInput}
                    multiline
                    maxLength={500}
                    keyboardType="default"
                  />
                </View>
                <TouchableOpacity
                  style={[styles.commentContainer, { backgroundColor: this.state.textFlag ? '#ffc601' : '#dedfe0' }]}
                  onPress={() => {
                    this.comment();
                  }}
                >
                  <Text style={{ color: this.state.textFlag ? '#fff' : '#a8a8a8' }}>发送</Text>
                </TouchableOpacity>
              </View>
              {/* <View style={{ height: 100, backgroundColor: '#fff' }} /> */}
            </KeyboardAvoidingView>
            : null
        }
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 9999,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  mainContainer: {
    maxHeight: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: '#f5f5f9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#b9bfc7',
  },

  inputContainer: {
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#b9bfc7',
    width: '85%',
    maxHeight: 80,
  },
  textInput: {
    textAlignVertical: 'center',
    maxHeight: 80,
    padding: 0,
    fontSize: 16,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  // 发送按钮
  commentContainer: {
    width: '12%',
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
});

