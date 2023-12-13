package pbs.edu.rekrutacja.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pbs.edu.rekrutacja.models.File;
import pbs.edu.rekrutacja.models.User;

import java.util.List;

public interface FileRepository extends JpaRepository<File, Integer> {
    @Query("SELECT f FROM File f WHERE f.user.email = :email")
    Page<File> findFileUsera(@Param("email") String email, Pageable pageable);
    @Query("SELECT f FROM File f WHERE f.user.email = :email")
    List<File> findFileUsera(@Param("email") String email);
    Page<File> findByUserEmail(String email, Pageable pageable);
    Page<File> findByUser(User user, Pageable pageable);
}
