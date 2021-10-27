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
            <span>ユーザー名</span>
            <el-input v-model="queryForm.name" placeholder="ユーザー名" />
          </el-form-item>
          <el-form-item>
            <span>早退</span>
            <el-select
              v-model="queryForm.status"
              clearable
              placeholder="すべて"
              style="width: 120px"
            >
              <el-option :key="0" label="すべて" value="0">すべて</el-option>
              <el-option :key="1" label="早退する" value="1">
                早退する
              </el-option>
              <el-option :key="2" label="遅刻する" value="2">
                遅刻する
              </el-option>
              <el-option :key="3" label="正常" value="3">正常</el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span>{{ $t('personnel.text_14') }}</span>
            <el-date-picker
              v-model="queryForm.date"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="に"
              start-placeholder="開始日"
              end-placeholder="終了日"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery"
            >
              検索
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
      height="calc(100vh - 210px)"
      @sort-change="tableSortChange"
    >
      <el-table-column
        show-overflow-tooltip
        prop="name"
        label="名前"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="time"
        label="時間"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="遅刻（分）"
        prop="late"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="早退（分）"
        prop="Leaveearly"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="体温"
        prop="temperature"
        formatter="formatCellTemperatureString"
        sortable
      ></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <el-button type="text" @click="sendOut(row)">送信</el-button>
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
  import { getLineSendCount, getLineSendList, setSend } from '@/api/personnel'
  import { formatCellTemperatureString } from '@/utils/index'
  export default {
    name: 'Issue',
    data() {
      return {
        list: [],
        listLoading: false, //列表加载
        layout: 'total, sizes, prev, pager, next, jumper',
        elementLoadingText: '読み込み中...',
        queryForm: {
          name: '',
          status: '0',
          date: [],
        },
        page: {
          pageNo: 1,
          pageSize: 10,
          total: 0, //总数
        },
      }
    },
    created() {
      let date = new Date()
      let YY = date.getFullYear()
      let MM = date.getMonth() + 1
      let DD = date.getDate()
      MM = MM < 10 ? '0' + MM : MM
      DD = DD < 10 ? '0' + DD : DD
      let d = YY + '-' + MM + '-' + DD
      this.queryForm.date = [d, d]
      this.init()
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
      init() {
        this.listLoading = true
        let count = getLineSendCount(this.queryForm)
        this.page.total = count
        let list = getLineSendList(this.queryForm, this.page)
        this.list = list
        setTimeout(() => {
          this.listLoading = false
        }, 500)
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
      //查询
      handleQuery() {
        if (this.queryForm.date.length != 2) {
          this.$baseMessage('選択した時間が間違っています', 'warning')
          return
        }
        this.page.pageNo = 1
        this.init()
      },
      //送信
      sendOut(row) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.5)',
        })
        setSend(row.id).then((res) => {
          loading.close()
          if (res) {
            this.$baseMessage('送信成功。', 'success')
          } else {
            this.$baseMessage('送信に失敗しました。', 'warning')
          }
        })
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
