import os, glob

for filepath in glob.glob('*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('href=\"/\"', 'href=\"index.html\"')
    content = content.replace('href=\"/work.html\"', 'href=\"work.html\"')
    content = content.replace('href=\"/play.html\"', 'href=\"play.html\"')
    content = content.replace('href=\"/contact.html\"', 'href=\"contact.html\"')
    content = content.replace('href=\"/project-1.html\"', 'href=\"project-1.html\"')
    content = content.replace('href=\"/project-2.html\"', 'href=\"project-2.html\"')
    content = content.replace('href=\"/project-3.html\"', 'href=\"project-3.html\"')
    content = content.replace('href=\"/work\"', 'href=\"work.html\"')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
print('Done!')
