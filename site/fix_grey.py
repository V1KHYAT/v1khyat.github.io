import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace impact-card CSS
old_impact = r".impact-card {\s*background-color: var\(--swatch--beige-300, #F3F1ED\);\s*border-radius: var\(--radius--small, 8px\);\s*padding: 2rem;\s*display: flex;\s*flex-direction: column;\s*gap: 1rem;\s*}"
new_impact = r".impact-card {\n    border: 1px solid rgba(0,0,0,0.08);\n    background-color: transparent;\n    border-radius: var(--radius--small, 8px);\n    padding: 2rem;\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n  }"
content = re.sub(old_impact, new_impact, content)

# Replace moment-card CSS
old_moment = r".moment-card {\s*background-color: var\(--swatch--beige-300, #F3F1ED\);\s*border-left: 4px solid var\(--swatch--black-400, #1A1A1A\);\s*padding: 1.5rem 2rem;\s*margin-bottom: 2rem;\s*}"
new_moment = r".moment-card {\n    border-left: 2px solid rgba(0,0,0,0.15);\n    padding-left: 2rem;\n    margin-bottom: 2rem;\n    background-color: transparent;\n  }"
content = re.sub(old_moment, new_moment, content)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated CSS to remove ugly background")
