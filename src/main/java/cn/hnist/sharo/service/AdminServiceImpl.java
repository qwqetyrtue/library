package cn.hnist.sharo.service;

import cn.hnist.sharo.dao.*;
import cn.hnist.sharo.model.*;
import cn.hnist.sharo.model.menum.BookState;
import cn.hnist.sharo.model.menum.BorrowState;
import cn.hnist.sharo.model.mexpand.Book_filtrate;
import cn.hnist.sharo.model.mexpand.Borrow_filtrate;
import cn.hnist.sharo.model.mexpand.Paper_filtrate;
import cn.hnist.sharo.model.mexpand.User_filtrate;
import com.alibaba.fastjson.JSONObject;
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
    public User usersAdd(User user) {
        if(user.getName() == null || user.getName().equals("")) {
            LocalDateTime create = LocalDateTime.now(ZoneId.of(ZoneId.SHORT_IDS.get("CTT"))).withNano(0);
            Long creatTimestamp = create.toInstant(ZoneOffset.of("+8")).getEpochSecond();
            user.setName("用户#"+create.toInstant(ZoneOffset.of("+8")).getEpochSecond());
        }
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        user.setCreatedate(java.sql.Date.valueOf(sf.format(new Date())));
        int affect = userMapper.usersadd(user);
        return affect == 1?user:null;
    }

    @Transactional
    @Override
    public boolean userImport(List<User> users) {
        if(userMapper.usersimport(users) != users.size())
            throw new RuntimeException("插入失败");
        return true;
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
    public boolean booksInclude(Book book) {
        int affect = bookMapper.booksinclude(book);
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
    public boolean borrowUpdate(Borrowrecord borrowrecord) {
        int res = borrowMapper.borrowupdate(borrowrecord);
        if(res == 1){
            return true;
        }
        return false;
    }

    @Transactional
    @Override
    public boolean borrowFinish(Borrowrecord borrowrecord) {
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
    public JSONObject borrowCreate(Borrowrecord borrowrecord) throws RuntimeException{
        LocalDateTime create = borrowrecord.getCreatetime().toLocalDateTime();
        Long creatTimestamp_sec = create.toInstant(ZoneOffset.of("+8")).getEpochSecond();
        borrowrecord.setBorrowid(borrowrecord.getUid() + '_' + creatTimestamp_sec);
        if (borrowMapper.create(borrowrecord) == 1) {
            Book book = new Book();
            book.setBkid(borrowrecord.getBkid());
            book.setState(BookState.LEND);
            if (bookMapper.lend(book) == 1) {
                List<JSONObject> res = borrowMapper.detail(borrowrecord);
                if(res != null && res.size() == 1){
                    return (JSONObject) res.toArray()[0];
                }return null;
            }
            else throw new RuntimeException("书籍已借出或未入库");
        }else throw new RuntimeException("书籍不存在");
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
    public JSONObject paperDetail(Paper paper) {
        List<JSONObject> res = paperMapper.detail(paper);
        if(res != null && res.size() == 1){
            return (JSONObject) res.toArray()[0];
        }
        return null;
    }

    @Override
    public boolean paperUpdate(Paper paper) {
        int res = paperMapper.papersupdate(paper);
        return res == 1;
    }

    @Override
    public boolean paperCreate(Paper paper) {
        LocalDateTime create = LocalDateTime.now(ZoneId.of(ZoneId.SHORT_IDS.get("CTT"))).withNano(0);
        Long creatTimestamp = create.toInstant(ZoneOffset.of("+8")).toEpochMilli();
        Long creatTimestamp_sec = create.toInstant(ZoneOffset.of("+8")).getEpochSecond();
        paper.setCreatetime(new Timestamp(creatTimestamp));
        paper.setUpdatetime(new Timestamp(creatTimestamp));
        paper.setPid(creatTimestamp_sec.toString());
        int res = paperMapper.paperscreate(paper);
        return res == 1;
    }
}
