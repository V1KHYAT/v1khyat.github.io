import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Make sure we don't duplicate classes if run multiple times
content = content.replace('class="cs-p"', 'class="u-text-style-main" style="max-width: 65ch; opacity: 0.85;"')
content = content.replace('class="cs-h3"', 'class="u-text-style-h3"')
content = content.replace('class="cs-h4"', 'class="u-text-style-h4"')
content = content.replace('class="cs-small"', 'class="u-text-style-small"')
content = content.replace('class="cs-list"', 'class="u-text-style-main" style="max-width: 65ch; opacity: 0.85; margin-left: 1.5rem;"')

# Also fix the subtitle opacity to match Webflow design
content = content.replace('class="cs-subtitle u-text-style-h5"', 'class="u-text-style-h4" style="opacity: 0.8;"')
content = content.replace('class="cs-title u-text-style-h1"', 'class="u-text-style-h1"')
content = content.replace('class="cs-h2 u-text-style-h4"', 'class="u-text-style-h2"')

# Remove any remaining cs- classes from css block
content = re.sub(r'\s*\.cs-h3 \{[^\}]+\}', '', content)
content = re.sub(r'\s*\.cs-h4 \{[^\}]+\}', '', content)
content = re.sub(r'\s*\.cs-p \{[^\}]+\}', '', content)
content = re.sub(r'\s*\.cs-small \{[^\}]+\}', '', content)
content = re.sub(r'\s*\.cs-list \{[^\}]+\}', '', content)
content = re.sub(r'\s*\.cs-text-group \{[^\}]+\}', '', content)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
