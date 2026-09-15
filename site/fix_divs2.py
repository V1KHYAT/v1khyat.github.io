import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix the dangling div for reflections
content = re.sub(r'</h2>\s*</div>\s*<div id="reflections"', r'</h2>\n          <div id="reflections"', content)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Removed dangling div for reflections")
