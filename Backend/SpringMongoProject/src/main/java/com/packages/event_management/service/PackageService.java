package com.packages.event_management.service;

import com.packages.event_management.entity.Package;
import com.packages.event_management.repository.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PackageService {

    @Autowired
    private PackageRepository packageRepository;

    // Get all packages
    public List<Package> getAllPackages() {
        return packageRepository.findAll();
    }

    // Get package by ID
    public Package getPackageById(String packageId) {
        return packageRepository.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Package not found for ID: " + packageId));
    }

    // Add a new package
    public Package addPackage(Package newPackage) {
        return packageRepository.save(newPackage);
    }
}
