import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update the HTML for the navbar left side (and right side spacing)
old_navbar = re.search(r'<header class="dynamic-navbar">.*?</header>', content, re.DOTALL)
if old_navbar:
    new_navbar = """<header class="dynamic-navbar">
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <!-- Close Button & Project Name (Left) -->
            <div style="display: flex; align-items: center; gap: 2rem;">
                <a href="work.html" class="navbar_link project-close-btn w-inline-block" style="text-decoration: none;" aria-label="Close project">
                    <div class="footer_nav_span u-text-style-main" style="font-size: 1.25rem; line-height: 1; padding: 0.25rem;">✕</div>
                </a>
                <!-- Starts hidden, fades in on scroll -->
                <div class="navbar_cta_wrap u-text-style-small u-text-trim-off project-navbar-title">
                    Modernizing Enterprise
                </div>
            </div>

            <!-- Scroll Links (Right) -->
            <div class="navbar_cta_wrap u-text-style-small u-text-trim-off dynamic-navbar-links" style="display: flex; gap: 1rem; align-items: center;">
                <a href="#cover" class="navbar_link w-inline-block nav-highlight-link" style="text-decoration: none; padding: 0.25rem;"><div class="footer_nav_span u-text-style-main">Cover</div></a>
                <a href="#context" class="navbar_link w-inline-block nav-highlight-link" style="text-decoration: none; padding: 0.25rem;"><div class="footer_nav_span u-text-style-main">Context</div></a>
                <a href="#artifacts" class="navbar_link w-inline-block nav-highlight-link" style="text-decoration: none; padding: 0.25rem;"><div class="footer_nav_span u-text-style-main">Artifacts</div></a>
                <a href="#key-moments" class="navbar_link w-inline-block nav-highlight-link" style="text-decoration: none; padding: 0.25rem;"><div class="footer_nav_span u-text-style-main">Moments</div></a>
                <a href="#impact" class="navbar_link w-inline-block nav-highlight-link" style="text-decoration: none; padding: 0.25rem;"><div class="footer_nav_span u-text-style-main">Impact</div></a>
                <a href="#reflections" class="navbar_link w-inline-block nav-highlight-link" style="text-decoration: none; padding: 0.25rem;"><div class="footer_nav_span u-text-style-main">Reflections</div></a>
            </div>
        </div>
    </header>"""
    content = content.replace(old_navbar.group(0), new_navbar)

# 2. Add the CSS for project-navbar-title fading
if ".project-navbar-title" not in content:
    css_to_add = """
      .project-navbar-title {
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.5s ease, transform 0.5s ease;
      }
      .is-scrolled .project-navbar-title {
        opacity: 0.7; 
        transform: translateY(0);
      }
"""
    # Insert right before the first </style>
    style_end = content.find('</style>')
    if style_end != -1:
        content = content[:style_end] + css_to_add + content[style_end:]

# 3. Add JS to toggle .is-scrolled on body
js_to_add = """
    // Navbar Title Scroll Fade
    window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
            document.body.classList.add('is-scrolled');
        } else {
            document.body.classList.remove('is-scrolled');
        }
    });
"""
if "Navbar Title Scroll Fade" not in content:
    # insert before the closing script of initImpactCarousel or just before </body>
    body_end = content.find('</body>')
    if body_end != -1:
        script_tag = f"\n<script>{js_to_add}</script>\n"
        content = content[:body_end] + script_tag + content[body_end:]

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated navbar layout and added scroll effect")
