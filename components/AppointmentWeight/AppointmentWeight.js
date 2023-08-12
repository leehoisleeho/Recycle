import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'
Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store:store,
    actions: ['setWeight'] // 将 store 中的 increment 方法绑定为 setData
  },
  data: {
    weightText:'请选择重量',
    weightVisible:false,
    description:'请确保回收物品不被浸湿',
    weightList: [
      { label: '10Kg-20Kg', value: '10Kg - 20Kg' },
      { label: '10kg-25kg', value: '10kg - 25kg' },
      { label: '25kg-50kg', value: '25kg - 50kg' },
      { label: '50kg-100kg', value: '50kg - 100kg' },
      { label: '100kg以上', value: '100kg以上' },
    ],
  },
  methods: {
    onColumnChange(e){
    },
    //点击确认
    onPickerChange(e) {
      this.setWeight(e.detail.value[0])
      this.setData({
        weightText:e.detail.value[0],
        areaValue:e.detail.value
      })
    },
    // 点击取消
    onPickerCancel(e) {
      this.setData({ weightVisible: false });
    },
    // 点击弹出选择
    onTitlePicker() {
      this.setData({ weightVisible: true });
    },
  },
});
