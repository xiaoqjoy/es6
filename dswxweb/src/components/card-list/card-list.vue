<template>
  <div class="card-list">
    <div v-if="cardList.length>0">
      <div class="card-item" v-for="(item, index) in cardList" :key="index">
        <div class="item-applyno-box">
          <span class="applyno-item">出账编号</span>
          <span class="applyno-val">{{item.loanNo}}</span>
        </div>
        <p class="item-partner">{{item.partnerName}}</p>
        <div class="item-bank">
          <span
            class="bank-no"
          >{{item.accountNo.match(/^(.{4})/)[1]}}&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;{{item.accountNo.match(/.*(.{4})/)[1]}}</span>
          <p class="bank-btn" @click="tosign(item.bankName, item.accountNo, item.accountOwner)">
            银行卡签约
            <img src="../../assets/ic_arrow_right_2@2x.png" alt />
          </p>
        </div>
      </div>
      <p class="link" @click="guidelines">
        <span>协议支付签约指引</span>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { laappApi } from "../js/server.js"; // 接口
export default {
  data() {
    return {
      cardList: []
    };
  },
  mounted() {
    console.log(
      'JSON.parse(localStorage.getItem("useTokenBank"))',
      JSON.parse(localStorage.getItem("useTokenBank"))
    );
    this.myInterface();
  },
  methods: {
    guidelines() {
      this.$router.push("/alipay-guidelines");
    },
    // 我的还款卡接口
    myInterface() {
      axios({
        method: "get",
        url: `${laappApi.myCredit}`,
        // 请求头
        headers: {
          token: JSON.parse(localStorage.getItem("useTokenBank"))
        }
      }).then(res => {
        this.cardList = res.data.data.cardInfoDTOList;
        localStorage.setItem("myRepayment", JSON.stringify(res.data.data));
      });
    },
    tosign(cardName, cardNumbers, accountOwner) {
      localStorage.setItem("cardNameName", JSON.stringify(cardName));
      localStorage.setItem("cardNumbersNumbers", JSON.stringify(cardNumbers));
      localStorage.setItem("accountOwner", JSON.stringify(accountOwner));
      this.$router.push({ path: "/verification-platform" });
    }
  }
};
</script>
<style lang="scss" scoped>
.card-list {
  padding-top: 15px;
  background: #f0f4f7;
  width: 100%;
  height: 100%;
}
.card-item {
  margin: 0 15px 15px 15px;
  padding: 10px;
  background: #ffffff;
  font-family: PingFangSC-Regular;
  border-radius: 5px;
  .item-applyno-box {
    margin-bottom: 20px;
    .applyno-item {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #04223d;
      letter-spacing: -0.77px;
      margin-right: 15px;
    }
    .applyno-val {
      font-size: 14px;
      color: #a7a9a7;
    }
  }
  .item-partner {
    font-size: 14px;
    color: #a7a9a7;
    padding-bottom: 7px;
  }
  .item-partner::after {
    content: "";
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #d3d3d3;
    transform: scaleY(0.5);
  }
  .item-bank {
    padding-top: 11px;
    display: flex;
    justify-content: space-between;
    .bank-no {
      font-size: 15px;
      color: #4fbfbd;
    }
    .bank-btn {
      font-size: 13px;
      color: #a7a9a7;
      img {
        width: 6px;
        height: 11px;
      }
    }
  }
}
.no-data {
  text-align: center;
  margin-top: 50%;
  font-size: 16px;
}
.link {
  position: absolute;
  bottom: 26px;
  width: 100%;
  text-align: center;
  font-size: 0.16rem;
  color: #4fbfbd;
  letter-spacing: -0.68px;
}
</style>