package pbs.edu.rekrutacja.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pbs.edu.rekrutacja.models.Application;
import pbs.edu.rekrutacja.models.Job;
import pbs.edu.rekrutacja.services.ApplicationService;
import pbs.edu.rekrutacja.services.JobService;

import java.lang.reflect.Field;
import java.time.LocalDate;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;
    @Autowired
    private JobService jobService;

    @GetMapping
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @GetMapping("/{applicationId}")
    public Application getApplicationById(@PathVariable Long applicationId) {
        return applicationService.getApplicationById(applicationId);
    }

    private void logApplicationProperties(Application application) {
        Class<?> clazz = application.getClass();

        System.out.println("Properties of " + clazz.getSimpleName() + ":");

        for (Field field : clazz.getDeclaredFields()) {
            field.setAccessible(true);

            String fieldName = field.getName();
            Object value;

            try {
                value = field.get(application);
            } catch (IllegalAccessException e) {
                value = "N/A";
            }

            System.out.println(fieldName + ": " + value);
        }
    }


    @PostMapping
    public Application createApplication(@RequestBody Application application) {
        application.setDate_of_application(LocalDate.now());

        logApplicationProperties(application);
//        Long jobId = application.getId();
//        Job job = jobService.getJobById(jobId);
//        application.setJob(job);
        return applicationService.createApplication(application);
    }

    @PutMapping("/{applicationId}")
    public Application updateApplication(@PathVariable Long applicationId, @RequestBody Application newApplication) {
        return applicationService.updateApplication(applicationId, newApplication);
    }

    @DeleteMapping("/{applicationId}")
    public void deleteApplication(@PathVariable Long applicationId) {
        applicationService.deleteApplication(applicationId);
    }
}

