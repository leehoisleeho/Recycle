const data = {
  areaList: [
    {
      label: '云南省',
      children: [
        {
          label: '红河哈尼彝族自治州',
          children: [
            { label: '蒙自市' },
          ],
        },
      ],
    },
  ],
}
Component({
  data: {
    options: data.areaList,
    note: '请选择地址',
    visible: false,
  },
  methods: {
    showCascader() {
      this.setData({ visible: true });
    },
    onPick(e) {
      
    },
    onChange(e) {
      const { selectedOptions } = e.detail;
      this.setData({
        note: selectedOptions.map((item) => item.label).join('/'),
      });
    },
  },
});
