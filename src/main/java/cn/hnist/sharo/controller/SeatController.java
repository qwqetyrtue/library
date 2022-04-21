package cn.hnist.sharo.controller;

import cn.hnist.sharo.model.Room;
import cn.hnist.sharo.model.Seat;
import cn.hnist.sharo.service.RoomSeatService;
import cn.hnist.sharo.unit.Res;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping(value = "/seat")
public class SeatController {
    final private RoomSeatService roomSeatService;

    @Autowired
    public SeatController(RoomSeatService roomSeatService) {
        this.roomSeatService = roomSeatService;
    }

    @RequestMapping(value = "/room",method = RequestMethod.POST)
    public @ResponseBody
    Res<List<Seat>> seatMsgByRoomHandle(@RequestBody Room room){
        List<Seat> res = roomSeatService.seatsbyroom(room);
        if(res != null){
            return new Res<>("success",res);
        }else return new Res<>("fail",null);
    }

    @RequestMapping(value = "/seat",method = RequestMethod.POST)
    public @ResponseBody
    Res<Seat> seatMsgBySeatHandle(@RequestBody Seat seat){
        Seat res = roomSeatService.seat(seat);
        if(res != null){
            return new Res<>("success",res);
        }else return new Res<>("fail",null);
    }
}
