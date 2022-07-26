package com.pingpong.backend.api.service;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class ExcelUtil {

    public String getCellValue(XSSFCell cell){
        String value = "";
        if(cell==null){
            return value;
        }

        switch (cell.getCellType()){
            case STRING:
                value=cell.getStringCellValue();
                break;
            case NUMERIC:
                value=(int) cell.getNumericCellValue()+"";
                break;
            default:
                break;
        }

        return value;
    }

    public List<Map<String, Object>> getListData(MultipartFile file, int startRowNum, int columnLength){
        List<Map<String, Object>> excelList = new ArrayList<Map<String, Object>>();

        try{
            OPCPackage opcPackage = OPCPackage.open(file.getInputStream());

            @SuppressWarnings("resource")
            XSSFWorkbook workbook = new XSSFWorkbook(opcPackage);

            XSSFSheet sheet = workbook.getSheetAt(0);
            int rowIndex=0;
            int columnIndex=0;

            for(rowIndex=startRowNum; rowIndex <= sheet.getLastRowNum(); rowIndex++){
                XSSFRow row = sheet.getRow(rowIndex);

                //빈 행은 skip
                if (row.getCell(0) != null && !row.getCell(0).toString().equals("")) {
                    Map<String, Object> map = new HashMap<String, Object>();
                    int cells = columnLength;
                    for (columnIndex = 0; columnIndex <= cells; columnIndex++) {
                        XSSFCell cell = row.getCell(columnIndex);
                        map.put(String.valueOf(columnIndex), getCellValue(cell));
                    }
                    excelList.add(map);
                }
            }
        } catch (InvalidFormatException e){
            e.printStackTrace();
        } catch (IOException e){
            e.printStackTrace();
        }

        return excelList;
    }
}
