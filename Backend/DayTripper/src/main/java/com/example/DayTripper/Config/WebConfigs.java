package com.example.DayTripper.Config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfigs implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // This will allow the frontend on localhost:5173 to make requests
        registry.addMapping("/**") // Apply CORS only to API endpoints
                .allowedOrigins("http://localhost:5173") // Frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH") // Allow common HTTP methods
                .allowCredentials(true); // Allow sending cookies
    }
}
