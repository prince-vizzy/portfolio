from pypdf import PdfReader, PdfWriter
from pypdf.generic import TextStringObject

SOURCE = "Victory_Kanake_CV-clickable.pdf"
OUTPUT = "Victory_Kanake_CV-with-references.pdf"

REPLACEMENTS = {
    "file:///C:/Users/HP/Documents/portfolio/jkuat-reference.pdf": "https://vic-k.vercel.app/jkuat-reference.pdf",
    "file:///C:/Users/HP/Documents/portfolio/mayerfield-reference.pdf": "https://vic-k.vercel.app/mayerfield-reference.pdf",
}

reader = PdfReader(SOURCE)
writer = PdfWriter()

for page in reader.pages:
    annots = page.get("/Annots")
    if annots:
        for annot in annots:
            obj = annot.get_object()
            action = obj.get("/A")
            uri = action.get("/URI") if action else None
            if uri in REPLACEMENTS:
                action.update({"/URI": TextStringObject(REPLACEMENTS[uri])})
    writer.add_page(page)

with open(OUTPUT, "wb") as f:
    writer.write(f)

print(OUTPUT)
