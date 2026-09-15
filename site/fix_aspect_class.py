import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix aspect ratio classes in HTML
content = content.replace('class="aspect-3-4"', 'class="aspect-4-3"')

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Fixed aspect ratio classes")
