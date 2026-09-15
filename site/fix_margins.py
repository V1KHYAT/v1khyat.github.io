import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add CSS to kill all Webflow inherited margins on our custom components
css_fix = """
  /* Kill inherited Webflow margins on custom cards so flex gap works predictably */
  .impact-card h3, .impact-card p,
  .moment-card h3, .moment-card p,
  #artifacts h3, #artifacts p,
  .cs-text-group p {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
"""
content = content.replace('</style>', css_fix + '\n</style>', 1) # Add to the first style block

# Also remove the inline margins from moment-card h3 to rely entirely on flex gap
content = content.replace('style="margin-bottom: 0.75rem;"', '')

# Change moment-card gap to something tighter if we want, currently parent has gap: 1.5rem between image and card
# Wait, moment-card doesn't use flex gap for h3 and p! It's just block display!
# Let's make moment-card a flex column so we can control gap.
content = content.replace('class="moment-card" style="margin-bottom: 0;"', 'class="moment-card" style="margin-bottom: 0; display: flex; flex-direction: column; gap: 0.5rem;"')


# 2. Restore Project Context Content
missing_context = """<p class="u-text-style-main u-weight-light" style="max-width: 65ch; opacity: 0.85;">Webtel Electrosoft handles mission critical payroll and compliance for over 30,000 corporate clients. Operating at this massive scale on 10 to 20 year old architecture created immense friction for everyone involved.</p>
              <p class="u-text-style-main u-weight-light" style="max-width: 65ch; opacity: 0.85;">End users were forced to juggle two separate mobile apps just to check their attendance and download a payslip. Meanwhile, HR administrators were trapped inside a 450 screen maze on the desktop suite. Whenever users got lost, they flooded the Webtel support desks with calls.</p>
            </div>
            
            <div class="aspect-4-3" style="margin-top: 1rem; position: relative;">
              <img src="https://placehold.co/1600x1200/e0e0e0/888888?text=The+Fragmentation+Tax+Diagram" alt="The Fragmentation Tax Diagram">
            </div>
            
            <div class="cs-text-group" style="display: flex; flex-direction: column; gap: 1.5rem;">
              <p class="u-text-style-main u-weight-light" style="max-width: 65ch; opacity: 0.85;">As the sole product designer, my mandate was to completely rebuild the structural logic across these three platforms and deliver production ready frontend code to the engineering team.</p>"""

# Replace the single paragraph context with the full restored context
context_pattern = r'<p class="u-text-style-main u-weight-light" style="max-width: 65ch; opacity: 0.85;">Webtel Electrosoft handles mission critical payroll and compliance for over 30,000 corporate clients. Operating at this massive scale on 10 to 20 year old architecture created immense friction for everyone involved.</p>'
content = content.replace(context_pattern, missing_context)

# 3. Reduce gap in impact-card from 1rem to 0.5rem to make it tighter
content = re.sub(r'gap:\s*1rem;\s*width:\s*100%;', r'gap: 0.5rem;\n    width: 100%;', content)

# Reduce gap in artifacts section
content = content.replace('<div style="display: flex; flex-direction: column; gap: 1.5rem;">', '<div style="display: flex; flex-direction: column; gap: 0.75rem;">')

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Restored context and fixed margin issues")
