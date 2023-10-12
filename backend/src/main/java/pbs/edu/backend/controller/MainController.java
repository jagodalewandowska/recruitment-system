package pbs.edu.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pbs.edu.backend.model.Candidate;
import pbs.edu.backend.repository.CandidateRepository;

@RestController
public class MainController {
    private final CandidateRepository eventRepository;

    public MainController(CandidateRepository candidateRepository) {
        this.eventRepository = candidateRepository;
    }

    @GetMapping("/test")
    public String homepage() {
        Candidate candidate = eventRepository.findById(1).orElse(null);
        String message = "Hello, World!<br>";

        if (candidate != null){
            message += " Lista kandydatów: " + candidate.getName() + " " + candidate.getSurname();
        }
        return message;
    }
}
