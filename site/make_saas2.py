html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>SaaS Dream Project | Case Study</title>
    <meta content="width=device-width, initial-scale=1" name="viewport">
    
    <link href="images/favicon.svg" rel="icon" type="image/svg+xml" sizes="32x32" media="(prefers-color-scheme: light)">
    <link href="images/favicon.svg" rel="icon" type="image/svg+xml" sizes="32x32" media="(prefers-color-scheme: dark)">
    <link href="images/favicon.png" rel="apple-touch-icon">

    <link href="css/normalize.css" rel="stylesheet" type="text/css">
    <link href="css/components.css" rel="stylesheet" type="text/css">
    <link href="css/styles.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com" rel="preconnect">
    <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600&display=swap" rel="stylesheet">
    
    <style>
      body.body, html {
        margin: 0;
        padding: 0;
        background-color: var(--swatch--beige-100) !important;
        color: var(--swatch--black-400) !important;
        font-family: var(--_typography---font--primary-family);
        scroll-behavior: smooth;
      }
      
      /* Navbar Updates */
      .dynamic-navbar {
        position: fixed; 
        width: 100%; 
        top: 0; 
        left: 0; 
        z-index: 100; 
        padding: 1.5rem 2rem; 
        box-sizing: border-box;
        mix-blend-mode: difference;
      }
      .dynamic-navbar * {
        color: #ffffff !important;
      }
      .nav-highlight-link {
          transition: opacity 0.3s ease;
          opacity: 0.4;
      }
      .nav-highlight-link:hover {
          opacity: 1;
      }

      /* Case Study Layout */
      .case-study-wrap {
        padding-top: 15vh;
        padding-bottom: 20vh;
        width: 100%;
      }
      .case-study-content {
        max-width: 800px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 6rem;
        padding: 0 5vw;
      }
      .case-study-content > div {
        scroll-margin-top: 15vh;
      }
      
      /* Typography */
      .cs-title { font-size: 4rem; line-height: 1.1; margin: 0; font-weight: 300; }
      .cs-subtitle { font-size: 1.5rem; line-height: 1.4; opacity: 0.8; margin: 0; }
      .cs-h2 { font-size: 2.5rem; margin: 0; font-weight: 300; }
      .cs-h3 { font-size: 2rem; margin: 0; font-weight: 300; }
      .cs-h4 { font-size: 1.5rem; margin: 0; font-weight: 300; }
      .cs-p { font-size: 1.25rem; line-height: 1.6; opacity: 0.8; margin: 0; }
      .cs-small { font-size: 1.1rem; opacity: 0.6; margin: 0; }
      .cs-list { margin: 0; padding-left: 1.2rem; font-size: 1.15rem; line-height: 1.6; opacity: 0.8; display: flex; flex-direction: column; gap: 0.5rem; }
      .cs-text-group { display: flex; flex-direction: column; gap: 1.5rem; }

      @media (max-width: 991px) {
        .dynamic-navbar-links { display: none !important; }
      }
      @media (max-width: 767px) {
        .cs-title { font-size: 2.5rem; }
        .cs-subtitle { font-size: 1.2rem; }
        .cs-h2 { font-size: 2rem; }
        .cs-h3 { font-size: 1.5rem; }
        .cs-h4 { font-size: 1.25rem; }
        .cs-p { font-size: 1.1rem; }
      }
    </style>
</head>
<body class="body">
    
    <!-- Custom Navbar -->
    <header class="dynamic-navbar">
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <!-- Close Button & Project Name (Left) -->
            <div style="display: flex; align-items: center; gap: 2rem;">
                <a href="work.html" class="navbar_link project-close-btn w-inline-block" style="text-decoration: none;" aria-label="Close project">
                    <div class="footer_nav_span u-text-style-main" style="font-size: 1.25rem; line-height: 1; padding: 0.25rem;">&#x2190; Back to Work</div>
                </a>
            </div>

            <!-- Scroll Links (Right) -->
            <div class="navbar_cta_wrap u-text-style-small u-text-trim-off dynamic-navbar-links" style="display: flex; gap: 1.5rem; align-items: center;">
                <a href="#cover" class="navbar_link w-inline-block nav-highlight-link" style="text-decoration: none;"><div class="footer_nav_span u-text-style-main">Cover</div></a>
                <a href="#context" class="navbar_link w-inline-block nav-highlight-link" style="text-decoration: none;"><div class="footer_nav_span u-text-style-main">Context</div></a>
                <a href="#artifacts" class="navbar_link w-inline-block nav-highlight-link" style="text-decoration: none;"><div class="footer_nav_span u-text-style-main">Final Artifacts</div></a>
                <a href="#key-moments" class="navbar_link w-inline-block nav-highlight-link" style="text-decoration: none;"><div class="footer_nav_span u-text-style-main">Key Moments</div></a>
                <a href="#impact" class="navbar_link w-inline-block nav-highlight-link" style="text-decoration: none;"><div class="footer_nav_span u-text-style-main">Impact</div></a>
                <a href="#reflections" class="navbar_link w-inline-block nav-highlight-link" style="text-decoration: none;"><div class="footer_nav_span u-text-style-main">Reflections</div></a>
            </div>
        </div>
    </header>

    <main class="case-study-wrap">
      <div class="case-study-content">
        
        <!-- 1. Project cover -->
        <div id="cover" style="display: flex; flex-direction: column; gap: 2rem;">
          <div style="font-size: 1.2rem; opacity: 0.7; font-weight: 300;">Webtel Electrosoft • SaaS Platform Redesign</div>
          <h1 class="cs-title">Modernizing India's Enterprise Backbone</h1>
          <p class="cs-subtitle">Redesigning HR, Employee Self Service, and Mobile Payroll for 30,000 corporate clients.</p>
          
          <div style="width: 100%; aspect-ratio: 16/9; background: #e0e0e0; border-radius: 8px; margin-top: 1rem; overflow: hidden; position: relative;">
            <img src="https://placehold.co/1920x1080/e0e0e0/888888?text=The+Enterprise+Ecosystem+Render" style="width: 100%; height: 100%; object-fit: cover;" alt="The Enterprise Ecosystem Render">
          </div>
        </div>

        <!-- 2. Metadata -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; border-top: 1px solid rgba(0,0,0,0.1); border-bottom: 1px solid rgba(0,0,0,0.1); padding: 2rem 0;">
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
          <h2 class="cs-h2">Project context</h2>
          <div class="cs-text-group">
            <p class="cs-p">Webtel Electrosoft handles mission critical payroll and compliance for over 30,000 corporate clients. Operating at this massive scale on 10 to 20 year old architecture created immense friction for everyone involved.</p>
            <p class="cs-p">End users were forced to juggle two separate mobile apps just to check their attendance and download a payslip. Meanwhile, HR administrators were trapped inside a 450 screen maze on the desktop suite. Whenever users got lost, they flooded the Webtel support desks with calls.</p>
          </div>
          
          <div style="width: 100%; aspect-ratio: 16/9; background: #e0e0e0; border-radius: 8px; margin-top: 1rem; overflow: hidden;">
            <img src="https://placehold.co/1920x1080/e0e0e0/888888?text=The+Fragmentation+Tax+Diagram" style="width: 100%; height: 100%; object-fit: cover;" alt="The Fragmentation Tax Diagram">
          </div>
          
          <div class="cs-text-group">
            <p class="cs-p">As the sole product designer, my mandate was to completely rebuild the structural logic across these three platforms and deliver production ready frontend code to the engineering team.</p>
          </div>
        </div>

        <!-- 4. Final artifacts -->
        <div id="artifacts" style="display: flex; flex-direction: column; gap: 4rem;">
          <h2 class="cs-h2">Final artifacts</h2>
          
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <h3 class="cs-h4">The Modern ESS Portal</h3>
            <div style="width: 100%; aspect-ratio: 16/9; background: #e0e0e0; border-radius: 8px; overflow: hidden;">
              <img src="https://placehold.co/1920x1080/e0e0e0/888888?text=The+Modern+ESS+Portal+Video" style="width: 100%; height: 100%; object-fit: cover;" alt="The Modern ESS Portal">
            </div>
            <p class="cs-small">A looping video of the web dashboard. A cursor clicks a role selector, and the screen fluidly animates, collapsing massive feature chunks to reveal a clean entry level employee view.</p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <h3 class="cs-h4">The Unified Mobile Application</h3>
            <div style="width: 100%; aspect-ratio: 9/16; max-height: 800px; background: #e0e0e0; border-radius: 8px; overflow: hidden; align-self: center;">
              <img src="https://placehold.co/1080x1920/e0e0e0/888888?text=Unified+Mobile+Application" style="width: 100%; height: 100%; object-fit: cover;" alt="The Unified Mobile Application">
            </div>
            <p class="cs-small">A high resolution mockup of a single mobile screen, seamlessly combining a daily attendance tracker, salary slips, and pending manager approvals in one cohesive feed.</p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <h3 class="cs-h4">The HR Admin Centre</h3>
            <div style="width: 100%; aspect-ratio: 16/9; background: #e0e0e0; border-radius: 8px; overflow: hidden;">
              <img src="https://placehold.co/1920x1080/e0e0e0/888888?text=The+HR+Admin+Centre+Video" style="width: 100%; height: 100%; object-fit: cover;" alt="The HR Admin Centre">
            </div>
            <p class="cs-small">A screen recording of the desktop admin view. A user presses a shortcut, the Grand Search modal snaps open, takes a query, and instantly jumps past multiple nested menus directly to a deep configuration page.</p>
          </div>
        </div>

        <!-- 5. Key design moments -->
        <div id="key-moments" style="display: flex; flex-direction: column; gap: 6rem;">
          <div style="display: flex; flex-direction: column; gap: 2rem;">
            <h2 class="cs-h2">Key design moments</h2>
            
            <h3 class="cs-h3" style="margin-top: 2rem;">Project 1: The Modern ESS Portal</h3>
            <div class="cs-text-group">
              <p class="cs-p">The legacy portal was bloated with over 120 screens. Through rigorous information architecture mapping, I unified the experience and collapsed it down to just 70 core pages.</p>
              <p class="cs-p">To accommodate thousands of different corporate subscription tiers, I engineered a chunk based toggling architecture. System administrators can now toggle massive feature blocks on or off depending on the employee role. We also structured the frontend so Webtel could push instant festival themes and brand colors globally without needing developers to write custom code.</p>
            </div>
            <div style="width: 100%; aspect-ratio: 16/9; background: #e0e0e0; border-radius: 8px; overflow: hidden;">
              <img src="https://placehold.co/1920x1080/e0e0e0/888888?text=The+Architecture+Collapse+Diagram" style="width: 100%; height: 100%; object-fit: cover;" alt="The Architecture Collapse Diagram">
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 2rem;">
            <h3 class="cs-h3">Project 2: The Unified Mobile Application</h3>
            <div class="cs-text-group">
              <p class="cs-p">The dual app strategy for Employee Self Service and Payroll fragmented the user experience and required users to manage multiple credentials.</p>
              <p class="cs-p">By gracefully merging overlapping features, I consolidated both platforms into a single ecosystem. This cleared up enough interface space to introduce brand new administrative features directly into the mobile workflow.</p>
            </div>
            <div style="width: 100%; aspect-ratio: 16/9; background: #e0e0e0; border-radius: 8px; overflow: hidden;">
              <img src="https://placehold.co/1920x1080/e0e0e0/888888?text=The+Isometric+App+Merge" style="width: 100%; height: 100%; object-fit: cover;" alt="The Isometric App Merge">
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 2rem;">
            <h3 class="cs-h3">Project 3: The 450 Screen HR Admin Centre</h3>
            <div class="cs-text-group">
              <p class="cs-p">Managing organizational hierarchies across a 450 screen directory was a logistical nightmare.</p>
              <p class="cs-p">To solve this, I designed the Grand Search command palette and hooked it up to a massive keyword database. Even if an admin types a fuzzy or inexact term, the system instantly suggests the correct deeply nested configuration page. I also implemented group toggling to let admins turn entire interface tabs on and off to reduce visual clutter.</p>
            </div>
            <div style="width: 100%; aspect-ratio: 16/9; background: #e0e0e0; border-radius: 8px; overflow: hidden;">
              <img src="https://placehold.co/1920x1080/e0e0e0/888888?text=AI+Guided+Workflow+Panel" style="width: 100%; height: 100%; object-fit: cover;" alt="AI Guided Workflow Panel">
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 2rem;">
            <h3 class="cs-h3">The Process: AI Workflows and Frontend Handoff</h3>
            <div class="cs-text-group">
              <p class="cs-p">As a product designer, relying on static image handoffs was insufficient. I utilized AI native tools like Google Antigravity and Aider CLI to rapidly scaffold boilerplate code. I manually crafted the CSS and interface logic, delivering a plug and play responsive frontend framework directly to the developers.</p>
            </div>
            <div style="width: 100%; aspect-ratio: 16/9; background: #e0e0e0; border-radius: 8px; overflow: hidden;">
              <img src="https://placehold.co/1920x1080/e0e0e0/888888?text=Design+Tokens+to+Code+Split" style="width: 100%; height: 100%; object-fit: cover;" alt="Design Tokens to Code Split">
            </div>
          </div>
        </div>

        <!-- 6. Impact -->
        <div id="impact" style="display: flex; flex-direction: column; gap: 2rem; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 4rem;">
          <h2 class="cs-h2">Impact</h2>
          
          <div style="display: grid; grid-template-columns: 1fr; gap: 3rem; margin-top: 2rem;">
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <h3 class="cs-h4">The ESS Portal</h3>
              <ul class="cs-list">
                <li>Unified the footprint from 120 screens down to 70 core pages.</li>
                <li>Achieved a 7x improvement in WCAG compliance by overhauling legacy contrast ratios and keyboard navigation.</li>
              </ul>
            </div>

            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <h3 class="cs-h4">The Unified Mobile App</h3>
              <ul class="cs-list">
                <li>Directly drove a 1.2x increase in market capture by empowering the sales team with an all in one mobile workflow pitch.</li>
              </ul>
            </div>

            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <h3 class="cs-h4">The HR Admin Centre</h3>
              <ul class="cs-list">
                <li>Lowered the cognitive load from 3.46 bits to 2.32 bits, marking a 32.9 percent optimization through Hick's Law calculations.</li>
                <li>The AI Help Bot integration is projected to reduce the volume of Help Desk support calls by an estimated 60 to 70 percent.</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 7. Reflections -->
        <div id="reflections" style="display: flex; flex-direction: column; gap: 2rem; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 4rem;">
          <h2 class="cs-h2">Reflections</h2>
          <div class="cs-text-group">
            <p class="cs-p">Tackling an enterprise giant like Webtel proves that heavy structural logic is just as important as visual aesthetics. Bypassing a 450 screen navigation problem with a fuzzy logic keyword search completely shifted my perspective on how to design for massive scale. Delivering actual responsive frontend frameworks instead of static mockups demonstrated how bridging the gap between design and engineering fundamentally accelerates product velocity.</p>
          </div>
        </div>

      </div>
    </main>
</body>
</html>
"""
with open("saas-dream.html", "w", encoding="utf-8") as f:
    f.write(html_content)
print("Updated HTML")
