import os
import re
for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith(".css"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
                matches = re.findall(r'\.u-weight-[a-z0-9-]+', content)
                print(f"Weight classes in {path}: {set(matches)}")
