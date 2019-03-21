import React, { PureComponent } from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import screen from '../../utils/screen';
import axios from 'axios';
import FilterTab from './FilterTab';

import { QFReactHelper, UMNative } from '../../common/NativeHelper';

export default class Filter extends React.PureComponent {
  params = { page: 1 };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      broker: null,
      cities: null,
      area: null,
      search: null,
      isShow: false,
    };
  }

  componentDidMount() {
    this._requestInfo().then((res) => {
      if (res.data.status === 'C0000') {
        this._getQuery({ cityId: res.data.result.broker.area.id || '' });
      } else {
        this._getQuery({});
      }
    }).catch(() => {
      this._getQuery({});
    });
  }

  _getQuery(opts) {
    axios.all([
      this._requestInfo(),
      this._requestCity(),
      this._requestArea(opts),
      this._requestSearch(opts),
    ]).then(axios.spread((info, city, area, search) => {
      this.setState({
        isLoading: false,
        broker: info.data.result.broker,
        cities: city.data.result.cities,
        area: area.data.result,
        search: search.data.result,
      });
    }));
  }

  _requestInfo() {
    return axios.get('/info/detail');
  }

  _requestCity() {
    return axios.get('pub/service/getOpenCity');
  }

  _requestArea(opts) {
    return axios.get('garden/statisGarden', {
      params: {
        areaId: opts.cityId || '',
      },
    });
  }

  _requestSearch(opts) {
    return axios.get('garden/gardenSearchCriteria', {
      params: {
        cityId: opts.id || '',
      },
    });
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }

    const data = this.initData();

    return (
      <FilterTab data={data} tabSelected={-1} parent={this} singleTab={{ tab: '0,2' }} nSelected={0} click={this.onPress} />
    );
  }

  initData() {
    const data = {};
    const currentCity = this.state.broker.area.name;
    const cities = this.state.cities;
    data[currentCity] = {};
    data[currentCity][currentCity] = [];
    for (const i in cities) {
      data[currentCity][currentCity][i] = [];
      const childCity = cities[i];
      data[currentCity][currentCity][i].push({ text: i });
      for (const j in childCity) {
        data[currentCity][currentCity][i].push({ text: childCity[j].name, id: childCity[j].id });
      }
    }

    const word = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const _this = this;

    data[currentCity].render = function (styles, callback) {
      const single = [];
      const singleData = data[currentCity][currentCity];
      for (const i in singleData) {
        const child = singleData[i];
        for (const j in child) {
          if (word.indexOf(child[j].text) > -1) {
            single.push(<View style={[styles.right_pannel, { paddingLeft: 10, height: screen.height * 0.055, justifyContent: 'center' }]} key={child[j].text}><Text style={[styles.left_row, { color: '#bababb' }]}>{child[j].text}</Text></View>);
          } else {
            const hight = child[j].text === _this.params.cityName ? styles.active_blue : { color: '#3a3a3a' };
            const noBottomBorder = j == child.length - 1 ? 0 : 1;
            single.push(<TouchableOpacity
              onPress={() => callback.call(this, { text: child[j].text, type: 'city', data: { id: child[j].id } })}
              style={[styles.singleRow, { marginLeft: 10, borderBottomWidth: noBottomBorder }]}
              key={child[j].text}
            ><Text style={[styles.left_row, hight]}>{child[j].text}</Text>
                        </TouchableOpacity>);
          }
        }
      }
      return single;
    };

    const area = this.state.area.childArea; // 区域
    const areaData = [{ id: '', text: '不限', key: 'countyId' }];
    for (const i in area) {
      areaData.push({ id: area[i].id, text: area[i].name, key: 'countyId' });
    }

    const type = this.state.search.propertyType; // 类型

    const typeData = [{ id: '', text: '不限', key: 'propertyType' }];
    for (const i in type) {
      typeData.push({ id: i, text: type[i], key: 'propertyType' });
    }

    const price = this.state.search.price; // 均价

    const priceData = [{ id: '', text: '不限', key: 'avgPrice' }];
    for (const i in price) {
      const obj = price[i];
      for (const i in obj) {
        priceData.push({ id: i, text: obj[i], key: 'avgPrice' });
      }
    }

    const status = this.state.search.sellStatus; // 状态
    const statusData = [{ id: '', text: '不限', key: 'sellStatus' }];
    for (const i in status) {
      statusData.push({ id: i, text: status[i], key: 'sellStatus' });
    }

    data['区域'] = {
      区域: areaData,
      类型: typeData,
      均价: priceData,
      状态: statusData,
    };

    data['默认排序'] = {
      默认排序: [
        { text: '均价从高到低', data: { sort: 'avgPrice', orderBy: 'desc' }, type: 'sort' },
        { text: '均价从低到高', data: { sort: 'avgPrice', orderBy: 'asc' }, type: 'sort' },
        { text: '佣金比例从高到低', data: { sort: 'maxRetio', orderBy: 'desc' }, type: 'sort' },
        { text: '佣金比例从低到高', data: { sort: 'maxRetio', orderBy: 'asc' }, type: 'sort' },
        { text: '定佣从高到低', data: { sort: 'fixed', orderBy: 'desc' }, type: 'sort' },
        { text: '定佣从低到高', data: { sort: 'fixed', orderBy: 'asc' }, type: 'sort' },
      ],
      render(styles, callback) {
        const single = [];
        const singleData = data['默认排序']['默认排序'];
        for (const i in singleData) {
          const hight = singleData[i].text === _this.params.sortName ? styles.active_blue : { color: '#3a3a3a' };
          single.push(<TouchableOpacity
            style={[styles.singleRow, { marginLeft: 15 }]}
            key={i}
            onPress={callback.bind(null, { text: singleData[i].text, type: 'sort', data: singleData[i].data })}
          ><Text style={[styles.left_row, hight]} >{singleData[i].text}</Text>
                      </TouchableOpacity>);
        }
        return single;
      },
    };
    return data;
  }

  changeCity(id) {
    axios.get('pub/service/changeCity', {
      params: {
        cityId: id || '',
      },
    });
  }

  onPress(val) {
    const filterComponent = this.props.parent;

    if (this.state.tabSelected === 1 && !filterComponent.state.isShow) {
      filterComponent.setState({ isShow: true });
    } else {
      filterComponent.setState({ isShow: false });
    }

    if (val.type && val.type === 'city') {
      filterComponent.params = {};
      filterComponent.params.cityId = val.data.id; // 设置城市id
      filterComponent.params.cityName = val.text;
      filterComponent._getQuery({ id: val.data.id, cityId: val.data.id });
      filterComponent.changeCity(val.data.id);
      // 刷新楼盘列表
      const gardenAll = filterComponent.props.parent;

      // 调用广告图
      gardenAll.requestImg({ cityId: val.data.id });
      gardenAll.params = filterComponent.params;
      gardenAll.listView.refresh();
      if (gardenAll.listView.getRows().length > 0) {
        gardenAll.listView.scrollToIndex({ animated: false, viewPosition: 0, index: 0 });
      }
      UMNative.onEvent('XF-GardenList-CityFilter');
    } else if (val.text === '区域' || val.text === '类型' || val.text === '均价' || val.text === '状态') {
      filterComponent.params[val.data.key] = val.data.id;
      UMNative.onEvent('XF-GardenList-AreaFilter');
    } else {
      filterComponent.params.sortName = val.text;
      const finalParams = Object.assign(filterComponent.params, val.data);
      // 刷新楼盘列表
      const gardenAll = filterComponent.props.parent;
      gardenAll.params = Object.assign(gardenAll.params, finalParams);
      gardenAll.listView.refresh();
      if (gardenAll.listView.getRows().length > 0) {
        gardenAll.listView.scrollToIndex({ animated: false, viewPosition: 0, index: 0 });
      }
      UMNative.onEvent('XF-GardenList-Sort');
    }
  }
}
