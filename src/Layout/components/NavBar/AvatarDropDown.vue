<template>
  <div>
    <span class="el-dropdown-link">
      <i style="color: #fff;margin-right: 10px">Account：{{ name }}</i>
      <i style="margin-right:10px">time： {{date}}</i>
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <el-avatar :size="30"
                     :src="avatar"></el-avatar>
          <span style="padding: 0 10px;color: #fff;"> {{ name }}</span>
          <i class="el-icon-arrow-down"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userInfo">User Info</el-dropdown-item>
          <el-dropdown-item command="logout">
            <span>

              Sign Out
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>

  </div>
</template>

<script>
export default {
  name: "",
  data () {
    return {
      avatar: this.$store.getters.userInfo.avatar,
      name: this.$store.getters.userInfo.name,
      date: this.$store.getters.userInfo.date,
    };
  },
  methods: {
    handleClick (command) {
      if (command === "userInfo") this.goUserInfo();
      else if (command === "changePassword") this.changePassword();
      else if (command === "logout") this.logout();
    },
    goUserInfo () {
      this.$router.push({ path: "/userInfo/index" });
    },
    changePassword () {
      this.$router.push({ name: "ChangePassword" });
    },
    logout () {
      this.$store.dispatch("user/logout").then(() => {
        this.$router.push({ name: "Login" });
      });
    },
  },
};
</script>
<style>
.el-dropdown-link {
  display: flex;
  align-items: center;
  font-size: 15px;
}
.el-icon-circle-close {
  cursor: pointer;
  margin-left: 10px;
}
.el-icon-arrow-down {
  color: #fff;
}
</style>
