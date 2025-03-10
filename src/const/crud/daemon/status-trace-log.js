

const DIC = {
  state: [{
    label: '准备中',
    value: 'TASK_STAGING'
  },
  {
    label: '执行中',
    value: 'TASK_RUNNING'
  }, {
    label: '已经完成',
    value: 'TASK_FINISHED'
  }
  ]
}

export const tableOption = {
  border: true,
  index: true,
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  editBtn: false,
  delBtn: false,
  searchMenuSpan: 6,
  addBtn: false,
  viewBtn: true,
  column: [{
    label: 'ID',
    prop: 'id',
    hide: true
  },
  {
    label: '作业名称',
    prop: 'jobName',
    search: true
  },
  {
    label: '原任务',
    prop: 'originalTaskId',
    hide: true,
    width: 100
  },
  {
    label: '任务ID',
    prop: 'taskId',
    hide: true
  },
  {
    label: '服务器IP',
    prop: 'slaveId'
  },
  {
    label: '资源',
    prop: 'source',
    hide: true
  },
  {
    label: '执行类型',
    prop: 'executionType',
    hide: true
  },
  {
    width: 100,
    label: '分片项',
    prop: 'shardingItem'
  },
  {
    width: 100,
    label: '状态',
    prop: 'state',
    type: 'select',
    dicData: DIC.state,
    search: true
  },
  {
    label: '消息',
    prop: 'message',
    width: 100,
    overHidden: true,
    hide: true
  },
  {
    label: '创建时间',
    prop: 'creationTime'
  }
  ]
}
