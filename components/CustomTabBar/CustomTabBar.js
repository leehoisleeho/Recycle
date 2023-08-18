// components/CustomTabBar/CustomTabBar.js
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { store } from "../../store/store";
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  created(){
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['active'],
      actions: ["setactive"],
    });
  },
  /**
   * 组件的初始数据
   * 
   */
  data: {
    
  },
  /**
   * 组件的方法列表
   * switchTab 切换自定义tabbar
   */
  methods: {
    switchTab(e) {
      let index = Number(e.currentTarget.dataset.index)
      if(index === 0){
        this.setactive(index)
        wx.reLaunch({
          url: '/pages/staffIndex/staffIndex',
        })
      }else if(index === 1){
        this.setactive(index)
        wx.reLaunch({
          url: '/pages/staffCenter/staffCenter',
        });
      }
    }
  },
})