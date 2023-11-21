package pbs.edu.rekrutacja.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pbs.edu.rekrutacja.models.Job;
import pbs.edu.rekrutacja.repository.JobRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job getJobById(Long jobId) {
        return jobRepository.findById(jobId)
                .orElseThrow(() -> new NoSuchElementException("Job not found"));
    }

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public Job updateJob(Long jobId, Job newJob) {
        Job existingJob = getJobById(jobId);
        existingJob.setTitle(newJob.getTitle());
        existingJob.setDescription(newJob.getDescription());
        return jobRepository.save(existingJob);
    }

    public void deleteJob(Long jobId) {
        jobRepository.deleteById(jobId);
    }
}
