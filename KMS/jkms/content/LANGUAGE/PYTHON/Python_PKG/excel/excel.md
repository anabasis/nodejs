# Excel

<https://libsora.so/posts/python-excel-library/>

- xlwt
- OpenPyXL
- XlsxWriter
- PyExcelerate

|Library|support xlsx|
|:--:|:--:|
|xlwt|x|
|OpenPyXL|o|
|XlsxWriter|o|
|PyExcelerate|o|

## Working with Excel Files in Python

<https://www.python-excel.org/>

This site contains pointers to the best information available about working with Excel files in the Python programming language.

Reading and Writing Excel Files
There are python packages available to work with Excel files that will run on any Python platform and that do not require either Windows or Excel to be used. They are fast, reliable and open source:

### openpyxl

The recommended package for reading and writing Excel 2010 files (ie: .xlsx)
Download | Documentation | Bitbucket

### xlsxwriter

An alternative package for writing data, formatting information and, in particular, charts in the Excel 2010 format (ie: .xlsx)

Download | Documentation | GitHub

### pyxlsb

This package allows you to read Excel files in the xlsb format.

Download | GitHub

### pylightxl

This package allows you to read xlsx and xlsm files and write xlsx files.

Download | Documentation | GitHub

### xlrd

This package is for reading data and formatting information from older Excel files (ie: .xls)

Download | Documentation | GitHub

### xlwt

This package is for writing data and formatting information to older Excel files (ie: .xls)

Download | Documentation | Examples | GitHub

### xlutils

This package collects utilities that require both xlrd and xlwt, including the ability to copy and modify or filter existing excel files.

NB: In general, these use cases are now covered by openpyxl!

Download | Documentation | GitHub

## Writing Excel Add-Ins

The following products can be used to write Excel add-ins in Python. Unlike the reader and writer packages, they require an installation of Microsoft Excel.

### PyXLL

PyXLL is a commercial product that enables writing Excel add-ins in Python with no VBA. Python functions can be exposed as worksheet functions (UDFs), macros, menus and ribbon tool bars.

Homepage | Features | Documentation | Download

### xlwings

xlwings is an open-source library to automate Excel with Python instead of VBA and works on Windows and macOS: you can call Python from Excel and vice versa and write UDFs in Python (Windows only). xlwings PRO is a commercial add-on with additional functionality.

Homepage | Documentation | GitHub | Download

## The Mailing List / Discussion Group

There is a Google Group dedicated to working with Excel files in Python, including the libraries listed above along with manipulating the Excel application via COM.

## Commercial Development

The following companies can provide commercial software development and consultancy and are specialists in working with Excel files in Python:
