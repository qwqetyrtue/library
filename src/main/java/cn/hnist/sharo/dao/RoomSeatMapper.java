package cn.hnist.sharo.dao;

import cn.hnist.sharo.model.Room;
import cn.hnist.sharo.model.Seat;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("roomSeatMapper")
@Mapper
public interface RoomSeatMapper {
    List<Room> room(Room room);

    List<Seat> seat(Seat seat);

    List<Seat> seatsbyroom(Room room);

    List<Room> rooms(Room room);
}
