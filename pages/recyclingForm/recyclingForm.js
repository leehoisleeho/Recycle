import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { store } from "../../store/store";

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: {
      weight: "weight",
      address: "address",
      time: "time",
    },
  },
  data: {
    current: 1,
    visible: false,
  },
  methods: {
    onChange(event) {
      const { value } = event.detail;
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
    sub(){
      console.log(this.data.weight)
    }
  },
});
