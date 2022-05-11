package com.example.user_services_main.user.web;

import com.example.user_services_main.user.model.User;
import com.example.user_services_main.user.payload.JWTLoginSucessResponse;
import com.example.user_services_main.user.payload.LoginRequest;
import com.example.user_services_main.user.security.JwtTokenProvider;
import com.example.user_services_main.user.services.MapValidationErrorService;
import com.example.user_services_main.user.services.UserService;
import com.example.user_services_main.user.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

import static com.example.user_services_main.user.security.SecurityConstant.TOKEN_PREFIX;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @GetMapping("")
    public ResponseEntity<?> getUsers(){
        Map<String, String> results = new HashMap<>();
        Iterable<User> users = userService.findAll();
        if(users.iterator().hasNext()){
            return new ResponseEntity<>(users, HttpStatus.OK);
        } else {
            results.put("Message", "Could not find any users.");
            return new ResponseEntity<>(results, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUser(@PathVariable("userId") long userId){
        Map<String, String> results = new HashMap<>();
        User user = userService.getUserById(userId);
        if(user != null){
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            results.put("Message", "Could not find the user.");
            return new ResponseEntity<>(results, HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){

        // Validate passwords match
        userValidator.validate(user,result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;

        User newUser = userService.saveUser(user);

        return  new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;



    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        User user = userService.getUserByUsername(loginRequest.getUsername()) ;
        if (user==null){
            Map<String, String> results = new HashMap<>();
            results.put("Message", "Could not find any users.");
            return new ResponseEntity<>(results, HttpStatus.NOT_FOUND);
        }else{
            if(bCryptPasswordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
                String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(loginRequest.getUsername());
                return ResponseEntity.ok(new JWTLoginSucessResponse(true, jwt));

            }
            else{
                Map<String, String> results = new HashMap<>();
                results.put("Message", "Could not find any users.");
                return new ResponseEntity<>(results, HttpStatus.NOT_FOUND);
            }
        }
        /*
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSucessResponse(true, jwt));
         */

    }

}
