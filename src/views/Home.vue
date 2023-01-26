<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <div v-html="markdownToHtml"></div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <br />
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h2>Latest posts</h2>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col md="4" sm="6" cols="12" v-for="[id, title, subtitle, imageUrl, text] in posts" :key="id">
        <Post :title="title" :subtitle="subtitle" :text="text" button-text="read" :image-url="imageUrl"
          :url="`/blogs/${id}`"></Post>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import store from '@/stores';
store.commit('changeTitle', "Home")
</script>

<script>
import Post from '@/components/PostCard.vue';
import { customMarked } from '@/utils';
import { mapState } from 'vuex';

export default {
  computed: {
    markdownToHtml() {
      return customMarked(this.homeContent);
    },
    ...mapState({
      homeContent: 'homeContent',
      posts: 'posts'
    }),
    chunkedPosts() {
      return this.posts.slice(0, 3)
    }
  },
  components: {
    Post
  }
}
</script>
