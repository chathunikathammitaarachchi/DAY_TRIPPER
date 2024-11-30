package com.example.demo.Repository;

import com.example.demo.Model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends MongoRepository<Booking, String> {

    // Find bookings by date
    List<Booking> findByDate(LocalDate date);
}
