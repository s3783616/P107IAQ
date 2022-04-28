package com.p107iaq.indoorairquality.user.web;

import com.p107iaq.indoorairquality.user.model.User;
import com.p107iaq.indoorairquality.user.payload.JWTLoginSucessResponse;
import com.p107iaq.indoorairquality.user.payload.LoginRequest;
import com.p107iaq.indoorairquality.user.security.JwtTokenProvider;
import com.p107iaq.indoorairquality.user.services.MapValidationErrorService;
import com.p107iaq.indoorairquality.user.services.UserService;
import com.p107iaq.indoorairquality.user.validator.UserValidator;
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

import static com.p107iaq.indoorairquality.user.security.SecurityConstant.TOKEN_PREFIX;

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
            String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(loginRequest.getUsername());

            return ResponseEntity.ok(new JWTLoginSucessResponse(true, jwt));
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
