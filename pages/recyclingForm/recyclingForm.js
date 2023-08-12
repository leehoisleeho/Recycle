import {
  storeBindingsBehavior
} from "mobx-miniprogram-bindings";
import {
  store
} from "../../store/store";
import api from '../../API/api'
Page({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: {
      weight: "weight",
      address: "address",
      time: "time",
      id:undefined,
      CategoryInfo:null
    },
  },
  data: {
    current: 1,
    visible: false,
  },
  onLoad(options){
    let id = 6
    this.setData({
      id
    })
    this.getPageData()
  },
  async getPageData(){
    const data = await api.getCategoryInfo({category_id:this.data.id})
    console.log(data.data.data)

    this.setData({
      CategoryInfo:data
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
  // 提交
  sub() {
    console.log(this.data.weight)
  }
});