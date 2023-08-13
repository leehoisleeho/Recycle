/**
 * 全局状态管理
 */
import {
  observable,
  action
} from 'mobx-miniprogram';
export const store = observable({
  // 订单提交
  weight: '',
  address: '请选择地址',
  time: '',
  addressId: '',
  isDialog_form: false,
  CategoryType: '',
  imgUrlList: [],
  setWeight: action(async function (value) {
    this.weight = value;
  }),
  setTime: action(function (value) {
    this.time = value
  }),
  setAddress: action(function (value) {
    this.address = value
  }),
  setaddressId: action(async function (value) {
    this.addressId = value
  }),
  setIsDialog_form: action(function (value) {
    this.isDialog_form = value
  }),
  setCategoryType: action(function (value) {
    this.CategoryType = value
  }),
  setImgUrlList: action(function (value) {
    this.imgUrlList = value
  }),
  // 新增地址
  info: '',
  isDialog: false,
  add: '',
  setinfo: action(async function (value) {
    this.info = value
  }),
  setIsDialog: action(async function (value) {
    this.isDialog = value
  }),
  setAdd: action(async function (value) {
    this.add = value
  }),

});