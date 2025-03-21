package com.example.DayTripper.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "comments")
public class Comment {
    @Id
    private String id;
    private String username;
    private String comment;
    private int rating;
}
