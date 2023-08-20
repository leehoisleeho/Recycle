import api from '../../API/api'
import {
  createStoreBindings
} from "mobx-miniprogram-bindings";
import {
  store
} from "../../store/store";
Page({
  data: {
    addressList: [],
    msg: '什么内容都没有，请新增地址。',
    show: false
  },
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      actions: ["setAddress", "setaddressId"],
    });
  },
  onShow() {
    this.getPageData()
  },

  async getPageData() {
    let AddressList = await api.getAddressList()
    AddressList = AddressList.data.data
    console.log(AddressList)
    this.setData({
      addressList: AddressList
    })
    if (this.data.addressList.length === 0) {
      this.setData({
        show: true
      })
    } else {
      this.setData({
        show: false
      })
    }
  },
  toaddAddress() {
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },
  // 选择地址后 返回表单页面
  toFrom(e) {
    let addressdetail = e.currentTarget.dataset.info.addressdetail
    let addressId = e.currentTarget.dataset.info.id
    this.setAddress(addressdetail)
    this.setaddressId(addressId)
    wx.navigateBack()
  }
});