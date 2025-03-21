package com.example.DayTripper.Repository;

import com.example.DayTripper.Model.CalenderBooking;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CalenderBookingRepository extends MongoRepository<CalenderBooking, String> {

    List<CalenderBooking> findByEventAndDateAndTime(String event, String date, String time);
}

