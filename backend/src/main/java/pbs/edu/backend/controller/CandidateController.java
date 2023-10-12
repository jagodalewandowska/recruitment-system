package pbs.edu.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pbs.edu.backend.model.Candidate;
import pbs.edu.backend.service.CandidateService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class CandidateController {
    private CandidateService candidateService;

    @Autowired
    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @GetMapping("/candidate/{id}")
    ResponseEntity<Candidate> getEvent(@PathVariable Integer id) {
        return ResponseEntity.of(candidateService.getCandidate(id));
    }

    @GetMapping(value = "/candidates")
    Page<Candidate> getEvents(Pageable pageable){
        return candidateService.getCandidates(pageable);
    }
}
