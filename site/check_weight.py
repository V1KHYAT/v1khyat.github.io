import os

for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith(".css"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
                idx = content.find("--_typography---font--tertiary-medium")
                if idx != -1:
                    print(content[max(0, idx-20):idx+80])
