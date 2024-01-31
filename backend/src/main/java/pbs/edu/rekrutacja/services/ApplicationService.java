package pbs.edu.rekrutacja.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pbs.edu.rekrutacja.models.Application;
import pbs.edu.rekrutacja.models.Job;
import pbs.edu.rekrutacja.models.User;
import pbs.edu.rekrutacja.repository.ApplicationRepository;
import pbs.edu.rekrutacja.repository.JobRepository;
import pbs.edu.rekrutacja.repository.UserRepository;

import java.lang.reflect.Field;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    private final UserRepository userRepository;

    private final JobRepository jobRepository;

    public ApplicationService(ApplicationRepository applicationRepository, UserRepository userRepository, JobRepository jobRepository) {
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
    }

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public Application getApplicationById(Long applicationId) {
        return applicationRepository.findById(applicationId)
                .orElseThrow(() -> new NoSuchElementException("Application not found"));
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

    public Application createApplication(Application application) {
        logApplicationProperties(application);
        return applicationRepository.save(application);
    }

    public Application updateApplication(Long applicationId, Application newApplication) {
        Application existingApplication = getApplicationById(applicationId);
        return applicationRepository.save(existingApplication);
    }

    public void deleteApplication(Long applicationId) {
        applicationRepository.deleteById(applicationId);
    }
}

