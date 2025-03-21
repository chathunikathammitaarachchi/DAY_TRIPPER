package com.example.DayTripper.Repository;

import com.example.DayTripper.Model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookingRepository extends MongoRepository<Booking, String> {
    // Custom query methods can be added here
}
