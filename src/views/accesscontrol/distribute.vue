<template>
  <div class="table-container">
    <div class="group">
      <div class="btn_group">
        <el-button @click="addEmployeeTypeDistribution">
          添加员工类型下发规则
        </el-button>
        <el-button @click="addDepartmentDistribution">
          添加部门下发规则
        </el-button>
        <el-button @click="addStaffDistribution">
          添加个人员工下发规则
        </el-button>
      </div>
    </div>
    <el-table border="true" :data="distributions" :highlight-current-row="true">
      <el-table-column
        align="center"
        prop="Name"
        label="名称"
        width="200px"
      ></el-table-column>
      <el-table-column align="center" label="人员/部门/工作类型" width="300px">
        <template #default="{ row }">
          <el-tag
            v-for="(item, index) in row.Items"
            :key="item.Id"
            closable
            @close="removeItem(row, index, item.Id)"
          >
            {{ item.Name }}
          </el-tag>
          <!--员工类型-->
          <el-select
            v-if="row.DistributionItemType === 1"
            v-model="selectedEmployeeTypeId"
            style="display: block; margin-top: 5px"
            placeholder="请选择工作类型"
            @change="addGroupIdToDistribution(row, selectedEmployeeTypeId, 0)"
          >
            <el-option
              v-for="item in allEmployeeTypes"
              :key="item.id"
              :label="item.Employetype_name"
              :value="item.id"
            ></el-option>
          </el-select>
          <!--部门类型-->
          <el-select
            v-if="row.DistributionItemType === 2"
            v-model="selectedDepartmentId"
            style="display: block; margin-top: 5px"
            placeholder="请选择部门"
            @change="addGroupIdToDistribution(row, selectedDepartmentId, 1)"
          >
            <el-option
              v-for="item in allDepartments"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <!--个人-->
          <el-select
            v-else-if="row.DistributionItemType === 0"
            v-model="selectedStaffId"
            style="display: block; margin-top: 5px"
            filterable
            remote
            reserve-keyword
            placeholder="请输入人员姓名"
            :remote-method="loadStaffs"
            :loading="isLoadingStaffs"
            @change="addStaffIdToDistribution(row, selectedStaffId)"
          >
            <el-option
              v-for="item in matchedEmployees"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="center" label="设备" width="300px">
        <template #default="{ row, $index }">
          <el-tag
            v-for="(item, index) in row.Devices"
            :key="item.Id"
            closable
            @close="removeDevice(row, index, item.Id)"
          >
            {{ item.Name }}
          </el-tag>
          <el-select
            v-model="selectedDeviceIds[$index]"
            style="display: block; margin-top: 5px"
            placeholder="请选择设备"
            @change="addDeviceIdToDistribution(row, selectedDeviceIds[$index])"
          >
            <el-option
              v-for="item in allDevices"
              :key="item.id"
              :label="item.DeviceName"
              :value="item.id"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="center" label="规则" width="200px">
        <template #default="{ row }">
          <el-select
            v-model="row.AccessRuleId"
            placeholder="请选择"
            @change="setAccessRuleForRuleDistribution(row.Id, row.AccessRuleId)"
          >
            <el-option
              v-for="item in allAccessRules"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed align="center" width="50px">
        <template #default="{ row, $index }">
          <el-button type="text" @click="removeDistribution($index, row)">
            <i class="el-icon-remove" style="font-size: 1.5em; color: red"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    getAllRuleDistribution,
    getAllAccessRules,
    getAllEmployeeType,
    getAllDepartment,
    removeRuleDistributionItem,
    removeRuleDistributionDevice,
    setAccessRuleForRuleDistribution,
    addEmployeeTypeDistribution,
    addDepartmentDistribution,
    addStaffDistribution,
    removeDistribution,
    addGroupIdToDistribution,
    addStaffIdToDistribution,
    addDeviceIdToDistribution,
    getStaffByNameFuzzy,
  } from '@/api/accesscontrol'
  import { getAllMyDevices } from '@/api/device'

  export default {
    data() {
      return {
        distributions: [],
        allAccessRules: [],
        allDevices: [],
        allEmployeeTypes: [],
        allDepartments: [],
        selectedEmployeeTypeId: null,
        selectedDepartmentId: null,
        selectedDeviceIds: null,
        selectedStaffId: '',
        isLoadingStaffs: false,
        matchedEmployees: [],
      }
    },
    created() {
      this.loadAllEmployeeTypes()
      this.loadAllAccessRules()
      this.loadAllDepartments()
      this.loadAllMyDevices()
      this.loadDistribution()
    },
    methods: {
      loadDistribution() {
        const distributions = getAllRuleDistribution()
        this.distributions = distributions
        this.selectedDeviceIds = new Array(distributions.length)
      },
      loadAllAccessRules() {
        const rules = getAllAccessRules()
        this.allAccessRules = rules
      },
      loadAllEmployeeTypes() {
        const ets = getAllEmployeeType()
        this.allEmployeeTypes = ets
      },
      loadAllDepartments() {
        const depts = getAllDepartment()
        this.allDepartments = depts
      },
      loadAllMyDevices() {
        const devices = getAllMyDevices()
        this.allDevices = devices
      },
      removeItem(row, index, ruleDistributionItemId) {
        removeRuleDistributionItem(ruleDistributionItemId)
        row.Items.splice(index, 1)
      },
      removeDevice(row, index, ruleDistributionDeviceId) {
        removeRuleDistributionDevice(ruleDistributionDeviceId)
        row.Devices.splice(index, 1)
      },
      setAccessRuleForRuleDistribution(distributionId, ruleId) {
        setAccessRuleForRuleDistribution(distributionId, ruleId)
      },
      addDeviceIdToDistribution(distribution, deviceId) {
        let data = addDeviceIdToDistribution(distribution.Id, deviceId)
        distribution.Devices.push(data)
      },
      addGroupIdToDistribution(distribution, groupId, groupIdType) {
        let data = addGroupIdToDistribution(
          distribution.Id,
          groupId,
          groupIdType
        )
        distribution.Items.push(data)
      },
      addStaffIdToDistribution(distribution, staffId) {
        let data = addStaffIdToDistribution(distribution.Id, staffId)
        distribution.Items.push(data)
      },
      addDistribution(type) {
        this.$prompt('input name', {}).then(({ value }) => {
          var rule
          if (type === 0) {
            rule = addEmployeeTypeDistribution(value)
          } else if (type === 1) {
            rule = addDepartmentDistribution(value)
          } else if (type === 2) {
            rule = addStaffDistribution(value)
          }
          this.distributions.push(rule)
        })
      },
      addEmployeeTypeDistribution() {
        this.addDistribution(0)
      },
      addDepartmentDistribution() {
        this.addDistribution(1)
      },
      addStaffDistribution() {
        this.addDistribution(2)
      },
      removeDistribution(index, distribution) {
        removeDistribution(distribution.Id)
        this.distributions.splice(index, 1)
      },
      loadStaffs(query) {
        if (query) {
          //this.isLoadingStaffs = true
          this.matchedEmployees = getStaffByNameFuzzy(query)
        } else {
          this.matchedEmployees = []
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
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

  .parentRemove > .remove {
    visibility: hidden;
  }

  .parentRemove:hover > .remove {
    visibility: visible;
    cursor: pointer;
  }

  .cell .add {
    visibility: hidden;
  }

  .cell:hover .add {
    visibility: visible;
    cursor: pointer;
  }
</style>
