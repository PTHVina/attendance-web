<template>
  <div class="test-container">
    <div class="left_box">
      <!-- 部门 -->
      <div class="tree_title">{{ $t('system.text_1') }}</div>
      <div class="tree_box">
        <el-tree
          class="tree_list"
          :data="datas"
          node-key="id"
          :props="defaultProps"
          :highlight-current="true"
          :expand-on-click-node="true"
          :check-on-click-node="true"
          :default-expanded-keys="defaultKey"
          @node-click="handleNodeClick"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span class="tree_btn">
              <!-- 添加 -->
              <i
                v-if="node.level < 5"
                class="el-icon-circle-plus-outline"
                @click="() => appendNode(data)"
              >
                {{ $t('operation_btn.btn_text_1') }}
              </i>
              <!-- 删除 -->
              <i
                v-if="node.level != 1"
                class="del_btn el-icon-remove-outline"
                @click="() => removeNode(node, data)"
              >
                {{ $t('operation_btn.btn_text_2') }}
              </i>
            </span>
          </span>
        </el-tree>
      </div>
      <!-- 去除添加一级部门 -->
      <div v-if="false" class="tree_add" @click="appendNode({ id: '0' })">
        {{ $t('system.text_6') }}
      </div>
    </div>
    <div class="info_box">
      <!-- 部门详情 -->
      <div class="tree_title">{{ $t('system.text_2') }}</div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        :label-width="
          lang == 'Jan_JPN'
            ? '110px'
            : lang == 'en_US'
            ? '200px'
            : lang == 'Fr_fr'
            ? '210px'
            : '80px'
        "
        class="demo-ruleForm"
      >
        <!-- 编码 -->
        <el-form-item :label="$t('system.title_1')" prop="code">
          <el-input v-model="ruleForm.no" disabled></el-input>
        </el-form-item>
        <!-- 部门名称 -->
        <el-form-item :label="$t('system.title_2')" prop="name">
          <el-input v-model="ruleForm.name" :disabled="!ruleForm.id"></el-input>
        </el-form-item>
        <!-- 公司描述 -->
        <el-form-item :label="$t('system.title_3')" prop="describe">
          <el-input
            v-model="ruleForm.explain"
            :disabled="!ruleForm.id"
          ></el-input>
        </el-form-item>
        <!-- 电话 -->
        <el-form-item
          :label="$t('system.title_4')"
          :prop="lang == 'zh_CN' ? 'phone' : ''"
        >
          <el-input
            v-model="ruleForm.phone"
            :disabled="!ruleForm.id"
          ></el-input>
        </el-form-item>
        <!-- 地址 -->
        <el-form-item :label="$t('system.title_5')" prop="address">
          <el-input
            v-model="ruleForm.address"
            :disabled="!ruleForm.id"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="ruleForm.id">
          <!-- 确认修改 -->
          <el-button type="primary" @click="submitForm('ruleForm')">
            {{ $t('operation_btn.btn_text_3') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 添加部门 -->
    <el-dialog
      :title="$t('system.text_4')"
      :visible.sync="dialogFormVisible"
      :width="lang == 'en_US' ? '600px' : '500px'"
    >
      <el-form
        ref="form"
        :model="form"
        :label-width="
          lang == 'en_US' ? '170px' : lang == 'Fr_fr' ? '210px' : '90px'
        "
        :rules="rules"
        style="padding: 0"
      >
        <!-- 部门编码 -->
        <el-form-item v-if="form.no" :label="$t('system.title_6')" prop="no">
          <el-input v-model="form.no" autocomplete="off" disabled></el-input>
        </el-form-item>
        <!-- 部门名称 -->
        <el-form-item :label="$t('system.title_2')" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 部门描述 -->
        <el-form-item :label="$t('system.title_3')" prop="explain">
          <el-input v-model="form.explain" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 电话 -->
        <el-form-item :label="$t('system.title_4')">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 地址 -->
        <el-form-item :label="$t('system.title_5')" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- 取 消 -->
        <el-button @click="dialogFormVisible = false">
          {{ $t('operation_btn.btn_text_4') }}
        </el-button>
        <!-- 确 定 -->
        <el-button type="primary" @click="addTree('form')">
          {{ $t('operation_btn.btn_text_5') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { getList, editTree, delTree, getTreeNo, addTree } from '@/api/sysPage'
  export default {
    name: 'SystemDepartment',
    data() {
      return {
        lang: this.$lang,
        datas: [], //公司列表
        defaultKey: [],
        defaultProps: {
          children: 'children',
          label: 'name',
        },
        // 修改部门信息
        ruleForm: {
          no: '',
          name: '',
          explain: '',
          phone: '',
          address: '',
        },
        rules: {
          name: [
            {
              required: true,
              message: this.$t('operation_tips.tips_1'),
              trigger: 'blur',
            },
          ],
          phone: [
            {
              pattern: /^1[345789]\d{9}$/,
              message: this.$t('operation_tips.tips_3'),
              trigger: 'blur',
            },
          ],
        },
        // 弹出框
        dialogFormVisible: false,
        treeData: '', //节点添加时选中节点
        form: {
          no: '',
          name: '',
          explain: '',
          phone: '',
          address: '',
        },
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        this.datas = getList()
        if (this.datas.length != 0) {
          this.defaultKey = [this.datas[0].id]
        }
      },
      // 点击节点
      handleNodeClick(data) {
        this.ruleForm = data
      },
      // 删除节点
      removeNode(node, data) {
        this.$baseConfirm(this.$t('operation_tips.tips_4'), null, () => {
          const parent = node.parent
          const children = parent.data.children || parent.data
          const index = children.findIndex((d) => d.id === data.id)
          let res = delTree(data)
          if (res) {
            children.splice(index, 1)
            this.ruleForm = {
              no: '',
              name: '',
              explain: '',
              phone: '',
              address: '',
            }
          } else {
            this.$baseMessage(this.$t('operation_tips.tips_5'), 'warning')
          }
        })
      },
      // 节点添加按钮
      appendNode(data) {
        let res = getTreeNo()
        if (res[0].deparmentNo) {
          this.form.no = Number(res[0].deparmentNo) + 1
        } else {
          this.$baseMessage(this.$t('operation_tips.tips_7'), 'warning')
          return
        }
        this.form.ParentId = data.id
        this.dialogFormVisible = true
      },
      // 添加节点
      addTree(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let res = addTree(this.form)
            if (res.result == 2) {
              this.$baseMessage(this.$t('operation_tips.tips_8'), 'success')
              this.datas = getList()
              this.defaultKey = [this.form.ParentId]
              this.form = {
                no: '',
                name: '',
                explain: '',
                phone: '',
                address: '',
              }
              this.dialogFormVisible = false
            } else {
              this.$baseMessage(res.data, 'warning')
            }
          } else {
            return false
          }
        })
      },
      // 修改
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let res = editTree(this.ruleForm)
            if (res.result == 2) {
              this.$baseMessage(this.$t('operation_tips.tips_10'), 'success')
              this.datas = getList()
            } else {
              this.$baseMessage(res.data, 'warning')
            }
          } else {
            return false
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .test-container {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .left_box {
    flex: 1;
    min-width: 300px;
    width: 400px;
    min-height: 200px;
    height: calc(100vh - 170px);
    padding: 10px;
    box-shadow: 0 0 10px #eee;
    border-radius: 5px;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .tree_box {
      flex: 1;
      width: 100%;
      overflow: auto;
      .custom-tree-node {
        width: 100%;
        display: flex;
        align-items: center;
        // justify-content: space-between;
        span:nth-child(1) {
          // flex: 1;
          margin-right: 50px;
        }
        .tree_btn {
          color: $base-color-default;
          font-weight: bold;
          font-size: 12px;
          .del_btn {
            color: red;
            margin-left: 10px;
            opacity: 0.8;
          }
        }
      }
    }
    .tree_add {
      width: auto;
      min-width: 50%;
      height: 30px;
      margin: 10px auto 0;
      background: #f8f8f8;
      border: 1px solid #eee;
      text-align: center;
      line-height: 30px;
      color: $base-color-default;
      cursor: pointer;
      border-radius: 5px;
    }
  }
  .tree_title {
    width: 100%;
    height: 30px;
    // box-shadow: 1px 0 10px #eee;
    background: #f8f8f8;
    border: 1px solid #eee;
    text-align: center;
    line-height: 30px;
    color: $base-color-default;
    cursor: default;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  .info_box {
    flex: 1;
    min-width: 300px;
    width: 400px;
    min-height: 200px;
    height: calc(100vh - 170px);
    padding: 10px;
    box-shadow: 0 0 10px #eee;
    // margin-right: 20px;
    border-radius: 5px;
    overflow: auto;
    input {
      border-radius: 4px;
    }
  }
</style>
