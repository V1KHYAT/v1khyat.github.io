import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Refactor Key Design Moments into cards
# Find Project 1
p1_start = content.find('<h3 class="u-text-style-h3" style="margin-top: 2rem;">Project 1:')
p1_end = content.find('</div>\n            <div style="width: 100%; aspect-ratio: 16/9;', p1_start) + 6
if p1_start != -1 and p1_end != -1:
    p1_html = content[p1_start:p1_end]
    new_p1_html = '<div class="moment-card">\n              ' + p1_html.replace('style="margin-top: 2rem;"', 'style="margin-bottom: 1.5rem;"') + '\n            </div>'
    content = content.replace(p1_html, new_p1_html)

# Find Project 2
p2_start = content.find('<h3 class="u-text-style-h3">Project 2:')
p2_end = content.find('</div>\n            <div style="width: 100%; aspect-ratio: 16/9;', p2_start) + 6
if p2_start != -1 and p2_end != -1:
    p2_html = content[p2_start:p2_end]
    new_p2_html = '<div class="moment-card">\n              ' + p2_html.replace('<h3 class="u-text-style-h3">', '<h3 class="u-text-style-h3" style="margin-bottom: 1.5rem;">') + '\n            </div>'
    content = content.replace(p2_html, new_p2_html)

# Find Project 3
p3_start = content.find('<h3 class="u-text-style-h3">Project 3:')
p3_end = content.find('</div>\n            <div style="width: 100%; aspect-ratio: 16/9;', p3_start) + 6
if p3_start != -1 and p3_end != -1:
    p3_html = content[p3_start:p3_end]
    new_p3_html = '<div class="moment-card">\n              ' + p3_html.replace('<h3 class="u-text-style-h3">', '<h3 class="u-text-style-h3" style="margin-bottom: 1.5rem;">') + '\n            </div>'
    content = content.replace(p3_html, new_p3_html)

# Find Process
proc_start = content.find('<h3 class="u-text-style-h3">The Process:')
proc_end = content.find('</div>', content.find('<div class="cs-text-group"', proc_start)) + 6
if proc_start != -1 and proc_end != -1:
    proc_html = content[proc_start:proc_end]
    new_proc_html = '<div class="moment-card">\n              ' + proc_html.replace('<h3 class="u-text-style-h3">', '<h3 class="u-text-style-h3" style="margin-bottom: 1.5rem;">') + '\n            </div>'
    content = content.replace(proc_html, new_proc_html)


# Refactor Impact into cards
content = content.replace('<div style="display: grid; grid-template-columns: 1fr; gap: 3rem; margin-top: 2rem;">', '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 2rem;">')
content = content.replace('<div style="display: flex; flex-direction: column; gap: 1rem;">\n                <h3 class="u-text-style-h4">', '<div class="impact-card">\n                <h3 class="u-text-style-h4" style="margin-bottom: 0.5rem; opacity: 0.5;">')


with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated cards")
