package com.example.DayTripper.Controller;

import com.example.DayTripper.Model.HotelPackage;
import com.example.DayTripper.Repository.HotelPackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packages")
@CrossOrigin(origins = "http://localhost:5173") 
public class PackageController {

    @Autowired
    private HotelPackageRepository hotelPackageRepository;

    // Add a new package
    @PostMapping
public ResponseEntity<HotelPackage> addPackage(@RequestBody HotelPackage pkg) {
    try {
        if (pkg.getCategory().equals("Food")) {
            // Validate food package data (price per plate for adult/child)
        } else if (pkg.getCategory().equals("Decoration")) {
            // Validate decoration package data (theme type)
        } else if (pkg.getCategory().equals("Photography")) {
            // Validate photography package data (photos included)
        }

        HotelPackage savedPackage = hotelPackageRepository.save(pkg);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPackage);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
}


    // Get all available packages
    @GetMapping
    public List<HotelPackage> getAllPackages() {
        return hotelPackageRepository.findAll();
    }




@PatchMapping("/{id}")
public ResponseEntity<HotelPackage> updatePackage(@PathVariable String id, @RequestBody HotelPackage pkg) {
    System.out.println("Received ID: " + id);
    System.out.println("Payload: " + pkg);
    return hotelPackageRepository.findById(id)
            .map(existingPackage -> {
                existingPackage.setName(pkg.getName());
                existingPackage.setDescription(pkg.getDescription());
                existingPackage.setPrice(pkg.getPrice());
                hotelPackageRepository.save(existingPackage);
                return ResponseEntity.ok(existingPackage);
            })
            .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
}


@DeleteMapping("/{id}")
public ResponseEntity<Void> deletePackage(@PathVariable String id) {
    if (hotelPackageRepository.existsById(id)) {
        hotelPackageRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    return ResponseEntity.notFound().build();
}


    
}
