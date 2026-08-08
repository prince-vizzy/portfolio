import sys
from pypdf import PdfReader

reader = PdfReader(sys.argv[1])
print("PAGES", len(reader.pages))

for i, page in enumerate(reader.pages, start=1):
    annots = page.get("/Annots")
    if not annots:
        continue
    for annot in annots:
        obj = annot.get_object()
        if obj.get("/Subtype") != "/Link":
            continue
        action = obj.get("/A")
        if not action:
            continue
        print(i, action)
