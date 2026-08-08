import sys
from pypdf import PdfReader

reader = PdfReader(sys.argv[1] if len(sys.argv) > 1 else "Victory_Kanake_CV-with-references.pdf")
links = []
for i, page in enumerate(reader.pages, start=1):
    annots = page.get("/Annots")
    if annots:
        for annot in annots:
            obj = annot.get_object()
            if obj.get("/Subtype") == "/Link":
                action = obj.get("/A")
                uri = action.get("/URI") if action else None
                links.append((i, uri))
print("LINK_COUNT", len(links))
for link in links:
    print(link)
