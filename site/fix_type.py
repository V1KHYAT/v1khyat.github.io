import re

with open("saas-dream.html", "r", encoding="utf-8") as f:
    content = f.read()

# Add responsive typography to the CSS block
css_block_addition = """
.cs-title { font-size: 4rem; line-height: 1.1; margin: 0; font-weight: 300; }
.cs-subtitle { font-size: 1.5rem; line-height: 1.4; opacity: 0.8; margin: 0; }
.cs-h2 { font-size: 2.5rem; margin: 0; font-weight: 300; }
.cs-h3 { font-size: 2rem; margin: 0; font-weight: 300; }
.cs-h4 { font-size: 1.5rem; margin: 0; font-weight: 300; }
.cs-p { font-size: 1.25rem; line-height: 1.6; opacity: 0.8; margin: 0; }
.cs-small { font-size: 1.1rem; opacity: 0.6; margin: 0; }
.cs-list { margin: 0; padding-left: 1.2rem; font-size: 1.15rem; line-height: 1.6; opacity: 0.8; display: flex; flex-direction: column; gap: 0.5rem; }

@media (max-width: 767px) {
  .cs-title { font-size: 2.5rem; }
  .cs-subtitle { font-size: 1.2rem; }
  .cs-h2 { font-size: 2rem; }
  .cs-h3 { font-size: 1.5rem; }
  .cs-h4 { font-size: 1.25rem; }
  .cs-p { font-size: 1.1rem; }
}
"""

content = content.replace("</style>", css_block_addition + "</style>")

# Replace inline styles with classes
content = content.replace('style="font-size: 4rem; line-height: 1.1; margin: 0; font-weight: 300;"', 'class="cs-title"')
content = content.replace('style="font-size: 1.5rem; line-height: 1.4; opacity: 0.8; margin: 0;"', 'class="cs-subtitle"')
content = content.replace('style="font-size: 2.5rem; margin: 0; font-weight: 300;"', 'class="cs-h2"')
content = content.replace('style="font-size: 2rem; margin: 0; font-weight: 300;"', 'class="cs-h3"')
content = content.replace('style="font-size: 1.5rem; margin: 0; font-weight: 300;"', 'class="cs-h4"')
content = content.replace('style="margin: 0;"', 'class="cs-p"') # Because the <p> tags all had this inside the flex columns
content = content.replace('style="font-size: 1.1rem; opacity: 0.6; margin: 0;"', 'class="cs-small"')
content = content.replace('style="margin: 0; padding-left: 1.2rem; font-size: 1.15rem; line-height: 1.6; opacity: 0.8; display: flex; flex-direction: column; gap: 0.5rem;"', 'class="cs-list"')

# The 1.25rem text containers:
content = content.replace('style="font-size: 1.25rem; line-height: 1.6; opacity: 0.8; display: flex; flex-direction: column; gap: 1.5rem;"', 'class="cs-text-group" style="display: flex; flex-direction: column; gap: 1.5rem;"')
content = content.replace('style="font-size: 1.25rem; line-height: 1.6; opacity: 0.8;"', 'class="cs-text-group"')

with open("saas-dream.html", "w", encoding="utf-8") as f:
    f.write(content)
print("Updated Typography")
