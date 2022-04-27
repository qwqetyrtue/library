package cn.hnist.sharo.unit;

import java.util.List;

public class ListRes<T> extends Res<List<T>> {
    public ListRes( String res,String msg,List<T> data, int total) {
        super(res,data);
        this.total = total;
        this.msg = msg;
    }
    private int total;
    private String msg;

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }


    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
