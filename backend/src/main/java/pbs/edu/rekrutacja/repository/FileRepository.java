package pbs.edu.rekrutacja.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pbs.edu.rekrutacja.models.File;
import pbs.edu.rekrutacja.models.User;

import java.util.List;

public interface FileRepository extends JpaRepository<File, Long> {
    @Query("SELECT f FROM File f WHERE f.user.user_id = :user_id")
    Page<File> findFilesByUserId(@Param("user_id") Long user_id, Pageable pageable);

    @Query("SELECT f FROM File f WHERE f.user.user_id = :user_id")
    List<File> findFilesByUserId(@Param("user_id") Long user_id);

    Page<File> findByUser(User user, Pageable pageable);
}
