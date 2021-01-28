<template>
  <div class="table-container">
    <div class="tips">
      <span>説明:</span>
      <span>
        顔認証後、登録した LINE アカウントへのメッセージを設定します。
      </span>
    </div>
    <el-form ref="ruleForm" :model="form" label-width="170px">
      <el-form-item label="警告する体温のしきい値">
        <el-input
          v-model="form.text1"
          placeholder="コンテンツを入力してください"
        ></el-input>
        <p class="tip_text">
          ※入力された数字以上の体温があった場合は体温異常のメッセージを送信致します。
        </p>
      </el-form-item>
      <el-form-item label="LINEサーバー名">
        <el-input
          v-model="form.text2"
          placeholder="コンテンツを入力してください"
        ></el-input>
        <p class="tip_text">
          ※お申込み後に発行されたLINEサーバー名を入力して下さい。
        </p>
      </el-form-item>
      <el-form-item label="Smtpサーバのアドレス">
        <el-input
          v-model="form.text3"
          placeholder="コンテンツを入力してください"
        ></el-input>
      </el-form-item>
      <el-form-item label="送信元アカウント">
        <el-input
          v-model="form.text4"
          placeholder="コンテンツを入力してください"
        ></el-input>
      </el-form-item>
      <el-form-item label="送信元パスワード">
        <el-input
          v-model="form.text5"
          placeholder="コンテンツを入力してください"
        ></el-input>
      </el-form-item>
      <el-form-item label="入室時のメッセージ">
        <el-input
          v-model="form.text6"
          type="textarea"
          autosize
          placeholder="体温測定なし"
        ></el-input>
        <p class="tip_text">
          （体温測定なし） 入力例）ちゃんが学校に登校しました。
          （山田太郎ちゃんが学校に登校しました。）
        </p>
      </el-form-item>
      <el-form-item label="入室時のメッセージ">
        <el-input
          v-model="form.text7"
          type="textarea"
          autosize
          placeholder="体温正常時"
        ></el-input>
        <p class="tip_text">
          （体温正常時） 入力例）ちゃんが学校に登校しました。体温は{0}°Cでした。
          （山田太郎ちゃんが学校に登校しました。体温は36.6°Cでした。）
        </p>
      </el-form-item>
      <el-form-item label="入室時のメッセージ">
        <el-input
          v-model="form.text8"
          type="textarea"
          autosize
          placeholder="体温異常時"
        ></el-input>
        <p class="tip_text">
          （体温異常時）
          入力例）ちゃんが学校に登校しました。体温は{0}°Cでした。至急、学校へ連絡をください。
          （山田太郎ちゃんが学校に登校しました。体温は36.6°Cでした。至急、学校へ連絡をください。）
        </p>
      </el-form-item>
      <el-form-item label="遅刻時のメッセージ">
        <el-input
          v-model="form.text9"
          type="textarea"
          autosize
          placeholder="体温測定なし"
        ></el-input>
        <p class="tip_text">
          （体温測定なし）
          入力例）ちゃんが学校に遅刻しました。（山田太郎ちゃんが学校に登校しました。）
        </p>
      </el-form-item>
      <el-form-item label="遅刻時のメッセージ">
        <el-input
          v-model="form.text10"
          type="textarea"
          autosize
          placeholder="体温正常時"
        ></el-input>
        <p class="tip_text">
          （体温正常時）
          入力例）ちゃんが学校に遅刻しました。体温は{0}°Cでした。（山田太郎ちゃんが学校に遅刻しました。体温は36.6°Cでした。）
        </p>
      </el-form-item>
      <el-form-item label="遅刻時のメッセージ">
        <el-input
          v-model="form.text11"
          type="textarea"
          autosize
          placeholder="体温異常時"
        ></el-input>
        <p class="tip_text">
          （体温異常時）
          入力例）ちゃんが学校に遅刻しました。体温は{0}°Cでした。至急、学校へ連絡をください。（山田太郎ちゃんが学校に遅刻しました。体温は36.6°Cでした。至急、学校へ連絡をください。）
        </p>
      </el-form-item>
      <el-form-item label="早退時のメッセージ">
        <el-input
          v-model="form.text12"
          type="textarea"
          autosize
          placeholder="体温異常時"
        ></el-input>
        <p class="tip_text">
          （体温異常時）
          入力例）ちゃんが学校から早退しました。（山田太郎ちゃんが学校から早退しました。）
        </p>
      </el-form-item>
      <el-form-item label="早退時のメッセージ">
        <el-input
          v-model="form.text13"
          type="textarea"
          autosize
          placeholder="体温異常時"
        ></el-input>
        <p class="tip_text">
          （体温異常時）
          入力例）ちゃんが学校から早退しました。体温は{0}°Cでした。（山田太郎ちゃんが学校から早退しました。体温は36.6°Cでした。）
        </p>
      </el-form-item>
      <el-form-item label="早退時のメッセージ">
        <el-input
          v-model="form.text14"
          type="textarea"
          autosize
          placeholder="体温異常時"
        ></el-input>
        <p class="tip_text">
          （体温異常時）
          入力例）ちゃんが学校から早退しました。体温は{0}°Cでした。至急、学校へ連絡をください。（山田太郎ちゃんが学校から早退しました。体温は36.6°Cでした。至急、学校へ連絡をください。）
        </p>
      </el-form-item>
      <el-form-item label="退室時のメッセージ">
        <el-input
          v-model="form.text15"
          type="textarea"
          autosize
          placeholder="体温異常時"
        ></el-input>
        <p class="tip_text">
          （体温異常時）
          入力例）ちゃんが学校から下校しました。（山田太郎ちゃんが学校から下校しました。）
        </p>
      </el-form-item>
      <el-form-item label="退室時のメッセージ">
        <el-input
          v-model="form.text16"
          type="textarea"
          autosize
          placeholder="体温異常時"
        ></el-input>
        <p class="tip_text">
          （体温異常時）
          入力例）ちゃんが学校から下校しました。体温は{0}°Cでした。（山田太郎ちゃんが学校から下校しました。体温は36.6°Cでした。）
        </p>
      </el-form-item>
      <el-form-item label="退室時のメッセージ">
        <el-input
          v-model="form.text17"
          type="textarea"
          autosize
          placeholder="体温異常時"
        ></el-input>
        <p class="tip_text">
          （体温異常時）
          入力例）ちゃんが学校から下校しました。体温は{0}°Cでした。至急、学校へ連絡をください。（山田太郎ちゃんが学校から下校しました。体温は36.6°Cでした。至急、学校へ連絡をください。）
        </p>
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
  import { getLineData, setLineData } from '@/api/sysPage'
  export default {
    name: 'Line',
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
          text14: '',
          text15: '',
          text16: '',
          text17: '',
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
        let res = getLineData()
        if (res.length > 0) {
          this.form.text1 = res[0].temperature
          this.form.text6 = res[0].Message
          this.form.text7 = res[0].Message2
          this.form.text8 = res[0].Message3
          this.form.text9 = res[0].Message4
          this.form.text10 = res[0].Message5
          this.form.text11 = res[0].Message6
          this.form.text12 = res[0].Message7
          this.form.text13 = res[0].Message8
          this.form.text14 = res[0].Message9
          this.form.text15 = res[0].Message10
          this.form.text16 = res[0].Message11
          this.form.text17 = res[0].Message12
          this.form.text3 = res[0].ftpserver
          this.form.text5 = res[0].ftppassword
          this.form.text4 = res[0].ftpusername
          this.form.text2 = res[0].line_url
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let res = setLineData(this.form)
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

<style lang="scss">
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
