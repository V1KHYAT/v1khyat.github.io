import os

for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith(".css"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
                import re
                matches = re.findall(r'--_typography---font--tertiary-medium:\s*([^;]+)', content)
                if matches:
                    print(f"Found in {path}: {matches}")
