package com.packages.event_management.repository;

import com.packages.event_management.entity.Package;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PackageRepository extends MongoRepository<Package, String> {
}
