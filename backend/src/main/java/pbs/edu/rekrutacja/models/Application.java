package pbs.edu.rekrutacja.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalTime;

@Entity
@Table(name = "application")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalTime date_of_application;

    @Column(nullable = false)
    private String education;

    @Column(nullable = false)
    private String experience;

    @Column(nullable = false)
    private String other_info;

    @ManyToOne
    @JoinColumn(name = "applicant_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;


    public Application(Long id, LocalTime date_of_application, String education, String experience, String other_info, User user) {
        this.id = id;
        this.date_of_application = date_of_application;
        this.education = education;
        this.experience = experience;
        this.other_info = other_info;
        this.user = user;
    }

    public Application() {

    }
}