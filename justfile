default:
    @just --list

dynamic:
    DENO_FUTURE=1 deno task dynamic

static:
    DENO_FUTURE=1 deno task static

fmt:
    DENO_FUTURE=1 deno fmt
