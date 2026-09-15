import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace section title
content = content.replace('<h2 class="u-text-style-h2 animo-title">Final artifacts</h2>', '<h2 class="u-text-style-h2 animo-title">The Ecosystem</h2>')

# Replace navbar link text
content = content.replace('<div class="footer_nav_span u-text-style-main">Artifacts</div>', '<div class="footer_nav_span u-text-style-main">Ecosystem</div>')

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Renamed Final Artifacts to The Ecosystem")
