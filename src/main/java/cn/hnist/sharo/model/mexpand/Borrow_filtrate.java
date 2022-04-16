package cn.hnist.sharo.model.mexpand;

import cn.hnist.sharo.model.menum.BorrowState;

import java.sql.Timestamp;

public class Borrow_filtrate {
    private String borrowid;
    private String uid;
    private java.sql.Timestamp createtime;
    private java.sql.Timestamp createtime_upper;
    private java.sql.Timestamp createtime_lower;
    private java.sql.Timestamp returntime;
    private java.sql.Timestamp returntime_upper;
    private java.sql.Timestamp returntime_lower;
    private BorrowState state;
    private String bkid;
    private java.sql.Timestamp limittime;
    private java.sql.Timestamp limittime_upper;
    private java.sql.Timestamp limittime_lower;
    private boolean remark;

    private int limit;
    private int offset;
    private String order;

    public String getBorrowid() {
        return borrowid;
    }

    public void setBorrowid(String borrowid) {
        this.borrowid = borrowid;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public Timestamp getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Timestamp createtime) {
        this.createtime = createtime;
    }

    public Timestamp getCreatetime_upper() {
        return createtime_upper;
    }

    public void setCreatetime_upper(Timestamp createtime_upper) {
        this.createtime_upper = createtime_upper;
    }

    public Timestamp getCreatetime_lower() {
        return createtime_lower;
    }

    public void setCreatetime_lower(Timestamp createtime_lower) {
        this.createtime_lower = createtime_lower;
    }

    public Timestamp getReturntime() {
        return returntime;
    }

    public void setReturntime(Timestamp returntime) {
        this.returntime = returntime;
    }

    public Timestamp getReturntime_upper() {
        return returntime_upper;
    }

    public void setReturntime_upper(Timestamp returntime_upper) {
        this.returntime_upper = returntime_upper;
    }

    public Timestamp getReturntime_lower() {
        return returntime_lower;
    }

    public void setReturntime_lower(Timestamp returntime_lower) {
        this.returntime_lower = returntime_lower;
    }

    public BorrowState getState() {
        return state;
    }

    public void setState(BorrowState state) {
        this.state = state;
    }

    public String getBkid() {
        return bkid;
    }

    public void setBkid(String bkid) {
        this.bkid = bkid;
    }

    public Timestamp getLimittime() {
        return limittime;
    }

    public void setLimittime(Timestamp limittime) {
        this.limittime = limittime;
    }

    public Timestamp getLimittime_upper() {
        return limittime_upper;
    }

    public void setLimittime_upper(Timestamp limittime_upper) {
        this.limittime_upper = limittime_upper;
    }

    public Timestamp getLimittime_lower() {
        return limittime_lower;
    }

    public void setLimittime_lower(Timestamp limittime_lower) {
        this.limittime_lower = limittime_lower;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getOffset() {
        return offset;
    }

    public void setOffset(int offset) {
        this.offset = offset;
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }
}
