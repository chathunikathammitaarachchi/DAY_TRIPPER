package com.packages.event_management.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "cart")
public class Cart {

    @Id
    private String id;

    private String userId;  // ID of the user who owns the cart

    private List<CartItem> items;  // List of items in the cart (each item will have a package and quantity)

    private double totalPrice;  // Total price of the cart

    // Default constructor
    public Cart() {
    }

    // Parameterized constructor
    public Cart(String userId, List<CartItem> items, double totalPrice) {
        this.userId = userId;
        this.items = items;
        this.totalPrice = totalPrice;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    // toString method for debugging purposes
    @Override
    public String toString() {
        return "Cart{" +
                "id='" + id + '\'' +
                ", userId='" + userId + '\'' +
                ", items=" + items +
                ", totalPrice=" + totalPrice +
                '}';
    }

    // Nested CartItem class for items in the cart
    public static class CartItem {

        private Package packageDetails;  // Package details for the item in the cart
        private int quantity;  // Quantity of the package

        // Default constructor
        public CartItem() {
        }

        // Parameterized constructor
        public CartItem(Package packageDetails, int quantity) {
            this.packageDetails = packageDetails;
            this.quantity = quantity;
        }

        // Getters and Setters
        public Package getPackageDetails() {
            return packageDetails;
        }

        public void setPackageDetails(Package packageDetails) {
            this.packageDetails = packageDetails;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        // toString method for debugging
        @Override
        public String toString() {
            return "CartItem{" +
                    "packageDetails=" + packageDetails +
                    ", quantity=" + quantity +
                    '}';
        }
    }
}
