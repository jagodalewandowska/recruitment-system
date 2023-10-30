package pbs.edu.backend.repository;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import pbs.edu.backend.model.User;


public interface UserRepository extends JpaRepository<User, Integer> {
//    Optional<User> findByNrIndeksu(String nrIndeksu);
//    Page<User> findByNrIndeksuStartsWith(String nrIndeksu, Pageable pageable);
    Page<User> findByNazwiskoStartsWithIgnoreCase(String nazwisko, Pageable pageable);
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String s);
    // Metoda findByNrIndeksuStartsWith definiuje zapytanie
    // SELECT s FROM Student s WHERE s.nrIndeksu LIKE :nrIndeksu%
    // Metoda findByNazwiskoStartsWithIgnoreCase definiuje zapytanie
    // SELECT s FROM Student s WHERE upper(s.nazwisko) LIKE upper(:nazwisko%)
}