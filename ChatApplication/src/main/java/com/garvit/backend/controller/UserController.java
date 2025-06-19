package com.garvit.backend.controller;

import com.garvit.backend.dto.ProfileUpdateDTO;
import com.garvit.backend.entity.User;
import com.garvit.backend.service.CustomUserDetailsService;
import com.garvit.backend.service.Userservice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private Userservice userService;

    /**
     * Endpoint to update user profile
     * Only logged-in users can update their own profiles
     */
    @PatchMapping("/{id}/profile")
    public ResponseEntity<?> updateProfile(
            @PathVariable Long id,
            @Valid @RequestBody ProfileUpdateDTO profileUpdateDTO) {

        // Get the authenticated user from the security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        // Update profile and return response
        User updatedUser = userService.updateUserProfile(currentUsername, id, profileUpdateDTO);

        return ResponseEntity.ok().body("Profile updated successfully");
    }
}
