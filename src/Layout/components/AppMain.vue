<template>
  <section class="app_main">
    <el-header height="60px">
      Meeting

      <div class="avatar">
        <AvatarDropDown />
      </div>
    </el-header>
    <div class="flex"
         style="height: calc(100% - 60px)">
      <SliderBar />

      <el-container>
        <el-main>
          <VisitedViews />
          <transition name="fade-transform"
                      mode="out-in">
            <keep-alive :include="cachedViews">
              <router-view :key="$route.fullPath" />
            </keep-alive>
          </transition>
        </el-main>
      </el-container>
    </div>
  </section>
</template>

<script>
import SliderBar from './SliderBar/index.vue';
import VisitedViews from './NavBar/VisitedViews.vue';
import AvatarDropDown from './NavBar/AvatarDropDown.vue';

export default {
  components: { SliderBar, AvatarDropDown, VisitedViews },
  data () {
    return {
      cachedViews: this.$store.getters.cachedViews
    };
  }
};
</script>

<style lang="scss" scoped>
.app_main {
  height: 100%;
  .el-header {
    position: relative;
    line-height: 60px;
    background-color: #448db7;
    color: #fff;
    font-size: 25px;
  }
}
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
  opacity: 0;
  transform: translateX(30px);
}
.avatar {
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
