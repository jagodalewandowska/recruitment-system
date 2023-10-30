package pbs.edu.backend.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pbs.edu.backend.model.User;


public interface UserService {
    Optional<User> getUser(Integer userId);
    User setUser(User user);
    void deleteUser(Integer userId);
    Page<User> getUsers(Pageable pageable);
    Page<User> searchByNazwisko(String nazwisko, Pageable pageable);
    Page<User> getUsersPageSort(String sort, String direction);
// token
    Optional<User> searchByEmail(String email);
}