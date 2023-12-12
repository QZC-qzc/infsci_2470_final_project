<template>
  <div class="login h_100 flex flex-justify-center">
    <div class="inner_box">
      <div class="title c_fff bold t-center">System Login</div>
      <el-form ref="form"
               :model="param"
               :rules="rules">
        <el-form-item prop="name">
          <el-input v-model="param.name"
                    placeholder="The user name is admin"
                    prefix-icon="el-icon-user" />
        </el-form-item>
        <el-form-item prop="name">
          <el-input type="password"
                    prefix-icon="el-icon-lock"
                    v-model="param.password"
                    placeholder="The password is 123456"
                    show-password />
        </el-form-item>
        <el-button class="w_100"
                   type="primary"
                   :loading="loginLoading"
                   @click="login('form')">log in</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data () {
    return {
      param: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: "please input the username", trigger: blur }],
        password: [{ required: true, message: "please input the password", trigger: blur }]
      },
      loginLoading: false
    };
  },
  created () { },
  methods: {
    login (formName) {

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loginLoading = true;
          this.$store.dispatch("user/login", this.param).then((res) => {
            this.loginLoading = false;
            this.$router.push({
              path: '/'
            });
          }).catch(() => {
            this.loginLoading = false;
          })
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  background: url(~@/assets/img/20201220113436398.png) no-repeat center center;
  background-size: cover;
  .inner_box {
    width: 450px;
    margin-top: 220px;
    .title {
      padding-bottom: 40px;
      font-size: 30px;
    }
    /deep/ .el-form-item {
      background-color: #283443;
      border: 1px solid #434c58;
      border-radius: 4px;
      .el-input {
        input {
          height: 50px;
          padding-right: 30px;
          font-size: 16px;
          background-color: transparent;
          border: none;
          color: #fff;
        }
      }
    }
  }
}
</style>
