package pbs.edu.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pbs.edu.backend.model.Candidate;

import java.util.Optional;

public interface CandidateService {
    Optional<Candidate> getCandidate(Integer id);
    Page<Candidate> getCandidates(Pageable pageable);
    Candidate setCandidate(Candidate candidate);
}
