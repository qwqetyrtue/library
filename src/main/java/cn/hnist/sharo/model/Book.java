package cn.hnist.sharo.model;


import cn.hnist.sharo.model.menum.BookState;

public class Book {

  private long id;
  private String bkid;
  private String name;
  private String atid;
  private double price;
  private BookState state;
  private String introduce;
  private String remark;
  private String publisher;
  private String storedate;
  private String isbn;
  private String isbn10;
  private String imgs;
  private String publishadd;
  private String publishdate;
  private long page;
  private String category;
  private String language;
  private String chinaclass;
  private String binding;


  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }


  public String getBkid() {
    return bkid;
  }

  public void setBkid(String bkid) {
    this.bkid = bkid;
  }


  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }


  public String getAtid() {
    return atid;
  }

  public void setAtid(String atid) {
    this.atid = atid;
  }


  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }


  public BookState getState() {
    return state;
  }

  public void setState(BookState state) {
    this.state = state;
  }


  public String getIntroduce() {
    return introduce;
  }

  public void setIntroduce(String introduce) {
    this.introduce = introduce;
  }


  public String getRemark() {
    return remark;
  }

  public void setRemark(String remark) {
    this.remark = remark;
  }


  public String getPublisher() {
    return publisher;
  }

  public void setPublisher(String publisher) {
    this.publisher = publisher;
  }


  public String getStoredate() {
    return storedate;
  }

  public void setStoredate(String storedate) {
    this.storedate = storedate;
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


  public String getImgs() {
    return imgs;
  }

  public void setImgs(String imgs) {
    this.imgs = imgs;
  }


  public String getPublishadd() {
    return publishadd;
  }

  public void setPublishadd(String publishadd) {
    this.publishadd = publishadd;
  }


  public String getPublishdate() {
    return publishdate;
  }

  public void setPublishdate(String publishdate) {
    this.publishdate = publishdate;
  }


  public long getPage() {
    return page;
  }

  public void setPage(long page) {
    this.page = page;
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

}
