import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("min-height: 320px;", "min-height: 420px;")

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated min-height to 420px")
