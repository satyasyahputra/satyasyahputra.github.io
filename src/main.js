/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Vuex State Management
import store from '@/stores'

import 'highlight.js/styles/stackoverflow-dark.css'
import 'highlight.js/lib/common';
import hljs from 'highlight.js/lib/core';
import elixir from 'highlight.js/lib/languages/elixir';
import hljsVuePlugin from "@highlightjs/vue-plugin";

const app = createApp(App);

hljs.registerLanguage('elixir', elixir);

app.use(store)
app.use(hljsVuePlugin)

registerPlugins(app)

app.mount('#app')
