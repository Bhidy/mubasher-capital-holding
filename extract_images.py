import fitz
import os

pdf_path = "MT_Company Profile_EN_Print_Spread.pdf"
out_dir = "/tmp/mubasher_images"
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(pdf_path)
for page_index in range(len(doc)):
    page = doc[page_index]
    image_list = page.get_images()
    for image_index, img in enumerate(image_list, start=1):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        if len(image_bytes) > 500000: # Only large images > 500KB
            image_name = f"img_p{page_index}_{image_index}.{image_ext}"
            with open(os.path.join(out_dir, image_name), "wb") as f:
                f.write(image_bytes)
