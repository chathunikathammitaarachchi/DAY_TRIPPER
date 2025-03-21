package com.example.DayTripper.service;

import com.example.DayTripper.Model.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.twilio.Twilio;
import com.twilio.exception.ApiException;
import com.twilio.rest.api.v2010.account.Message;

import jakarta.annotation.PostConstruct;

@Service
public class NotificationService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String twilioPhoneNumber;

    // This method is executed after the fields are injected
    @PostConstruct
    private void initTwilio() {
        Twilio.init(accountSid, authToken);
    }

    public void sendConfirmationNotification(Booking booking, String generatedPassword) {
        // Send email
        String emailBody = String.format(
            "Dear %s,\n\nYour booking for %s has been confirmed!\n" +
            "Booking ID: %s\nAuto-generated password: %s\n" +
            "Login to your account here: www.daytripper.com/login\n\n" +
            "Thank you for choosing DayTripper!",
            booking.getName(), booking.getPackageName(), booking.getId(), generatedPassword
        );
        sendEmail(booking.getEmail(), "Booking Confirmation", emailBody);

        // Send SMS
        String smsBody = String.format(
            "Booking Confirmed! ID: %s. Use password: %s to login. Visit: www.daytripper.com/login",
            booking.getId(), generatedPassword
        );
        sendSMS(booking.getPhone(), smsBody);
    }

    public void sendRejectionNotification(Booking booking, String rejectionReason) {
        // Send email
        String emailBody = String.format(
            "Dear %s,\n\nWe regret to inform you that your booking for %s has been rejected.\n" +
            "Reason: %s\nBooking ID: %s\n\nThank you for considering DayTripper.",
            booking.getName(), booking.getPackageName(), rejectionReason, booking.getId()
        );
        sendEmail(booking.getEmail(), "Booking Rejection", emailBody);

        // Send SMS
        String smsBody = String.format(
            "Booking Rejected: %s. Reason: %s. ID: %s",
            booking.getPackageName(), rejectionReason, booking.getId()
        );
        sendSMS(booking.getPhone(), smsBody);
    }

    private void sendEmail(String toEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("auditoriumsystem@gmail.com");
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    public void sendSMS(String toPhoneNumber, String messageBody) {
        try {
            Message.creator(
                new com.twilio.type.PhoneNumber(toPhoneNumber),
                new com.twilio.type.PhoneNumber(twilioPhoneNumber),
                messageBody
            ).create();
            System.out.println("SMS sent successfully.");
        } catch (ApiException e) {
            System.err.println("Failed to send SMS to " + toPhoneNumber + ": " + e.getMessage());
            // Optionally, log or alert monitoring systems
        } catch (Exception e) {
            System.err.println("Unexpected error in sendSMS: " + e.getMessage());
        }
    }
    

    
}
