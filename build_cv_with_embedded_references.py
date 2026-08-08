from pypdf import PdfReader, PdfWriter
from pypdf.generic import ArrayObject, DictionaryObject, NameObject

CV_SOURCE = "Victory_Kanake_CV-clickable.pdf"
JKUAT_SOURCE = "public/jkuat-reference.pdf"
MAYERFIELD_SOURCE = "public/mayerfield-reference.pdf"
OUTPUT = "Victory_Kanake_CV-complete-with-references.pdf"

LINK_TARGETS = {
    "file:///C:/Users/HP/Documents/portfolio/jkuat-reference.pdf": 2,
    "https://vic-k.vercel.app/jkuat-reference.pdf": 2,
    "file:///C:/Users/HP/Documents/portfolio/mayerfield-reference.pdf": 3,
    "https://vic-k.vercel.app/mayerfield-reference.pdf": 3,
}

writer = PdfWriter()

for source in (CV_SOURCE, JKUAT_SOURCE, MAYERFIELD_SOURCE):
    reader = PdfReader(source)
    for page in reader.pages:
        writer.add_page(page)

writer.add_outline_item("CV", 0)
writer.add_outline_item("JKUAT reference", 2)
writer.add_outline_item("Mayerfield reference", 3)

cv_reference_page = writer.pages[1]
annots = cv_reference_page.get("/Annots")

if annots:
    for annot in annots:
        obj = annot.get_object()
        action = obj.get("/A")
        uri = action.get("/URI") if action else None
        target_page_index = LINK_TARGETS.get(uri)
        if target_page_index is None:
            continue

        target_page = writer.pages[target_page_index]
        obj[NameObject("/A")] = DictionaryObject(
            {
                NameObject("/S"): NameObject("/GoTo"),
                NameObject("/D"): ArrayObject(
                    [target_page.indirect_reference, NameObject("/Fit")]
                ),
            }
        )

with open(OUTPUT, "wb") as f:
    writer.write(f)

print(OUTPUT)
