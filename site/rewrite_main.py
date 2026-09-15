import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# CSS Additions
css_additions = """
  .impact-carousel {
    display: flex;
    gap: 2rem;
    width: 100vw;
    margin-left: calc(50% - 50vw);
    padding: 0 5vw;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    align-items: stretch;
  }
  .impact-carousel::-webkit-scrollbar {
    display: none;
  }
  .impact-card-wrapper {
    flex: 0 0 350px;
    display: flex;
  }
  .impact-card {
    border: 1px solid rgba(0,0,0,0.08);
    background-color: transparent;
    border-radius: var(--radius--small, 8px);
    padding: 2.5rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 3rem;
    width: 100%;
  }
  .impact-card h3 {
    margin-bottom: 0;
  }
  .impact-card p {
    margin-bottom: 0;
    opacity: 0.85;
  }
  .grid-2x2 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 4rem;
    margin-top: 2rem;
  }
  .grid-3col {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 3rem;
    margin-top: 2rem;
  }
  .section-marquee {
    overflow: hidden;
    white-space: nowrap;
    width: 100vw;
    margin-left: calc(50% - 50vw);
    border-top: 1px solid rgba(0,0,0,0.1);
    border-bottom: 1px solid rgba(0,0,0,0.1);
    padding: 1.5rem 0;
    margin-bottom: 4rem;
    margin-top: 6rem;
    display: flex;
  }
  .section-marquee-track {
    display: flex;
    animation: sectionMarquee 20s linear infinite;
  }
  @keyframes sectionMarquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .marquee-item {
    display: inline-flex;
    align-items: center;
  }
  .marquee-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: var(--swatch--black-400, #1A1A1A);
    border-radius: 50%;
    margin: 0 2rem;
    opacity: 0.3;
  }
  .aspect-3-4 {
    width: 100%;
    aspect-ratio: 3/4;
    background: #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
  }
  .aspect-3-4 img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
"""

# Inject CSS if not present
if ".impact-carousel" not in content:
    content = content.replace("</style>", css_additions + "\n  </style>")

# Helper for marquee
def create_marquee(text):
    repeated = ""
    for _ in range(12):
        repeated += f'<div class="marquee-item"><h2 class="u-text-style-h2 animo-title" style="margin: 0;">{text}</h2><span class="marquee-dot"></span></div>'
    return f"""<div class="section-marquee">
          <div class="section-marquee-track">
            {repeated}
          </div>
        </div>"""

# Rebuild the main content
main_start = content.find('<main class="case-study-wrap">') + len('<main class="case-study-wrap">')
main_end = content.find('</main>')

new_main_content = f"""
        <div class="case-study-content">
          
          <!-- 1. Project cover -->
          <div id="cover" style="display: flex; flex-direction: column; gap: 2rem;">
            <h1 class="u-text-style-h1 animo-title" style="margin-top: 2rem;">Modernizing India's Enterprise Backbone</h1>
            <p class="u-text-style-h4" style="opacity: 0.8;">Redesigning HR, Employee Self Service, and Mobile Payroll for 30,000 corporate clients.</p>
            
            <div class="aspect-3-4" style="margin-top: 1rem; position: relative;">
              <img src="https://placehold.co/1200x1600/e0e0e0/888888?text=The+Enterprise+Ecosystem+Render" alt="The Enterprise Ecosystem Render">
            </div>
          </div>

          <!-- 2. Metadata -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; border-top: 1px solid rgba(0,0,0,0.1); border-bottom: 1px solid rgba(0,0,0,0.1); padding: 2rem 0; margin-top: 4rem;">
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <div style="font-weight: 400; opacity: 0.5;">Role</div>
              <div>Sole Product Designer</div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <div style="font-weight: 400; opacity: 0.5;">Timeline</div>
              <div>May to August 2026</div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <div style="font-weight: 400; opacity: 0.5;">Team</div>
              <div>1 Designer</div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <div style="font-weight: 400; opacity: 0.5;">Skills</div>
              <div>UI/UX, Frontend, IA</div>
            </div>
          </div>

          <!-- 3. Project context -->
          <div id="context" style="display: flex; flex-direction: column; gap: 2rem; margin-top: 4rem;">
            <h2 class="u-text-style-h2 animo-title">Project context</h2>
            <div class="cs-text-group" style="display: flex; flex-direction: column; gap: 1.5rem;">
              <p class="u-text-style-main u-weight-light" style="max-width: 65ch; opacity: 0.85;">Webtel Electrosoft handles mission critical payroll and compliance for over 30,000 corporate clients. Operating at this massive scale on 10 to 20 year old architecture created immense friction for everyone involved.</p>
            </div>
          </div>

          <!-- 4. Final artifacts -->
          {create_marquee("FINAL ARTIFACTS")}
          <div id="artifacts">
            <div class="grid-3col">
              <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                <div class="aspect-3-4">
                  <img src="https://placehold.co/1200x1600/e0e0e0/888888?text=The+Modern+ESS+Portal" alt="The Modern ESS Portal">
                </div>
                <h3 class="u-text-style-h4">The Modern ESS Portal</h3>
              </div>
              <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                <div class="aspect-3-4">
                  <img src="https://placehold.co/1200x1600/e0e0e0/888888?text=Unified+Mobile+Application" alt="The Unified Mobile Application">
                </div>
                <h3 class="u-text-style-h4">The Unified Mobile Application</h3>
              </div>
              <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                <div class="aspect-3-4">
                  <img src="https://placehold.co/1200x1600/e0e0e0/888888?text=The+HR+Admin+Centre" alt="The HR Admin Centre">
                </div>
                <h3 class="u-text-style-h4">The HR Admin Centre</h3>
              </div>
            </div>
          </div>

          <!-- 5. Key design moments -->
          {create_marquee("KEY DESIGN MOMENTS")}
          <div id="key-moments">
            <div class="grid-2x2">
              
              <!-- Moment 1 -->
              <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                <div class="aspect-3-4">
                  <img src="https://placehold.co/1200x1600/e0e0e0/888888?text=The+Architecture+Collapse+Diagram" alt="The Architecture Collapse Diagram">
                </div>
                <div class="moment-card" style="margin-bottom: 0;">
                  <h3 class="u-text-style-h3" style="margin-bottom: 1.5rem;">The Modern ESS Portal</h3>
                  <p class="u-text-style-main u-weight-light" style="opacity: 0.85;">The legacy portal was bloated with over 120 screens. Through rigorous information architecture mapping, I unified the experience and collapsed it down to just 70 core pages.</p>
                </div>
              </div>

              <!-- Moment 2 -->
              <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                <div class="aspect-3-4">
                  <img src="https://placehold.co/1200x1600/e0e0e0/888888?text=The+Isometric+App+Merge" alt="The Isometric App Merge">
                </div>
                <div class="moment-card" style="margin-bottom: 0;">
                  <h3 class="u-text-style-h3" style="margin-bottom: 1.5rem;">The Unified Mobile Application</h3>
                  <p class="u-text-style-main u-weight-light" style="opacity: 0.85;">By gracefully merging overlapping features, I consolidated both platforms into a single ecosystem. This cleared up enough interface space to introduce brand new administrative features directly into the mobile workflow.</p>
                </div>
              </div>

              <!-- Moment 3 -->
              <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                <div class="aspect-3-4">
                  <img src="https://placehold.co/1200x1600/e0e0e0/888888?text=AI+Guided+Workflow+Panel" alt="AI Guided Workflow Panel">
                </div>
                <div class="moment-card" style="margin-bottom: 0;">
                  <h3 class="u-text-style-h3" style="margin-bottom: 1.5rem;">The 450 Screen HR Admin Centre</h3>
                  <p class="u-text-style-main u-weight-light" style="opacity: 0.85;">To solve navigation across 450 screens, I designed a Grand Search command palette. Even with fuzzy terms, the system instantly suggests deeply nested configuration pages.</p>
                </div>
              </div>

              <!-- Moment 4 -->
              <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                <div class="aspect-3-4">
                  <img src="https://placehold.co/1200x1600/e0e0e0/888888?text=Design+Tokens+to+Code+Split" alt="Design Tokens to Code Split">
                </div>
                <div class="moment-card" style="margin-bottom: 0;">
                  <h3 class="u-text-style-h3" style="margin-bottom: 1.5rem;">AI Workflows & Handoff</h3>
                  <p class="u-text-style-main u-weight-light" style="opacity: 0.85;">I utilized AI native tools like Google Antigravity to rapidly scaffold boilerplate code. I manually crafted the CSS, delivering a plug and play responsive frontend framework to the developers.</p>
                </div>
              </div>

            </div>
          </div>

          <!-- 6. Impact -->
          {create_marquee("IMPACT")}
          <div id="impact">
            <div class="impact-carousel">
              
              <div class="impact-card-wrapper">
                <div class="impact-card">
                  <h3 class="u-text-style-h3 animo-title">Architecture Collapse</h3>
                  <p class="u-text-style-main u-weight-light">Unified the legacy footprint from 120 screens down to 70 core pages, streamlining the overall ecosystem.</p>
                </div>
              </div>

              <div class="impact-card-wrapper">
                <div class="impact-card">
                  <h3 class="u-text-style-h3 animo-title">7x WCAG Compliance</h3>
                  <p class="u-text-style-main u-weight-light">Overhauled legacy contrast ratios and introduced robust keyboard navigation to meet modern accessibility standards.</p>
                </div>
              </div>

              <div class="impact-card-wrapper">
                <div class="impact-card">
                  <h3 class="u-text-style-h3 animo-title">1.2x Market Capture</h3>
                  <p class="u-text-style-main u-weight-light">Empowered the sales team with an all-in-one mobile workflow pitch, directly driving new client acquisitions.</p>
                </div>
              </div>

              <div class="impact-card-wrapper">
                <div class="impact-card">
                  <h3 class="u-text-style-h3 animo-title">32.9% Cognitive Optimization</h3>
                  <p class="u-text-style-main u-weight-light">Lowered the cognitive load from 3.46 bits to 2.32 bits using Hick's Law calculations across the HR Admin Centre.</p>
                </div>
              </div>

              <div class="impact-card-wrapper">
                <div class="impact-card">
                  <h3 class="u-text-style-h3 animo-title">60% Support Deflection</h3>
                  <p class="u-text-style-main u-weight-light">Integrated an AI Help Bot projected to dramatically reduce the volume of manual Help Desk support calls.</p>
                </div>
              </div>

            </div>
          </div>

          <!-- 7. Reflections -->
          {create_marquee("REFLECTIONS")}
          <div id="reflections" style="margin-bottom: 8rem;">
            <div class="cs-text-group" style="display: flex; flex-direction: column; gap: 1.5rem;">
              <p class="u-text-style-main u-weight-light" style="max-width: 65ch; opacity: 0.85;">Tackling an enterprise giant like Webtel proves that heavy structural logic is just as important as visual aesthetics. Bypassing a 450 screen navigation problem with a fuzzy logic keyword search completely shifted my perspective on how to design for massive scale. Delivering actual responsive frontend frameworks instead of static mockups demonstrated how bridging the gap between design and engineering fundamentally accelerates product velocity.</p>
            </div>
          </div>
          
        </div>
"""

content = content[:main_start] + new_main_content + content[main_end:]

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated HTML with new layouts and infinite marquees")
