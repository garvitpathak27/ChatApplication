package com.garvit.backend.service;

import com.garvit.backend.dto.ProfileUpdateDTO;
import com.garvit.backend.entity.User;
import com.garvit.backend.exception.custom.ResourceNotFoundException;
import com.garvit.backend.exception.custom.UnauthorizedException;
import com.garvit.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Userservice {

    @Autowired
    private UserRepository userRepository;

    /**
     * Updates a user's profile with non-null fields from the DTO
     * Ensures that users can only update their own profiles
     */
    @Transactional
    public User updateUserProfile(String currentUsername, Long userId, ProfileUpdateDTO profileUpdateDTO) {
        // Find the user by ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        // Find the authenticated user
        User currentUser = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new ResourceNotFoundException("Current authenticated user not found"));

        // Check if the authenticated user is the same as the one being updated
        if (!currentUser.getId().equals(user.getId())) {
            throw new UnauthorizedException("You can only update your own profile");
        }

        // Apply updates for non-null fields (partial update)
        if (profileUpdateDTO.getFirstName() != null) {
            user.setFirstName(profileUpdateDTO.getFirstName());
        }

        if (profileUpdateDTO.getLastName() != null) {
            user.setLastName(profileUpdateDTO.getLastName());
        }

        if (profileUpdateDTO.getBio() != null) {
            user.setBio(profileUpdateDTO.getBio());
        }

        if (profileUpdateDTO.getPhone() != null) {
            user.setPhone(profileUpdateDTO.getPhone());
        }

        // Save and return the updated user
        return userRepository.save(user);
    }
}
