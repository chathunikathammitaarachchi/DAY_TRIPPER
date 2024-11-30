package com.example.demo.Implementation;

import com.example.demo.Model.Booking;
import com.example.demo.Repository.BookingRepository;
import com.example.demo.Service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public Booking createBooking(Booking booking) {
        // Check availability before creating booking
        if (!isDateTimeAvailable(booking.getDate(), booking.getTime())) {
            throw new RuntimeException("This date and time are already booked. Please choose another.");
        }
        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Optional<Booking> getBookingById(String id) {
        return bookingRepository.findById(id);
    }

    @Override
    public Booking updateBooking(String id, Booking updatedBooking) {
        return bookingRepository.findById(id).map(booking -> {
            booking.setEvent(updatedBooking.getEvent());
            booking.setDate(updatedBooking.getDate());
            booking.setTime(updatedBooking.getTime());

            // Check availability before updating
            if (!isDateTimeAvailable(booking.getDate(), booking.getTime())) {
                throw new RuntimeException("This date and time are already booked. Please choose another.");
            }

            return bookingRepository.save(booking);
        }).orElseThrow(() -> new RuntimeException("Booking not found with id " + id));
    }

    @Override
    public void deleteBooking(String id) {
        if (bookingRepository.existsById(id)) {
            bookingRepository.deleteById(id);
        } else {
            throw new RuntimeException("Booking not found with id " + id);
        }
    }

    @Override
    public boolean isDateAvailable(LocalDate date) {
        return bookingRepository.findByDate(date).isEmpty();
    }

    @Override
    public boolean isDateTimeAvailable(LocalDate date, String time) {
        List<Booking> bookingsOnDate = bookingRepository.findByDate(date);
        return bookingsOnDate.stream()
                .noneMatch(booking -> booking.getTime().equals(time));
    }

    @Override
    public List<Booking> getBookingsByDate(LocalDate date) {
        return bookingRepository.findByDate(date);
    }
}

