package cn.hnist.sharo.unit;

public class Res<T> {
    private String res;
    private T data;

    public Res(String res, T data) {
        this.res = res;
        this.data = data;
    }

    public String getRes() {
        return res;
    }

    public void setRes(String res) {
        this.res = res;
    }

    public Object getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
