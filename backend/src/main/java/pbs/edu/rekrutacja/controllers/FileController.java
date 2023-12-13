package pbs.edu.rekrutacja.controllers;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pbs.edu.rekrutacja.models.File;
import pbs.edu.rekrutacja.repository.FileRepository;
import pbs.edu.rekrutacja.services.FileService;
import pbs.edu.rekrutacja.services.UserService;

import java.net.URI;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/files")
public class FileController {

    private FileService fileService;
    private FileRepository fileRepository;
    private UserService userService;

    public FileController(FileService fileService, FileRepository fileRepository, UserService userService) {
        this.fileService = fileService;
        this.fileRepository = fileRepository;
        this.userService = userService;
    }

    @GetMapping
    Page<File> getFiles(Pageable pageable) {
        return fileService.getFiles(pageable);
    }

    @GetMapping("/{fileId}")
    ResponseEntity<File> getFileById(@PathVariable Integer fileId) {
        System.out.println("Get files!");
        return ResponseEntity.of(fileService.getFile(fileId));
    }

    @GetMapping("/email={email}")
    public Page<File> getFilesByEmail(@PathVariable String email, Pageable pageable) {
        return fileRepository.findByUserEmail(email, pageable);
    }

    @PostMapping
    public ResponseEntity<Void> createFile(@Valid @RequestBody File file) {
        File addedFile = fileService.setFile(file);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{fileId}")
                .buildAndExpand(addedFile.getFileId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @DeleteMapping(path = "/{fileId}")
    public ResponseEntity<Void> deleteFile(@PathVariable Integer fileId) {
        return fileService.getFile(fileId).map(p -> {
            fileService.deleteFile(fileId);
            return new ResponseEntity<Void> (HttpStatus.OK);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
