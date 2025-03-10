

export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  viewBtn: true,
  addBtn: false,
  editBtn: false,
  searchMenuSpan: 6,
  column: [{
    label: '用户ID',
    prop: 'id',
    align: 'center',
    slot: true,
  }, {
    label: '用户名',
    prop: 'username',
    align: 'center',
    search: true,
    slot: true,
  }, {
    label: '令牌',
    prop: 'access_token',
    align: 'center',
    overHidden: true
  }, {
    label: '类型',
    prop: 'token_type',
    align: 'center'
  }, {
    label: '过期时间',
    prop: 'expires_in',
    align: 'center'
  }]
}
