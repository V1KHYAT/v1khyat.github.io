import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Target the artifacts section and replace grid-3col with a flex column
artifacts_pattern = r'(<div id="artifacts">\s*)<div class="grid-3col">'
replacement = r'\1<div style="display: flex; flex-direction: column; gap: 4rem;">'

new_content = re.sub(artifacts_pattern, replacement, content)

with open(path, "w", encoding="utf-8") as f:
    f.write(new_content)
print("Updated Final Artifacts layout")
