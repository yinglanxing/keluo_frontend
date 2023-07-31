<template>
  <div class="home">
    <Menu> </Menu>
  </div>
</template>

<script>
import Menu from "../components/menu.vue";

export default {
  components: {
    Menu,
  },
};
</script>

<style lang="scss" scoped>
.home {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>