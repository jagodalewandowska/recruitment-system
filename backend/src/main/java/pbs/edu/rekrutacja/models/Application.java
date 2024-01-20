package pbs.edu.rekrutacja.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "application")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date_of_application;

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


    public Application(Long id, LocalDate date_of_application, String education, String experience, String other_info, User user) {
        this.id = id;
        this.date_of_application = date_of_application;
        this.education = education;
        this.experience = experience;
        this.other_info = other_info;
        this.user = user;
    }

    public Application() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate_of_application() {
        return date_of_application;
    }

    public void setDate_of_application(LocalDate date_of_application) {
        this.date_of_application = date_of_application;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getOther_info() {
        return other_info;
    }

    public void setOther_info(String other_info) {
        this.other_info = other_info;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }
}