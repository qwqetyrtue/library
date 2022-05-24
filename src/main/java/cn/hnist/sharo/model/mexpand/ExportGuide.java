package cn.hnist.sharo.model.mexpand;


import cn.hnist.sharo.model.menum.ExcelType;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.LinkedHashMap;

public class  ExportGuide<T extends Filtrate> {
    // 文件名 默认为时间戳
    private String fileName = String.valueOf(new Date().toInstant().getEpochSecond());
    // 工资表名
    @NotBlank(message = "工作表名不能为空")
    private String sheetName;
    // 后缀 默认导出xlsx
    private ExcelType type = ExcelType.xls;
    // 查询对象
    @NotBlank(message = "查询条件不能为空")
    private T filtrate;
    // 是否添加头部 默认添加头部
    private boolean hasHeader = true;
    // 头部字典
    private JSONArray dictionary;

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getSheetName() {
        return sheetName;
    }

    public void setSheetName(String sheetName) {
        this.sheetName = sheetName;
    }

    public ExcelType getType() {
        return type;
    }

    public void setType(ExcelType type) {
        this.type = type;
    }


    public boolean isHasHeader() {
        return hasHeader;
    }

    public void setHasHeader(boolean hasHeader) {
        this.hasHeader = hasHeader;
    }

    public JSONArray getDictionary() {
        return dictionary;
    }

    public void setDictionary(JSONArray dictionary) {
        this.dictionary = dictionary;
    }

    public T getFiltrate() {
        return filtrate;
    }

    public void setFiltrate(T filtrate) {
        this.filtrate = filtrate;
    }
}
