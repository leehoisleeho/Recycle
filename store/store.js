/**
 * 全局状态管理
 */
import { observable, action } from 'mobx-miniprogram';
export const store = observable({
  // 订单提交
  weight: '',
  address: '请选择地址',
  time:'',
  addressId:'',
  setWeight: action(async function (value) { 
    this.weight = value;
  }),
  setTime:action(function(value){
    this.time = value
  }),
  setAddress:action(function(value){
    this.address = value
  }),
  setaddressId:action(async function (value) { 
    this.addressId = value
  }),
  // 新增地址
  info:'',
  isDialog:'',
  add:'',
  setinfo: action(async function (value) { 
    this.info = value
  }),
  setIsDialog:action(async function (value) { 
    this.isDialog = value
  }),
  setAdd:action(async function (value) { 
    this.add = value
  }),

});