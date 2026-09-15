import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

old_title = r'<h3 class="u-text-style-h3 animo-title">Client Customization Scalability</h3>'
new_title = r'<h3 class="u-text-style-h3 animo-title">Instant Customization</h3>'

old_body = r'<p class="u-text-style-main u-weight-light">The new chunk based toggling architecture completely eliminated the need for developers to hardcode custom permissions for different corporate tiers. System administrators can now instantly configure and deploy tailored portals for any of the 30,000 corporate clients without touching the backend code.</p>'
new_body = r'<p class="u-text-style-main u-weight-light">The modular architecture eliminated hardcoded permissions. System administrators can now instantly deploy tailored portals for any of the 30,000 corporate clients without touching backend code.</p>'

content = content.replace(old_title, new_title)
content = content.replace(old_body, new_body)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Rewrote Client Customization card")
