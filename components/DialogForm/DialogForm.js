import { createStoreBindings } from "mobx-miniprogram-bindings";
import { store } from "../../store/store";
Component({
  data: {
    confirmBtn: {
      content: '确认提交',
    }
  },
  attached() {
    // 组件被添加到页面时执行的操作
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['isDialog_form',"weight","address","time","CategoryType"],
      actions: ["setIsDialog_form"],
    });
  },
  methods: {
    //确认
    confirm(){
      this.setIsDialog_form(false)
      this.triggerEvent('submit')
    },
    closeDialog(){
      this.setIsDialog_form(false)
    }
  }
});