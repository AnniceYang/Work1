<template>
  <!-- 添加或修改菜单对话框 -->
  <el-dialog :title="!form.menuId ? $t('common.add') : $t('common.edit')" :visible.sync="visible" :close-on-click-modal="false" width="750px">
    <el-form ref="dataForm" :model="form" :rules="rules" label-width="130px">
      <el-row>
        <el-col :span="13">
          <el-form-item :label="$t('menuManage.menuType')" prop="type">
            <el-radio-group v-model="form.type" size="small">
              <el-radio-button label="0">{{$t('menuManage.left')}}</el-radio-button>
              <el-radio-button label="1">{{$t('menuManage.button')}}</el-radio-button>
              <el-radio-button label="2">{{$t('menuManage.top')}}</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item :label="$t('menuManage.previousMenu')">
            <treeselect v-model="form.parentId"
                        :options="menuOptions"
                        :normalizer="normalizer"
                        :show-count="true"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label="$t('menuManage.icon')" prop="icon" v-if="form.type !== '1'">
        <avue-input-icon v-model="form.icon" :icon-list="iconList"></avue-input-icon>
      </el-form-item>
      <el-form-item :label="$t('menuManage.name')" prop="name">
        <el-input v-model="form.name" :placeholder="$t('common.inputPrompt')"/>
      </el-form-item>
      <el-form-item :label="$t('menuManage.componentPath')" prop="path" v-if="form.type !== '1'">
        <el-input v-model="form.path" :placeholder="$t('common.inputPrompt')"/>
      </el-form-item>
      <el-form-item :label="$t('menuManage.permissionIdentification')" prop="permission" v-if="form.type === '1'">
        <el-input v-model="form.permission" :placeholder="$t('common.inputPrompt')" maxlength="50"/>
      </el-form-item>
      <el-row>
        <el-col :span="13">
          <el-form-item :label="$t('menuManage.sort')" prop="sort">
            <el-input-number v-model="form.sort" controls-position="right" :min="0"/>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item :label="$t('menuManage.buffer')" prop="keepAlive" v-if="form.type !== '1'">
            <el-radio-group v-model="form.keepAlive">
              <el-radio-button label="0">{{$t('common.no')}}</el-radio-button>
              <el-radio-button label="1">{{$t('common.yes')}}</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit">{{$t('common.sure')}}</el-button>
      <el-button @click="visible = false">{{$t('common.cancel')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {addObj, fetchMenuTree, getObj, putObj} from '@/api/admin/menu'
  import Treeselect from "@riophae/vue-treeselect"
  import iconList from '@/const/iconList'
  import TableForm from './'
  import "@riophae/vue-treeselect/dist/vue-treeselect.css"

  export default {
    name: "Menu",
    components: {Treeselect, TableForm},
    data() {
      return {
        // 遮罩层
        loading: true,
        // 菜单树选项
        menuOptions: [],
        // 是否显示弹出层
        visible: false,
        // 图标
        iconList: iconList,
        form: {
          menuId: undefined,
          name: undefined,
          path: undefined,
          icon: undefined,
          permission: undefined,
          type: '0',
          keepAlive: '0',
          sort: 999
        },
        // 表单校验
        rules: {
          name: [
            {required: true, message: this.$t('menuManage.validateName'), trigger: "blur"}
          ],
          sort: [
            {required: true, message: this.$t('menuManage.validateSort'), trigger: "blur"}
          ],
          path: [
            {required: true, message: this.$t('menuManage.validatePath'), trigger: "blur"}
          ],
          keepAlive: [
            {required: true, message: "", trigger: "blur"}
          ],
          // permission: [
          //   {required: true, message: "权限标识不能为空", trigger: "blur"}
          // ]
        }
      };
    },
    methods: {
      init(isEdit, id) {
        if (id != null) {
          this.form.parentId = id;
        }
        this.visible = true
        this.getTreeselect();
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (isEdit) {
            getObj(id).then(response => {
              this.form = response
            })
          } else {
            this.form.menuId = undefined
          }
        })
      },
      // 表单提交
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.form.parentId === undefined) {
              this.form.parentId = 0
            }

            if (this.form.menuId) {
              putObj(this.form).then(data => {
                this.$message.success(this.$t('common.successfulModification'))
                this.visible = false
                this.$emit('refreshDataList')
              });
            } else {
              addObj(this.form).then(data => {
                this.$message.success(this.$t('common.addedSuccessfully'))
                this.visible = false
                this.$emit('refreshDataList')
              })
            }
          }
        })
      },
      /** 查询菜单下拉树结构 */
      getTreeselect() {
        fetchMenuTree().then(response => {
          this.menuOptions = [];
          const menu = {id: 0, name: '根菜单', children: []};
          menu.children = response;
          this.menuOptions.push(menu);
        });
      },
      /** 转换菜单数据结构 */
      normalizer(node) {
        if (node.children && !node.children.length) {
          delete node.children;
        }
        return {
          id: node.id,
          label: node.name,
          children: node.children
        };
      }
    }
  };
</script>
