import os
import re
for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith(".css"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
                matches = re.findall(r'\.about_modal_p[^{]*\{[^}]+\}', content)
                for m in matches: print(m)
