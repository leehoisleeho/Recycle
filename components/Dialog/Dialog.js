const app = getApp()
import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { store } from "../../store/store";
Component({
  behaviors: [storeBindingsBehavior],
  data: {
    confirmBtn: {
      content: '确认提交',
    }
  },
  storeBindings: {
    store,
    fields: {
      // numA: () => store.numA,
      // numB: (store) => store.numB,
      // sum: "sum",
      info:()=> store.info,
      isDialog:()=>store.isDialog,
      add:()=>store.add
    }
  },
  methods: {
    confirm(){
      this.data.add.addAddress(this.data.info).then(res=>{
        wx.navigateTo({
          url: '../../pages/address/address',
        })
      })
      this.setData({
        isDialog:false
      })
    },
  }
});