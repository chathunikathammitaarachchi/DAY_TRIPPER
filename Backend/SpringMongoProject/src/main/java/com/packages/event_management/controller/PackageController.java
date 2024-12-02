package com.packages.event_management.controller;

import com.packages.event_management.entity.Package;
import com.packages.event_management.service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/packages")
public class PackageController {

    @Autowired
    private PackageService packageService;

    // Get all packages
    @GetMapping(value = "/getall")
    public ResponseEntity<List<Package>> getAllPackages() {
        List<Package> packages = packageService.getAllPackages();
        return ResponseEntity.ok(packages);
    }

    // Get a specific package by ID
    @GetMapping("/{packageId}")
    public ResponseEntity<Package> getPackageById(@PathVariable String packageId) {
        Package packageDetails = packageService.getPackageById(packageId);
        return ResponseEntity.ok(packageDetails);
    }

    // Create a new package
    @PostMapping("/add")
    public ResponseEntity<Package> addPackage(@RequestBody Package newPackage) {
        Package savedPackage = packageService.addPackage(newPackage);
        return ResponseEntity.ok(savedPackage); // Returning the created package
    }
}
