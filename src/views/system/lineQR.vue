<template>
  <div class="table-container">
    <div class="img_box">
      <div class="img">
        <el-image
          v-if="img"
          class="image"
          :src="img"
          fit="contain"
          :preview-src-list="srcList"
        >
          <div slot="error" class="image-slot">
            <i class="el-icon-document-delete"></i>
          </div>
        </el-image>
        <span v-else class="el-icon-picture-outline"></span>
      </div>
      <div class="img_btn" @click="openDialog">
        <span v-if="!img">登録</span>
        <span v-else>再登録</span>
      </div>
    </div>

    <el-dialog
      title="二次元コードを編集する"
      :visible.sync="dialogVisible"
      width="300px"
      :destroy-on-close="true"
      :before-close="closeFn"
    >
      <el-form
        ref="setForm"
        :model="form"
        label-width="55px"
        :rules="rules"
        size="medium"
      >
        <!-- 照片 -->
        <el-form-item label="" prop="picture" style="margin: 0">
          <div class="add_img">
            <el-image
              v-if="form.picture"
              class="show_img"
              :src="form.picture"
              :preview-src-list="[form.picture]"
              fit="contain"
            ></el-image>
            <i v-else class="el-icon-picture-outline"></i>
            <div class="add_box" @click="checkImg">
              <span class="uploading">画像を選択</span>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setData('setForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'LineQR',
    data() {
      return {
        img: '',
        srcList: [],
        dialogVisible: false,
        form: {
          picture: '',
        },
        rules: {
          picture: [
            {
              required: true,
              message: '写真を選択してください',
              trigger: 'change',
            },
          ],
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
        var image = window.top.myExtension.getlineQRcode()
        var image_json = JSON.parse(image)
        if (image_json.length > 0) {
          this.img = image_json[0].lineRQcode
          this.srcList = [image_json[0].lineRQcode]
        }
      },
      openDialog() {
        this.dialogVisible = true
      },
      closeFn() {
        this.form.picture = ''
        this.dialogVisible = false
      },
      //选择图片
      checkImg() {
        let img = window.top.myExtension.openImgeforRcodeUrl()
        if (!img) {
          return
        }
        this.form.picture = img
      },
      setData(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var re = window.top.myExtension.setlineQRcode(this.form.picture)
            var re_json = JSON.parse(re)
            if (re_json.result == 2) {
              this.$baseMessage('保存しました', 'success')
              this.init()
              this.dialogVisible = false
              this.form.picture = ''
            } else {
              this.$baseMessage(re_json.data, 'error')
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
  .img_box {
    width: 300px;
    height: 400px;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -20%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .img {
      width: 100%;
      height: 300px;
      border: 1px dashed #aaa;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      .image {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        .image-slot {
          width: 100%;
          height: 100%;
          text-align: center;
          line-height: 300px;
          i {
            font-size: 40px;
            font-weight: 200;
            color: #ccc;
          }
        }
      }
      > span {
        font-size: 40px;
        font-weight: 200;
        color: #ccc;
      }
    }
    .img_btn {
      width: 150px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: #1890ff;
      color: white;
      border-radius: 5px;
      margin-top: 40px;
      cursor: pointer;
    }

    .add_img {
      background-color: #fbfdff;
      border: 1px dashed #c0ccda;
      border-radius: 6px;
      box-sizing: border-box;
      width: 146px;
      height: 146px;
      position: relative;
      z-index: 0;
      .show_img {
        width: 100%;
        height: 100%;
        border: 1px solid #eee;
        border-radius: 6px;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }
      > i {
        width: 100%;
        height: 100%;
        line-height: 146px;
        vertical-align: top;
        font-size: 40px;
        color: #ccc;
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }
      .add_box {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        border-radius: 6px;
        background: rgba($color: #666, $alpha: 0.6);
        display: none;
        // display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        span {
          color: white;
          cursor: pointer;
          font-size: 12px;
          line-height: 16px;
        }
        .uploading {
          margin-right: 20px;
        }
      }
    }
    .add_img:hover .add_box {
      display: flex;
    }
  }
</style>
