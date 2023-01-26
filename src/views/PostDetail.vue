<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <div v-html="markdownToHtml"></div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import store from '@/stores';
store.commit('changeTitle', "Post")
</script>

<script>
import { customMarked } from '@/utils';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            markdown: "# Hello World",
        };
    },
    props: {
        id: String,
        title: String,
        subtitle: String,
        createdAt: Date,
        contents: Array,
    },
    computed: {
        markdownToHtml() {
            store.commit('updatePostDetail', this.id);
            return customMarked(this.rawGithubMarkdown);
        },
        ...mapState({
            rawGithubMarkdown: 'rawGithubMarkdown'
        })
    }
}

</script>