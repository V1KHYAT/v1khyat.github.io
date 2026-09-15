import os
import glob

site_dir = r"c:\Users\Vikhyat Kaushik\AG Projects\Portfolio 26\bymonolog-clone-light\site"
html_files = glob.glob(os.path.join(site_dir, "*.html"))

linkedin_old = "https://www.linkedin.com/in/vikhyat-kaushik/"
linkedin_new = "https://www.linkedin.com/in/vikhyatkaushik/"

email_old = 'href="mailto:kaushik.vikhyat2006@gmail.com?subject=Coming%20from%20your%20website%3A%20%5BSubject%5D"'
email_new = 'href="#" onclick="navigator.clipboard.writeText(\'kaushik.vikhyat2006@gmail.com\'); const el = this.querySelector(\'div\'); el.innerText = \'Copied to clipboard!\'; setTimeout(() => el.innerText = \'kaushik.vikhyat2006@gmail.com\', 2000); return false;"'

for file_path in html_files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    original_content = content
    content = content.replace(linkedin_old, linkedin_new)
    content = content.replace(email_old, email_new)
    
    if content != original_content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {os.path.basename(file_path)}")
