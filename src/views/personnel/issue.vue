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
          <!-- 姓名 -->
          <el-form-item>
            <span>{{ $t('personnel.text_1') }}</span>
            <el-input
              v-model="queryForm.name"
              :placeholder="$t('personnel.pl_1')"
            />
          </el-form-item>
          <!-- IP地址 -->
          <el-form-item>
            <span>{{ $t('personnel.title_3') }}</span>
            <el-input
              v-model="queryForm.ip"
              :placeholder="$t('personnel.title_3')"
            />
          </el-form-item>
          <!-- 状态 -->
          <el-form-item>
            <span>{{ $t('personnel.text_14') }}</span>
            <el-select
              v-model="queryForm.status"
              clearable
              :placeholder="$t('personnel.pl_5')"
              :style="lang == 'en_US' ? 'width: 120px' : 'width: 80px'"
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
              {{ $t('operation_btn.btn_text_6') }}
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
      height="calc(100vh - 206px)"
      @sort-change="tableSortChange"
    >
      <!-- 序号 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.title_15')"
        :width="lang == 'en_US' ? '120' : '95'"
      >
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <!-- 设备名称 -->
      <el-table-column
        show-overflow-tooltip
        prop="DeviceName"
        :label="$t('personnel.title_13')"
        sortable
      ></el-table-column>
      <!-- 设备编号 -->
      <el-table-column
        show-overflow-tooltip
        prop="number"
        :label="$t('personnel.title_14')"
        sortable
      ></el-table-column>
      <!-- IP地址 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.title_3')"
        prop="ipAddress"
        sortable
      ></el-table-column>
      <!-- 人员姓名 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.pl_1')"
        prop="name"
        sortable
      ></el-table-column>
      <!-- 时间 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.pl_6')"
        prop="date"
        sortable
      ></el-table-column>
      <!-- 状态 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.text_14')"
        prop="status"
        sortable
      >
        <template #default="{ row }">
          <el-tag v-if="row.status === 'success'" size="medium">
            {{ $t('operation_btn.btn_text_19') }}
          </el-tag>
          <el-tag v-else-if="row.status === 'fail'" type="danger" size="medium">
            {{ $t('operation_btn.btn_text_20') }}
          </el-tag>
          <el-tag
            v-else-if="row.status === 'inprogress'"
            type="success"
            size="medium"
          >
            {{ $t('operation_btn.btn_text_21') }}
          </el-tag>
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
    name: 'Issue',
    data() {
      return {
        lang: this.$lang,
        list: [],
        listLoading: false, //列表加载
        layout: 'total, sizes, prev, pager, next, jumper',
        selectRows: '', //选中行
        elementLoadingText: this.$t('operation_tips.tips_12'),
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
            label: this.$t('operation_tips.tips_35'),
          },
          {
            value: '0',
            label: this.$t('operation_tips.tips_36'),
          },
          {
            value: '1',
            label: this.$t('operation_tips.tips_37'),
          },
          {
            value: '2',
            label: this.$t('operation_tips.tips_38'),
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
