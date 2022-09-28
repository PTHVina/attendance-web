<template>
  <div class="table-container">
    <div class="group">
      <div class="btn_group">
        <el-button @click="addEmployeeTypeDistribution">
          {{ $t('accessControl.addEmployeeTypeDeployRule') }}
        </el-button>
        <el-button @click="addDepartmentDistribution">
          {{ $t('accessControl.addDepartmentDeployRule') }}
        </el-button>
        <el-button @click="addStaffDistribution">
          {{ $t('accessControl.addEmployeeDeployRule') }}
        </el-button>
        <el-button
          icon="el-icon-download"
          type="primary"
          @click="buildRuleDeploymentTask"
        >
          {{ $t('accessControl.generateDeployTask') }}
        </el-button>
        <div
          style="display: inline-flex; align-items: center; margin-left: 30px"
        >
          <span style="margin-right: 20px">
            {{ $t('accessControl.defaultAccess') }}
          </span>
          <el-switch
            v-model="defaultAccess"
            :active-text="$t('accessControl.fullAccess')"
            :active-value="1"
            :inactive-text="$t('accessControl.noAccess')"
            :inactive-value="0"
            @change="setDefaultAccess"
          ></el-switch>
        </div>
      </div>
    </div>
    <el-table border="true" :data="distributions" :highlight-current-row="true">
      <el-table-column
        align="center"
        prop="Name"
        :label="$t('accessControl.name')"
        width="200px"
      ></el-table-column>
      <el-table-column
        align="center"
        :label="$t('accessControl.personDepartmentEmployeeType')"
        min-width="300px"
      >
        <template #default="{ row, $index }">
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
            v-model="selectedItemIds[$index]"
            style="display: block; margin-top: 5px"
            :placeholder="$t('accessControl.pleaseChooseEmployeeType')"
            @change="
              addGroupIdToDistribution(row, selectedItemIds[$index], 0, $index)
            "
            @focus="setList(row, 0)"
          >
            <el-option
              v-for="item in allEmployeeTypes2"
              :key="item.id"
              :label="item.Employetype_name"
              :value="item.id"
            ></el-option>
          </el-select>
          <!--组织机构类型-->
          <el-select
            v-if="row.DistributionItemType === 2"
            v-model="selectedItemIds[$index]"
            style="display: block; margin-top: 5px"
            :placeholder="$t('accessControl.pleaseChooseDepartment')"
            @change="
              addGroupIdToDistribution(row, selectedItemIds[$index], 1, $index)
            "
            @focus="setList(row, 1)"
          >
            <el-option
              v-for="item in allDepartments2"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <!--个人-->
          <el-select
            v-else-if="row.DistributionItemType === 0"
            v-model="selectedItemIds[$index]"
            style="display: block; margin-top: 5px"
            filterable
            remote
            reserve-keyword
            :placeholder="$t('accessControl.pleaseInputName')"
            :remote-method="loadStaffs"
            :loading="isLoadingStaffs"
            @change="addStaffIdToDistribution(row, selectedItemIds[$index])"
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
      <el-table-column
        align="center"
        :label="$t('accessControl.device')"
        min-width="300px"
      >
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
            :placeholder="$t('accessControl.pleaseChooseDevice')"
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
      <el-table-column
        align="center"
        :label="$t('accessControl.rule')"
        min-width="300px"
      >
        <template #default="{ row }">
          <el-select
            v-model="row.AccessRuleId"
            :placeholder="$t('accessControl.pleaseChoose')"
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
      <el-table-column fixed align="center" width="50px">
        <template #default="{ row, $index }">
          <el-button type="text" @click="removeDistribution($index, row)">
            <i class="el-icon-remove" style="font-size: 1.5em; color: red"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-alert
      v-if="lang != 'zh_CN'"
      :title="$t('accessControl.noteTitle')"
      type="info"
      style="margin-top: 10px; line-height: 1.3em"
      :description="$t('accessControl.notes')"
      :closable="false"
      show-icon
    ></el-alert>
    <el-alert
      v-else
      :title="$t('accessControl.noteTitle')"
      type="info"
      style="margin-top: 10px; line-height: 1.3em"
      :closable="false"
      show-icon
    >
      <slot name="description">
        <p class="note">{{ $t('accessControl.note1') }}</p>
        <p class="note">{{ $t('accessControl.note2') }}</p>
        <p class="note">{{ $t('accessControl.note3') }}</p>
        <p class="note">{{ $t('accessControl.note4') }}</p>
        <p class="note">{{ $t('accessControl.note5') }}</p>
      </slot>
    </el-alert>
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
    buildRuleDeploymentTask,
    canAddAccessControlDeployTask,
    setDefaultAccess,
  } from '@/api/accesscontrol'
  import { accessControl } from '@/api/common'
  import { getUserConfigObject } from '@/api/sysPage'
  import { getAllMyDevices } from '@/api/device'

  export default {
    data() {
      return {
        lang: this.$lang,
        distributions: [],
        allAccessRules: [],
        allDevices: [],
        allEmployeeTypes: [],
        allEmployeeTypes2: [],
        allDepartments: [],
        allDepartments2: [],
        selectedItemIds: null,
        selectedDeviceIds: null,
        isLoadingStaffs: false,
        matchedEmployees: [],
        defaultAccess: accessControl.fullAccess,
      }
    },
    created() {
      this.loadAllEmployeeTypes()
      this.loadAllAccessRules()
      this.loadAllDepartments()
      this.loadAllMyDevices()
      this.loadDistribution()
      var setting = getUserConfigObject()
      this.defaultAccess = setting.DefaultAccess
    },
    methods: {
      loadDistribution() {
        const distributions = getAllRuleDistribution()
        this.distributions = distributions
        this.selectedDeviceIds = new Array(distributions.length)
        this.selectedItemIds = new Array(distributions.length)
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
        for (const device of distribution.Devices) {
          if (device.DeviceId === deviceId) {
            this.$baseMessage(
              this.$t('accessControl.selectedItemAlreadyExists'),
              'warning'
            )
            return
          }
        }
        let data = addDeviceIdToDistribution(distribution.Id, deviceId)
        distribution.Devices.push(data)
      },
      addGroupIdToDistribution(distribution, groupId, groupIdType, index) {
        let data = addGroupIdToDistribution(
          distribution.Id,
          groupId,
          groupIdType
        )
        distribution.Items.push(data)

        let option = []
        if (groupIdType == 0) {
          option = this.allEmployeeTypes2
        } else if (groupIdType == 1) {
          option = this.allDepartments2
        }
        let isFind = -1
        option.forEach((item, index) => {
          if (item.id == groupId) {
            isFind = index
          }
        })
        if (isFind >= 0) {
          option.splice(isFind, 1)
        }
        this.selectedItemIds[index] = ''
      },
      addStaffIdToDistribution(distribution, staffId) {
        for (const staff of distribution.Items) {
          if (staff.StaffId === staffId) {
            this.$baseMessage(
              this.$t('accessControl.selectedItemAlreadyExists'),
              'warning'
            )
            return
          }
        }
        let data = addStaffIdToDistribution(distribution.Id, staffId)
        distribution.Items.push(data)
      },
      addDistribution(type) {
        this.$prompt(this.$t('accessControl.name'), {}).then(({ value }) => {
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
      buildRuleDeploymentTask() {
        if (!canAddAccessControlDeployTask()) {
          this.$baseMessage(
            this.$t('accessControl.thereIsUnfinishedTask'),
            'warning'
          )
        } else {
          this.$baseConfirm(this.$t('accessControl.issueTip'), null, () => {
            buildRuleDeploymentTask()
            this.$baseMessage(
              this.$t('accessControl.taskCreatedSuccessfully'),
              'success'
            )
          })
        }
      },

      setList(row, type) {
        let array = []
        let option = []
        if (type == 0) {
          option = this.allEmployeeTypes
        } else if (type == 1) {
          option = this.allDepartments
        }
        option.forEach((data) => {
          let isFind = false
          row.Items.forEach((item) => {
            if (item.GroupId == data.id) {
              isFind = true
            }
          })
          if (!isFind) {
            array.push(data)
          }
        })
        if (type == 0) {
          this.allEmployeeTypes2 = array
        } else if (type == 1) {
          this.allDepartments2 = array
        }
      },
      setDefaultAccess() {
        setDefaultAccess(this.defaultAccess)
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
    display: flex;
    flex-wrap: wrap;
    align-items: center;
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
  .note {
    margin: 2px 0;
  }
</style>
