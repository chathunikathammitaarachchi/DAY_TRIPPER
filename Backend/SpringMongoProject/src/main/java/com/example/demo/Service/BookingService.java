package com.example.demo.Service;

import com.example.demo.Model.Booking;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BookingService {

    // Create a new booking
    Booking createBooking(Booking booking);

    // Get all bookings
    List<Booking> getAllBookings();

    // Get a booking by ID
    Optional<Booking> getBookingById(String id);

    // Update an existing booking
    Booking updateBooking(String id, Booking updatedBooking);

    // Delete a booking by ID
    void deleteBooking(String id);

    // Check if the date is available for booking
    boolean isDateAvailable(LocalDate date);

    // Check if the specific date and time are available for booking
    boolean isDateTimeAvailable(LocalDate date, String time);

    // Get bookings by date
    List<Booking> getBookingsByDate(LocalDate date);
}
