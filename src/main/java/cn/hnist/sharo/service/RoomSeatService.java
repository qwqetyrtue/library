package cn.hnist.sharo.service;

import cn.hnist.sharo.model.Room;
import cn.hnist.sharo.model.Seat;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("roomSeatService")
public interface RoomSeatService {
    Room room(Room room);

    Seat seat(Seat seat);

    List<Room> rooms(Room room);

    List<Seat> seatsbyroom(Room room);
}
