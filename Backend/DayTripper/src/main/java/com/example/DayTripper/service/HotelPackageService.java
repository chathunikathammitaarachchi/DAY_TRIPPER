package com.example.DayTripper.service;

import com.example.DayTripper.Model.HotelPackage;
import com.example.DayTripper.Repository.HotelPackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelPackageService {

    @Autowired
    private HotelPackageRepository hotelPackageRepository;

    public List<HotelPackage> getAllPackages() {
        return hotelPackageRepository.findAll();
    }

    public HotelPackage addPackage(HotelPackage hotelPackage) {
        return hotelPackageRepository.save(hotelPackage);
    }
}
