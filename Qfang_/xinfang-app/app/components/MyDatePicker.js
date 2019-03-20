// 日期组件
import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import Icon from './Icon/';

export default class MyDatePicker extends Component {
  constructor(props) {
    super(props);
    const {
      mode, minDate, maxDate, format, onChangeText,
    } = this.props;
    if (format) {
      this.format = format;
    } else {
      this.format = 'YYYY-MM-DD';
    }

    if (mode) {
      this.mode = mode;
    } else {
      this.mode = 'date';
    }

    if (minDate) {
      this.minDate = `${this.getDateStr(0)} 00:00`;
    }

    if (maxDate) {
      this.maxDate = `${this.getDateStr(1)} 23:59`;
    }

    if (onChangeText) {
      this.onChangeText = onChangeText.bind(this);
    } else {
      this.onChangeText = () => { };
    }
  }

  state = { date: this.props.value || '' };

  getDateStr(AddDayCount) {
    const dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
    const y = dd.getFullYear();
    const m = dd.getMonth() + 1; // 获取当前月份的日期
    const d = dd.getDate();
    return `${y}-${m}-${d}`;
  }

  render() {
    return (
      <DatePicker
        date={this.state.date}
        placeholder="请选择日期"
        confirmBtnText="确认"
        cancelBtnText="取消"
        style={{ width: 180 }}
        mode={this.mode}
        format={this.format}
        minDate={this.minDate}
        maxDate={this.maxDate}
        customStyles={{
          dateInput: {
            borderWidth: 0,
            marginLeft: 10,
          },
        }}
        iconComponent={<Icon name="riqi" size={20} color="#f39800" />}
        onDateChange={(date, i) => {
          this.setState({ date });
          this.onChangeText(date);
        }}
      />
    );
  }
}
