package cn.hnist.sharo.model.mexpand;

import cn.hnist.sharo.model.menum.BorrowState;
import cn.hnist.sharo.model.menum.PaperState;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.sql.Timestamp;

public class Paper_filtrate extends Filtrate{
    private String pid;
    private String title;
    private String mid;
    private PaperState state;
    private java.sql.Timestamp createtime;
    private java.sql.Timestamp createtime_upper;
    private java.sql.Timestamp createtime_lower;

    private java.sql.Timestamp updatetime;
    private java.sql.Timestamp updatetime_upper;
    private java.sql.Timestamp updatetime_lower;
    private String classify;

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMid() {
        return mid;
    }

    public void setMid(String mid) {
        this.mid = mid;
    }

    public PaperState getState() {
        return state;
    }

    public void setState(PaperState state) {
        this.state = state;
    }

    public Timestamp getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Timestamp createtime) {
        this.createtime = createtime;
    }

    public Timestamp getUpdatetime() {
        return updatetime;
    }

    public void setUpdatetime(Timestamp updatetime) {
        this.updatetime = updatetime;
    }

    public String getClassify() {
        return classify;
    }

    public void setClassify(String classify) {
        this.classify = classify;
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

    public Timestamp getUpdatetime_upper() {
        return updatetime_upper;
    }

    public void setUpdatetime_upper(Timestamp updatetime_upper) {
        this.updatetime_upper = updatetime_upper;
    }

    public Timestamp getUpdatetime_lower() {
        return updatetime_lower;
    }

    public void setUpdatetime_lower(Timestamp updatetime_lower) {
        this.updatetime_lower = updatetime_lower;
    }
}
