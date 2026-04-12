#!/bin/sh
set -eu

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"

cp "$ROOT_DIR/dev/script.js" "$ROOT_DIR/htdocs/luci-static/design/js/script.js"
cp "$ROOT_DIR/dev/style.css" "$ROOT_DIR/htdocs/luci-static/design/css/style.css"
cp "$ROOT_DIR/dev/design.js" "$ROOT_DIR/htdocs/luci-static/design/js/design.js"

echo "Prepared theme assets in htdocs/"
