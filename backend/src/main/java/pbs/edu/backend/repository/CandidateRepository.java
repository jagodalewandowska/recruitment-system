package pbs.edu.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pbs.edu.backend.model.Candidate;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Integer> {
    Page<Candidate> findById(Integer id, Pageable pageable);
}

