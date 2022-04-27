package cn.hnist.sharo.service;

import cn.hnist.sharo.model.Room;
import cn.hnist.sharo.model.Seat;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("roomSeatService")
public interface RoomSeatService {
    // 获取房间信息
    Room room(Room room);
    // 获取座位信息
    Seat seat(Seat seat);
    // 获取房间列表
    List<Room> rooms(Room room);
    // 通过房间号获取座位列表
    List<Seat> seatsbyroom(Room room);
}
