package pbs.edu.backend.auth;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pbs.edu.backend.config.JwtService;
import pbs.edu.backend.model.CustomUserDetails;
import pbs.edu.backend.model.Role;
import pbs.edu.backend.model.User;
import pbs.edu.backend.service.UserService;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public void register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);
        userService.setUser(user);
    }

    public AuthResponse authenticate(@NonNull String email, @NonNull String password) {
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(email, password));
        var user = userService
                .searchByEmail(email)
                .map(s -> new CustomUserDetails(s))
                .orElseThrow(() ->
                        new UsernameNotFoundException(String.format("User '%s' not found!", email)));
        var token = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(token)
                .build();
    }

    public AuthResponse authenticate(AuthRequest request) {
        return authenticate(request.getEmail(), request.getPassword());
    }
}
