import os

for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith(".css") or file.endswith(".html"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                lines = f.readlines()
                for i, line in enumerate(lines):
                    if "--_typography---font--primary-family" in line:
                        # Only show if it looks like a definition
                        if line.find("--_typography---font--primary-family:") != -1 and not line.strip().startswith("var("):
                            print(f"{path}:{i+1}")
                            # Print a snippet
                            idx = line.find("--_typography---font--primary-family:")
                            print(line[max(0, idx-20):idx+80])
