<template>
  <q-layout view="lHh lpr lFf" container style="height: 120px">
    <q-header elevated>
      <q-bar class="q-electron-drag">
        <q-icon name="alarm" />
        <div>Reminder 3</div>
        <q-space />
        <q-btn dense flat icon="minimize" @click="minimize" />
        <!-- <q-btn dense flat icon="crop_square" @click="toggleMaximize" /> -->
        <q-btn dense flat icon="close" @click="closeApp" />
      </q-bar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const leftDrawerOpen = ref(false);
function minimize() {
  if (process.env.MODE === 'electron') {
    window.myShell.minimize();
  }
}

function toggleMaximize() {
  if (process.env.MODE === 'electron') {
    window.myShell.toggleMaximize();
  }
}

function closeApp() {
  if (process.env.MODE === 'electron') {
    window.myShell.close();
  }
}
</script>
