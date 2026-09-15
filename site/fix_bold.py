import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix spacing wrapper
content = content.replace('<div class="cs-text-group">', '<div class="cs-text-group" style="display: flex; flex-direction: column; gap: 1.5rem;">')

# Fix boldness by adding u-weight-regular to paragraphs
content = content.replace('class="u-text-style-main"', 'class="u-text-style-main u-weight-regular"')
content = content.replace('class="u-text-style-small"', 'class="u-text-style-small u-weight-regular"')

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated spacing and font weights")
