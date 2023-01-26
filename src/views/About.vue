<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="4" align="center">
                <v-avatar color="surface-variant" size="150">
                    <v-img src="https://avatars.githubusercontent.com/u/46707024?v=4"
                        alt="Satya Syahputra Avatar"></v-img>
                </v-avatar>
            </v-col>
            <v-col cols="12" sm="8" :align="isMobile ? 'center' : 'left'">
                <h1>Satya Syahputra</h1>
                <h2><code>Software Engineer</code></h2>
                <v-divider></v-divider>
                <p>A Software Engineer with {{ yearExperience }}+ years work experience in application development,
                    cloud technology and multi programming languages. Have history of planning and executing projects
                    to solve problem in industries.</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6">
                <v-card variant="tonal" min-height="128" height="100%">
                    <v-card-text>
                        <div v-for="[icon, value, facade] in personalIcons" :key="icon">
                            <v-icon>{{ icon }}</v-icon> {{ facade? facade: value }}
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6">
                <v-card title="Skills" :text="toCSV(skills, ' , etc.')" variant="tonal" min-height="128" height="100%">
                </v-card>
            </v-col>
            <v-col cols="12" sm="6">
                <v-card title="Languages" :text="toCSV(languages, '.')" variant="tonal" min-height="128" height="100%">
                </v-card>
            </v-col>
            <v-col cols="12" sm="6">
                <v-card title="Programming languages" :text="toCSV(programmingLanguages, ' , etc.')" variant="tonal"
                    min-height="128" height="100%">
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card title="Work experiences" variant="tonal">
                    <v-card-text>
                        <v-timeline align="start" side="end" truncate-line="both">
                            <v-timeline-item v-for="it in workExperiences" :key="it.company" :dot-color="it.color">
                                <div>
                                    <div :class="`text-${it.color} text-h6`">{{ `${it.role} @ ${it.company}` }}
                                    </div>
                                    <div :class="`text-grey`">{{ `${it.startDate} - ${it.endDate}` }}</div>
                                    <p v-for="(text, index) in it.texts" :key="`${it.company}-${index}`">
                                        {{ text }}
                                    </p>
                                </div>
                            </v-timeline-item>
                        </v-timeline>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card title="Educations" variant="tonal">
                    <v-card-text>
                        <v-timeline align="start" side="end" truncate-line="both">
                            <v-timeline-item v-for="it in educations" :key="it.instance" :dot-color="it.color">
                                <div>
                                    <div :class="`text-${it.color} text-h6`">{{ it.instance }}
                                    </div>
                                    <div :class="`text-grey`">{{ `${it.startDate} - ${it.endDate}` }}</div>
                                    <p v-for="(text, index) in it.texts" :key="`${it.instance}-${index}`">
                                        {{ text }}
                                    </p>
                                </div>
                            </v-timeline-item>
                        </v-timeline>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <br />
        <v-row>
            <v-col cols="12" hidden>
                <h1>More about me</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" hidden>
                <v-expansion-panels multiple>
                    <v-expansion-panel>
                        <v-expansion-panel-title>Portofolio</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            Some Portofolio
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-title>Hobby and Interest</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            Some Hobby and Interest
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
store.commit('changeTitle', "About me");
</script>

<script>
import store from '@/stores';
import { mapState } from 'vuex';

export default {
    data: () => ({
        isMobile: false,
        cardSectionId: "multi-field-section"
    }),
    beforeDestroy() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this.onResize, { passive: true })
        }
    },
    mounted() {
        this.onResize()
        window.addEventListener('resize', this.onResize, { passive: true })
    },
    methods: {
        onResize() {
            this.isMobile = window.innerWidth < 600
        },
        toCSV(list, suffix) {
            if (list && list.length > 0) {
                return `${list.join(", ")}${suffix}`;
            }
            else {
                return "";
            }
        },
        openUrl(value) {
            try {
                const _url = new URL(value);
                window.open(value, '_blank').focus();
            } catch (err) {
                console.log(err)
            }
        }
    },
    computed: {
        yearExperience() {
            return new Date().getFullYear() - 2019;
        },
        ...mapState({
            workExperiences: 'workExperiences',
            educations: 'educations',
            skills: 'skills',
            programmingLanguages: 'programmingLanguages',
            languages: 'languages',
            personalIcons: 'personalIcons'
        })
    }
}
</script>