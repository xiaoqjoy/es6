// 我的贷款
import ProductIncome from '@/components/Product-income/Product-income'
// 还款操作指引
import repaymentGuidelines from '@/components/repayment-guidelines/repayment-guidelines'
// 协议支付绑卡指引
import alipayGuidelines from '@/components/alipay-guidelines/alipay-guidelines'
// 还款计划信息(1)
import ProductCart from '@/components/Product-cart/Product-cart'
// 还款计划信息(2)
import repaymentSchedule from '@/components/repayment-schedule/repayment-schedule'
// 还款计划信息(3)
import repaymentScheduleTen from '@/components/repayment-schedule-ten/repayment-schedule-ten'
// 个人信息认证
import personalInformation from '@/components/personal-information/personal-information'
// 银行卡签约首页
import verificationPlatform from '@/components/verification-platform/verification-platform'
// 绑卡签约
import cardList from '@/components/card-list/card-list'
// 银行卡签约(2)
import cardSigning from '@/components/card-signing/card-signing'
// 我的还款卡
import creditCard from '@/components/credit-card/credit-card'
// 验证不通过就跳一个空页面
import emptyPage from '@/components/empty-page/empty-page'
// 操作指引
import operation from '@/components/operation/operation'

// 定义路由的规则以及匹配的组件
const routes = [
  {
    path: '/',
    redirect: '/personal-information'
  },
  {
    path: '/verification-platform',
    name: 'verification-platform',
    component: verificationPlatform
  },
  {
    path: '/credit-card',
    name: 'credit-card',
    component: creditCard
  },
  {
    path: '/card-list',
    name: 'card-list',
    component: cardList
  },
  {
    path: '/card-signing',
    name: 'card-signing',
    component: cardSigning
  },
  {
    path: '/empty-page',
    name: 'empty-page',
    component: emptyPage
  },
  {
    path: '/product-income',
    name: 'Product-income',
    component: ProductIncome
  },
  {
    path: '/repayment-guidelines',
    name: 'repayment-guidelines',
    component: repaymentGuidelines
  },
  {
    path: '/alipay-guidelines',
    name: 'alipay-guidelines',
    component: alipayGuidelines
  },
  {
    path: '/product-cart',
    name: 'product-cart',
    component: ProductCart
  },
  {
    path: '/repayment-schedule',
    name: 'repayment-schedule',
    component: repaymentSchedule
  },
  {
    path: '/repayment-scheduleTen',
    name: 'repayment-scheduleTen',
    component: repaymentScheduleTen
  },
  {
    path: '/personal-information',
    name: 'personal-information',
    component: personalInformation
  },
  {
    path: '/operation',
    name: 'operation',
    component: operation
  }
]
export default routes