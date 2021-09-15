<template>
  <div class="table-container">
    <el-table border="true" :data="distributions" :highlight-current-row="true">
      <el-table-column
        align="center"
        prop="Name"
        label="名称"
        width="100px"
      ></el-table-column>
      <el-table-column align="center" label="人员/部门/人员类型" width="200px">
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
      <el-table-column align="center" label="设备" width="200px">
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
      <el-table-column align="center" label="设备" width="200px">
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
    </el-table>
  </div>
</template>

<script>
  import {
    getAllRuleDistribution,
    getAllAccessRules,
    removeRuleDistributionItem,
    removeRuleDistributionDevice,
    setAccessRuleForRuleDistribution,
  } from '@/api/accesscontrol'

  export default {
    data() {
      return {
        distributions: [],
        allAccessRules: [],
        allDevices: [],
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
