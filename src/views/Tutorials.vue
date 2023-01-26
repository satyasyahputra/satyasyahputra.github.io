<template>
  <v-container>
    <v-row>
      <v-col md="4" sm="6" cols="12" v-for="[id, title, subtitle, imageUrl, text] in posts" :key="id">
        <Post :title="title" :subtitle="subtitle" :text="text" button-text="Open Tutorial" :image-url="imageUrl"
          :url="`/tutorials/${id}`"></Post>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Post from '@/components/PostCard.vue';
import store from '@/stores';
store.commit('changeTitle', "Tutorials")
</script>

<script>
import { mapState } from 'vuex';
export default {
  data: () => ({
  }),
  computed: {
    ...mapState({
      posts: 'tutorials'
    })
  },
  components: {
    Post
  }
}
</script>
