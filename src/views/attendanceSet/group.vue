<template>
  <div class="table-container">
    <div class="group">
      <div class="btn_group">
        <el-button icon="el-icon-plus" type="primary" @click="openFormDialog">
          新增
        </el-button>
      </div>
    </div>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :highlight-current-row="true"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        show-overflow-tooltip
        label="班组名"
        prop="title"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="类型"
        prop="author"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="排班详情"
        prop="pageViews"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="人员数目"
        prop="status"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="是否默认"
        prop="status"
      ></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <el-button type="text" icon="el-icon-edit" @click="openDialog(row)">
            编辑
          </el-button>
          <el-button type="text" icon="el-icon-thumb">默认</el-button>
          <el-button
            type="text"
            class="btn_red"
            icon="el-icon-delete"
            @click="handleDelete(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="page.pageNo"
      :layout="layout"
      :page-size="page.pageSize"
      :total="page.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>

    <!-- 新增/修改弹窗 -->
    <el-dialog
      title="人员信息"
      :visible.sync="dialogFormVisible"
      width="600px"
      :destroy-on-close="true"
      :before-close="closeFn"
    >
      <el-form :model="form" label-width="80px" :rules="rules" size="medium">
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="form.name"
            placeholder="人员姓名"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input
            v-model="form.name"
            placeholder="人员编号"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input
            v-model="form.name"
            placeholder="电话号码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="门禁卡号">
          <el-input
            v-model="form.name"
            placeholder="门禁卡号"
            autocomplete="off"
            style="width: 60%; margin-right: 20px"
          ></el-input>
          <el-radio-group v-model="form.radio">
            <el-radio :label="1">32位</el-radio>
            <el-radio :label="2">64位</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            v-model="form.name"
            placeholder="电子邮箱"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-cascader
            :options="option"
            :props="{ checkStrictly: true }"
            placeholder="请选择工作部门"
            autocomplete="off"
            :value="form.values"
            style="width: 100%"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="工作分类">
          <el-select
            v-model="form.value"
            placeholder="请选择工作分类"
            autocomplete="off"
            style="width: 100%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="照片">
          <div class="add_img">
            <el-image
              v-if="form.img"
              class="show_img"
              :src="form.img"
              :preview-src-list="[form.img]"
              fit="contain"
            ></el-image>
            <i v-else class="el-icon-plus"></i>
            <input type="file" @change="checkImg" />
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFn">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'classes',
    data() {
      return {
        list: [],
        imageList: [],
        listLoading: false, //列表加载
        layout: 'total, sizes, prev, pager, next, jumper',
        selectRows: '', //选中行
        elementLoadingText: '正在加载...',
        queryForm: {
          name: '',
          phone: '',
          accreditTime: [], //授权时间范围
          issueValue: '', //是否下发
        },
        page: {
          pageNo: 1,
          pageSize: 10,
          title: '',
          total: 0, //总数
        },
        // 下发option
        issueOption: [
          {
            value: '是',
            label: '是',
          },
          {
            value: '否',
            label: '否',
          },
        ],
        dialogFormVisible: false, //表单弹窗控制
        // 新增、编辑
        form: {
          name: '',
          values: 'shejiyuanze',
          value: '选项4',
          radio: '1',
          img: '',
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
        },
      }
    },
    created() {
      this.fetchData()
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
      //表格排序
      tableSortChange() {
        const imageList = []
        this.$refs.tableSort.tableData.forEach((item, index) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
      },
      // 选中
      setSelectRows(val) {
        this.selectRows = val
      },
      handleAdd() {},
      // 删除
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { msg } = await doDelete({ ids: row.id })
            this.$baseMessage(msg, 'success')
            this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
              const { msg } = await doDelete({ ids: ids })
              this.$baseMessage(msg, 'success')
              this.fetchData()
            })
          } else {
            this.$baseMessage('未选中任何行', 'error')
            return false
          }
        }
      },
      // 切换显示条数
      handleSizeChange(val) {
        this.page.pageSize = val
        this.fetchData()
      },
      //切换页数
      handleCurrentChange(val) {
        this.page.pageNo = val
        this.fetchData()
      },
      //查询
      handleQuery() {
        this.page.pageNo = 1
        console.log(111, '查询')
        this.fetchData()
      },
      // 数据获取
      async fetchData() {
        // this.listLoading = true
        // const { data, totalCount } = await getList(this.queryForm)
        var data, totalCount
        this.list = data
        const imageList = []
        data.forEach((item, index) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
        this.total = totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },

      //打开弹窗
      openFormDialog(data) {
        this.dialogFormVisible = true
        if (data.id) {
          console.log('选中参数', data)
        }
      },
      //选择图片
      checkImg(event) {
        var that = this
        var reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onloadend = function (e) {
          that.form.img = e.target.result
        }
      },
      // 关闭弹窗
      closeFn(done) {
        if (done && typeof done == 'function') {
          done()
        } else {
          this.dialogFormVisible = false
        }
        this.form = {
          name: '',
          values: '',
          value: '',
          radio: '',
          img: '',
        }
      },
      //打开表格弹窗
      openTabelDialog() {
        this.dialogTableVisible = true
      },
    },
  }
</script>

<style lang="scss">
  .form_group {
    height: auto;
    .el-form {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .el-form-item {
        margin-bottom: 10px;
        .el-form-item__content {
          display: flex;
          align-items: center;
          margin-right: 10px;
          > span {
            white-space: nowrap;
            margin-right: 5px;
          }
        }
      }
    }
  }
  .btn_group {
    margin: 15px 0;
  }
  .el-dialog__body {
    padding: 20px;
  }
  .el-form {
    padding: 0 !important;
  }
</style>
