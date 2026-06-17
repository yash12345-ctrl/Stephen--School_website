import re

with open('src/educational_day_out.css', 'r') as f:
    css = f.read()

# Replace teal/cyan gradients with gold/premium ones
css = re.sub(r'--trip-teal-grad:.*?;', '--trip-teal-grad: linear-gradient(135deg, #D4AF37, #F6E2A3, #D4AF37);', css)
css = re.sub(r'--trip-cyan-grad:.*?;', '--trip-cyan-grad: linear-gradient(135deg, #1d4ed8, #60a5fa);', css)
css = re.sub(r'--trip-accent:.*?;', '--trip-accent: #D4AF37;', css)

# Update typography to be more premium
css = re.sub(r"font-family: 'Inter'.*?;", "font-family: 'Outfit', sans-serif;", css)

# Adjust hero headline
css = re.sub(r'\.trip-hero-h1 \{([\s\S]*?)\}', r'''.trip-hero-h1 {\1}
.trip-hero-h1 span {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 700;
  background: var(--trip-teal-grad);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}''', css)

# Fix double trip-hero-h1 span
css = re.sub(r'\.trip-hero-h1 span \{[\s\S]*?\}\n\.trip-hero-h1 span \{', '.trip-hero-h1 span {', css)

# Adjust the glows to be more premium (gold and soft blue)
css = re.sub(r'\.blue-glow \{([\s\S]*?)background: #2563eb;', r'.blue-glow {\1background: #1e3a8a;', css)
css = re.sub(r'\.green-glow \{([\s\S]*?)background: #10b981;', r'.green-glow {\1background: #D4AF37;', css)

# Update chip to look premium
css = re.sub(r'\.trip-chip \{([\s\S]*?)background: rgba\(0, 176, 155, 0\.1\);\n  border: 1px solid rgba\(0, 176, 155, 0\.25\);\n  color: #00f2fe;', r'''.trip-chip {\1background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.4);
  color: #b48c1a;''', css)

# Update buttons
css = re.sub(r'\.trip-btn-teal \{([\s\S]*?)color: #fff;', r'''.trip-btn-teal {\1color: #0f1115;''', css)
css = re.sub(r'rgba\(0, 176, 155,', 'rgba(212, 175, 55,', css)

# Update destinations card (trip-meta-item)
css = re.sub(r'\.trip-meta-item \{([\s\S]*?)background: rgba\(15, 17, 21, 0\.03\);\n  padding: 0\.85rem 1\.75rem;\n  border-radius: 14px;\n  border: 1px solid rgba\(15, 17, 21, 0\.05\);', r'''.trip-meta-item {\1background: rgba(255, 255, 255, 0.85);
  padding: 1.25rem 2rem;
  border-radius: 16px;
  border: 1px solid rgba(15, 17, 21, 0.08);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);''', css)

css = css.replace('color: #00f2fe;', 'color: #D4AF37;')

# Adjust the veil
css = re.sub(r'\.trip-hero-veil \{([\s\S]*?)rgba\(253, 252, 249, 0\.5\) 0%,\n    rgba\(253, 252, 249, 0\.75\) 70%,', r'''.trip-hero-veil {\1rgba(253, 252, 249, 0.3) 0%,
    rgba(253, 252, 249, 0.85) 60%,''', css)

with open('src/educational_day_out.css', 'w') as f:
    f.write(css)
