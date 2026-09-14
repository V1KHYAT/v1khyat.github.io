import re

with open("saas-dream.html", "r", encoding="utf-8") as f:
    content = f.read()

# Add scroll-margin-top to the case study sections
css_block_addition = """
.case-study-content > div {
  scroll-margin-top: 15vh;
}
"""

content = content.replace("</style>", css_block_addition + "</style>")

with open("saas-dream.html", "w", encoding="utf-8") as f:
    f.write(content)
print("Updated scroll margins")
