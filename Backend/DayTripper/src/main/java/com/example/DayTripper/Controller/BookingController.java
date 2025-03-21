package com.example.DayTripper.Controller;

import com.example.DayTripper.Model.Booking;
import com.example.DayTripper.service.BookingService;
import com.example.DayTripper.service.NotificationService;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173") 
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }

    @PatchMapping("/{id}")
public Booking updateBookingStatus(
        @PathVariable String id,
        @RequestBody BookingStatusUpdateRequest request) {
    Booking booking = bookingService.updateBookingStatus(id, request.getStatus());

    if (request.getStatus().equalsIgnoreCase("Confirmed")) {
        String generatedPassword = generatePassword(); // Implement a method to generate a password
        notificationService.sendConfirmationNotification(booking, generatedPassword);
    } else if (request.getStatus().equalsIgnoreCase("Rejected")) {
        notificationService.sendRejectionNotification(booking, request.getRejectionReason());
    }

    return booking;
}

private String generatePassword() {
    return UUID.randomUUID().toString().substring(0, 8); // Generate a random 8-character password
}


}
