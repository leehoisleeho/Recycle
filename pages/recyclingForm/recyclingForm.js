import {
  createStoreBindings
} from "mobx-miniprogram-bindings";
import {
  store
} from "../../store/store";
import api from '../../API/api'
Page({
  data: {
    current: 1,
    visible: false,
    id: undefined,
    CategoryInfo: null,
    imgurl: '',
    categorylist: [],
    isShow: false,
    category_id: null
  },
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ["weight", "address", "time", "addressId", "isDialog_form"],
      actions: ["setIsDialog_form", "setCategoryType"],
    });
    let id = options.id
    this.setData({
      id: id,
      category_id: Number(id)
    })
    this.getPageData()
  },
  async getPageData() {
    let data = await api.getCategoryInfo({
      category_id: this.data.id
    })
    data = data.data.data
    this.setCategoryType(data.list[0].title)
    let imgurl = 'http://recycleapi.haochentech.ltd' + data.list[0].image
    let categorylist = data.list[0].categorylist
    this.setData({
      CategoryInfo: data,
      imgurl: imgurl,
      categorylist: categorylist,
      isShow: true
    })
  },
  onChange(event) {
    const {
      value
    } = event.detail;
    this.setData({
      current: value,
    });
  },
  statement() {
    this.setData({
      visible: true,
    });
  },
  closeDrawer(e) {
    this.setData({
      visible: false,
    });
  },
  // 判断要上传的值是不是为空
  judge() {
    console.log("weight:" + this.data.weight)
    console.log("time:" + this.data.time)
    console.log("address:" + this.data.address)
    console.log("id:" + this.data.addressId)
    // this.setIsDialog_form(true)
    if(!this.data.weight){
      wx.showToast({
        title: '请选择重量',
        icon:"error"
      })
    }else if(!this.data.time){
      wx.showToast({
        title: '请选择预约时间',
        icon:"error"
      })
    }else if(this.data.address === '请选择地址'){
      wx.showToast({
        title: '请选择预地址',
        icon:"error"
      })
    }else{
      this.setIsDialog_form(true)
    }
  },
  isShowDialog() {
    this.judge()
  },
  // 提交
  submit() {
    api.submitOrder({
      category_id:this.data.category_id,
      weight:this.data.weight,
      appointment_time:this.data.time,
      address_id:this.data.addressId
    }).then(res=>{
      wx.showToast({
        title: '提交成功',
        icon:'success'
      })
    })
  }
});