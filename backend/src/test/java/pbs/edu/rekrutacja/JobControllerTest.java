package pbs.edu.rekrutacja;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import pbs.edu.rekrutacja.controllers.JobController;
import pbs.edu.rekrutacja.models.Job;
import pbs.edu.rekrutacja.services.JobService;

import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.lenient;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;


@SpringBootTest
@ExtendWith(MockitoExtension.class)
class JobControllerTest {

    @InjectMocks
    private JobController jobController;

    @Mock
    private JobService jobService;

    @Test
    void getAllJobsTest() {

        List<Job> mockJobs = List.of(new Job(), new Job());
        when(jobService.getAllJobs()).thenReturn(mockJobs);

        List<Job> result = jobController.getAllJobs();

        assertEquals(mockJobs, result);
    }

    @Test
    void getJobByIdTest() {

        long jobId = 1;
        Job mockJob = new Job();
        when(jobService.getJobById(jobId)).thenReturn(mockJob);

        Job result = jobController.getJobById(jobId);

        assertEquals(mockJob, result);
    }

    @Test
    void getJobByIdNotFoundTest() {

        long jobId = 1;
        when(jobService.getJobById(jobId)).thenThrow(new NoSuchElementException("Job not found"));

        assertThrows(NoSuchElementException.class, () -> jobController.getJobById(jobId));
    }

    @Test
    void createJobTest() {

        Job mockJob = new Job();
        when(jobService.createJob(any(Job.class))).thenReturn(mockJob);

        Job createdJob = jobController.createJob(new Job());

        assertNotNull(createdJob);
    }

    @Test
    void updateJobTest() {

        long jobId = 1;
        Job existingJob = new Job();
        Job updatedJob = new Job();
        lenient().when(jobService.getJobById(jobId)).thenReturn(existingJob);
        when(jobService.updateJob(eq(jobId), any(Job.class))).thenReturn(updatedJob);

        Job result = jobController.updateJob(jobId, updatedJob);

        ResponseEntity<Job> response = ResponseEntity.ok(result);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedJob, response.getBody());
    }

    @Test
    void deleteJobTest() {

        long jobId = 1;
        doNothing().when(jobService).deleteJob(jobId);

        assertDoesNotThrow(() -> jobController.deleteJob(jobId));
    }
}
