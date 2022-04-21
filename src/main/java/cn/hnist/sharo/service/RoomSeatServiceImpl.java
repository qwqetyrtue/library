package cn.hnist.sharo.service;

import cn.hnist.sharo.dao.RoomSeatMapper;
import cn.hnist.sharo.model.Room;
import cn.hnist.sharo.model.Seat;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service("RoomSeatService")
@Transactional
public class RoomSeatServiceImpl implements RoomSeatService{
    @Resource
    RoomSeatMapper roomSeatMapper;

    @Override
    public Room room(Room room) {
        List<Room> res = roomSeatMapper.room(room);
        if(res!=null && res.size()==1){
            return (Room) res.toArray()[0];
        }
        return null;
    }



    @Override
    public Seat seat(Seat seat) {
        List<Seat> res = roomSeatMapper.seat(seat);
        if(res!=null && res.size()==1){
            return (Seat) res.toArray()[0];
        }
        return null;
    }

    @Override
    public List<Room> rooms(Room room) {
        try{
            return roomSeatMapper.rooms(room);
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public List<Seat> seatsbyroom(Room room) {
        try {
           return roomSeatMapper.seatsbyroom(room);
        }catch (Exception e){
            return null;
        }
    }
}
