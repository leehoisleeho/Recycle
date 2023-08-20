import {
  storeBindingsBehavior
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../store/store'
Component({
  data: {
    timeText: '请预约时间',
    timeVisible: false,
    description: '服务时间:09:00-22:00',
    show: true,
    areaValue: [],
    day: [],
    defaultTime: [{
      label: '',
      value: ''
    }, ],
    time: [{
        label: "09:00-10:00",
        value: '09:00-10:00'
      },
      {
        label: "10:00-11:00",
        value: '10:00-11:00'
      },
      {
        label: "11:00-12:00",
        value: '11:00-12:00'
      },
      {
        label: "13:00-14:00",
        value: '13:00-14:00'
      },
      {
        label: "15:00-16:00",
        value: '15:00-16:00'
      },
      {
        label: "17:00-18:00",
        value: '17:00-18:00'
      },
      {
        label: "18:00-19:00",
        value: '18:00-19:00'
      },
    ]
  },
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store: store,
    actions: ['setTime'] // 将 store 中的 increment 方法绑定为 setData
  },
  methods: {
    // 滑动时触发的函数
    onColumnChange(e) {
      const {
        value,
        label
      } = e.detail;
      if (e.detail.index !== 0) {
        this.setData({
          show: false,
          areaValue: value
        })
        e.detail.index = 3
      } else if (e.detail.index !== 1) {
        this.setData({
          show: true,
          areaValue: value
        })
      }
    },
    //点击确认
    onPickerChange(e) {
      this.setData({
        timeText: e.detail.value[0] + " " + e.detail.value[1]
      })
      this.setTime(this.data.timeText)
    },
    // 点击取消
    onPickerCancel(e) {
      this.setData({
        timeVisible: false
      });
    },
    // 点击弹出选择
    onTitlePicker() {
      this.setData({
        timeVisible: true
      });
      this.getDay()
    },
    // 获取今天日期之后的五天
    getDay() {
      let day = [{
        label: '尽快上门',
        value: '尽快上门'
      }]
      let newDate = new Date()
      let year = newDate.getFullYear()
      let month = newDate.getMonth() + 1
      let date = newDate.getDate()
      for (let i = 1; i < 5; i++) {
        let obj = {}
        let newDay = date + i
        obj.label = `${year}年${month}月${newDay}日`
        obj.value = `${month}月${newDay}日`
        day.push(obj)
      }
      this.setData({
        day
      })
    }
  },
});