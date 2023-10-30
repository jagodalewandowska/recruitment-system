package pbs.edu.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pbs.edu.backend.model.User;
import pbs.edu.backend.repository.UserRepository;


@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<User> getUser(Integer userId) {
        return userRepository.findById(userId);
    }

    @Override
    public User setUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Integer userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public Page<User> getUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    public Page<User> searchByNazwisko(String nazwisko, Pageable pageable) {
        return userRepository.findByNazwiskoStartsWithIgnoreCase(nazwisko, pageable);
    }

    @Override
    public Optional<User> searchByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Page <User> getUsersPageSort(String sort, String direction) {
        Pageable pageable = null;
        direction = direction.toUpperCase();
        if (sort != null) {
            if (direction.equals("ASC")) {
                pageable = PageRequest.of(0, Integer.MAX_VALUE, Sort.Direction.ASC, sort);
            }
            if (direction.equals("DESC")) {
                pageable = PageRequest.of(0, Integer.MAX_VALUE, Sort.Direction.DESC, sort);
            }
        } else {
            pageable = PageRequest.of(0, Integer.MAX_VALUE);
        }
        return userRepository.findAll(pageable);
    }
}