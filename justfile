default:
    @just --list

everything:
    deno task generate
    deno task build
    deno task serve

generate:
    deno task generate

build:
    deno task build

serve:
    deno task serve
        
fmt:
    deno fmt

lint:
    deno lint

