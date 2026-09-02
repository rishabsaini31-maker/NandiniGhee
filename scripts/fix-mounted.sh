#!/usr/bin/env bash
# Batch-update mounted pattern -> useHasMounted across pages
set -e
cd /home/z/my-project

files=(
  "src/app/cart/page.tsx"
  "src/app/track-order/page.tsx"
  "src/app/wishlist/page.tsx"
  "src/components/product/RecentlyViewed.tsx"
)

for f in "${files[@]}"; do
  python3 - "$f" << 'PYEOF'
import sys, re
path = sys.argv[1]
src = open(path).read()

# Replace the mounted useState pattern
src = src.replace(
    "const [mounted, setMounted] = useState(false);\n  useEffect(() => setMounted(true), []);",
    "const mounted = useHasMounted();"
)
src = src.replace(
    "const [mounted, setMounted] = useState(false);\n  useEffect(() => setMounted(true), []);\n",
    "const mounted = useHasMounted();\n"
)
# Remove now-unused useState import pieces if applicable (keep others)
open(path, "w").write(src)
print("patched", path)
PYEOF
done
echo done
