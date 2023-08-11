import Toast from 'tdesign-miniprogram/toast/index';

Component({
  data: {
    visible: false,
    closeBtn: true,
    images: [],
    index:0
  },
  methods: {
    showSuccessToast() {
      Toast({
        context: this,
        selector: '#t-toast',
        message: `请点击左上角关闭按钮`,
      });
    },
    onClick() {
      this.setData({
        images: [
          'https://tdesign.gtimg.com/miniprogram/images/swiper1.png',
          'https://tdesign.gtimg.com/miniprogram/images/swiper2.png',
          'https://tdesign.gtimg.com/miniprogram/images/swiper1.png',
          'https://tdesign.gtimg.com/miniprogram/images/swiper2.png',
          'https://tdesign.gtimg.com/miniprogram/images/swiper1.png',
          'https://tdesign.gtimg.com/miniprogram/images/swiper2.png',
        ],
        showIndex: true,
        visible: true,
      });
    },
    onClose(e) {
      const {
        trigger
      } = e.detail;
      if (trigger == "overlay") {
        this.showSuccessToast()
      } else if (trigger == "button") {
        console.log('2')
        this.setData({
          visible: false,
        });
      }
    },
    onChange(e){
      this.setData({
        index:e.detail.index
      })
    }
  },
});
