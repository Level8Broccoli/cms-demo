# Kemet

Steps to make it work:

```sh
cd static-generator
deno task generate

cd ../app
deno task build

cd ../cms
deno task serve
```
