package pbs.edu.rekrutacja.controllers;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pbs.edu.rekrutacja.models.File;
import pbs.edu.rekrutacja.models.User;
import pbs.edu.rekrutacja.repository.FileRepository;
import pbs.edu.rekrutacja.services.FileService;
import pbs.edu.rekrutacja.services.UserService;

import java.net.URI;
import java.util.Base64;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/files")
public class FileController {

    private FileService fileService;
    private FileRepository fileRepository;
    private UserService userService;
    Base64.Decoder decoder = Base64.getUrlDecoder();

    public FileController(FileService fileService, FileRepository fileRepository, UserService userService) {
        this.fileService = fileService;
        this.fileRepository = fileRepository;
        this.userService = userService;
    }

    @GetMapping
    Page<File> getFiles(@AuthenticationPrincipal UserDetails userDetails, Pageable pageable) {
        String username = userDetails.getUsername();
        System.out.println("username: " + username);

        User user = userService.getUserByUsername(username);

        return fileService.getFilesByUser(user.getUser_id(), pageable);
    }


    @GetMapping("/{fileId}")
    ResponseEntity<File> getFileById(@PathVariable Long fileId) {
        System.out.println("Get files!");
        return ResponseEntity.of(fileService.getFile(fileId));
    }

    @GetMapping("/user_id={user_id}")
    public Page<File> getFilesByUserId(@PathVariable Long user_id, Pageable pageable) {
        return fileRepository.findFilesByUserId(user_id, pageable);
    }

    @PostMapping
    public ResponseEntity<Void> createFile(@Valid @RequestBody MultipartFile file, @RequestHeader(name = "Authorization") String token) {
        //Wyświetlenie Tokena aktualnie zalogowanego usera
        System.out.println("Token: " + token);

        String[] chunks = token.split("\\.");
        final String payload = new String(decoder.decode(chunks[1]));
        String username = "";

        String temp_var = payload.substring(8);

        for (int i = 0; i < temp_var.length(); i++) {
            if(temp_var.charAt(i) == '\"') {break;}
            username += temp_var.charAt(i);
        }

        System.out.println("username: "+ username);

        User user = userService.getUserByUsername(username);

        Long userId = user.getUser_id();

        System.out.println("user_id: "+ userId);

        File addedFile = fileService.setFile(file, userId);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{fileId}")
                .buildAndExpand(addedFile.getFileId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @DeleteMapping(path = "/{fileId}")
    public ResponseEntity<Void> deleteFile(@PathVariable Long fileId) {
        return fileService.getFile(fileId).map(p -> {
            fileService.deleteFile(fileId);
            return new ResponseEntity<Void> (HttpStatus.OK);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}