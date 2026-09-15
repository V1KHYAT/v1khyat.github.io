import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Rewrite the content
old_title = r'<h3 class="u-text-style-h3 animo-title">Engineering &amp; Deployment Velocity</h3>'
new_title = r'<h3 class="u-text-style-h3 animo-title">Rapid Deployment</h3>'

old_body = r'<p class="u-text-style-main u-weight-light">By delivering a plug and play responsive frontend framework instead of static image mockups, the engineering team bypassed the need to manually recreate hundreds of structural UI components from scratch, drastically accelerating the time to deployment for the new architecture.</p>'
new_body = r'<p class="u-text-style-main u-weight-light">Delivering a production-ready frontend framework instead of static mockups eliminated the need to rebuild core UI components from scratch, significantly accelerating deployment.</p>'

content = content.replace(old_title, new_title)
content = content.replace(old_body, new_body)

# 2. Add min-height to maintain current height visually
# We inject min-height: 320px; into the .impact-card CSS rule
content = re.sub(
    r'(\.impact-card\s*\{[^}]*?height:\s*100%;)',
    r'\1\n    min-height: 320px;',
    content
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated content and set min-height")
