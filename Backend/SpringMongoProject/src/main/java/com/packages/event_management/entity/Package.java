package com.packages.event_management.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "packages")
public class Package {

    @Id
    private String id;

    private String packageType;  // Type of the package (e.g., decorations, photography, etc.)
   // Description of the package
    private String category;  // Category of the package (e.g., event, photography, etc.)
    private double price;  // Price of the package
    private String additionalDetails;  // Additional details about the package

    // Default constructor
    public Package() {
    }

    // Parameterized constructor
    public Package(String packageType, String category, double price, String additionalDetails) {
        this.packageType = packageType;

        this.category = category;
        this.price = price;
        this.additionalDetails = additionalDetails;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPackageType() {
        return packageType;
    }

    public void setPackageType(String packageType) {
        this.packageType = packageType;
    }



    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getAdditionalDetails() {
        return additionalDetails;
    }

    public void setAdditionalDetails(String additionalDetails) {
        this.additionalDetails = additionalDetails;
    }

    // toString method for debugging
    @Override
    public String toString() {
        return "Package{" +
                "id='" + id + '\'' +
                ", packageType='" + packageType + '\'' +
                ", category='" + category + '\'' +
                ", price=" + price +
                ", additionalDetails='" + additionalDetails + '\'' +
                '}';
    }
}
