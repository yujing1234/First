<template>
  <div>
    <el-card class="box-card cardbox">
      <div slot="header" class="clearfix cardheader">登录</div>
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.uname"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.pwd"></el-input>
          </el-form-item>
          <el-form-item class="buttonSubmit">
            <el-button type="primary" @click="onSubmit">立即登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      form: {
        uname: "",
        pwd: ""
      }
    };
  },
  methods: {
      ...mapActions(['setIsLoginAction','setunameAction']),
    onSubmit() {
      this.axios.post(this.$base.baseUrl+this.$base.login,this.form)
      .then(data=>{
          if(data.data.code == 1){
            //   向vuex中存储数据
            this.setIsLoginAction(true)
            this.setunameAction(data.data.user.uname);
            // 本地持久化
            localStorage.setItem('isLogin',true)
            localStorage.setItem('username',data.data.user.uname)
            // 页面跳转
            this.$router.replace('/')
          }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.cardbox{
    width:60%;
    margin:0 auto;
    .cardheader{
        text-align: center;
    }
}
.buttonSubmit{
    text-align: center;
    button{
        margin-left:-49px;
    }
}
</style>