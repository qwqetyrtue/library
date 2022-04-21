package cn.hnist.sharo.model.mexpand;

import cn.hnist.sharo.model.menum.BookState;

import java.sql.Date;

public class Book_filtrate {
    private String bkid;
    private String bkname;
    private String atname;
    private double price;
    private double price_upper;
    private double price_lower;
    private BookState state;
    private String publisher;
    private java.sql.Date storedate;
    private java.sql.Date storedate_upper;
    private java.sql.Date storedate_lower;
    private String isbn;
    private String isbn10;
    private String publishadd;
    private java.sql.Date publishdate;
    private java.sql.Date publishdate_upper;
    private java.sql.Date publishdate_lower;
    private long page;
    private long page_upper;
    private long page_lower;
    private String category;
    private String language;
    private String chinaclass;
    private String binding;

    private int limit;
    private int offset;
    private String order;


    public String getBkid() {
        return bkid;
    }

    public void setBkid(String bkid) {
        this.bkid = bkid;
    }

    public String getBkname() {
        return bkname;
    }

    public void setBkname(String bkname) {
        this.bkname = bkname;
    }

    public String getAtname() {
        return atname;
    }

    public void setAtname(String atname) {
        this.atname = atname;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getPrice_upper() {
        return price_upper;
    }

    public void setPrice_upper(double price_upper) {
        this.price_upper = price_upper;
    }

    public double getPrice_lower() {
        return price_lower;
    }

    public void setPrice_lower(double price_lower) {
        this.price_lower = price_lower;
    }

    public BookState getState() {
        return state;
    }

    public void setState(BookState state) {
        this.state = state;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public Date getStoredate() {
        return storedate;
    }

    public void setStoredate(Date storedate) {
        this.storedate = storedate;
    }

    public Date getStoredate_upper() {
        return storedate_upper;
    }

    public void setStoredate_upper(Date storedate_upper) {
        this.storedate_upper = storedate_upper;
    }

    public Date getStoredate_lower() {
        return storedate_lower;
    }

    public void setStoredate_lower(Date storedate_lower) {
        this.storedate_lower = storedate_lower;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getIsbn10() {
        return isbn10;
    }

    public void setIsbn10(String isbn10) {
        this.isbn10 = isbn10;
    }

    public String getPublishadd() {
        return publishadd;
    }

    public void setPublishadd(String publishadd) {
        this.publishadd = publishadd;
    }

    public Date getPublishdate() {
        return publishdate;
    }

    public void setPublishdate(Date publishdate) {
        this.publishdate = publishdate;
    }

    public Date getPublishdate_upper() {
        return publishdate_upper;
    }

    public void setPublishdate_upper(Date publishdate_upper) {
        this.publishdate_upper = publishdate_upper;
    }

    public Date getPublishdate_lower() {
        return publishdate_lower;
    }

    public void setPublishdate_lower(Date publishdate_lower) {
        this.publishdate_lower = publishdate_lower;
    }

    public long getPage() {
        return page;
    }

    public void setPage(long page) {
        this.page = page;
    }

    public long getPage_upper() {
        return page_upper;
    }

    public void setPage_upper(long page_upper) {
        this.page_upper = page_upper;
    }

    public long getPage_lower() {
        return page_lower;
    }

    public void setPage_lower(long page_lower) {
        this.page_lower = page_lower;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getChinaclass() {
        return chinaclass;
    }

    public void setChinaclass(String chinaclass) {
        this.chinaclass = chinaclass;
    }

    public String getBinding() {
        return binding;
    }

    public void setBinding(String binding) {
        this.binding = binding;
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

