# qr generator
"""
import qrcode
img = qrcode.make('Mcdonalds Submenu')
type(img) #qrcode.image.pil.PilImage
img.save("test_file.png")
"""
import qrcode
import hashlib

def create_qr_code(data):
    """
    create a qr code, from a string.
    """

    qr = qrcode.QRCode(
        version =1,
        error_correction = qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
        )
    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(fill_color = "black", back_color="white")
    filename = hashlib.md5(data.encode()).hexdigest() + ".png"
    img.save(filename)

    return filename
