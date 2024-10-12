default:
    @just --list

fmt:
    deno fmt

lint:
    deno lint

copy:
    mkdir -p ./cms/gen/
    cp ./app/dist/assets/build* ./cms/gen/build.js
    cp ./static-generator/dist/static.html ./cms/gen/index.html
