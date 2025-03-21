package com.example.DayTripper.service;

import com.example.DayTripper.dto.CommentDto;
import com.example.DayTripper.Model.Comment;
import com.example.DayTripper.Repository.CommentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;

    // Create a new comment
    public Comment createComment(CommentDto commentDto) {
        Comment comment = new Comment();
        comment.setUsername(commentDto.getUsername());
        comment.setComment(commentDto.getComment());
        comment.setRating(commentDto.getRating());
        return commentRepository.save(comment);
    }

    // Get all comments
    public List<CommentDto> getAllComments() {
        return commentRepository.findAll()
                .stream()
                .map(comment -> {
                    CommentDto dto = new CommentDto();
                    dto.setUsername(comment.getUsername());
                    dto.setComment(comment.getComment());
                    dto.setRating(comment.getRating());
                    return dto;
                }).collect(Collectors.toList());
    }

    // Get a comment by ID
    public Optional<Comment> getCommentById(String id) {
        return commentRepository.findById(id);
    }

    // Delete a comment
    public void deleteComment(String id) {
        commentRepository.deleteById(id);
    }
}
