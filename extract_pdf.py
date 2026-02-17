import fitz  # PyMuPDF
import sys
import os

def extract_pdf_page(pdf_path, output_path):
    try:
        doc = fitz.open(pdf_path)
        page = doc.load_page(0)  # first page
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))  # high res
        pix.save(output_path)
        doc.close()
        print(f"Successfully saved {pdf_path} page 1 to {output_path}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    pdf = r"e:\Project\portfolio\media\Coursera XMGZ5GA3N5JW-IBM Generative AI Engineering.pdf"
    out = r"e:\Project\portfolio\static\images\ibm_cert.png"
    extract_pdf_page(pdf, out)
