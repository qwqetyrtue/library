package cn.hnist.sharo.unit;

import java.util.List;

public class ListRes<T> {
    private List<T> data;

    public ListRes(List<T> data, int total, String res) {
        this.data = data;
        this.total = total;
        this.res = res;
    }

    private int total;
    private String res;

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public String getRes() {
        return res;
    }

    public void setRes(String res) {
        this.res = res;
    }
}
