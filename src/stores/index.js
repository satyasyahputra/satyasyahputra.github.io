// Vuex
import { createStore } from 'vuex';
import { getRawPostGithub, getPostPages, getTutorialPages, getGithubReadme, getAboutme } from '@/api';
import { setLocalTheme } from '@/utils';

// Create a new store instance.
const store = createStore({
    state() {
        return {
            title: "",
            headline: "Satya Syahputra",
            navigations: [
                [
                    "mdi-home",
                    "Home",
                    "/home"
                ],
                [
                    "mdi-post",
                    "Blogs",
                    "/blogs"
                ],
                // [
                //     "mdi-application-brackets",
                //     "Tutorials",
                //     "/tutorials"
                // ],
                [
                    "mdi-file-account",
                    "About me",
                    "/about-me"
                ],
            ],
            isDark: false,
            homeContent: "",
            rawGithubMarkdown: "",
            posts: [],
            tutorials: [],
            workExperiences: [],
            educations: [],
            skills: [],
            programmingLanguages: [],
            languages: [],
            personalIcons: []
        }
    },
    mutations: {
        changeTheme(state) {
            state.isDark = !state.isDark
            state.isDark ? setLocalTheme('dark') : setLocalTheme('light');
        },
        changeTitle(state, title) {
            document.title = title + " | Satya Syahputra"
            state.title = title;
        },
        fetchAboutme(state) {
            getAboutme()
                .then(res => {
                    state.workExperiences = res.data.workExperiences;
                    state.educations = res.data.educations;
                    state.programmingLanguages = res.data.programmingLanguages;
                    state.languages = res.data.languages;
                    state.skills = res.data.skills;
                    state.personalIcons = res.data.personalIcons;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        fetchPosts(state) {
            getPostPages()
                .then(res => {
                    state.posts = res.data;
                })
                .catch(err => {
                    console.error(err); state.posts = [];
                })
        },
        fetchTutorials(state) {
            getTutorialPages()
                .then(res => {
                    state.tutorials = res.data;
                })
                .catch(err => {
                    console.error(err); state.tutorials = [];
                })
        },
        getReadme(state) {
            getGithubReadme()
                .then(res => {
                    state.homeContent = res.data;
                })
                .catch(err => {
                    console.error(err);
                    state.homeContent = "";
                })
        },
        setTheme(state, theme) {
            if (theme == 'dark') {
                state.isDark = true;
            } else {
                state.isDark = false;
            }
        },
        updatePostDetail(state, id) {
            getRawPostGithub(id)
                .then(res => {
                    state.rawGithubMarkdown = res.data;
                })
                .catch(err => {
                    console.error(err);
                    state.rawGithubMarkdown = "";
                })
        }
    }
})

export default store;