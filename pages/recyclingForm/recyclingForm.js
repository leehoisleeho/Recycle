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
      CategoryInfo:null,
      imgurl:'',
      categorylist:[],
      isShow:false
    },
  },
  data: {
    current: 1,
    visible: false,
  },
  onLoad(options){
    let id = options.id
    this.setData({
      id
    })
    this.getPageData()
  },
  async getPageData(){
    let  data = await api.getCategoryInfo({category_id:this.data.id})
    data = data.data.data
    let imgurl = 'http://recycleapi.haochentech.ltd' + data.list[0].image
    let categorylist = data.list[0].categorylist
    this.setData({
      CategoryInfo:data,
      imgurl:imgurl,
      categorylist:categorylist,
      isShow:true
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

  // 提交
  sub() {
    console.log(this.data.weight)
    console.log(this.data.time)
    console.log(this.data.address)
  }
});