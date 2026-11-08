#!/usr/bin/env bash
# Otimiza PNGs recursivamente. Só substitui o original se o resultado ficar menor.
set -Eeuo pipefail

if [[ $# -ne 1 || ! -d "$1" ]]; then
    printf 'Uso: %s PASTA\n' "$0" >&2
    exit 2
fi

for cmd in pngquant oxipng; do
    if ! command -v "$cmd" >/dev/null 2>&1; then
        printf 'Erro: comando necessário não encontrado: %s\n' "$cmd" >&2
        exit 1
    fi
done

# Pode ser alterado na execução: QUALITY=90-100 ./otimizar-pngs.sh ./imagens
QUALITY="${QUALITY:-95-100}"
folder=$(realpath -e -- "$1")

# Carrega a lista antes de criar arquivos temporários dentro das pastas.
mapfile -d '' -t files < <(find "$folder" -type f -iname '*.png' -print0)

if ((${#files[@]} == 0)); then
    printf 'Nenhum arquivo PNG encontrado em: %s\n' "$folder"
    exit 0
fi

tmp_quant=""
tmp_opt=""
cleanup() {
    [[ -z "$tmp_quant" ]] || rm -f -- "$tmp_quant"
    [[ -z "$tmp_opt" ]] || rm -f -- "$tmp_opt"
}
trap cleanup EXIT

total_original=0
total_saved=0
optimized=0
failed=0

for file in "${files[@]}"; do
    dir=$(dirname -- "$file")
    tmp_quant=$(mktemp --tmpdir="$dir" --suffix=.png '.pngquant.XXXXXX')
    tmp_opt=$(mktemp --tmpdir="$dir" --suffix=.png '.oxipng.XXXXXX')
    original_size=$(stat -c '%s' -- "$file")
    total_original=$((total_original + original_size))

    # Se a qualidade mínima não for atingida (ou houver erro), mantém o original
    # como entrada da etapa lossless.
    if pngquant --quality="$QUALITY" --speed 1 --force \
        --output "$tmp_quant" -- "$file" >/dev/null 2>&1; then
        method='lossy + lossless'
    else
        cp -- "$file" "$tmp_quant"
        method='lossless'
    fi

    cp -- "$tmp_quant" "$tmp_opt"

    if ! oxipng -q -o 4 "$tmp_opt"; then
        printf 'ERRO: oxipng falhou; original preservado: %s\n' "$file" >&2
        failed=$((failed + 1))
        rm -f -- "$tmp_quant" "$tmp_opt"
        tmp_quant=""
        tmp_opt=""
        continue
    fi

    new_size=$(stat -c '%s' -- "$tmp_opt")

    if ((new_size < original_size)); then
        # Mantém permissões e data de modificação do arquivo original.
        chmod --reference="$file" "$tmp_opt" || true
        touch --reference="$file" "$tmp_opt" || true

        if mv -f -- "$tmp_opt" "$file"; then
            saved=$((original_size - new_size))
            percent=$((saved * 100 / original_size))
            total_saved=$((total_saved + saved))
            optimized=$((optimized + 1))
            printf 'OK (%s): %s -> %s bytes (%d%% menor) | %s\n' \
                "$method" "$original_size" "$new_size" "$percent" "$file"
        else
            printf 'ERRO: não foi possível substituir; original preservado: %s\n' "$file" >&2
            failed=$((failed + 1))
        fi
    else
        printf 'SEM REDUÇÃO: %s\n' "$file"
    fi

    rm -f -- "$tmp_quant" "$tmp_opt"
    tmp_quant=""
    tmp_opt=""
done

if ((total_original > 0)); then
    total_percent=$((total_saved * 100 / total_original))
else
    total_percent=0
fi

printf '\nConcluído: %d/%d arquivos reduzidos; economia total de %s (%d%%).\n' \
    "$optimized" "${#files[@]}" "$(numfmt --to=iec-i --suffix=B "$total_saved")" "$total_percent"
if ((failed > 0)); then
    printf 'Arquivos com falha: %d\n' "$failed" >&2
fi
