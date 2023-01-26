<template>
    <v-app id="inspire" :theme="isDark ? 'dark' : 'light'">
        <v-navigation-drawer v-model="drawer">
            <v-sheet class="pa-4">
                <div>{{ headline }}</div>
            </v-sheet>
            <v-divider></v-divider>

            <v-list>
                <v-list-item v-for="[icon, text, path] in navigations" :key="icon" link :to="path">
                    <template v-slot:prepend>
                        <v-icon>{{ icon }}</v-icon>
                    </template>
                    <v-list-item-title>{{ text }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>{{ title }}</v-toolbar-title>

            <v-btn icon size="x-small" @click="onThemeClick" variant="outlined">
                <v-icon>{{ isDark? 'mdi-weather-night': 'mdi-weather-sunny' }}</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>

        <v-footer>
            <v-container>
                <v-row justify="center">
                    <v-col cols="12" align="center">
                        <v-btn v-for="[icon, link, label] in footers" :key="icon" class="mx-4" :icon="icon"
                            variant="text" :href="link" target="_blank"></v-btn>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col cols="12" md="3" align="center">
                        {{ new Date().getFullYear() }} — <strong>Satya Syahputra</strong>
                    </v-col>
                </v-row>
            </v-container>
        </v-footer>
    </v-app>
</template>

<script>

import store from '@/stores';
import { mapState } from 'vuex';
export default {
    data: () => ({
        drawer: null,
        footers: [
            ["mdi-youtube-gaming", "https://www.youtube.com/@argonaut-ch", "Argonaut"],
            ["mdi-youtube", "https://www.youtube.com/@SatyaSDev", "code artisan id"],
            ["mdi-linkedin", "https://www.linkedin.com/in/satya-syahputra", "Satya Syahputra"],
            ["mdi-github", "https://github.com/satyasyahputra", "satyasyahputra"],
            ["mdi-gitlab", "https://gitlab.com/satyasyahputra", "satyasyahputra"]
        ]
    }),
    computed: {
        ...mapState({
            title: 'title',
            headline: 'headline',
            navigations: 'navigations',
            isDark: 'isDark'
        })
    },
    methods: {
        onThemeClick() {
            store.commit('changeTheme');
        }
    }
}
</script>