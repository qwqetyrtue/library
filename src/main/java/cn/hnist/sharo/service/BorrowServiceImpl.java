package cn.hnist.sharo.service;

import cn.hnist.sharo.dao.BookMapper;
import cn.hnist.sharo.dao.BorrowMapper;
import cn.hnist.sharo.model.Book;
import cn.hnist.sharo.model.Borrowrecord;
import cn.hnist.sharo.model.User;
import cn.hnist.sharo.model.menum.BookState;
import cn.hnist.sharo.model.menum.BorrowState;
import cn.hnist.sharo.model.mexpand.Borrow_create;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.List;

@Service("BorrowService")
@Transactional
public class BorrowServiceImpl implements BorrowService {
    @Resource
    BorrowMapper borrowMapper;
    @Resource
    BookMapper bookMapper;


    @Transactional
    @Override
    public boolean create(Borrow_create borrow_create) throws RuntimeException{
        LocalDateTime create = LocalDateTime.now(ZoneId.of(ZoneId.SHORT_IDS.get("CTT"))).withNano(0);
        Long creatTimestamp = create.toInstant(ZoneOffset.of("+8")).toEpochMilli();
        Borrowrecord borrowrecord = new Borrowrecord();
        borrowrecord.setBkid(borrow_create.getBkid());
        borrowrecord.setUid(borrow_create.getUid());
        borrowrecord.setBorrowid(borrow_create.getUid() + '_' + creatTimestamp);
        borrowrecord.setCreatetime(new Timestamp(creatTimestamp));
        borrowrecord.setState(BorrowState.BORROW);
        borrowrecord.setRemark(borrow_create.getRemark());

        LocalDateTime limit = create.plusDays(borrow_create.getTime());
        Long limitTimestamp = limit.toInstant(ZoneOffset.of("+8")).toEpochMilli();
        borrowrecord.setLimittime(new Timestamp(limitTimestamp));

        if (borrowMapper.create(borrowrecord) == 1) {
            Book book = new Book();
            book.setBkid(borrow_create.getBkid());
            book.setState(BookState.LEND);
            if (bookMapper.update(book) == 1)
                return true;
            else throw new RuntimeException("修改书籍状态失败");
        }else throw new RuntimeException("提交借阅单失败");
    }

    @Override
    public List<JSONObject> all(User user) {
        return borrowMapper.all(user);
    }

    @Transactional
    @Override
    public boolean finish(Borrowrecord borrowrecord) throws RuntimeException{
        LocalDateTime create = LocalDateTime.now(ZoneId.of(ZoneId.SHORT_IDS.get("CTT"))).withNano(0);
        Long creatTimestamp = create.toInstant(ZoneOffset.of("+8")).toEpochMilli();
        // 转换为 Timestamp 类型对象
        Timestamp timestamp = new Timestamp(creatTimestamp);
        borrowrecord.setReturntime(timestamp);
        borrowrecord.setState(BorrowState.RETURN);
        if(borrowMapper.update(borrowrecord) == 1){
            Book book = new Book();
            book.setState(BookState.STORE);
            book.setBkid(borrowrecord.getBkid());
            if(bookMapper.update(book) == 1)
                return true;
            else throw new RuntimeException("修改书籍状态失败");
        }else throw new RuntimeException("修改借阅单失败");
    }

}
