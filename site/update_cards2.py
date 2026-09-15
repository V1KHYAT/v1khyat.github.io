import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

content = re.sub(
    r'<div style="display: flex; flex-direction: column; gap: 1rem;">\s*<h3 class="u-text-style-h4">',
    r'<div class="impact-card">\n                <h3 class="u-text-style-h4" style="margin-bottom: 0.5rem; opacity: 0.5;">',
    content
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated cards via regex")
