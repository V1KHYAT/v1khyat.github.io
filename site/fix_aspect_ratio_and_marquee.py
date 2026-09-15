import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update aspect ratio class
content = content.replace(".aspect-3-4", ".aspect-4-3")
content = content.replace("aspect-ratio: 3/4;", "aspect-ratio: 4/3;")
# Update placeholder links from 1200x1600 to 1600x1200
content = content.replace("1200x1600", "1600x1200")

# 2. Revert Marquees
def replace_marquee(title_upper, title_proper):
    # Regex to match the entire section-marquee block for a specific title
    pattern = r'<div class="section-marquee">[\s\S]*?' + re.escape(title_upper) + r'[\s\S]*?</div>\s*</div>'
    replacement = f'<h2 class="u-text-style-h2 animo-title" style="margin-top: 4rem; margin-bottom: 2rem;">{title_proper}</h2>'
    return re.sub(pattern, replacement, content)

content = replace_marquee("FINAL ARTIFACTS", "Final artifacts")
content = replace_marquee("KEY DESIGN MOMENTS", "Key design moments")
content = replace_marquee("IMPACT", "Impact")
content = replace_marquee("REFLECTIONS", "Reflections")

# 3. Add new Impact Cards
new_cards = """
              <div class="impact-card-wrapper">
                <div class="impact-card">
                  <h3 class="u-text-style-h3 animo-title">Engineering &amp; Deployment Velocity</h3>
                  <p class="u-text-style-main u-weight-light">By delivering a plug and play responsive frontend framework instead of static image mockups, the engineering team bypassed the need to manually recreate hundreds of structural UI components from scratch, drastically accelerating the time to deployment for the new architecture.</p>
                </div>
              </div>

              <div class="impact-card-wrapper">
                <div class="impact-card">
                  <h3 class="u-text-style-h3 animo-title">Client Customization Scalability</h3>
                  <p class="u-text-style-main u-weight-light">The new chunk based toggling architecture completely eliminated the need for developers to hardcode custom permissions for different corporate tiers. System administrators can now instantly configure and deploy tailored portals for any of the 30,000 corporate clients without touching the backend code.</p>
                </div>
              </div>
"""

# Insert the new cards right before the closing div of impact-carousel
# We'll find the last impact-card-wrapper and insert it after its closing tag
impact_carousel_end = content.find('</div>\n          </div>\n\n          <!-- 7. Reflections -->')
if impact_carousel_end != -1:
    content = content[:impact_carousel_end] + new_cards + content[impact_carousel_end:]

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated SaaS Dream Page")
