<template>
  <div class="not_fund flex flex-center flex-direction-column">
    <img class="banner"
         src="@/assets/img/404.jpg"
         alt="" />
    <p class="pb-20">not found</p>
    <el-button type="primary"
               @click="$router.push({ path: '/' })">return to home page</el-button>
  </div>
</template>

<script>
export default {
  name: "NotFund"
};
</script>

<style lang="scss" scoped>
.not_fund {
  .banner {
    width: 700px;
    height: 300px;
    margin: 200px auto 50px;
  }
}
</style>
