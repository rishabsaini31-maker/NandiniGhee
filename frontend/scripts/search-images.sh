#!/bin/bash
# Image search via xargs controlled parallelism
OUT=/home/z/my-project/scripts/img-results
mkdir -p $OUT
cat > /tmp/img-queries.txt << 'EOF'
hero_ghee|premium golden ghee in glass jar with wooden spoon rustic dark background product photography|6
hero_rajasthan|Rajasthan India countryside desert palace golden hour landscape|5
desi_cow|desi gir cow in green farm pasture India natural light|6
bilona|traditional Indian butter churning clay pot wooden churner|6
ghee_spoon|golden melted ghee in spoon close up macro food photography|5
ghee_jar1|ghee glass jar minimal premium product photography beige background|8
ghee_jar2|ghee jar with traditional Indian brass spoon rustic styling|6
almonds|premium almonds in wooden bowl top view food photography|6
cashews|premium cashew nuts in bowl food photography minimal|6
pistachios|pistachios in bowl premium food photography|6
walnuts|walnut kernels in bowl food photography dark moody|6
dates|premium medjool dates in bowl food photography|6
anjeer|dried figs anjeer in bowl food photography|6
raisins|golden raisins in small bowl food photography|5
mixed_dryfruits|mixed dry fruits and nuts in premium bowl flat lay|6
gift_hamper|premium Indian dry fruit gift hamper box with ribbon festive packaging|8
indian_kitchen|Indian kitchen breakfast paratha with ghee overhead|6
roti_ghee|hot roti chapati with ghee Indian food photography|5
EOF

run_search() {
  IFS='|' read -r name query count <<< "$1"
  for attempt in 1 2 3; do
    timeout 120 z-ai image-search -q "$query" -c "$count" --gl us --no-rank > "$OUT/$name.raw" 2>/dev/null
    if grep -q '"success": true' "$OUT/$name.raw" 2>/dev/null; then
      awk '/^{/{found=1} found{print}' "$OUT/$name.raw" > "$OUT/$name.json"
      echo "done: $name"
      return 0
    fi
    sleep 3
  done
  echo "FAILED: $name"
}
export -f run_search
export OUT

cat /tmp/img-queries.txt | xargs -P 4 -I {} bash -c 'run_search "{}"'
echo "ALL SEARCHES COMPLETE"
