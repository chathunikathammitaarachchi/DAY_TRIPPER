package com.example.demo.Model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "bookings")
public class Booking {

    @Id
    private String id;  // Renamed for clarity

    @NotBlank(message = "Event name is required")
    private String event;

    @NotNull(message = "Date is required")
    private LocalDate date;

    @NotBlank(message = "Time is required")
    private String time;

    // Parameterized Constructor
    public Booking(String id, String event, LocalDate date, String time) {
        this.id = id;
        this.event = event;
        this.date = date;
        this.time = time;
    }

    // Default Constructor
    public Booking() {
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "Booking{" +
                "id='" + id + '\'' +
                ", event='" + event + '\'' +
                ", date=" + date +
                ", time='" + time + '\'' +
                '}';
    }
}

