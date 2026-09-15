import re

path_index = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\index.html"
path_saas = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"

with open(path_index, "r", encoding="utf-8") as f:
    index_content = f.read()

with open(path_saas, "r", encoding="utf-8") as f:
    saas_content = f.read()

# 1. Update the navbar in saas-dream.html
# We want to change the Left side and Right side
old_navbar = re.search(r'<header class="dynamic-navbar">.*?</header>', saas_content, re.DOTALL)
if old_navbar:
    new_navbar = """<header class="dynamic-navbar">
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <!-- Close Button & Project Name (Left) -->
            <div style="display: flex; align-items: center; gap: 1rem;">
                <a href="work.html" class="navbar_link project-close-btn w-inline-block" style="text-decoration: none; padding: 0.5rem 0.75rem;" aria-label="Close project">
                    <span class="u-text-style-main u-weight-bold" style="font-size: 1.25rem;">&#10005;</span>
                </a>
                <span class="u-text-style-main u-weight-bold" style="letter-spacing: 0.05em; text-transform: uppercase;">Modernizing Enterprise</span>
            </div>

            <!-- Scroll Links (Right) -->
            <div class="navbar_cta_wrap u-text-style-small u-text-trim-off dynamic-navbar-links" style="display: flex; align-items: center;">
                <a href="#cover" class="navbar_link w-inline-block nav-highlight-link" style="text-decoration: none; padding: 0.5rem 0.75rem;"><div class="footer_nav_span u-text-style-main">Cover</div></a>
                <a href="#context" class="navbar_link w-inline-block nav-highlight-link" style="text-decoration: none; padding: 0.5rem 0.75rem;"><div class="footer_nav_span u-text-style-main">Context</div></a>
                <a href="#artifacts" class="navbar_link w-inline-block nav-highlight-link" style="text-decoration: none; padding: 0.5rem 0.75rem;"><div class="footer_nav_span u-text-style-main">Artifacts</div></a>
                <a href="#key-moments" class="navbar_link w-inline-block nav-highlight-link" style="text-decoration: none; padding: 0.5rem 0.75rem;"><div class="footer_nav_span u-text-style-main">Moments</div></a>
                <a href="#impact" class="navbar_link w-inline-block nav-highlight-link" style="text-decoration: none; padding: 0.5rem 0.75rem;"><div class="footer_nav_span u-text-style-main">Impact</div></a>
                <a href="#reflections" class="navbar_link w-inline-block nav-highlight-link" style="text-decoration: none; padding: 0.5rem 0.75rem;"><div class="footer_nav_span u-text-style-main">Reflections</div></a>
            </div>
        </div>
    </header>"""
    saas_content = saas_content.replace(old_navbar.group(0), new_navbar)

# 2. Copy the footer from index.html
footer_start = index_content.find('<footer data-footer-parallax="" class="footer_wrap_main">')
if footer_start != -1:
    footer_end = index_content.find('</footer>', footer_start) + 9
    footer_code = index_content[footer_start:footer_end]
    
    # Inject footer into saas-dream.html right before </main>
    if '<footer data-footer-parallax=""' not in saas_content:
        saas_content = saas_content.replace('</main>', footer_code + '\n</main>')

with open(path_saas, "w", encoding="utf-8") as f:
    f.write(saas_content)
print("Updated navbar and added footer")
