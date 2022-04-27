package cn.hnist.sharo.service;

import cn.hnist.sharo.dao.BookMapper;
import cn.hnist.sharo.dao.BorrowMapper;
import cn.hnist.sharo.model.Book;
import cn.hnist.sharo.model.Borrowrecord;
import cn.hnist.sharo.model.User;
import cn.hnist.sharo.model.menum.BookState;
import cn.hnist.sharo.model.menum.BorrowState;
import cn.hnist.sharo.model.mexpand.Borrow_create;
import cn.hnist.sharo.model.mexpand.Borrow_filtrate;
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
            if (bookMapper.lend(book) == 1)
                return true;
            else throw new RuntimeException("书籍已借出或未入库");
        }else throw new RuntimeException("书籍不存在");
    }

    @Override
    public List<?> filtrate(Borrow_filtrate borrow_filtrate) {
        try{
            return borrowMapper.filtrate(borrow_filtrate);
        }catch (Exception e){
            return null;
        }
    }
}
