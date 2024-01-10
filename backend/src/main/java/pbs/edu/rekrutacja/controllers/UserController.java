package pbs.edu.rekrutacja.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pbs.edu.rekrutacja.models.ERole;
import pbs.edu.rekrutacja.models.Role;
import pbs.edu.rekrutacja.models.User;
import pbs.edu.rekrutacja.repository.RoleRepository;
import pbs.edu.rekrutacja.services.UserService;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static pbs.edu.rekrutacja.models.ERole.ROLE_USER;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    private final RoleRepository roleRepository;

    public UserController(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);
        user.setRoles(roles);
        return userService.createUser(user);
    }

    @PutMapping("/{userId}")
    public User updateUser(@PathVariable Long userId, @RequestBody User newUser) {
        User existingUser = userService.getUserById(userId);
        existingUser.setUsername(newUser.getUsername());
        existingUser.setEmail(newUser.getEmail());
        existingUser.setFirstName(newUser.getFirstName());
        existingUser.setLastName(newUser.getLastName());
        existingUser.setAddress(newUser.getAddress());
        existingUser.setCity(newUser.getCity());
        existingUser.setPostalCode(newUser.getPostalCode());
        existingUser.setExperience(newUser.getExperience());
        existingUser.setPhoneNumber(newUser.getPhoneNumber());
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);
        existingUser.setRoles(roles);
        return userService.updateUser(userId, existingUser);
    }


    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
    }
}
