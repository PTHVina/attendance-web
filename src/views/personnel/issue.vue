<template>
  <div class="table-container">
    <div class="group">
      <div class="form_group">
        <el-form
          ref="form"
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
            <span>IP地址</span>
            <el-input v-model="queryForm.ip" placeholder="IP地址" />
          </el-form-item>
          <el-form-item>
            <span>状态</span>
            <el-select
              v-model="queryForm.status"
              clearable
              placeholder="全部"
              style="width: 80px"
            >
              <el-option
                v-for="item in statusOption"
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
              @click="handleQuery"
            >
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :highlight-current-row="true"
      :element-loading-text="elementLoadingText"
      @sort-change="tableSortChange"
    >
      <el-table-column show-overflow-tooltip label="序号" width="95">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="DeviceName"
        label="设备名称"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="number"
        label="设备编号"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="IP地址"
        prop="ipAddress"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="人员姓名"
        prop="name"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="状态"
        prop="status"
        sortable
      >
        <template #default="{ row }">
          <span v-if="row.status === 'success'">成功</span>
          <span v-else-if="row.status === 'fail'">失败</span>
          <span v-else-if="row.status === 'inprogress'">下发中</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="page.pageNo"
      :layout="layout"
      :page-size="page.pageSize"
      :total="page.total"
      :hide-on-single-page="page.total <= page.pageSize"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
  import { getIssueList } from '@/api/personnel'
  export default {
    name: 'issue',
    data() {
      return {
        list: [],
        listLoading: false, //列表加载
        layout: 'total, sizes, prev, pager, next, jumper',
        selectRows: '', //选中行
        elementLoadingText: '正在加载...',
        queryForm: {
          name: '',
          ip: '',
          status: '', //状态
        },
        page: {
          pageNo: 1,
          pageSize: 10,
          total: 0, //总数
        },
        // 状态option
        statusOption: [
          {
            value: '10',
            label: '全部',
          },
          {
            value: '0',
            label: '成功',
          },
          {
            value: '1',
            label: '失败',
          },
          {
            value: '2',
            label: '下发中',
          },
        ],
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
        let list = getIssueList(this.page, this.queryForm)
        this.list = list[0]
        this.page.total = list[1][0].count >= 0 ? list[1][0].count : 0
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      //表格排序
      tableSortChange() {},
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
      //查询
      handleQuery() {
        this.page.pageNo = 1
        this.init()
      },
    },
  }
</script>

<style lang="scss">
  .form_group {
    height: auto;
    margin-bottom: 20px;
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
  .el-form {
    padding: 0 !important;
  }
</style>
