import re

with open("saas-dream.html", "r", encoding="utf-8") as f:
    content = f.read()

# Replace title
content = re.sub(r'<title>.*?</title>', '<title>SaaS Dream Project - Case Study</title>', content)

# Remove the 'w--current' class from the Work nav link so it's not highlighted
content = content.replace('w--current', '')

# Extract the header and everything before main
main_start = content.find('<main class="main">')
main_end = content.find('</main>') + len('</main>')

if main_start == -1 or main_end == -1:
    print("Could not find <main> tags")
    exit(1)

html_before = content[:main_start + len('<main class="main">')]
html_after = content[main_end:]

new_main_content = """
<section class="case-study-wrap" style="padding-top: 15vh; padding-bottom: 10vh; background-color: var(--swatch--black-400); color: var(--swatch--white-400); font-family: 'Mukta', sans-serif;">
  <div style="max-w: 1200px; margin: 0 auto; display: grid; grid-template-columns: 250px 1fr; gap: 4rem; padding: 0 5vw;">
    
    <!-- LEFT SIDEBAR -->
    <aside style="position: sticky; top: 15vh; height: fit-content; opacity: 0.5;">
      <a href="index.html" style="display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: inherit; font-size: 1.1rem; margin-bottom: 2rem;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 12H5M5 12L12 19M5 12L12 5"/></svg>
        Back
      </a>
      <nav style="display: flex; flex-direction: column; gap: 1rem; font-size: 1.1rem;">
        <a href="#cover" style="color: inherit; text-decoration: none; transition: opacity 0.2s;">Cover</a>
        <a href="#context" style="color: inherit; text-decoration: none; transition: opacity 0.2s;">Project Context</a>
        <a href="#artifacts" style="color: inherit; text-decoration: none; transition: opacity 0.2s;">Final Artifacts</a>
        <a href="#key-moments" style="color: inherit; text-decoration: none; transition: opacity 0.2s;">Key Design Moments</a>
        <a href="#impact" style="color: inherit; text-decoration: none; transition: opacity 0.2s;">Impact</a>
        <a href="#reflections" style="color: inherit; text-decoration: none; transition: opacity 0.2s;">Reflections</a>
      </nav>
    </aside>

    <!-- RIGHT CONTENT -->
    <div style="max-width: 800px; display: flex; flex-direction: column; gap: 6rem; padding-bottom: 20vh;">
      
      <!-- 1. Project cover -->
      <div id="cover" style="display: flex; flex-direction: column; gap: 2rem;">
        <div style="font-size: 1.2rem; opacity: 0.7; font-weight: 300;">Webtel Electrosoft • SaaS Platform Redesign</div>
        <h1 style="font-size: 4rem; line-height: 1.1; margin: 0; font-weight: 300;">Modernizing India's Enterprise Backbone</h1>
        <p style="font-size: 1.5rem; line-height: 1.4; opacity: 0.8; margin: 0;">Redesigning HR, Employee Self Service, and Mobile Payroll for 30,000 corporate clients.</p>
        
        <div style="width: 100%; aspect-ratio: 16/9; background: #222; border-radius: 8px; margin-top: 1rem; overflow: hidden; position: relative;">
          <img src="https://placehold.co/1920x1080/1a1a1a/444444?text=The+Enterprise+Ecosystem+Render" style="width: 100%; height: 100%; object-fit: cover;" alt="The Enterprise Ecosystem Render">
        </div>
      </div>

      <!-- 2. Metadata -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; border-top: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); padding: 2rem 0;">
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <div style="font-weight: 400; opacity: 0.5;">Role</div>
          <div>Sole Product Designer</div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <div style="font-weight: 400; opacity: 0.5;">Timeline</div>
          <div>May - August 2026</div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <div style="font-weight: 400; opacity: 0.5;">Team</div>
          <div>1 Designer</div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <div style="font-weight: 400; opacity: 0.5;">Skills</div>
          <div style="opacity: 0.8; font-size: 0.9rem; line-height: 1.5;">Enterprise UX<br>Information Architecture<br>Frontend Code Handoff</div>
        </div>
      </div>

      <!-- 3. Project context -->
      <div id="context" style="display: flex; flex-direction: column; gap: 2rem;">
        <h2 style="font-size: 2.5rem; margin: 0; font-weight: 300;">Project context</h2>
        <div style="font-size: 1.25rem; line-height: 1.6; opacity: 0.8; display: flex; flex-direction: column; gap: 1.5rem;">
          <p style="margin: 0;">Webtel Electrosoft handles mission critical payroll and compliance for over 30,000 corporate clients. Operating at this massive scale on 10 to 20 year old architecture created immense friction for everyone involved.</p>
          <p style="margin: 0;">End users were forced to juggle two separate mobile apps just to check their attendance and download a payslip. Meanwhile, HR administrators were trapped inside a 450 screen maze on the desktop suite. Whenever users got lost, they flooded the Webtel support desks with calls.</p>
        </div>
        
        <div style="width: 100%; aspect-ratio: 16/9; background: #222; border-radius: 8px; margin-top: 1rem; overflow: hidden;">
          <img src="https://placehold.co/1920x1080/1a1a1a/444444?text=The+Fragmentation+Tax+Diagram" style="width: 100%; height: 100%; object-fit: cover;" alt="The Fragmentation Tax Diagram">
        </div>
        
        <div style="font-size: 1.25rem; line-height: 1.6; opacity: 0.8;">
          <p style="margin: 0;">As the sole product designer, my mandate was to completely rebuild the structural logic across these three platforms and deliver production ready frontend code to the engineering team.</p>
        </div>
      </div>

      <!-- 4. Final artifacts -->
      <div id="artifacts" style="display: flex; flex-direction: column; gap: 4rem;">
        <h2 style="font-size: 2.5rem; margin: 0; font-weight: 300;">Final artifacts</h2>
        
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <h3 style="font-size: 1.5rem; margin: 0; font-weight: 300;">The Modern ESS Portal</h3>
          <div style="width: 100%; aspect-ratio: 16/9; background: #222; border-radius: 8px; overflow: hidden;">
            <img src="https://placehold.co/1920x1080/1a1a1a/444444?text=The+Modern+ESS+Portal+Video" style="width: 100%; height: 100%; object-fit: cover;" alt="The Modern ESS Portal">
          </div>
          <p style="font-size: 1.1rem; opacity: 0.6; margin: 0;">A looping video of the web dashboard. A cursor clicks a role selector, and the screen fluidly animates, collapsing massive feature chunks to reveal a clean entry level employee view.</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <h3 style="font-size: 1.5rem; margin: 0; font-weight: 300;">The Unified Mobile Application</h3>
          <div style="width: 100%; aspect-ratio: 9/16; max-height: 800px; background: #222; border-radius: 8px; overflow: hidden; align-self: center;">
            <img src="https://placehold.co/1080x1920/1a1a1a/444444?text=Unified+Mobile+Application" style="width: 100%; height: 100%; object-fit: cover;" alt="The Unified Mobile Application">
          </div>
          <p style="font-size: 1.1rem; opacity: 0.6; margin: 0;">A high resolution mockup of a single mobile screen, seamlessly combining a daily attendance tracker, salary slips, and pending manager approvals in one cohesive feed.</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <h3 style="font-size: 1.5rem; margin: 0; font-weight: 300;">The HR Admin Centre</h3>
          <div style="width: 100%; aspect-ratio: 16/9; background: #222; border-radius: 8px; overflow: hidden;">
            <img src="https://placehold.co/1920x1080/1a1a1a/444444?text=The+HR+Admin+Centre+Video" style="width: 100%; height: 100%; object-fit: cover;" alt="The HR Admin Centre">
          </div>
          <p style="font-size: 1.1rem; opacity: 0.6; margin: 0;">A screen recording of the desktop admin view. A user presses a shortcut, the Grand Search modal snaps open, takes a query, and instantly jumps past multiple nested menus directly to a deep configuration page.</p>
        </div>
      </div>

      <!-- 5. Key design moments -->
      <div id="key-moments" style="display: flex; flex-direction: column; gap: 6rem;">
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <h2 style="font-size: 2.5rem; margin: 0; font-weight: 300;">Key design moments</h2>
          
          <h3 style="font-size: 2rem; margin: 2rem 0 0 0; font-weight: 300;">Project 1: The Modern ESS Portal</h3>
          <div style="font-size: 1.25rem; line-height: 1.6; opacity: 0.8; display: flex; flex-direction: column; gap: 1.5rem;">
            <p style="margin: 0;">The legacy portal was bloated with over 120 screens. Through rigorous information architecture mapping, I unified the experience and collapsed it down to just 70 core pages.</p>
            <p style="margin: 0;">To accommodate thousands of different corporate subscription tiers, I engineered a chunk based toggling architecture. System administrators can now toggle massive feature blocks on or off depending on the employee role. We also structured the frontend so Webtel could push instant festival themes and brand colors globally without needing developers to write custom code.</p>
          </div>
          <div style="width: 100%; aspect-ratio: 16/9; background: #222; border-radius: 8px; overflow: hidden;">
            <img src="https://placehold.co/1920x1080/1a1a1a/444444?text=The+Architecture+Collapse+Diagram" style="width: 100%; height: 100%; object-fit: cover;" alt="The Architecture Collapse Diagram">
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <h3 style="font-size: 2rem; margin: 0; font-weight: 300;">Project 2: The Unified Mobile Application</h3>
          <div style="font-size: 1.25rem; line-height: 1.6; opacity: 0.8; display: flex; flex-direction: column; gap: 1.5rem;">
            <p style="margin: 0;">The dual app strategy for Employee Self Service and Payroll fragmented the user experience and required users to manage multiple credentials.</p>
            <p style="margin: 0;">By gracefully merging overlapping features, I consolidated both platforms into a single ecosystem. This cleared up enough interface space to introduce brand new administrative features directly into the mobile workflow.</p>
          </div>
          <div style="width: 100%; aspect-ratio: 16/9; background: #222; border-radius: 8px; overflow: hidden;">
            <img src="https://placehold.co/1920x1080/1a1a1a/444444?text=The+Isometric+App+Merge" style="width: 100%; height: 100%; object-fit: cover;" alt="The Isometric App Merge">
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <h3 style="font-size: 2rem; margin: 0; font-weight: 300;">Project 3: The 450 Screen HR Admin Centre</h3>
          <div style="font-size: 1.25rem; line-height: 1.6; opacity: 0.8; display: flex; flex-direction: column; gap: 1.5rem;">
            <p style="margin: 0;">Managing organizational hierarchies across a 450 screen directory was a logistical nightmare.</p>
            <p style="margin: 0;">To solve this, I designed the Grand Search command palette and hooked it up to a massive keyword database. Even if an admin types a fuzzy or inexact term, the system instantly suggests the correct deeply nested configuration page. I also implemented group toggling to let admins turn entire interface tabs on and off to reduce visual clutter.</p>
          </div>
          <div style="width: 100%; aspect-ratio: 16/9; background: #222; border-radius: 8px; overflow: hidden;">
            <img src="https://placehold.co/1920x1080/1a1a1a/444444?text=AI+Guided+Workflow+Panel" style="width: 100%; height: 100%; object-fit: cover;" alt="AI Guided Workflow Panel">
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <h3 style="font-size: 2rem; margin: 0; font-weight: 300;">The Process: AI Workflows and Frontend Handoff</h3>
          <div style="font-size: 1.25rem; line-height: 1.6; opacity: 0.8; display: flex; flex-direction: column; gap: 1.5rem;">
            <p style="margin: 0;">As a product designer, relying on static image handoffs was insufficient. I utilized AI native tools like Google Antigravity and Aider CLI to rapidly scaffold boilerplate code. I manually crafted the CSS and interface logic, delivering a plug and play responsive frontend framework directly to the developers.</p>
          </div>
          <div style="width: 100%; aspect-ratio: 16/9; background: #222; border-radius: 8px; overflow: hidden;">
            <img src="https://placehold.co/1920x1080/1a1a1a/444444?text=Design+Tokens+to+Code+Split" style="width: 100%; height: 100%; object-fit: cover;" alt="Design Tokens to Code Split">
          </div>
        </div>
      </div>

      <!-- 6. Impact -->
      <div id="impact" style="display: flex; flex-direction: column; gap: 2rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 4rem;">
        <h2 style="font-size: 2.5rem; margin: 0; font-weight: 300;">Impact</h2>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; margin-top: 2rem;">
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <h3 style="font-size: 1.5rem; margin: 0; font-weight: 300;">The ESS Portal</h3>
            <ul style="margin: 0; padding-left: 1.2rem; font-size: 1.15rem; line-height: 1.6; opacity: 0.8; display: flex; flex-direction: column; gap: 0.5rem;">
              <li>Unified the footprint from 120 screens down to 70 core pages.</li>
              <li>Achieved a 7x improvement in WCAG compliance by overhauling legacy contrast ratios and keyboard navigation.</li>
            </ul>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <h3 style="font-size: 1.5rem; margin: 0; font-weight: 300;">The Unified Mobile App</h3>
            <ul style="margin: 0; padding-left: 1.2rem; font-size: 1.15rem; line-height: 1.6; opacity: 0.8; display: flex; flex-direction: column; gap: 0.5rem;">
              <li>Directly drove a 1.2x increase in market capture by empowering the sales team with an all in one mobile workflow pitch.</li>
            </ul>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem; grid-column: span 2;">
            <h3 style="font-size: 1.5rem; margin: 0; font-weight: 300;">The HR Admin Centre</h3>
            <ul style="margin: 0; padding-left: 1.2rem; font-size: 1.15rem; line-height: 1.6; opacity: 0.8; display: flex; flex-direction: column; gap: 0.5rem;">
              <li>Lowered the cognitive load from 3.46 bits to 2.32 bits, marking a 32.9 percent optimization through Hick's Law calculations.</li>
              <li>The AI Help Bot integration is projected to reduce the volume of Help Desk support calls by an estimated 60 to 70 percent.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 7. Reflections -->
      <div id="reflections" style="display: flex; flex-direction: column; gap: 2rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 4rem;">
        <h2 style="font-size: 2.5rem; margin: 0; font-weight: 300;">Reflections</h2>
        <div style="font-size: 1.25rem; line-height: 1.6; opacity: 0.8;">
          <p style="margin: 0;">Tackling an enterprise giant like Webtel proves that heavy structural logic is just as important as visual aesthetics. Bypassing a 450 screen navigation problem with a fuzzy logic keyword search completely shifted my perspective on how to design for massive scale. Delivering actual responsive frontend frameworks instead of static mockups demonstrated how bridging the gap between design and engineering fundamentally accelerates product velocity.</p>
        </div>
      </div>

    </div>
  </div>
</section>
"""

with open("saas-dream.html", "w", encoding="utf-8") as f:
    f.write(html_before + new_main_content + html_after)

print("Done")
