<template>
  <el-aside :class="{ collapse: isCollapse }">
    <el-menu :default-active="$route.name" :collapse="isCollapse">
      <SlideBarItem v-for="item in routes" :key="item.path" :item="item" />
    </el-menu>
  </el-aside>
</template>

<script>
import SlideBarItem from './Item.vue';

export default {
  name: '',
  components: { SlideBarItem },
  data() {
    return {};
  },
  computed: {
    isCollapse() {
      return this.$store.getters.isCollapse;
    },
    routes() {
      return this.$store.getters.routes;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-aside {
  width: 230px !important;
  background-color: #f1f1f1;
  overflow-x: hidden;
  transition: 0.4s;
  /deep/ .el-menu-item > a > span,
  /deep/ .el-submenu__title > span {
    position: relative;
    right: 0;
    transition: right 1s;
  }
  &.collapse {
    width: 64px !important;
    /deep/ .el-menu-item > a > span,
    /deep/ .el-submenu__title > span {
      right: -100px;
    }
  }
  /deep/ .el-menu {
    max-width: 230px;
    background-color: transparent;
    border: none;
    &:hover {
      i {
        color: #3477f2;
      }
    }
    .el-submenu {
      &.is-active {
        .el-submenu__title {
          background-color: #8da3cc;
          &:hover {
            background-color: #fff;
          }
        }
      }
      .el-submenu__title {
        color: #fff;
        &:hover {
          color: #3477f2;
          i {
            color: #3477f2;
          }
        }
        > i {
          color: #333;
        }
      }
    }
    .el-menu-item {
      &.is-active,
      &:hover {
        background-color: #fff;
        .el-submenu__title,
        a,
        i {
          color: #3477f2;
        }
      }
      .el-submenu__title,
      a,
      i {
        color: #333;
        &:hover {
          &,
          i {
            color: #3477f2;
          }
        }
      }
    }
  }
}
</style>
