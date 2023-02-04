import axios from "axios";

const baseUrl = "https://raw.githubusercontent.com/satyasyahputra/satyasyahputra.github.io/master"

export const getRawPostGithub = (path) => {
    return axios.get(`${baseUrl}/page-assets/blogs/${path}.md`);
}

export const getPostPages = () => {
    return axios.get(`${baseUrl}/page-assets/blogs/pages.json`);
}

export const getTutorialPages = () => {
    return axios.get(`${baseUrl}/page-assets/tutorials/pages.json`);
}

export const getGithubReadme = () => {
    return axios.get(`${baseUrl}/README.md`)
}

export const getAboutme = () => {
    return axios.get(`${baseUrl}/page-assets/about-me.json`)
}

export const getMetadata = (name) => {
    return axios.get(`${baseUrl}/page-assets/metadatas/${name}.json`)
}