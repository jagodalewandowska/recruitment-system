package pbs.edu.rekrutacja.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pbs.edu.rekrutacja.models.Job;

public interface JobRepository extends JpaRepository<Job, Long> {
    boolean existsByTitle(String title);

    Job getJobById(Long id);
}
