package com.garvit.backend.dto;


import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequest {

    @NotBlank(message = "User name is Required ")
    @Size(min = 3 , max = 20 , message = "username should be between 3 and 20 characterters")
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid ")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 40 , message = "Password must be between 6 and 40 characters" )
    private String password;

    @Size(max = 50 , message = "Display name must not exceed 50 characters")
    private String displayName;

    public RegisterRequest (){}

    public RegisterRequest(String username, String email, String password, String displayName) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.displayName = displayName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
}
