<template>
  <div class="test-container">
    <div class="left_box">
      <div class="tree_add">部门</div>
      <div class="tree_box">
        <el-tree
          class="tree_list"
          :data="datas"
          node-key="id"
          :props="defaultProps"
          :highlight-current="true"
          :expand-on-click-node="false"
          :check-on-click-node="true"
          @node-click="handleNodeClick"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span class="tree_btn">
              <i
                class="el-icon-circle-plus-outline"
                @click="() => appendNode(data)"
              >
                添加
              </i>
              <i
                class="del_btn el-icon-remove-outline"
                @click="() => removeNode(node, data)"
              >
                删除
              </i>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="info_box">
      <div class="tree_add">部门详情</div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="编码" prop="code">
          <el-input v-model="ruleForm.no" disabled></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="公司描述" prop="describe">
          <el-input v-model="ruleForm.explain"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item v-if="ruleForm.id">
          <el-button type="primary" @click="submitForm('ruleForm')">
            确认修改
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="personnel">
      <div class="tree_add">人员分类</div>
      <el-tag
        v-for="(tag, key) in dynamicTags"
        :key="tag"
        closable
        @close="handleClose(tag, key)"
      >
        {{ tag.Employetype_name }}
      </el-tag>
      <el-input
        v-if="inputVisible"
        ref="saveTagInput"
        v-model="inputValue"
        class="input-new-tag"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      ></el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">
        + 添加
      </el-button>
    </div>

    <el-dialog title="添加部门" :visible.sync="dialogFormVisible" width="400px">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        :rules="rules"
        style="padding: 0"
      >
        <el-form-item v-if="form.no" label="部门编码" prop="no">
          <el-input v-model="form.no" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司描述" prop="explain">
          <el-input v-model="form.explain" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTree('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {
    getList,
    editTree,
    delTree,
    getTreeNo,
    addTree,
    getTag,
    delTag,
    addTag,
  } from '@/api/sysPage'
  export default {
    name: 'SystemDepartment',
    data() {
      return {
        datas: [], //公司列表
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
            { required: true, message: '请输入部门名称', trigger: 'blur' },
            {
              min: 1,
              max: 10,
              message: '长度在 1 到 10 个字符',
              trigger: 'blur',
            },
          ],
          phone: [
            {
              pattern: /^1[345789]\d{9}$/,
              message: '请输入正确的11位电话号码',
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

        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
      }
    },
    created() {
      this.init()
    },
    mounted() {},
    methods: {
      init() {
        this.datas = getList()
        this.dynamicTags = getTag()
      },
      // 点击节点
      handleNodeClick(data) {
        this.ruleForm = data
      },
      // 删除节点
      removeNode(node, data) {
        this.$baseConfirm('你确定要删除当前项吗', null, () => {
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
            this.$baseMessage('删除失败！', 'warning')
          }
        })
      },
      // 节点添加按钮
      appendNode(data) {
        let res = getTreeNo()
        if (res[0].deparmentNo) {
          this.form.no = Number(res[0].deparmentNo) + 1
        } else {
          this.$baseMessage('获取编码失败！', 'warning')
          return
        }
        this.treeData = data
        this.form.ParentId = data.id
        this.dialogFormVisible = true
      },
      // 添加节点
      addTree(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let res = addTree(this.form)
            if (res.result == 2) {
              this.$baseMessage(res.data, 'success')
              if (!this.treeData.children) {
                this.$set(this.treeData, 'children', [])
              }
              this.treeData.children.push(this.form)
              this.datas = getList()
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
              this.$baseMessage(res.data, 'success')
              this.datas = getList()
            } else {
              this.$baseMessage(res.data, 'warning')
            }
          } else {
            return false
          }
        })
      },

      // 人员分类
      handleClose(tag, key) {
        this.$baseConfirm('你确定要删除当前项吗', null, () => {
          let res = delTag(tag.Employetype_name)
          if (!res) {
            this.$baseMessage('删除失败', 'warning')
          } else {
            this.dynamicTags.splice(key, 1)
          }
        })
      },
      showInput() {
        this.inputVisible = true
        this.$nextTick((_) => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      handleInputConfirm() {
        let inputValue = this.inputValue.replace(/\s*/g, '')
        if (!inputValue) return
        let res = addTag(inputValue)
        if (res) {
          this.dynamicTags.push({ Employetype_name: inputValue })
          this.inputVisible = false
          this.inputValue = ''
        } else {
          this.$baseMessage('添加失败', 'warning')
        }
      },
    },
  }
</script>

<style lang="scss">
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
  }
  .tree_add {
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
    margin-right: 20px;
    border-radius: 5px;
    overflow: auto;
    input {
      border-radius: 4px;
    }
  }

  .personnel {
    flex: 1;
    min-width: 200px;
    min-height: 200px;
    height: calc(100vh - 170px);
    padding: 10px;
    box-shadow: 0 0 10px #eee;
    border-radius: 5px;
    overflow: auto;
    .el-tag--small {
      height: 32px;
      line-height: 32px;
      padding: 0 15px;
    }
    .el-tag {
      margin: 0 5px 10px !important;
    }
    .el-tag .el-icon-close {
      line-height: 17px;
      margin-top: -2px;
    }
    .button-new-tag {
      margin: 0 5px 10px;
      height: 32px;
      line-height: 32px;
      padding-top: 0;
      padding-bottom: 0;
      width: 100px;
      text-align: center;
    }
    .input-new-tag {
      width: 100px;
      margin: 0 5px 10px;
      vertical-align: top;
    }
  }
</style>
