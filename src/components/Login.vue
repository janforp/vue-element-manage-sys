<template>
  <el-form :model="loginModel" :rules="rules2" ref="loginModel" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginModel.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="loginModel.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="isRememberAccount" id="rememberAccount" class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="doLogin()" :loading="loginIng">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import API from "../api/api";
  export default {
    data() {
      return {
        loginIng: false,
        loginModel: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        isRememberAccount: false
      };
    },
    mounted() {
      this.rememberAccount();
    },
    methods: {
      rememberAccount() {
        const rememberAccountStr = Cookies.get("rememberAccount");
        if(rememberAccountStr !== undefined) {
          const rememberAccount = JSON.parse(rememberAccountStr);
          this.loginModel.account = rememberAccount.account;
          this.loginModel.checkPass = rememberAccount.password;
          this.isRememberAccount=true;
        }
      },
      doLogin() {
        const _this = this;
        this.loginIng = true;
        API.loginAPI(
          _this.loginModel.account,_this.loginModel.checkPass,
          function (result) {
            _this.loginIng=false;
            //登录成功之后，把用户数据存入 cookie
            if (_this.isRememberAccount) {
              const rememberAccount = {
                account:_this.loginModel.account,
                password:_this.loginModel.checkPass,
                isRememberAccount:true
              };
              Cookies.set("rememberAccount", JSON.stringify(rememberAccount));
            }else {
              Cookies.remove("rememberAccount");
            }
            _this.$router.push('stoneList')
          },
          function (message) {
            alert(message);
            _this.loginIng=false;

          });
      }
    }
  }

</script>

<!--cnpm install node-sass sass-loader scss-loader —save-dev-->
<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
