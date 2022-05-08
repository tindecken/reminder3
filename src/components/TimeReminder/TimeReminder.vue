<template>
  <q-form @submit="onOKClick" greedy class="row justify-center q-mt-lg">
    <div class="col-8">
      <q-input
        label="Number in seconds"
        outlined
        dense
        autofocus
        v-model="time"
        :rules="[
          (val) => !!val || '* Required',
          (val) => !isNaN(val) || '* Must be a number',
        ]"
        lazy-rules
      />
    </div>
    <div class="col-auto q-ml-sm">
      <q-btn outline label="Go" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { writeText, startTimer } from '../../backend/utils';
const time = ref('');
function onOKClick() {
  writeText(time.value);
  startTimer(parseInt(time.value));
}
</script>

<style scoped lang="scss"></style>
