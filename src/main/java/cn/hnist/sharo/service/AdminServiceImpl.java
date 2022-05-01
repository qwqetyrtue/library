package cn.hnist.sharo.service;

import cn.hnist.sharo.dao.*;
import cn.hnist.sharo.model.*;
import cn.hnist.sharo.model.menum.BookState;
import cn.hnist.sharo.model.menum.BorrowState;
import cn.hnist.sharo.model.mexpand.Book_filtrate;
import cn.hnist.sharo.model.mexpand.Borrow_filtrate;
import cn.hnist.sharo.model.mexpand.Paper_filtrate;
import cn.hnist.sharo.model.mexpand.User_filtrate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.List;

@Service("AdminService")
@Transactional
public class AdminServiceImpl implements AdminService{
    @Resource
    AdminMapper adminMapper;
    @Resource
    BookMapper bookMapper;
    @Resource
    BorrowMapper borrowMapper;
    @Resource
    UserMapper userMapper;
    @Resource
    PaperMapper paperMapper;


    @Override
    public Admin login(Admin admin) {
        List<Admin> res = adminMapper.login(admin);
        if(res != null && res.size() > 0){
            return (Admin) res.toArray()[0];
        }
        return null;
    }


    @Override
    public List<?> usersFilter(User_filtrate user_filtrate) {
        try {
            return userMapper.usersfilter(user_filtrate);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public String usersDelete(User user) {
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        String time = sf.format(new Date());
        user.setLogout(java.sql.Date.valueOf(time));
        int affect = userMapper.usersdelete(user);
        if(affect == 1){
            return time;
        }
        return null;
    }

    @Override
    public boolean usersUpdate(User user) {
        int affect = userMapper.usersupdate(user);
        return affect == 1;
    }

    @Override
    public List<?> booksFilter(Book_filtrate book_filtrate) {
        try {
            return bookMapper.booksfilter(book_filtrate);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public String booksDelete(Book book) {
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        String time = sf.format(new Date());
        int affect = bookMapper.booksdelete(book);
        if(affect == 1){
            return time;
        }
        return null;
    }

    @Override
    public boolean booksUpdate(Book book) {
        int affect = bookMapper.booksupdate(book);
        return affect == 1;
    }

    @Override
    public List<Author> authorsByName(Author author) {
        try{
            return bookMapper.authorsbyname(author);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<?> borrowsFilter(Borrow_filtrate borrow_filtrate) {
        try {
            return borrowMapper.borrowsfilter(borrow_filtrate);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<User> usersByName(User user) {
        try{
            return borrowMapper.usersbyname(user);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Book> booksByName(Book book) {
        try{
            return borrowMapper.booksbyname(book);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean borrowDelete(Borrowrecord borrowrecord) {
        int res = borrowMapper.borrowdelete(borrowrecord);
        if(res == 1){
            return true;
        }
        return false;
    }

    @Override
    public boolean borrowUpdate(Borrowrecord borrowrecord) {
        int res = borrowMapper.borrowupdate(borrowrecord);
        if(res == 1){
            return true;
        }
        return false;
    }

    @Transactional
    @Override
    public boolean borrowsFinish(Borrowrecord borrowrecord) {
        LocalDateTime create = LocalDateTime.now(ZoneId.of(ZoneId.SHORT_IDS.get("CTT"))).withNano(0);
        Long creatTimestamp = create.toInstant(ZoneOffset.of("+8")).toEpochMilli();
        // 转换为 Timestamp 类型对象
        Timestamp timestamp = new Timestamp(creatTimestamp);
        borrowrecord.setReturntime(timestamp);
        borrowrecord.setState(BorrowState.RETURN);

        if(borrowMapper.borrowupdate(borrowrecord) == 1){
            Book book = new Book();
            book.setState(BookState.STORE);
            book.setBkid(borrowrecord.getBkid());
            if(bookMapper.booksupdate(book) == 1)
                return true;
            else throw new RuntimeException("修改书籍状态失败");
        }else throw new RuntimeException("修改借阅单失败");
    }

    @Override
    public List<?> papersFilter(Paper_filtrate paper_filtrate) {
        try {
            return paperMapper.papersfilter(paper_filtrate);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Paper paperDetail(Paper paper) {
        List<Paper> res = paperMapper.detail(paper);
        if(res != null && res.size() == 1){
            return (Paper) res.toArray()[0];
        }
        return null;
    }

    @Override
    public boolean paperUpdate(Paper paper) {
        int res = paperMapper.papersupdate(paper);
        return res == 1;
    }
}
