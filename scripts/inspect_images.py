#!/usr/bin/env python3
"""Inspect all image search results, print candidates for review."""
import json, os

OUT = "/home/z/my-project/scripts/img-results"
files = sorted(f for f in os.listdir(OUT) if f.endswith(".json"))
for f in files:
    with open(os.path.join(OUT, f)) as fh:
        d = json.load(fh)
    print(f"=== {f.replace('.json','')} ({d.get('count',0)}) ===")
    for i, r in enumerate(d.get("results", [])):
        print(f"  [{i}] {r['original_url']}  {r['original_width']}x{r['original_height']}  src={r.get('source','')[:40]}")
