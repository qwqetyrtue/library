package cn.hnist.sharo.service;

import cn.hnist.sharo.dao.AdminMapper;
import cn.hnist.sharo.model.Admin;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service("AdminService")
@Transactional
public class AdminServiceImpl implements AdminService{
    @Resource
    AdminMapper adminMapper;


    @Override
    public Admin login(Admin admin) {
        List<Admin> res = adminMapper.login(admin);
        if(res != null && res.size() > 0){
            return (Admin) res.toArray()[0];
        }
        return null;
    }
}
