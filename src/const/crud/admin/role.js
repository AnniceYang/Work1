
import {rule} from "@/util/validateRules";

export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  searchMenuSpan: 6,
  editBtn: false,
  delBtn: false,
  align: 'center',
  addBtn: false,
  viewBtn: false,
  column: [{
    label: '角色名称',
    prop: 'roleName',
    span: 24,
    rules: [
      {required: true, message: '角色名称不能为空', trigger: 'blur'},
      {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
    ],
    'search': false,
  }, {
    label: '角色标识',
    prop: 'roleCode',
    span: 24,
    editDisabled: true,
    rules: [
      {required: true, message: '角色标识不能为空', trigger: 'blur'},
      {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'},
      {validator: rule.validatorKey, trigger: 'blur'}
    ],
    'search': false,
  }, {
    width: 150,
    label: '角色描述',
    prop: 'roleDesc',
    overHidden: true,
    type: 'textarea',
    span: 24,
    row: true,
    minRows: 2,
    rules: [
      {max: 128, message: '长度在 128 个字符内', trigger: 'blur'}
    ]
  }, {
    label: '',
    prop: 'dsScope',
    formslot: true,
    showClomnu: false,
    hide: true
  }]
}
