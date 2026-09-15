import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\css\styles.css"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

root_match = re.search(r':root\s*\{([^}]+)\}', content)
if root_match:
    vars = re.findall(r'(--swatch[^:]+:[^;]+;)', root_match.group(1))
    for v in vars:
        print(v)
