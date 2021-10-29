<template>
  <div class="table-container">
    <div class="tips">
      <span>説明:</span>
      <span>
        顔認証後、登録した LINE アカウントへのメッセージを設定します。
      </span>
    </div>
    <el-form ref="ruleForm" :model="form" label-width="110px">
      <el-form-item label="PDFタイトル">
        <el-input v-model="form.text1" placeholder="PDFタイトル"></el-input>
      </el-form-item>
      <el-form-item label="段落1">
        <el-input
          v-model="form.text2"
          type="textarea"
          autosize
          placeholder="コンテンツを入力してください"
        ></el-input>
      </el-form-item>
      <el-form-item label="段落2">
        <el-input
          v-model="form.text3"
          type="textarea"
          autosize
          placeholder="コンテンツを入力してください"
        ></el-input>
      </el-form-item>
      <el-form-item label="段落3">
        <el-input
          v-model="form.text4"
          type="textarea"
          autosize
          placeholder="コンテンツを入力してください"
        ></el-input>
      </el-form-item>
      <el-form-item label="段落4">
        <el-input
          v-model="form.text5"
          type="textarea"
          autosize
          placeholder="コンテンツを入力してください"
        ></el-input>
      </el-form-item>
      <el-form-item label="段落5">
        <el-input
          v-model="form.text6"
          type="textarea"
          autosize
          placeholder="コンテンツを入力してください"
        ></el-input>
      </el-form-item>
      <el-form-item label="段落6">
        <el-input
          v-model="form.text7"
          type="textarea"
          autosize
          placeholder="コンテンツを入力してください"
        ></el-input>
      </el-form-item>
      <el-form-item label="段落7">
        <el-input
          v-model="form.text8"
          type="textarea"
          autosize
          placeholder="コンテンツを入力してください"
        ></el-input>
      </el-form-item>
      <el-form-item label="段落8">
        <el-input
          v-model="form.text9"
          type="textarea"
          autosize
          placeholder="コンテンツを入力してください"
        ></el-input>
      </el-form-item>
      <el-form-item label="段落9">
        <el-input
          v-model="form.text10"
          type="textarea"
          autosize
          placeholder="コンテンツを入力してください"
        ></el-input>
      </el-form-item>
      <el-form-item label="段落10">
        <el-input
          v-model="form.text11"
          type="textarea"
          autosize
          placeholder="コンテンツを入力してください"
        ></el-input>
      </el-form-item>
      <el-form-item label="段落11">
        <el-input
          v-model="form.text12"
          type="textarea"
          autosize
          placeholder="コンテンツを入力してください"
        ></el-input>
      </el-form-item>
      <el-form-item label="段落12">
        <el-input
          v-model="form.text13"
          type="textarea"
          autosize
          placeholder="コンテンツを入力してください"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { getPdfData, setPdfData } from '@/api/sysPage'
  export default {
    name: 'Pdf',
    data() {
      return {
        form: {
          text1: '',
          text2: '',
          text3: '',
          text4: '',
          text5: '',
          text6: '',
          text7: '',
          text8: '',
          text9: '',
          text10: '',
          text11: '',
          text12: '',
          text13: '',
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
        let res = getPdfData()
        if (res.length > 0) {
          this.form.text1 = res[0].pdftitle
          this.form.text2 = res[0].rows1
          this.form.text3 = res[0].rows2
          this.form.text4 = res[0].rows3
          this.form.text5 = res[0].rows4
          this.form.text6 = res[0].rows5
          this.form.text7 = res[0].rows6
          this.form.text8 = res[0].rows7
          this.form.text9 = res[0].rows8
          this.form.text10 = res[0].rows9
          this.form.text11 = res[0].rows10
          this.form.text12 = res[0].rows11
          this.form.text13 = res[0].rows12
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let res = setPdfData(this.form)
            if (res.result == 2) {
              this.$baseMessage('変更しました', 'success')
              this.init()
            } else {
              this.$baseMessage(res.data, 'warning')
            }
          } else {
            return false
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .tips {
    margin-bottom: 50px;
    span:nth-child(1) {
      font-weight: 600;
      color: #333;
    }
    span:nth-child(2) {
      color: #888;
    }
  }
  .tip_text {
    color: #999;
    font-size: 14px;
    margin: 0;
  }
  .el-form-item__label {
    color: #333;
    font-size: 16px;
  }
  .el-textarea__inner {
    min-height: 32px !important;
  }
</style>
