<template>
  <nav aria-label="...">
    <ul class="pagination pagination-sm">
      <li
        v-for="f in floor"
        :key="f"
        :class="className(f.id)"
        @click="chooseFloor(f.id)"
      >
        <a class="page-link" href="#">{{ floorName(f.id) }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>

export default {
  props: ["floorId"],
  data() {
    return {
      floor: [
        { "id": "first" },
        { "id": "second"}
      ]
    };
  },
  methods: {
    floorName(floorId) {
      return (floorId + " floor").toUpperCase();
    },
    chooseFloor(floorId) {
      this.$emit("chooseFloor", floorId);
    },
    className(floorId) {
      return ["page-item", { active: this.floorId === floorId }];
    }
  },
  mounted() {
    this.chooseFloor(this.floor[0].id);
  }
};
</script>

<style>
.page-item a {
  color: red !important;
}

.active a {
  font-weight: bold;
  color: white !important;
  background-color: red !important;
}
</style>
