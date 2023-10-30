package pbs.edu.backend.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pbs.edu.backend.model.User;
import pbs.edu.backend.validation.ValidationService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AuthController {
    private final AuthService authService;
    private final ValidationService<User> validator; // można dać do projektu, zadania - jest to klasa generyczna


    // zwracany token na jwt.io
    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody User user) {
        validator.validate(user);
        authService.register(user);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }
}
