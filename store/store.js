/**
 * 全局状态管理
 */
import { observable, action } from 'mobx-miniprogram';
export const store = observable({
  // 订单提交
  weight: '',
  address: '',
  time:'',
  setWeight: action(async function (value) { 
    this.weight = value;
  }),
  setTime:action(function(value){
    this.time = value
  }),
  setAddress:action(function(value){
    this.address = value
  })
});