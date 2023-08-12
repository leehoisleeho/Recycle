Component({
  data: {
    confirmBtn: {
      content: '确定',
      variant: 'base'
    },
    dialogKey: '',
    showConfirm: false,
    showWarnConfirm: false,
    showTooLongBtnContent: false,
    showMultiBtn: false,
    content:`
      姓名:李浩
      地址：蒙自市红竺园B区联8-1
      电话：18608735101
    `,
    multiBtnList: [{
        content: '次要按钮',
        theme: 'light'
      },
      {
        content: '次要按钮',
        theme: 'light'
      },
      {
        content: '主要按钮',
        theme: 'primary'
      },
    ],
  },
  properties: {
    
  },
  methods: {
    showDialog(e) {
      const {
        key
      } = e.currentTarget.dataset;
      this.setData({
        [key]: true,
        dialogKey: key
      });
    },
    closeDialog() {
      this.data;
      this.setData({
        isDialog: false
      });
    },
  },
});