import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# The dangling div looks like this:
# </h2>
#         </div>
#           <div id="artifacts">
# We can fix this by replacing:
# </h2>\n        </div>\n          <div id="artifacts">
# with </h2>\n          <div id="artifacts">

content = re.sub(r'</h2>\s*</div>\s*<div id="artifacts">', r'</h2>\n          <div id="artifacts">', content)
content = re.sub(r'</h2>\s*</div>\s*<div id="key-moments">', r'</h2>\n          <div id="key-moments">', content)
content = re.sub(r'</h2>\s*</div>\s*<div id="impact">', r'</h2>\n          <div id="impact">', content)
content = re.sub(r'</h2>\s*</div>\s*<div id="reflections">', r'</h2>\n          <div id="reflections">', content)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Removed dangling divs")
