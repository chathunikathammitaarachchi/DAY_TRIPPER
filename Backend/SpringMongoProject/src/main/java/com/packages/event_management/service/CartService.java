package com.packages.event_management.service;

import com.packages.event_management.entity.Cart;
import com.packages.event_management.entity.Package;
import com.packages.event_management.repository.CartRepository;
import com.packages.event_management.repository.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private PackageRepository packageRepository;

    // Add an item to the cart
    public Cart addItemToCart(Cart.CartItem cartItem) {
        // Find the existing cart or create a new one if not found
        Cart cart = cartRepository.findByUserId(cartItem.getPackageDetails().getId())
                .orElseGet(() -> new Cart(cartItem.getPackageDetails().getId(), new ArrayList<>(), 0));

        // Add the new item to the cart
        cart.getItems().add(cartItem);
        cart.setTotalPrice(calculateTotalPrice(cart));

        // Save and return the updated cart
        return cartRepository.save(cart);
    }

    // Get the cart for a specific user
    public Cart getCart(String userId) {
        return cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user: " + userId));
    }

    // Update the quantity of a specific item in the cart
    public Cart updateItemQuantity(String cartItemId, int quantity) {
        // Find the cart and the specific item to update
        Cart cart = cartRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart not found for the given item ID"));

        // Update quantity and recalculate total price
        cart.getItems().forEach(item -> {
            if (item.getPackageDetails().getId().equals(cartItemId)) {
                item.setQuantity(quantity);
            }
        });
        cart.setTotalPrice(calculateTotalPrice(cart));

        // Save and return the updated cart
        return cartRepository.save(cart);
    }

    // Remove an item from the cart
    public Cart removeItemFromCart(String cartItemId) {
        // Find the cart and remove the item
        Cart cart = cartRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart not found for the given item ID"));

        cart.getItems().removeIf(item -> item.getPackageDetails().getId().equals(cartItemId));
        cart.setTotalPrice(calculateTotalPrice(cart));

        // Save and return the updated cart
        return cartRepository.save(cart);
    }

    // Calculate the total price of the cart
    private double calculateTotalPrice(Cart cart) {
        return cart.getItems().stream()
                .mapToDouble(item -> item.getPackageDetails().getPrice() * item.getQuantity())
                .sum();
    }
}
