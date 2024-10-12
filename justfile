default:
    @just --list

fmt:
    deno fmt

copy:
    cp ./app/dist/assets/build* ./cms/gen/build.js
