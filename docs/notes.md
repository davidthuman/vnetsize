# Notes

## Create Vue + Vite Project with Tailwind CSS 3

https://v3.tailwindcss.com/docs/guides/vite#vue

npm create vite@latest . -- --template vue

npm install -D tailwindcss@3 postcss autoprefixer

npx tailwindcss init -p

## Add PrimeVue as a UI Component Library

https://primevue.org/vite

`npm install primevue @primeuix/themes`

https://primevue.org/autoimport/

`npm i unplugin-vue-components -D`

`npm i @primevue/auto-import-resolver -D`

https://primevue.org/icons/

`npm install primeicons`

https://primevue.org/tailwind/

`npm i tailwindcss-primeui`

## Server

https://techdocs.akamai.com/cloud-computing/docs/set-up-and-secure-a-compute-instance

https://www.linode.com/docs/guides/installing-and-using-docker-on-ubuntu-and-debian/

docker stop vnetsize-nginx

docker container rm vnetsize-nginx

docker pull ghcr.io/davidthuman/vnetsize-nginx:latest

docker container run --name vnetsize-nginx -p 80:80 -d ghcr.io/davidthuman/vnetsize-nginx:latest

## Docker

docker buildx build -t dmt-vnetsize-nginx . -f ./docker/nginx/Dockerfile

docker run -p 80:80 -it dmt-vnetsize-nginx
