import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Fix .impact-card CSS
# Replace:
# justify-content: space-between;
# gap: 3rem;
# with:
# justify-content: flex-start;
# gap: 1rem;
content = re.sub(r'justify-content:\s*space-between;', r'justify-content: flex-start;', content)
content = re.sub(r'gap:\s*3rem;\s*width:\s*100%;', r'gap: 1rem;\n    width: 100%;', content)

# 2. Fix Moment Cards inline margin
# Replace: style="margin-bottom: 1.5rem;"
# with: style="margin-bottom: 0.75rem;"
content = content.replace('style="margin-bottom: 1.5rem;"', 'style="margin-bottom: 0.75rem;"')

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Fixed title gaps")
