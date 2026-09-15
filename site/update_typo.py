import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace <h1 class="cs-title"> with <h1 class="cs-title u-text-style-h2">
content = re.sub(r'<h1 class="cs-title"[^>]*>', r'<h1 class="cs-title u-text-style-h1">', content)

# Replace <p class="cs-subtitle"> with <p class="cs-subtitle u-text-style-h5">
content = re.sub(r'<p class="cs-subtitle"[^>]*>', r'<p class="cs-subtitle u-text-style-h5">', content)

# Replace <h2 class="cs-h2"> with <h2 class="cs-h2 u-text-style-h3">
content = re.sub(r'<h2 class="cs-h2"[^>]*>', r'<h2 class="cs-h2 u-text-style-h4">', content)

# Replace <p> with <p class="u-text-style-main" style="opacity: 0.8;"> unless it already has a class
content = re.sub(r'<p>((?!<).)*?</p>', lambda m: f'<p class="u-text-style-main" style="opacity: 0.85; max-width: 65ch;">{m.group(1)}</p>' if 'class=' not in m.group(0) else m.group(0), content)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated saas-dream.html with typography classes")
