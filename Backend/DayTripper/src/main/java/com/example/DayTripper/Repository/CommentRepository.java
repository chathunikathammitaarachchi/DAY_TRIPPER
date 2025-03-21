package com.example.DayTripper.Repository;

import com.example.DayTripper.Model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommentRepository extends MongoRepository<Comment, String> {
}
