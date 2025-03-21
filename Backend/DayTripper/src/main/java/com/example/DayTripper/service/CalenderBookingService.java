package com.example.DayTripper.service;

import com.example.DayTripper.Model.CalenderBooking;
import com.example.DayTripper.Repository.CalenderBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CalenderBookingService {

    @Autowired
    private CalenderBookingRepository bookingRepository;

    public List<CalenderBooking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<CalenderBooking> getBookingById(String id) {
        return bookingRepository.findById(id);
    }

    public CalenderBooking createBooking(CalenderBooking booking) {
        return bookingRepository.save(booking);
    }

    public void deleteBooking(String id) {
        bookingRepository.deleteById(id);
    }

    // Check if a booking exists for the given event, date, and time
    public boolean checkAvailability(String event, String date, String time) {
        List<CalenderBooking> bookings = bookingRepository.findByEventAndDateAndTime(event, date, time);
        return bookings.isEmpty();  // returns true if the slot is available (no bookings found)
    }
}
