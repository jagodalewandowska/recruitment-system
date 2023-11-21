package pbs.edu.rekrutacja.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pbs.edu.rekrutacja.models.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
}
