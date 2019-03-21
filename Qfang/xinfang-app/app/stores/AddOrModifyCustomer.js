import { observable, action, extendObservable, set } from 'mobx';
import axios from 'axios';
// 调用原生app模块
import { QFReactHelper } from '../common/NativeHelper';

export default class AddOrModifyCustomer {

  @observable loading = false;
  @observable submit = false;

  @observable submitParams = {
    advisoryTime: '',
    customerGroupId: '',
    customerGroupName: '',
    customerId: '',
    customerIntentionList: [{
      intentionAreaId: '',
      intentionAreaName: '',
      intentionCityId: '',
      intentionCityName: '',
      intentionCountyId: '',
      intentionCountyName: '',
      intentionGardenId: '',
      intentionGardenName: '',
      intentionId: '',
      layout: '',
      maxArea: 0,
      maxPrice: 0,
      minArea: 0,
      minPrice: 0,
    }],
    customerName: '',
    id: '',
    notFollowNum: 0,
    phone: '',
    privateSourceStr: '',
    registerDate: '',
    remark: '',
    customerSource: '',
    customerSourceDesc: '',
  }


  // 传入初始值
  constructor(props) {
    if (props) {
      const navigation = props.navigation || {};
      const { params = {} } = navigation.state;
      extendObservable(this, { params });
    }

  }

  @action
  changeSubmit(boolean) {
    this.submit = boolean;
  }

  @action
  changeLoading(boolean) {
    this.loading = boolean;
  }


  @action
  async getData() {
    this.loading = true;
    const detail = await axios.get('customer/private/getItem', {
      params: { id: this.params.id, operateType: 'edit' }
    })
      .then((res) => {
        this.loading = false;

        if (res.data.status !== 'C0000') {
          this.status = 'request-failed';
          return {};
        }

        return res.data.result;

      })
      .catch((error) => {
        this.status = 'network-error';

        QFReactHelper.show('服务器异常', 3);
        return {};
      });

    const { customerIntentionList = [] } = detail;


    if (customerIntentionList.length) { // 后端传过来多余字段，但是提交时 不删除会报错
      detail.customerIntentionList.forEach(item => {
        delete item.avgMaxPrice
        delete item.avgMinPrice
      })
    }


    set(this.submitParams, detail);

  }

}
