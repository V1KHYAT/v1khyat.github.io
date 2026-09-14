import re

with open("saas-dream.html", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("mix-blend-mode: difference;", "/* Removed mix-blend-mode */")
content = content.replace("color: #ffffff !important;", "color: var(--swatch--black-400) !important;")

with open("saas-dream.html", "w", encoding="utf-8") as f:
    f.write(content)
print("Fixed navbar color")
