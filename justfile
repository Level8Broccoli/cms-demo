default:
    @just --list

fmt:
    deno fmt

lint:
    deno lint

copy:
    cp ./app/dist/assets/build* ./cms/gen/build.js
