import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Revert the navbar justify-content
content = content.replace(
    '<div style="display: flex; justify-content: flex-start; align-items: center; width: 100%;">\n            <!-- Close Button & Project Name (Left) -->',
    '<div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">\n            <!-- Close Button & Project Name (Left) -->')

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Restored navbar")
