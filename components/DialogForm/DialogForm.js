import { createStoreBindings } from "mobx-miniprogram-bindings";
import { store } from "../../store/store";
Component({
  data: {
    confirmBtn: {
      content: '确认提交',
    }
  },
  
  methods: {
    confirm(){
      console.log(123)
    },
  }
});