default:
    @just --list

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

