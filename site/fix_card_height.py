import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Add height: 100%; and flex: 1; to .impact-card to ensure it stretches
content = re.sub(
    r'(\.impact-card\s*\{[^}]*?width:\s*100%;)',
    r'\1\n    height: 100%;\n    flex: 1;',
    content
)

# Also ensure wrapper stretches explicitly
content = re.sub(
    r'(\.impact-card-wrapper\s*\{[^}]*?display:\s*flex;)',
    r'\1\n    align-items: stretch;',
    content
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Added height 100% and flex 1 to impact cards")
