import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../store/store'
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
      fields: ["info", "isDialog"],
      actions: ["setIsDialog"],
    });
  },
  methods: {
    closeDialog() {
      this.setIsDialog(false)
    },
    async confirm() {
      this.setIsDialog(false)
      let res = await this.triggerEvent('submit')
      
      // 
    },
  }
});