<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer">
            <v-sheet color="grey-lighten-4" class="pa-4">
                <div>{{ app.headine }}</div>
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

            <v-toolbar-title>{{ app.title }}</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import { app, navigations } from '@/repositories'

export default {
    data: () => ({
        drawer: null,
        navigations: navigations,
        app: app
    }),
}
</script>