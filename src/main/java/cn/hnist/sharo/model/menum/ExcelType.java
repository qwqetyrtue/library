package cn.hnist.sharo.model.menum;

public enum ExcelType {
    xls(".xls"),xlsx(".xlsx");
    private final String suffix;
    ExcelType(String suffix) {
        this.suffix = suffix;
    }

    public String getSuffix() {
        return suffix;
    }
}
