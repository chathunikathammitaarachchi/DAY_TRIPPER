package com.example.DayTripper.Controller;

import com.example.DayTripper.Model.CalenderBooking;
import com.example.DayTripper.service.CalenderBookingService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Adjust this to match your frontend's URL
@RequestMapping("/api/booking")
public class CalenderBookingController {

    @Autowired
    private CalenderBookingService bookingService;

    @GetMapping
    public List<CalenderBooking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @PostMapping
    public ResponseEntity<CalenderBooking> createBooking(@Valid @RequestBody CalenderBooking booking) {
        CalenderBooking savedBooking = bookingService.createBooking(booking);
        return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CalenderBooking> getBookingById(@PathVariable String id) {
        return bookingService.getBookingById(id)
                .map(booking -> new ResponseEntity<>(booking, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable String id) {
        bookingService.deleteBooking(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/check-availability")
    public ResponseEntity<Boolean> checkAvailability(
            @RequestParam String event,
            @RequestParam String date,
            @RequestParam String time) {

        try {
            boolean isAvailable = bookingService.checkAvailability(event, date, time);
            return ResponseEntity.ok(isAvailable); // returns true or false based on availability
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }
}
