import { createStoreBindings } from "mobx-miniprogram-bindings";
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
      fields: ["weight", "address", "time", "addressId","isDialog_form"],
      actions: ["setIsDialog_form","setCategoryType"],
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
  judge(){
    if(this.data.weight&this.data.time&this.data.this.addressId&this.data.address){
      console.log('全部值不为空')
    }
  },
  isShowDialog(){
    this.setIsDialog_form(true)
  },
  // 提交
  submit() {
    console.log("weight:" + this.data.weight)
    console.log("time:" + this.data.time)
    console.log("address:" + this.data.address)
    console.log("id:" + this.data.addressId)
    
  }
});