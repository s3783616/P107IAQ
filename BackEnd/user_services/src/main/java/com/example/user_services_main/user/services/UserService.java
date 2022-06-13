package com.example.user_services_main.user.services;

import com.example.user_services_main.user.exceptions.UsernameAlreadyExistsException;
import com.example.user_services_main.user.model.User;
import com.example.user_services_main.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    // This service exposes methods for the controller to call upon
    // Functionality includes finding all users, getting users by ID as well as by username
    // It also allows saving new users into the system (primarily when registering an account as an end user)
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public Iterable<User> findAll() {
        return userRepository.findAll();
    }

    public User getUserById(long id) {
        User user = userRepository.getById(id);
        return user;
    }

    public User getUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        return user;
    }

    public User saveUser(User newUser) {
        try {
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            newUser.setUsername(newUser.getUsername());
            newUser.setConfirmPassword("");
            return userRepository.save(newUser);
        } catch (Exception e) {
            throw new UsernameAlreadyExistsException("Username '" + newUser.getUsername() + "' already exists");
        }
    }
}
