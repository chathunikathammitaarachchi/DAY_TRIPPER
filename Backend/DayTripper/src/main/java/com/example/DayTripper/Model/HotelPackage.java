package com.example.DayTripper.Model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

@Document(collection = "booking_packages")
public class HotelPackage {

    @Id
    private String id;
    private String name;
    private String description;
    private double price;
    private String category;

    // Fields for Food Packages
    private String foodType;
    private double pricePerPlateAdult;
    private double pricePerPlateChild;

    // Fields for Decoration Packages
    private String themeType;

    // Fields for Photography Packages
    private int photosIncluded;

    // Constructors
    public HotelPackage() {}

    // Constructor for Food Packages
    public HotelPackage(String name, String description, double price, String category, String foodType, double pricePerPlateAdult, double pricePerPlateChild) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.foodType = foodType;
        this.pricePerPlateAdult = pricePerPlateAdult;
        this.pricePerPlateChild = pricePerPlateChild;
    }

    // Constructor for Decoration Packages
    public HotelPackage(String name, String description, double price, String category, String themeType) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.themeType = themeType;
    }

    // Constructor for Photography Packages
    public HotelPackage(String name, String description, double price, String category, int photosIncluded) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.photosIncluded = photosIncluded;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getFoodType() { return foodType; }
    public void setFoodType(String foodType) { this.foodType = foodType; }

    public double getPricePerPlateAdult() { return pricePerPlateAdult; }
    public void setPricePerPlateAdult(double pricePerPlateAdult) { this.pricePerPlateAdult = pricePerPlateAdult; }

    public double getPricePerPlateChild() { return pricePerPlateChild; }
    public void setPricePerPlateChild(double pricePerPlateChild) { this.pricePerPlateChild = pricePerPlateChild; }

    public String getThemeType() { return themeType; }
    public void setThemeType(String themeType) { this.themeType = themeType; }

    public int getPhotosIncluded() { return photosIncluded; }
    public void setPhotosIncluded(int photosIncluded) { this.photosIncluded = photosIncluded; }

    // Implement missing methods required by the service
    public String getType() {
        return category;  // Returns category like "Meal", "Decoration", or "Photography"
    }

    public int getAdults() {
        return (category.equals("Meal")) ? (int) (price / pricePerPlateAdult) : 0; // Placeholder logic
    }

    public int getChildren() {
        return (category.equals("Meal")) ? (int) (price / pricePerPlateChild) : 0; // Placeholder logic
    }

    @Override
    public String toString() {
        return "BookingPackage{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", category='" + category + '\'' +
                '}';
    }
}
