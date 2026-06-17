import re

with open('src/educational_day_out.css', 'r') as f:
    css = f.read()

# Replace root variables
css = re.sub(r'--trip-dark-bg: #0b0f19;', '--trip-dark-bg: #fdfcf9;', css)
css = re.sub(r'--trip-card-bg: rgba\(30, 41, 59, 0\.45\);', '--trip-card-bg: #ffffff;', css)
css = re.sub(r'--trip-border: rgba\(255, 255, 255, 0\.04\);', '--trip-border: rgba(15, 17, 21, 0.08);', css)
css = re.sub(r'--trip-shadow: 0 20px 40px rgba\(0, 0, 0, 0\.35\);', '--trip-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);', css)

# Replace .trip-page background
css = re.sub(r'\.trip-page \{\n  background-color: var\(--trip-dark-bg\);\n  color: #f3f4f6;', 
r'''.trip-page {
  background-color: #fdfcf9;
  background-image:
    radial-gradient(100% 100% at 0% 0%, rgba(212, 175, 55, 0.03) 0%, transparent 100%),
    radial-gradient(100% 100% at 100% 50%, rgba(15, 17, 21, 0.015) 0%, transparent 100%),
    radial-gradient(100% 100% at 50% 100%, rgba(212, 175, 55, 0.02) 0%, transparent 100%);
  background-attachment: fixed;
  color: #0f1115;''', css)

# Fix heading and text colors
css = css.replace('color: #fff;', 'color: #0f1115;')
css = css.replace('color: #f3f4f6;', 'color: #0f1115;')
css = css.replace('color: #9ca3af;', 'color: rgba(15, 17, 21, 0.7);')
css = css.replace('color: #e5e7eb;', 'color: #0f1115;')

# Remove dark backgrounds from sections
css = re.sub(r'background: #060913;', 'background: transparent;', css)
css = re.sub(r'background: #0b0f19;', 'background: transparent;', css)
css = re.sub(r'background: #090c14;', 'background: transparent;', css)
css = re.sub(r'background: linear-gradient\(135deg, #060913, #0b0f19\);', 'background: transparent;', css)
css = re.sub(r'background: #090c14 !important;', '/* removed dark footer bg */', css)

# Update hero veil
css = re.sub(r'rgba\(6, 9, 19, 0\.8\)', 'rgba(253, 252, 249, 0.8)', css)
css = re.sub(r'rgba\(6, 9, 19, 0\.95\)', 'rgba(253, 252, 249, 0.95)', css)
css = re.sub(r'#0b0f19 100%', 'rgba(253, 252, 249, 1) 100%', css)

# Update borders and translucent backgrounds
css = css.replace('rgba(255, 255, 255, 0.02)', 'rgba(15, 17, 21, 0.02)')
css = css.replace('rgba(255, 255, 255, 0.03)', 'rgba(15, 17, 21, 0.03)')
css = css.replace('rgba(255, 255, 255, 0.04)', 'rgba(15, 17, 21, 0.04)')
css = css.replace('rgba(255, 255, 255, 0.05)', 'rgba(15, 17, 21, 0.05)')
css = css.replace('rgba(255, 255, 255, 0.06)', 'rgba(15, 17, 21, 0.06)')
css = css.replace('rgba(255, 255, 255, 0.07)', 'rgba(15, 17, 21, 0.07)')
css = css.replace('rgba(255, 255, 255, 0.08)', 'rgba(15, 17, 21, 0.08)')
css = css.replace('rgba(255, 255, 255, 0.1)', 'rgba(15, 17, 21, 0.1)')
css = css.replace('rgba(255, 255, 255, 0.15)', 'rgba(15, 17, 21, 0.15)')

# Specific component updates
css = re.sub(r'background: rgba\(15, 23, 42, 0\.45\);', 'background: #ffffff;', css)
css = re.sub(r'background: rgba\(15, 23, 42, 0\.7\);', 'background: #ffffff;', css)
css = re.sub(r'background: rgba\(15, 23, 42, 0\.5\);', 'background: #ffffff;', css)
css = re.sub(r'rgba\(11, 15, 25, 0\.9\)', 'rgba(253, 252, 249, 0.9)', css)
css = css.replace('color: #0b0f19;', 'color: #fff;') # Teal buttons should have white text now or keep dark?
# Wait, trip-teal-grad is bright. White text on bright teal might be hard to read. Let's keep it dark.
# So I will undo the last one for trip-btn-teal.
# Actually, I'll just change `#0b0f19` back to `#0f1115` generally.
css = css.replace('#0b0f19', '#0f1115')

with open('src/educational_day_out.css', 'w') as f:
    f.write(css)
