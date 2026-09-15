import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Increase gap between image and text block (restoring to 1.5rem)
content = content.replace(
    '<div style="display: flex; flex-direction: column; gap: 0.75rem;">',
    '<div style="display: flex; flex-direction: column; gap: 1.5rem;">'
)

# Increase gap between title and content inside moment-card (restoring to 1rem)
content = content.replace(
    'class="moment-card" style="margin-bottom: 0; display: flex; flex-direction: column; gap: 0.5rem;"',
    'class="moment-card" style="margin-bottom: 0; display: flex; flex-direction: column; gap: 1rem;"'
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated spacing in key design moments (and artifacts)")
