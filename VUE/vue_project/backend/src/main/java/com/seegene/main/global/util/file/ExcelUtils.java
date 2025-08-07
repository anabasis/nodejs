package com.seegene.main.global.util.file;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;


@Component
@RequiredArgsConstructor
public class ExcelUtils {

    private FormulaEvaluator formulaEvaluator;
    private final FileUtils fileUtils;



    public List<List<String>> excelReader(MultipartFile multipartFile) {
        List<List<String>> resultList = new ArrayList<>();
        try {
            File file = fileUtils.multipartFileToFile(multipartFile);
            XSSFWorkbook workbook = new XSSFWorkbook(file);
            formulaEvaluator = workbook.getCreationHelper().createFormulaEvaluator();
            Sheet sheet = workbook.getSheetAt(0);

            // 엑셀 데이터 시작 row
            for (int i = 1; i < sheet.getLastRowNum()-1; i++) {
                Row row = sheet.getRow(i);
                if (row != null) {
                    List<String> cellList = new ArrayList<>();
                    for (int j = 0; j < row.getLastCellNum(); j++) {
                        Cell cell = row.getCell(j);
                        if(cell != null){
                            cellList.add(cellReader(cell));
                        }
                    }
                    resultList.add(cellList);
                }
            }
            workbook.close();
        }catch (Exception e) {
            e.printStackTrace();
        }
        return resultList;
    }


    public void excelExport(List<Map<String, String>> lists) {
        String fileName = "user-export-File";
        String extension = ".xlsx";
        try {
            XSSFWorkbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet(fileName);

            CellStyle headStyle = headStyleSet(workbook);
            CellStyle bodyStyle = bodyStyleSet(workbook);
            widthSet(sheet);

            int rowNo = 0;
            int colNo = 0;
            Row row = sheet.createRow(rowNo++);
            Cell cell = null;

            for (String key : lists.get(0).keySet()) {
                cell = row.createCell(colNo++);
                cell.setCellStyle(headStyle);
                cell.setCellValue(key);
            }

            for (Map<String, String> map :lists) {
                row = sheet.createRow(rowNo++);
                colNo = 0;
                for (String key : map.keySet()) {
                    cell = row.createCell(colNo++);
                    cell.setCellStyle(bodyStyle);
                    cell.setCellValue(map.get(key));
                }
            }
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            workbook.write(bos);
            byte[] bytes = bos.toByteArray();
            fileUtils.uploadByteFile(bytes, fileName + UUID.randomUUID() + extension);
            bos.close();
            workbook.close();
        }catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void widthSet(Sheet sheet) {
        sheet.setColumnWidth(0,11000);
        sheet.setColumnWidth(1,7000);
        sheet.setColumnWidth(2,7000);
        sheet.setColumnWidth(3,20000);
        sheet.setColumnWidth(4,7000);
        sheet.setColumnWidth(5,6000);
        sheet.setColumnWidth(6,3000);
        sheet.setColumnWidth(7,3000);
        sheet.setColumnWidth(8,6000);
        sheet.setColumnWidth(9,4500);
        sheet.setColumnWidth(10,4500);
        sheet.setColumnWidth(11,2500);
    }
    public CellStyle headStyleSet(XSSFWorkbook workbook) {
        CellStyle headStyle = workbook.createCellStyle();
        headStyle.setAlignment(HorizontalAlignment.CENTER);
        headStyle.setBorderTop(BorderStyle.THIN);
        headStyle.setBorderBottom(BorderStyle.THIN);
        headStyle.setBorderLeft(BorderStyle.THIN);
        headStyle.setBorderRight(BorderStyle.THIN);
        headStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.index);
        headStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        return headStyle;
    }
    public CellStyle bodyStyleSet(XSSFWorkbook workbook) {
        CellStyle bodyStyle = workbook.createCellStyle();
        bodyStyle.setAlignment(HorizontalAlignment.CENTER);
        bodyStyle.setBorderTop(BorderStyle.THIN);
        bodyStyle.setBorderBottom(BorderStyle.THIN);
        bodyStyle.setBorderLeft(BorderStyle.THIN);
        bodyStyle.setBorderRight(BorderStyle.THIN);
        return bodyStyle;
    }

    public String cellReader(Cell cell) {
        return switch (cell.getCellType()) {
            case NUMERIC -> String.valueOf((int) cell.getNumericCellValue());
            case STRING -> cell.getStringCellValue();
            case BLANK -> "";
            case FORMULA -> String.valueOf(formulaEvaluator.evaluate(cell).getNumberValue());
            default -> throw new IllegalStateException("Unexpected value: " + cell.getCellType());
        };
    }
}
