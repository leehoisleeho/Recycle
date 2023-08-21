Component({
  properties: {
    value: {
      type: Number,
      optionalTypes: [String],
      value: 1,
      observer(val) {
        this.setValue()
      }
    },
    //最小值
    min: {
      type: Number,
      value: 1
    },
    //最大值
    max: {
      type: Number,
      value: 99
    },
    //迈步大小 1 1.1 10...
    step: {
      type: Number,
      value: 1
    },
    //是否禁用操作
    disabled: {
      type: Boolean,
      value: false
    },
    iconBgColor: {
      type: String,
      value: 'transparent'
    },
    radius:{
      type: String,
      value: '50%'
    },
    //加减图标大小 rpx
    iconSize: {
      type: Number,
      value: 24
    },
    iconColor: {
      type: String,
      value: "#333"
    },
    //input 高度
    height: {
      type: Number,
      value: 50
    },
    //input 宽度
    width: {
      type: Number,
      value: 90
    },
    //input 背景颜色
    backgroundColor: {
      type: String,
      value: "#f2f2f2"
    },
    //input 字体颜色
    color: {
      type: String,
      value: "#333"
    },
    //索引值，列表中使用
    index: {
      type: Number,
      value: 0
    },
    //自定义参数
    custom: {
      type: Number,
      value: 0
    }
  },
  data: {
    inputValue: 0
  },
  lifetimes: {
    attached: function () {
      this.setValue()
    }
  },
  methods: {
    setValue() {
      this.setData({
        inputValue: Number(this.data.value)
      })
    },
    toFixed(num, s) {
      let times = Math.pow(10, s)
      let des = num * times + 0.5
      des = parseInt(des, 10) / times
      return des + ''
    },
    getLen(val, step) {
      let len = 0;
      let lenVal = 0;
      //浮点型
      if (!Number.isInteger(step)) {
        len = (step + '').split('.')[1].length
      }
      //浮点型
      if (!Number.isInteger(val)) {
        lenVal = (val + '').split('.')[1].length
      }
      return Math.max(len, lenVal);
    },
    getScale(val, step) {
      let scale = 1;
      let scaleVal = 1;
      //浮点型
      if (!Number.isInteger(step)) {
        scale = Math.pow(10, (step + '').split('.')[1].length)
      }
      if (!Number.isInteger(val)) {
        scaleVal = Math.pow(10, (val + '').split('.')[1].length);
      }
      return Math.max(scale, scaleVal);
    },
    calcNum: function (type) {
      if (this.data.disabled || (this.data.inputValue == this.data.min && type === 'reduce') || (this.data.inputValue == this
          .data.max && type === 'plus')) {
        return;
      }
      const scale = this.getScale(this.data.inputValue, this.data.step)
      let len = this.getLen(this.data.inputValue, this.data.step);
      let num = Number(this.data.inputValue) * scale
      let step = this.data.step * scale
      if (type === 'reduce') {
        num -= step
      } else if (type === 'plus') {
        num += step
      }
      let value = this.toFixed(num / scale, len)
      if (value < this.data.min) {
        value = this.data.min;
      }
      if (value > this.data.max) {
        value = this.data.max;
      }

      this.handleChange(value, type)
    },
    plus: function () {
      this.calcNum("plus")
    },
    reduce: function () {
      this.calcNum("reduce")
    },
    input(e) {
      this.setData({
        inputValue: e.detail.value
      })
    },
    blur: function (e) {
      let value = e.detail.value
      if (value) {
        if (~value.indexOf(".") && Number.isInteger(this.data.step) && Number.isInteger(Number(value))) {
          value = value.split(".")[0]
        }
        value = Number(value)
        if (value > this.data.max) {
          value = this.data.max
        } else if (value < this.data.min) {
          value = this.data.min
        }
      } else {
        value = this.data.min
      }
      if ((value == this.data.value && value != this.data.inputValue) || !e.detail.value) {
        this.setData({
          inputValue: value
        })
      }
      this.handleChange(value, "blur")
    },
    handleChange(value, type) {
      if (this.data.disabled) return;
      this.triggerEvent('change', {
        value: Number(value),
        type: type,
        index: this.data.index,
        custom: this.data.custom
      })
    }
  }
})