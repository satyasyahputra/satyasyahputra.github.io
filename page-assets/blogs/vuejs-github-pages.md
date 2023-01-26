# Deploy Vuejs into GitHub Pages

## Install vuejs
Initialize vue project by this command:
```sh
npm init vue@latest
```
Then, fill the prompt of project data. You can fill project name as `vue-ss-github-pages.github.io` and you can select `no` for the rest.

## Open Vue project and install deps

### Open Vue project directory
```sh
cd vue-ss-github-pages.github.io
```
### Install dependencies
```sh
npm install
```
### Test run project
```sh
npm run dev
```

## Enable `gh-pages` on Vue project

### Install `gh-pages`
```sh
npm install gh-pages --save-dev
```

### Add predeploy and deploy node script
Open `package.json` and add this following scipt:
```json
{
    
    "scripts": {
        ...
        "predeploy": "npm run build",
        "deploy": "gh-pages -d dist"
        ...
  }
}
```

## Add hompage in `package.json`
Open `package.json` and add homepage with value format `https://<github-account-username>.github.com/<repository>`

```json
{
  "homepage": "https://satyasyahputra.github.com/vue-ss-github-pages.github.io",
}
```

## Set remote repository
Create new repository in your GitHub account or if you already have any repository please add remote in your local Vue project.

## Run deployment
```sh
npm run deploy
```

## Setup GitHub Pages in repository
1. Open Settings
2. Go to `Pages`
3. On Build and Deployment > Branch, choose `gh-pages` and choose folder `/(root)`
4. Wait for a minutes and open `Actions` in repository. If workflow deployment is done, you can open your host link in the `deploy` job.

---
# Recommendation setup
## Not found on non-root path
Open `package.json` and modify deployment script to copy index.html of builded project to 404.html. Why we need to? GitHub will always read to 404.html when we get lost in GitHub pages. And this is little trick solve the `404 GitHub Pages Not Found`.

### Windows
```json
{
    "scripts": {
        ...
        "predeploy": "npm run build && copy .\\dist\\index.html .\\dist\\404.html",
        "deploy": "gh-pages -d dist"
        ...
  }
}
```
### Mac & Linux
```json
{
    "scripts": {
        ...
        "predeploy": "npm run build && cp ./dist/index.html ./dist/404.html",
        "deploy": "gh-pages -d dist"
        ...
  }
}
```
If you want have both, you can run `npm run deploy:mac` or `npm run deploy:windows` by this scripts:

```json
{
    "scripts": {
    ...
    "predeploy:windows": "npm run build && copy .\\dist\\index.html .\\dist\\404.html",
    "deploy:windows": "gh-pages -d dist",
    "predeploy:mac": "npm run build && cp ./dist/index.html ./dist/404.html",
    "deploy:mac": "gh-pages -d dist"
    ...
  }
}
```

---
Done!
