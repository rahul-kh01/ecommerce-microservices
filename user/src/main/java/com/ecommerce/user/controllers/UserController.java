package com.ecommerce.user.controllers;

import com.ecommerce.user.dto.UserRequest;
import com.ecommerce.user.dto.UserResponse;
import com.ecommerce.user.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
@Slf4j
public class UserController {

    private final UserService userService;
//    private static Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers(){
        try {
            log.info("Fetching all users");
            return new ResponseEntity<>(userService.fetchAllUsers(), HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error fetching all users: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable String id){
        try {
            log.info("Request received for user: {}", id);

            log.trace("This is TRACE level - Very detailed logs");
            log.debug("This is DEBUG level - Used for development debugging");
            log.info("This is INFO level - General system information");
            log.warn("This is WARN level - Something might be wrong");
            log.error("This is ERROR level - Something failed");

            return userService.fetchUser(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            log.error("Error fetching user {}: {}", id, e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<String> createUser(@Valid @RequestBody UserRequest userRequest){
        try {
            log.info("Creating user: {}", userRequest.getEmail());
            userService.addUser(userRequest);
            return ResponseEntity.ok("User added successfully");
        } catch (Exception e) {
            log.error("Error creating user: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Failed to create user: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable String id,
                                             @Valid @RequestBody UserRequest updateUserRequest){
        try {
            log.info("Updating user with id: {}", id);
            boolean updated = userService.updateUser(id, updateUserRequest);
            if (updated)
                return ResponseEntity.ok("User updated successfully");
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error updating user {}: {}", id, e.getMessage());
            return ResponseEntity.badRequest().body("Failed to update user: " + e.getMessage());
        }
    }
}
