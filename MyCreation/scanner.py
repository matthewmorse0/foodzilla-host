# imported (openCv) is a real-time computer vision open source software libray, provides
# common infrastructure for computer vision applications
# imported (glob) is used to search for specific file pattern, or search for files where
# the filename matches a certain pattern by using wildcard characters
# imported (pathlib) provides an object API for working with files and directories
# imported (pandas) for data analysis, it offers data structures and operations for maniuplatin numberical tables

import cv2
import glob
import pandas
import pathlib

def read_qr_code(filename):
    """ read an image and read the QR code.

    Args:
        filename (string): Path to file


    Return:
        qr(string): value from QR code
    """

    try:
        img = cv2.imread(filename)
        detect = cv2.QRCodeDetector()
        value,points,straight_qrcode = detectAndDecode(img)
        return value
    except:
        return

