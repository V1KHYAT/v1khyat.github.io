import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Add styles
style_block = """<style>
.animo-title {
  font-family: 'Animo', Arial, sans-serif !important;
  text-transform: uppercase;
  font-weight: 400 !important;
  letter-spacing: -0.045em !important;
}
.u-weight-light {
  font-weight: 300 !important;
}
.impact-card {
  background-color: var(--swatch--beige-300, #F3F1ED);
  border-radius: var(--radius--small, 8px);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.moment-card {
  background-color: var(--swatch--beige-300, #F3F1ED);
  border-left: 4px solid var(--swatch--black-400, #1A1A1A);
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
}
</style>
</head>"""

content = content.replace("</head>", style_block)

# Replace titles
content = content.replace('class="u-text-style-h1"', 'class="u-text-style-h1 animo-title"')
content = content.replace('class="u-text-style-h2"', 'class="u-text-style-h2 animo-title"')

# Replace regular weight with light weight for body text
content = content.replace('u-weight-regular', 'u-weight-light')

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated basic styles")
