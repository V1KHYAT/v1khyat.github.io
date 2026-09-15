import os

for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith(".css"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
                import re
                classes = re.findall(r'\.u-text-style-([a-z0-9-]+)\s*\{', content)
                print(set(classes))
