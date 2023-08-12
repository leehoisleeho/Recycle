import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { store } from "../../store/store";
Component({
  behaviors: [storeBindingsBehavior],
  data: {
    description:'请填写详细地址',
  },
  storeBindings: {
    store,
    fields: {
      address:()=>store.address
    }
  },
  methods:{
    ToAddress(){
      wx.navigateTo({
        url: '/pages/address/address',
      })
    }
  }
});
