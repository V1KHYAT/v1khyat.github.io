import os
for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith(".css"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
                if "@font-face" in content:
                    print(f"Found in {path}")
                    # Print the font-family declarations inside @font-face
                    import re
                    matches = re.findall(r'@font-face\s*\{[^}]*font-family\s*:\s*([^;]+)', content)
                    print(matches)
