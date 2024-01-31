package pbs.edu.rekrutacja.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pbs.edu.rekrutacja.models.Pdf;

public interface PdfRepository extends JpaRepository<Pdf, Long> {
}
