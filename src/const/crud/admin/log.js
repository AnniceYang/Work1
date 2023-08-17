import {avuTime} from '@/util/date'
export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  menuWidth: 150,
  align: 'center',
  refreshBtn: true,
  showClomnuBtn: false,
  searchSize: 'mini',
  searchMenuSpan: 6,
  addBtn: false,
  editBtn: false,
  viewBtn: true,
  props: {
    label: 'label',
    value: 'value'
  },
  column: [{
    label: '用户名',
    prop: 'username',
    search: true
  }, {
    label: '用户操作',
    prop: 'operation',
    search: true
  }, {
    label: '请求方法',
    prop: 'method'
  }, {
    label: '请求参数',
    prop: 'params',
    slot: true
  }, {
    label: '执行时长(毫秒)',
    prop: 'time'
  }, {
    width: 80,
    label: 'IP地址',
    prop: 'ip'
  }]
}
