<template>
  <router-view />
</template>

<script setup>
import store from '@/stores';
import { getLocalTheme } from '@/utils';

store.commit('fetchTutorials');
store.commit('fetchPosts');
store.commit('fetchAboutme');
store.commit('getReadme');
store.commit('setTheme', getLocalTheme())
</script>
