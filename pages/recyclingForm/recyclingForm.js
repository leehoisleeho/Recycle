Component({
  data: {
    current: 1,
    visible:false
  },
  methods: {
    onChange(event) {
      const {
        value
      } = event.detail;
      this.setData({
        current: value
      });
    },
    statement() {
      this.setData({
        visible: true
      })
    },
    closeDrawer(e) {
      this.setData({
        visible: false
      })
    },
  },
});