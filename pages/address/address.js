import api from '../../API/api'
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { store } from "../../store/store";
Page({
  data: {
    addressList: [],
    msg:'什么内容都没有，请新增地址。',
    show:false
  },
  onLoad(options) {
    this.getPageData()
    this.storeBindings = createStoreBindings(this, {
      store,
      actions: ["setaddress"],
    });
  },
  async getPageData(){
    let  AddressList = await api.getAddressList()
    AddressList = AddressList.data.data
    this.setData({
      addressList:AddressList
    })
    if(this.data.addressList.length === 0){
      this.setData({
        show:true
      })
    }else{
      this.setData({
        show:false
      })
    }
  },
  toaddAddress() {
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },
  // 选择地址后 返回表单页面
  toFrom(e){
    let info = e.currentTarget.dataset.info
    this.setaddress(info)
    console.log(info)
    // wx.navigateBack({
    //   delta: 1 // 返回的页面数，1 表示返回到前一个页面
    // });
  }
});