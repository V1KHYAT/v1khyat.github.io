import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix Final Artifacts
content = re.sub(
    r'<h2 class="u-text-style-h2 animo-title"[^>]*>Final artifacts</h2>\s*<div id="artifacts">',
    r'<div id="artifacts" style="display: flex; flex-direction: column; gap: 2.5rem;">\n            <h2 class="u-text-style-h2 animo-title">Final artifacts</h2>',
    content
)

# Fix Key Design Moments
content = re.sub(
    r'<h2 class="u-text-style-h2 animo-title"[^>]*>Key design moments</h2>\s*<div id="key-moments">',
    r'<div id="key-moments" style="display: flex; flex-direction: column; gap: 2.5rem;">\n            <h2 class="u-text-style-h2 animo-title">Key design moments</h2>',
    content
)

# Fix Impact
content = re.sub(
    r'<h2 class="u-text-style-h2 animo-title"[^>]*>Impact</h2>\s*<div id="impact">',
    r'<div id="impact" style="display: flex; flex-direction: column; gap: 2.5rem;">\n            <h2 class="u-text-style-h2 animo-title">Impact</h2>',
    content
)

# Fix Reflections
content = re.sub(
    r'<h2 class="u-text-style-h2 animo-title"[^>]*>Reflections</h2>\s*<div id="reflections" style="margin-bottom: 8rem;">',
    r'<div id="reflections" style="display: flex; flex-direction: column; gap: 2.5rem; margin-bottom: 8rem;">\n            <h2 class="u-text-style-h2 animo-title">Reflections</h2>',
    content
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Moved titles inside section divs")
