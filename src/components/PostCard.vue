<template>
  <v-card class="mx-auto">
    <router-link :to="url">
      <v-img class="align-end text-white" height="150" :src="imageUrl || defaultImageUrl" cover>
        <v-card-title>{{ title }}</v-card-title>
      </v-img>
    </router-link>
    <v-card-subtitle class="pt-4">
      {{ subtitle }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange" link :to="url">
        {{ buttonText || 'Open'}}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          <div>{{ trimText(text) }}</div>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    maxText: 120,
    show: false,
    defaultImageUrl: 'https://raw.githubusercontent.com/satyasyahputra/satyasyahputra.github.io/master/page-assets/images/code-artisan-id.png'
  }),
  props: {
    title: String,
    subtitle: String,
    text: String,
    buttonText: String,
    url: String,
    imageUrl: String
  },
  methods: {
    trimText() {
      if (this.text && this.text.length > this.maxText)
        return this.text.slice(0, this.maxText).trim().concat("...");
      else
        return this.text;
    }
  }
}
</script>
