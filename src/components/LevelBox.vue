<template>
  <v-hover v-slot:default="{ hover }">
    <v-btn
      @click="$router.push(`/${level.number}`)"
      :class="{ 'on-hover': hover, }"
      x-large
      :color="color"
      light
      width="200"
      height="200"
      :disabled="disabled"
    >
      <v-card-title>Nível {{ level.number }}</v-card-title>
    </v-btn>
  </v-hover>
</template>

<script>
export default {
  props: {
    level: { type: Object, required: true },
    disabled: { type: Boolean, required: true },
    color: { type: String, required: true }
  }
};
</script>

<style scoped>
</style>
