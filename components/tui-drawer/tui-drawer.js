
Component({
  externalClasses:['tui-drawer-class'],
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    mask: {
      type: Boolean,
      value: true
    },
    maskClosable: {
      type: Boolean,
      value: true
    },
    //left right bottom top
    mode: {
      type: String,
      value: 'right'
    },
		//drawer z-index
		zIndex: {
      type: Number,
      optionalTypes:[String],
			value: 990
		},
		//mask z-index
		maskZIndex: {
      type: Number,
      optionalTypes:[String],
			value: 980
		},
		backgroundColor: {
			type: String,
			value: '#fff'
		}
  },
  methods: {
    handleMaskClick() {
      if (!this.data.maskClosable) {
        return;
      }
      this.triggerEvent('close', {});
    },
    stop(){}
  }
})
