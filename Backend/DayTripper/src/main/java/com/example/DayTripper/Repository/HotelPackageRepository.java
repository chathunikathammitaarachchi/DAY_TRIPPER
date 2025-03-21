package com.example.DayTripper.Repository;

import com.example.DayTripper.Model.HotelPackage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HotelPackageRepository extends MongoRepository<HotelPackage, String> {
}
