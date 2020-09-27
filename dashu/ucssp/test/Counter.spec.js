// 导入 Vue.js 和组件，进行测试
import Vue from 'vue'
import MyComponent from '../src/Counter.vue'

describe('MyComponent', () => {
  // 检查原始组件选项
  it('has a created hook', () => {
    expect(typeof MyComponent.created).to.eql('function')
  })
})