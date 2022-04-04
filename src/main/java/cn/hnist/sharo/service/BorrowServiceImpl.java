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
import java.util.Calendar;
import java.util.List;

@Service("BorrowService")
@Transactional
public class BorrowServiceImpl implements BorrowService {
    @Resource
    BorrowMapper borrowMapper;
    @Resource
    BookMapper bookMapper;


    @Override
    public boolean create(Borrow_create borrow_create) {
        Calendar create = Calendar.getInstance();

        Borrowrecord borrowrecord = new Borrowrecord();
        borrowrecord.setBkid(borrow_create.getBkid());
        borrowrecord.setUid(borrow_create.getUid());
        borrowrecord.setBorrowid(borrow_create.getUid() + '_' + String.valueOf(create.getTimeInMillis()));
        borrowrecord.setCreatetime(new Timestamp(create.getTimeInMillis()));
        borrowrecord.setState(BorrowState.BORROW);
        borrowrecord.setRemark(borrow_create.getRemark());

        create.add(Calendar.DATE, borrow_create.getTime());
        borrowrecord.setLimittime(new Timestamp(create.getTimeInMillis()));

        if (borrowMapper.create(borrowrecord) == 1) {
            Book book = new Book();
            book.setBkid(borrow_create.getBkid());
            book.setState(BookState.LEND);
            if (bookMapper.update(book) == 1)
                return true;
        }
        return false;
    }

    @Override
    public List<JSONObject> all(User user) {
        return borrowMapper.all(user);
    }
}
