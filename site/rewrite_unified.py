import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

old_body = r'<p class="u-text-style-main u-weight-light">Replaced two disparate, platform-specific mobile apps with a single, seamlessly integrated ecosystem. This architectural consolidation freed up enough interface space to introduce powerful new administrative features directly into the mobile workflow.</p>'
new_body = r'<p class="u-text-style-main u-weight-light">Replaced two disparate mobile apps with a seamlessly integrated ecosystem. This architectural consolidation freed up interface space to introduce powerful administrative features directly into the mobile workflow.</p>'

content = content.replace(old_body, new_body)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Rewrote Unified Architecture card")
