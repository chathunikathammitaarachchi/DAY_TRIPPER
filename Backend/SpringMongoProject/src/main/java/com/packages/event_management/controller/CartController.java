package com.packages.event_management.controller;

import com.packages.event_management.entity.Cart;
import com.packages.event_management.entity.Package;
import com.packages.event_management.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // Add an item to the cart
    @PostMapping("/addcart")
    public ResponseEntity<Cart> addItemToCart(@RequestBody Cart.CartItem cartItem) {
        Cart updatedCart = cartService.addItemToCart(cartItem);
        return ResponseEntity.ok(updatedCart);
    }

    // Get all items in the cart for a specific user
    @GetMapping("/{userId}")
    public ResponseEntity<Cart> getCart(@PathVariable String userId) {
        Cart cart = cartService.getCart(userId);
        return ResponseEntity.ok(cart);
    }

    // Update the quantity of a package in the cart
    @PutMapping("/update/{cartItemId}")
    public ResponseEntity<Cart> updateItemQuantity(@PathVariable String cartItemId, @RequestParam int quantity) {
        Cart updatedCart = cartService.updateItemQuantity(cartItemId, quantity);
        return ResponseEntity.ok(updatedCart);
    }

    // Remove an item from the cart
    @DeleteMapping("/remove/{cartItemId}")
    public ResponseEntity<Cart> removeItemFromCart(@PathVariable String cartItemId) {
        Cart updatedCart = cartService.removeItemFromCart(cartItemId);
        return ResponseEntity.ok(updatedCart);
    }
}
