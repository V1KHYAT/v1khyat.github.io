import re

path = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site\saas-dream.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Fix Horizontal Scroll on the page
if "overflow-x: hidden;" not in content:
    # Find the style block and inject body overflow fix
    style_idx = content.find('</style>')
    if style_idx != -1:
        css_fix = "\n  body, html { max-width: 100vw; overflow-x: hidden; }\n"
        content = content[:style_idx] + css_fix + content[style_idx:]

# 2. Add Draggable Infinite Scroll Script
js_script = """
<script>
(function() {
    function initImpactCarousel() {
        const carousel = document.querySelector('.impact-carousel');
        if (!carousel) return;
        
        // Prevent multiple initializations
        if (carousel.dataset.initialized) return;
        carousel.dataset.initialized = "true";

        // 1. Clone items for infinite scroll
        const items = Array.from(carousel.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            carousel.appendChild(clone);
        });

        // 2. Setup Infinite Scroll loop
        let isHovered = false;
        let isDragging = false;
        let startX, startScrollLeft;
        let speed = 1; // Pixels per frame

        function animate() {
            if (!isHovered && !isDragging) {
                carousel.scrollLeft += speed;
                // Reset if we've scrolled past the first set
                if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
                    carousel.scrollLeft -= carousel.scrollWidth / 2;
                }
            }
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);

        // 3. Hover to Pause
        carousel.addEventListener('mouseenter', () => isHovered = true);
        carousel.addEventListener('mouseleave', () => {
            isHovered = false;
            isDragging = false;
            carousel.style.cursor = 'grab';
        });

        // 4. Drag to scroll
        carousel.style.cursor = 'grab';
        
        carousel.addEventListener('mousedown', (e) => {
            isDragging = true;
            carousel.style.cursor = 'grabbing';
            startX = e.pageX - carousel.offsetLeft;
            startScrollLeft = carousel.scrollLeft;
        });
        
        carousel.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault(); // Prevent text selection
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 1.5; // Drag speed multiplier
            carousel.scrollLeft = startScrollLeft - walk;
            
            // Handle infinite bounds while dragging
            if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
                carousel.scrollLeft -= carousel.scrollWidth / 2;
                startScrollLeft -= carousel.scrollWidth / 2;
            } else if (carousel.scrollLeft <= 0) {
                carousel.scrollLeft += carousel.scrollWidth / 2;
                startScrollLeft += carousel.scrollWidth / 2;
            }
        });

        carousel.addEventListener('mouseup', () => {
            isDragging = false;
            carousel.style.cursor = 'grab';
        });
    }

    // Run on load and support Barba transitions if needed
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initImpactCarousel);
    } else {
        initImpactCarousel();
    }
})();
</script>
"""

if "initImpactCarousel" not in content:
    body_close_idx = content.rfind('</body>')
    if body_close_idx != -1:
        content = content[:body_close_idx] + js_script + content[body_close_idx:]

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Injected body overflow fix and JS carousel logic")
