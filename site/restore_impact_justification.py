import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Restore justify-content: space-between in .impact-card
content = re.sub(
    r'\.impact-card\s*\{([^\}]*)justify-content:\s*flex-start;([^\}]*)gap:\s*0\.5rem;',
    r'.impact-card {\1justify-content: space-between;\2gap: 1rem;',
    content
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Restored space-between for impact cards")
