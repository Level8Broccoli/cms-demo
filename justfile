default:
    @just --list

fmt:
    deno fmt

lint:
    deno lint

copy:
    cp ./app/dist/assets/build* ./cms/gen/build.js
    cp ./static-generator/dist/static.html ./cms/gen/index.html
