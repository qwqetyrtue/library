package cn.hnist.sharo.controller;

import cn.hnist.sharo.model.Room;
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
@RequestMapping(value = "/room")
public class RoomController {
    final private RoomSeatService roomSeatService;

    @Autowired
    public RoomController(RoomSeatService roomSeatService) {
        this.roomSeatService = roomSeatService;
    }

    @RequestMapping(value = "/room",method = RequestMethod.POST)
    public @ResponseBody
    Res<Room> roomMsgHandle(@RequestBody Room room){
        Room res = roomSeatService.room(room);
        if(res != null){
            return new Res<>("success",res);
        }else return new Res<>("fail",null);
    }

    @RequestMapping(value = "/rooms",method = RequestMethod.POST)
    public @ResponseBody
    Res<List<Room>> roomsMsgByLocalHandle(@RequestBody Room room){
        List<Room> res = roomSeatService.rooms(room);
        if(res != null){
            return new Res<>("success",res);
        }else return new Res<>("fail",null);
    }

}
