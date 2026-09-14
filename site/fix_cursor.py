import re

with open("work.html", "r", encoding="utf-8") as f:
    work_content = f.read()

# Extract transition_screen and cursor_wrap
cursor_start = work_content.find('<div class="transition_screen"></div>')
# Find the end of cursor_wrap
cursor_end = work_content.find('<div data-barba-namespace="home"')

cursor_html = work_content[cursor_start:cursor_end]

with open("saas-dream.html", "r", encoding="utf-8") as f:
    saas_content = f.read()

# Inject right after <body class="body">
saas_content = saas_content.replace('<body class="body">', '<body class="body" data-barba="wrapper" data-theme-nav="light">\n' + cursor_html)

# Add the closing script tags from work.html!
script_start = work_content.find('<script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js')
script_html = work_content[script_start:work_content.find('</body>')]

saas_content = saas_content.replace('</body>', script_html + '\n</body>')

with open("saas-dream.html", "w", encoding="utf-8") as f:
    f.write(saas_content)
print("Injected scripts and cursor")
