package cn.hnist.sharo.unit;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.time.LocalDateTime;
import java.util.*;


public class ExcelUtils {


    /**
     * 创建一个工作簿,含一个带表头的工作表
     *
     * @param sheetName 工作表名
     * @param title     表头名列表
     * @return 工作簿
     */
    public static HSSFWorkbook createXlsWithSheet(String sheetName, String[] title) {
        HSSFWorkbook workbook = new HSSFWorkbook();
        return createXlsWithSheet(workbook,sheetName,title);
    }

    /**
     * 创建一个工作簿,含一个带表头的工作表
     *
     * @param title     表头名列表
     * @return 工作簿
     */
    public static HSSFWorkbook createXlsWithSheet(String[] title) {
        HSSFWorkbook workbook = new HSSFWorkbook();
        return ExcelUtils.createXlsWithSheet(workbook,"Sheet1", title);
    }

    /**
     * 创建一个工作簿,含一个不带表头的工作表
     *
     * @return 工作簿
     */
    public static HSSFWorkbook createXlsWithSheet(){
        HSSFWorkbook workbook = new HSSFWorkbook();
        return ExcelUtils.createXlsWithSheet(workbook,"Sheet1",null);
    }

    /**
     * 为存在的工作簿创建一个带表头的工作表
     *
     * @param workbook 工作簿实例
     * @param sheetName 工作表名
     * @param title     表头名列表
     * @return 工作簿
     */
    public static HSSFWorkbook createXlsWithSheet(HSSFWorkbook workbook,String sheetName,String[] title){
        HSSFSheet sheet = workbook.createSheet(sheetName);
        if(title == null)
            return workbook;
        HSSFRow row = sheet.createRow(0);
        HSSFCell cell;
        for (int i = 0; i < title.length; i++) {
            cell = row.createCell(i);
            cell.setCellValue(title[i]);
        }
        return workbook;
    }

    /**
     * 上传文件获取工资表
     *
     * @param file 上传文件
     * @return 工作表
     */
    public static Workbook uploadFileToWorkbook(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        String EXCEL2003 = "xls";
        String EXCEL2007 = "xlsx";
        Workbook workbook = null;
        if (!fileName.matches("^.+\\.(?i)(xls)$") && !fileName.matches("^.+\\.(?i)(xlsx)$")) {
            throw new RuntimeException("传入文件格式错误");
        } else {
            try {
                InputStream is = file.getInputStream();
                if (fileName.endsWith(EXCEL2007)) {
                    workbook = new XSSFWorkbook(is);
                }
                if (fileName.endsWith(EXCEL2003)) {
                    workbook = new HSSFWorkbook(is);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return workbook;
    }


    public static MultipartFile workbookToUploadFile(Workbook workbook) {

        return null;
    }

    public static LinkedHashMap<String, String> getDictionary(JSONArray dictionary) {
        if (dictionary == null) throw new RuntimeException("dictionary为空");
        LinkedHashMap<String, String> res = new LinkedHashMap<>();
        for (int i = 0;i < dictionary.size() ; i++) {
            JSONObject each = (JSONObject) dictionary.getJSONObject(i);
            if (each.isEmpty())
                return res;
            res.put(each.getString("key"), each.getString("value"));
        }
        return res;
    }

    /**
     * 读取工作簿
     *
     * @param dictionary 表头和属性对照
     * @return jsonObject list
     */
    public static JSONArray sheetToList(Sheet sheet, LinkedHashMap<String, String> dictionary, boolean hasHeader, int offset, int limit) throws Exception {
        JSONArray res = new JSONArray();
        LinkedHashSet<String> keySet = null;
        Iterator<String> keyIter;
        int skip = 0;
        int count = 0;
        if (sheet == null)
            throw new RuntimeException("sheet 为空");
        Iterator<Row> rowIterator = sheet.rowIterator();
        // 有头部,按头部字段顺序获取头部keySet
        if (hasHeader) {
            if (rowIterator.hasNext()) {
                keySet = new LinkedHashSet<>();
                Row header = rowIterator.next();
                Iterator<Cell> cellIterator = header.cellIterator();
                while (cellIterator.hasNext()) {
                    Cell cell = cellIterator.next();
                    String item = cell.getStringCellValue();
                    // 根据工资表的第一行,查询对照,将属性名称加入到keySet中
                    keySet.add(dictionary.get(item));
                }
            }
        }
        // 工作表没有头部,按传入字段顺序读取下面的行数据
        else {
            keySet = (LinkedHashSet<String>) dictionary.keySet();
        }
        while (rowIterator.hasNext()) {
            keyIter = keySet.iterator();
            // 计数等于导出数量 返回结果
            if (count >= limit) {
                return res;
            }
            // 计数累加
            count++;
            // 跳过行小与跳过数量 跳过当前行
            if (skip < offset) {
                skip++;
                continue;
            }
            // 一行数据
            JSONObject rowData = new JSONObject();
            Row row = rowIterator.next();
            //只有行有编号才是有效行
            if (row != null && row.getCell(0) != null) {
                int index = 0;
                while (keyIter.hasNext()) {
                    String key = keyIter.next();
                    Cell item = row.getCell(index);
                    if (item == null) {
                        rowData.put(key, null);
                        continue;
                    }
                    System.out.println(key + " " + item.getCellType() + " " + item.getCellStyle().getDataFormatString());
                    switch (item.getCellType()) {
                        case NUMERIC:
                            if ("General".equalsIgnoreCase(item.getCellStyle().getDataFormatString()))
                                rowData.put(key, item.getNumericCellValue());
                            else if ("yyyy/M/d".equalsIgnoreCase(item.getCellStyle().getDataFormatString()))
                                rowData.put(key, item.getDateCellValue());
                            else if ("yyyy/m/d\\ h:mm:ss".equalsIgnoreCase(item.getCellStyle().getDataFormatString()))
                                rowData.put(key, item.getLocalDateTimeCellValue());
                            else if ("yyyy/M/d;@".equalsIgnoreCase(item.getCellStyle().getDataFormatString()))
                                rowData.put(key, item.getDateCellValue());
                            else if ("yyyy/m/d\\ h:mm:ss;@".equalsIgnoreCase(item.getCellStyle().getDataFormatString()))
                                rowData.put(key, item.getLocalDateTimeCellValue());
                            break;
                        case STRING:
                            rowData.put(key, item.getStringCellValue());
                            break;
                        case BOOLEAN:
                            rowData.put(key, item.getBooleanCellValue());
                            break;
                        case BLANK:
                            rowData.put(key, null);
                            break;
                    }
                    index++;
                }
                res.add(rowData);
            }
        }
        // 行数循环完 返回结果
        return res;
    }


    /**
     * 将数据写入到存在的工作簿中
     *
     * @param workbook 要写入的工作簿
     * @param sheetName  写入的工资表名
     * @param data       写入的数据
     * @param dictionary 数据表头和属性对应表
     * @return 工作簿实例 格式为:xls
     * @throws Exception
     */
    public static HSSFWorkbook listToXls(HSSFWorkbook workbook, String sheetName, JSONArray data, LinkedHashMap<String, String> dictionary,Boolean hasHeader) throws Exception {
        // 创建excel表头
        String[] head = dictionary.keySet().toArray(new String[0]);
        int start = 0;
        if(hasHeader){
            createXlsWithSheet(workbook,sheetName,head);
            start++;
        }else{
            createXlsWithSheet(workbook,sheetName,null);
        }
        HSSFSheet sheet = workbook.getSheet(sheetName);

        if (data != null) {
            for (int i=0; i < data.size(); i++) {
                HSSFRow row = sheet.createRow(i+start);
                JSONObject item = (JSONObject) data.get(i);
                //System.out.println(item.toJSONString());
                for (int j = 0; j < head.length; j++) {
                    Object value = item.get(dictionary.get(head[j]));
                    // 为空
                    if (value == null) {
                        row.createCell(j).setCellValue("");
                        continue;
                    }
                    switch (value.getClass().getSimpleName()) {
                        case "LocalDateTime":
                            row.createCell(j).setCellValue((LocalDateTime) value);
                            break;
                        case "Date":
                            row.createCell(j).setCellValue((Date) value);
                            break;
                        case "String":
                            row.createCell(j).setCellValue((String) value);
                            break;
                        case "Integer":
                            row.createCell(j).setCellValue(new Double((Integer) value));
                            break;
                        case "Double":
                            row.createCell(j).setCellValue((Double) value);
                            break;
                    }
                }
            }
        }
        File file = new File("C:/users/86180/desktop/test.xls");
        workbook.write(new FileOutputStream(file));
        workbook.close();
        return workbook;
    }

    /**
     * 创建一个新的工作簿,写入数据
     *
     * @param sheetName  写入的工资表名
     * @param data       写入的数据
     * @param dictionary 数据表头和属性对应表
     * @return 工作簿实例 格式为:xls
     * @throws Exception
     */
    public static HSSFWorkbook listToXls(String sheetName, JSONArray data, LinkedHashMap<String,String> dictionary,Boolean hasHeader) throws Exception{
        HSSFWorkbook workbook = new HSSFWorkbook();
        return listToXls(workbook,sheetName,data,dictionary,hasHeader);
    }
}
