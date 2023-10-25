package pbs.edu.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pbs.edu.backend.model.Candidate;
import pbs.edu.backend.repository.CandidateRepository;

import java.util.Optional;

@Service
public class CandidateServiceImpl implements CandidateService {

    private CandidateRepository candidateRepository;

    @Autowired
    public CandidateServiceImpl(CandidateRepository candidateRepository){
        this.candidateRepository = candidateRepository;
    }

    @Override
    public Optional<Candidate> getCandidate(Integer id) {
        return candidateRepository.findById(id);
    }

    @Override
    public Page<Candidate> getCandidates(Pageable pageable) {
        return candidateRepository.findAll(pageable);
    }

    @Override
    public Candidate setCandidate(Candidate candidate) {
        return candidateRepository.save(candidate);
    }

}
