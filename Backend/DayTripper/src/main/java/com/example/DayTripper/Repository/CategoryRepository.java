package com.example.DayTripper.Repository;

import com.example.DayTripper.Model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category, String> {
    // Custom query methods if needed
}
