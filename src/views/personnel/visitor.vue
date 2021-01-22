<template>
  <div class="table-container">
    <div class="group">
      <div class="form_group">
        <el-form
          ref="queryForm"
          :model="queryForm"
          :inline="true"
          size="medium"
          @submit.native.prevent
        >
          <el-form-item>
            <span>姓名</span>
            <el-input v-model="queryForm.name" placeholder="人员姓名" />
          </el-form-item>
          <el-form-item>
            <span>电话号码</span>
            <el-input v-model="queryForm.phone" placeholder="电话号码" />
          </el-form-item>
          <el-form-item>
            <span>授权起止时间</span>
            <el-date-picker
              v-model="queryForm.accreditTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="授权起始时间"
              end-placeholder="授权结束时间"
              style="width: 360px"
              @change="checkTime"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <span>是否下发</span>
            <el-select
              v-model="queryForm.isDown"
              clearable
              placeholder="是/否"
              style="width: 80px"
            >
              <el-option
                v-for="item in issueOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery('queryForm')"
            >
              查询
            </el-button>
            <el-button type="info" plain @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn_group">
        <el-button icon="el-icon-plus" type="primary" @click="openFormDialog">
          新增
        </el-button>
        <!-- <el-button icon="el-icon-upload2" type="primary" @click="downList">
          导出列表
        </el-button> -->
        <el-button
          icon="el-icon-delete"
          type="danger"
          style="opacity: 0.6"
          @click="handleDelete"
        >
          批量删除
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
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="照片">
        <template #default="{ row }">
          <el-image :preview-src-list="imageList" :src="row.imge"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="name"
        label="姓名"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="电话号码"
        prop="phone"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="授权起始时间"
        prop="staTime"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="授权结束时间"
        prop="endTime"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="是否下发"
        prop="isDown"
        sortable
      >
        <template #default="{ row }">
          <span v-if="row.isDown == 1">是</span>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="openFormDialog(row)"
          >
            编辑
          </el-button>
          <el-button type="text" icon="el-icon-thumb" @click="issue(row)">
            下发
          </el-button>
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
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        :rules="rules"
        size="medium"
      >
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="form.name"
            placeholder="人员姓名"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input
            v-model="form.phone"
            placeholder="电话号码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="授权时间区间" prop="date">
          <el-date-picker
            v-model="form.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="checkInfoTime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="照片" prop="img">
          <div class="add_img">
            <el-image
              v-if="form.picture"
              class="show_img"
              :src="form.picture"
              :preview-src-list="[form.picture]"
              fit="contain"
            ></el-image>
            <i v-else class="el-icon-picture-outline"></i>
            <div class="add_box">
              <span class="uploading" @click="checkImg">上传</span>
              <span class="photo" @click="photograph">拍照</span>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFn">取 消</el-button>
        <el-button type="primary" @click="setInfo('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getVisitorCount,
    getVisitorList,
    openImg,
    addVisitor,
    editVisitor,
    delVisitor,
    issueVisitor,
    photograph,
  } from '@/api/personnel'
  export default {
    name: 'Visitor',
    data() {
      return {
        list: [],
        imageList: [],
        listLoading: false, //列表加载
        layout: 'total, sizes, prev, pager, next, jumper',
        elementLoadingText: '正在加载...',
        queryForm: {
          name: '',
          phone: '',
          accreditTime: [], //授权时间范围
          startdate: '',
          startTime: '',
          endDate: '',
          endTime: '',
          isDown: '', //是否下发
        }, //搜索表单
        page: {
          pageNo: 1,
          pageSize: 10,
          total: 0, //总数
        },
        // 下发option
        issueOption: [
          {
            value: '1',
            label: '是',
          },
          {
            value: '0',
            label: '否',
          },
        ],
        dialogFormVisible: false, //表单弹窗控制
        selectRows: '', //选中行
        // 新增、编辑
        form: {
          name: '',
          phone: '',
          date: '',
          startTime: '',
          endTime: '',
          img: '',
        },
        rules: {
          name: [
            { required: true, message: '人员姓名不能为空', trigger: 'blur' },
            {
              min: 1,
              max: 10,
              message: '长度在 1 到 10 个字符',
              trigger: 'blur',
            },
          ],
          phone: [
            {
              pattern: /^1[3-9]\d{9}$/,
              message: '请输入正确的11位电话号码',
              trigger: 'blur',
            },
          ],
          date: [
            { required: true, message: '请选择授权时间', trigger: 'blur' },
          ],
          img: [{ required: true, message: '请上传头像', trigger: 'blur' }],
        },
      }
    },
    created() {
      this.init()
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
      init() {
        this.listLoading = true
        let count = getVisitorCount(this.queryForm)
        let list = getVisitorList(this.queryForm, this.page)
        this.page.total = count
        this.list = list
        let imageList = []
        list.forEach((item, index) => {
          imageList.push(item.imge)
        })
        this.imageList = imageList
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      //日期时间选择
      checkTime(e) {
        if (e) {
          let start = this.getTime(e[0])
          let end = this.getTime(e[1])
          this.queryForm.startdate = start[0]
          this.queryForm.startTime = start[1]
          this.queryForm.endDate = end[0]
          this.queryForm.endTime = end[1]
        } else {
          this.queryForm.startdate = ''
          this.queryForm.startTime = ''
          this.queryForm.endDate = ''
          this.queryForm.endTime = ''
        }
      },
      //处理时间
      getTime(time) {
        var date = new Date(time)
        let Y = date.getFullYear()
        let M = date.getMonth() + 1
        let D = date.getDate()
        let h = date.getHours()
        let m = date.getMinutes()
        let s = date.getSeconds()
        M = M <= 9 ? '0' + M : M
        D = D <= 9 ? '0' + D : D
        h = h <= 9 ? '0' + h : h
        m = m <= 9 ? '0' + m : m
        s = s <= 9 ? '0' + s : s

        return [Y + '-' + M + '-' + D, h + ':' + m + ':' + s]
      },
      //查询
      handleQuery(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.page.pageNo = 1
            this.init()
          } else {
            return false
          }
        })
      },
      //重置
      reset() {
        this.queryForm = {
          name: '',
          phone: '',
          accreditTime: [],
          startdate: '',
          startTime: '',
          endDate: '',
          endTime: '',
          isDown: '',
        }
        this.page.pageNo = 1
        this.init()
      },

      //表格排序
      tableSortChange() {
        const imageList = []
        this.$refs.tableSort.tableData.forEach((item, index) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
      },
      // 切换显示条数
      handleSizeChange(val) {
        this.page.pageSize = val
        this.init()
      },
      //切换页数
      handleCurrentChange(val) {
        this.page.pageNo = val
        this.init()
      },

      // 选中
      setSelectRows(val) {
        this.selectRows = val
      },
      // 删除
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            let res = delVisitor(row.id + ',')
            if (res) {
              this.$baseMessage('删除成功！', 'success')
            } else {
              this.$baseMessage('删除失败！', 'success')
            }
            this.init()
          })
        } else {
          if (this.selectRows.length > 0) {
            let ids = ''
            this.selectRows.forEach((item) => {
              ids += item.id + ','
            })
            let res = delVisitor(ids)
            this.init()
          } else {
            this.$baseMessage('未选中任何行', 'error')
            return false
          }
        }
      },
      // 下发
      issue(row) {
        let res = issueVisitor(row)
        if (res) {
          this.$baseMessage('下发成功！', 'success')
        } else {
          this.$baseMessage('下发失败！', 'error')
        }
      },
      //导出
      downList() {},
      //打开弹窗
      openFormDialog(data) {
        this.dialogFormVisible = true
        if (data.id) {
          data.endTime = data.endTime.replace(/^\s*|\s*$/g, '')
          this.form = {
            name: data.name,
            phone: data.phone,
            date: [],
            startTime: data.staTime,
            endTime: data.endTime,
            img: data.imge,
          }
          this.form.date.push(this.changTime(data.staTime))
          this.form.date.push(this.changTime(data.endTime))
        }
      },
      // 转换标准时间
      changTime(time) {
        var timeArr = time.split(' ')
        var d = timeArr[0].split('-')
        var t = timeArr[1].split(':')
        return new Date(d[0], d[1] - 1, d[2], t[0], t[1], t[2])
      },
      //选择授权时间
      checkInfoTime(e) {
        if (e) {
          let start = this.getTime(e[0])
          let end = this.getTime(e[1])
          this.form.startTime = start[0] + ' ' + start[1]
          this.form.endTime = end[0] + ' ' + end[1]
        } else {
          this.form.startTime = ''
          this.form.endTime = ''
        }
      },
      //选择图片
      checkImg() {
        let img = openImg()
        if (!img) {
          return
        }
        this.form.img = img
      },
      //拍照
      photograph() {
        let img = photograph()
        if (!img) {
          return
        }
        this.form.img = img
      },
      //添加/修改
      setInfo(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let res
            if (this.form.id) {
              res = editVisitor(this.form)
            } else {
              res = addVisitor(this.form)
            }
            if (res.result == 2) {
              this.$baseMessage('保存成功！', 'success')
              this.dialogFormVisible = false
              this.page.pageNo = 1
              this.init()
            } else {
              this.$baseMessage('保存失败！', 'warning')
            }
          } else {
            return false
          }
        })
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
          phone: '',
          date: '',
          startTime: '',
          endTime: '',
          img: '',
        }
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

  .add_img {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 146px;
    height: 146px;
    cursor: pointer;
    position: relative;
    z-index: 0;
    .show_img {
      width: 100%;
      height: 100%;
      border: 1px solid #eee;
      border-radius: 6px;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    i {
      width: 100%;
      height: 100%;
      line-height: 146px;
      vertical-align: top;
      font-size: 28px;
      color: #8c939d;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    input {
      outline: none;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      opacity: 0;
    }
  }
</style>
