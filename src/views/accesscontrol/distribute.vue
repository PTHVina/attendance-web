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
      <el-table-column align="center" label="人员/部门/人员类型" width="300px">
        <template #default="scope">
          <el-tag
            v-for="item in scope.row.Items"
            :key="item.Id"
            closable
            @close="removeItem(item.Id)"
          >
            {{ item.Name }}
          </el-tag>
          <p class="add" @click="addItem">
            <i class="el-icon-circle-plus-outline"></i>
          </p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="设备" width="300px">
        <template #default="scope">
          <el-tag
            v-for="item in scope.row.Devices"
            :key="item.Id"
            closable
            @close="removeDevice(item.Id)"
          >
            {{ item.Name }}
          </el-tag>
          <p class="add" @click="addDevice">
            <i class="el-icon-circle-plus-outline"></i>
          </p>
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
  } from '@/api/accesscontrol'

  export default {
    data() {
      return {
        distributions: [],
        allAccessRules: [],
        allDevices: [],
        allEmployeeTypes: [],
        allDepartments: [],
      }
    },
    created() {
      this.loadAllAccessRules()
      this.loadDistribution()
    },
    methods: {
      loadDistribution() {
        const distributions = getAllRuleDistribution()
        this.distributions = distributions
      },
      loadAllAccessRules() {
        const rules = getAllAccessRules()
        this.allAccessRules = rules
      },
      loadAllEmployeeTypes() {
        let ets = getAllEmployeeType()
        this.allEmployeeTypes = ets
      },
      loadAllDepartments() {
        let depts = getAllDepartment()
        this.allDepartments = depts
      },
      removeItem(ruleDistributionItemId) {
        removeRuleDistributionItem(ruleDistributionItemId)
      },
      removeDevice(ruleDistributionDeviceId) {
        removeRuleDistributionDevice(ruleDistributionDeviceId)
      },
      setAccessRuleForRuleDistribution(distributionId, ruleId) {
        setAccessRuleForRuleDistribution(distributionId, ruleId)
      },
      addDevice() {},
      addItem() {},
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
