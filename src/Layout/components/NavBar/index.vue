<template>
  <div>
    <div class="navbar flex flex-align-center flex-justify-between border-b">
      <div class="flex flex-align-center">
        <Collapse />
        <Breadcrumb />
      </div>
      <AvatarDropDown />
    </div>
    <Breadcrumb />
  </div>
</template>

<script>
import Collapse from "./Collapse.vue";
import Breadcrumb from "./Breadcrumb.vue";

import AvatarDropDown from "./AvatarDropDown.vue";

export default {
  name: "",
  components: { Collapse, Breadcrumb, AvatarDropDown },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  > div:first-child {
    height: 50px;
  }
}
</style>
