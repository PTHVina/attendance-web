<template>
  <div class="test-container">
    <div class="personnel">
      <!-- 工作分类 -->
      <div class="tree_title">{{ $t('system.text_3') }}</div>
      <div v-for="(tag, key) in dynamicTags" :key="tag" class="tag_list">
        <el-tag v-if="isChange != key" closable @close="handleClose(tag, key)">
          <!-- @click="changeItem(tag, key)" -->
          {{ tag.Employetype_name }}
        </el-tag>
        <!-- v-else-if="isChange == key" -->
        <el-input
          v-if="false"
          ref="changeTagInput"
          v-model="changeVal"
          class="input-new-tag"
          size="small"
          @keyup.enter.native="changeTag"
          @blur="changeTag"
        ></el-input>
      </div>
      <el-input
        v-if="inputVisible"
        ref="saveTagInput"
        v-model="inputValue"
        class="input-new-tag"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      ></el-input>
      <!-- 添加 -->
      <el-button v-else class="button-new-tag" size="small" @click="showInput">
        + {{ $t('operation_btn.btn_text_1') }}
      </el-button>
    </div>
  </div>
</template>
<script>
  import { getTag, delTag, addTag } from '@/api/sysPage'
  export default {
    name: 'Classification',
    data() {
      return {
        lang: this.$lang,
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',

        isChange: -1,
        changeVal: '',
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        this.dynamicTags = getTag()
      },

      // 人员分类
      handleClose(tag, key) {
        this.$baseConfirm(this.$t('operation_tips.tips_4'), null, () => {
          let res = delTag(tag.Employetype_name)
          if (!res) {
            this.$baseMessage(this.$t('operation_tips.tips_5'), 'warning')
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
        let inputValue = this.inputValue.trim()
        if (!inputValue) {
          this.inputVisible = false
          this.inputValue = ''
          return
        }
        let res = addTag(inputValue)
        if (res) {
          this.dynamicTags.push({ Employetype_name: inputValue })
          this.inputVisible = false
          this.inputValue = ''
        } else {
          this.$baseMessage(this.$t('operation_tips.tips_9'), 'warning')
        }
      },
      changeItem(tag, key) {
        this.isChange = key
        this.changeVal = tag.Employetype_name
        setTimeout(() => {
          this.$refs['changeTagInput'].focus()
        }, 500)
        // console.log(tag)
      },
      changeTag() {
        this.dynamicTags[this.isChange].Employetype_name = this.changeVal
        this.isChange = -1
        this.changeVal = ''
      },
    },
  }
</script>

<style lang="scss" scoped>
  .test-container {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .tree_title {
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
    .tag_list {
      display: inline-block;
      .input-new-tag {
        vertical-align: unset;
      }
    }
  }
</style>
