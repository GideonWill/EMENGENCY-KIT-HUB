import os
import xml.etree.ElementTree as ET

slides_dir = r"c:\Users\Demargo\Documents\GitHub\EMENGENCY-KIT-HUB\EMENGENCY-KIT-HUB\src\assets\proposal_content\ppt\slides"
output_file = r"c:\Users\Demargo\Documents\GitHub\EMENGENCY-KIT-HUB\EMENGENCY-KIT-HUB\src\assets\full_proposal_text.txt"

def extract_text_from_xml(xml_file):
    try:
        tree = ET.parse(xml_file)
        root = tree.getroot()
        text_elements = []
        for t in root.iter('{http://schemas.openxmlformats.org/drawingml/2006/main}t'):
            if t.text:
                text_elements.append(t.text)
        return " ".join(text_elements)
    except Exception as e:
        return f"Error reading {xml_file}: {e}"

all_text = []
# Sort slides by number
slide_files = sorted([f for f in os.listdir(slides_dir) if f.endswith('.xml') and f.startswith('slide')], 
                     key=lambda x: int(x.replace('slide', '').replace('.xml', '')))

for slide_file in slide_files:
    path = os.path.join(slides_dir, slide_file)
    text = extract_text_from_xml(path)
    all_text.append(f"--- {slide_file} ---\n{text}\n")

with open(output_file, 'w', encoding='utf-8') as f:
    f.write("\n".join(all_text))

print(f"Text extracted to {output_file}")
