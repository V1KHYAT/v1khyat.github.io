import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\css\styles.css"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

matches = re.findall(r'@font-face\s*\{[^}]+\}', content)
for m in matches: print(m)
