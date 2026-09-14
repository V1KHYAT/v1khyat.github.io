import re

with open("saas-dream.html", "r", encoding="utf-8") as f:
    content = f.read()

# Replace the hardcoded inline styles with a class-based approach and a <style> block
old_layout = 'style="max-w: 1200px; margin: 0 auto; display: grid; grid-template-columns: 250px 1fr; gap: 4rem; padding: 0 5vw;"'
new_layout = 'class="case-study-grid"'

content = content.replace(old_layout, new_layout)

# Replace aside inline style
old_aside = 'style="position: sticky; top: 15vh; height: fit-content; opacity: 0.5;"'
new_aside = 'class="case-study-sidebar"'
content = content.replace(old_aside, new_aside)

# Replace content wrapper inline style
old_content = 'style="max-width: 800px; display: flex; flex-direction: column; gap: 6rem; padding-bottom: 20vh;"'
new_content = 'class="case-study-content"'
content = content.replace(old_content, new_content)

# Inject CSS block
css_block = """
<style>
.case-study-wrap {
  padding-top: 15vh;
  padding-bottom: 10vh;
  background-color: var(--swatch--black-400);
  color: var(--swatch--white-400);
  font-family: 'Mukta', sans-serif;
  min-height: 100vh;
}
.case-study-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 4rem;
  padding: 0 5vw;
}
.case-study-sidebar {
  position: sticky;
  top: 15vh;
  height: fit-content;
  opacity: 0.5;
}
.case-study-sidebar:hover {
  opacity: 1;
  transition: opacity 0.3s ease;
}
.case-study-sidebar nav a:hover {
  color: var(--swatch--white-400);
}
.case-study-content {
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 6rem;
  padding-bottom: 20vh;
}
.case-study-content h2, .case-study-content h3 {
  color: var(--swatch--white-400);
}

@media (max-width: 991px) {
  .case-study-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .case-study-sidebar {
    position: relative;
    top: 0;
    opacity: 1;
    margin-bottom: 2rem;
  }
  .case-study-sidebar nav {
    display: none !important;
  }
  #impact > div {
    grid-template-columns: 1fr !important;
    gap: 2rem !important;
  }
}
</style>
"""

content = content.replace('<section class="case-study-wrap"', css_block + '\n<section class="case-study-wrap"')

with open("saas-dream.html", "w", encoding="utf-8") as f:
    f.write(content)
print("Updated CSS")
