package com.example.taxis.controller;

import com.example.taxis.service.RideService;
import com.example.taxis.service.UserService;
import com.example.taxis.service.dto.RideDto;
import com.example.taxis.service.dto.UserDto;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

//NOTA: Este controlador lo he creado solo por motivos didácticos para poblar la BD con data, puesto que por ejemplo, el diseño
// no incluía creación de usuario
@CrossOrigin(origins = "http://localhost:5000")
@RestController
@RequestMapping("/init")
@AllArgsConstructor
public class MockController  {
    private final UserService userService;
    private final RideService rideService;

    @GetMapping
    public ResponseEntity<Void> initBackendMock() {
        UserDto userMock=new UserDto(1,"0987654321","$2a$10$XOXu/8OUIwHotg2yQzXgeeHNNBr2HFyoQF/WC3Omx2kV4uEE9/sDW","Cesar Balcazar");
        userService.createUser(userMock);

        RideDto[] mockRides= {
                new RideDto(1,"User1","0987654321","Simple", LocalDateTime.parse("2019-03-27T10:15:30"),"Duran","El guasmo",5000.00,"Una razon para un viaje nocturno","Pending"),
                new RideDto(2,"User2","0987651234","Comfort", LocalDateTime.parse("2019-03-27T11:20:30"),"Quito","Cayambe",150.00,"Una razon para un viaje a cayambe","Pending"),
                new RideDto(3,"User3","0985664525","Simple", LocalDateTime.parse("2019-04-28T11:20:30"),"Nayon","Carcelen",150.00,"Una razon para un viaje a Carcelen de noche","In Progress"),
                new RideDto(4,"User4","0987654321","Comfort", LocalDateTime.parse("2019-04-28T11:20:30"),"X","Y",25.00,"Una razon aleatoria","Completed"),
                new RideDto(5,"User5","0845566655","Simple", LocalDateTime.parse("2012-01-30T11:20:30"),"Quito","Montreal",25.00,"Una razon descabellada","Upcoming"),
                new RideDto(6,"User6","0987654312","Comfort", LocalDateTime.parse("2023-01-30T11:20:30"),"Quito","Guayaquil",25.00,"Viaje de negocios","Pre cancelled"),
                new RideDto(7,"User7","0987451458","Comfort", LocalDateTime.parse("2023-01-30T11:20:30"),"Quito","Guayaquil",152.45,"Viaje cancelado por motivos desconocidos","Cancelled by driver"),
                new RideDto(8,"User8","0874412445","Comfort", LocalDateTime.parse("2023-02-04T11:20:30"),"La Marin","Centro Digital",10.50,"Viaje para trabajo presencial","Done"),
        };

        for (RideDto ride:mockRides) {
            rideService.addRide(ride);
        }

        return ResponseEntity.noContent().build();
    }
}
