package pbs.edu.rekrutacja.services;

import jakarta.annotation.PostConstruct;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pbs.edu.rekrutacja.models.File;
import pbs.edu.rekrutacja.models.User;
import pbs.edu.rekrutacja.repository.FileRepository;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.Optional;

@Service
public class FileServiceImpl implements FileService {

    private FileRepository fileRepository;
    private UserService userService;

    public FileServiceImpl(FileRepository fileRepository, UserService userService) {
        this.fileRepository = fileRepository;
        this.userService = userService;
    }

    @Value("${upload.folder}")
    private String uploadFolder; // Make sure you have the corresponding property in your application.properties file

    @PostConstruct
    public void init() {
        try {
            Path uploadsPath = Paths.get(uploadFolder).toAbsolutePath().normalize();
            if (Files.notExists(uploadsPath)) {
                Files.createDirectories(uploadsPath);
                System.out.println("Uploads folder initialized at: " + uploadsPath);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public Page<File> getFilesByUser(Long userId, Pageable pageable) {
        User user = userService.getUserById(userId);
        return fileRepository.findByUser(user, pageable);
    }

    @Override
    public Page<File> getFiles(Pageable pageable) { return fileRepository.findAll(pageable); }

    @Override
    public Optional<File> getFile(Long fileId) { return fileRepository.findById(fileId); }

    @Override
    public File setFile(@NotNull MultipartFile file, Long userId) {
        User user = userService.getUserById(userId);

        if (file != null && !file.isEmpty()) {
            try {
                // Generate a unique filename
                String originalFileName = Objects.requireNonNull(file.getOriginalFilename());

                // Create the destination folder path
                java.nio.file.Path destinationFolderPath = Paths.get(uploadFolder).toAbsolutePath().normalize();

                // Combine the destination folder path and the unique filename
                Path filePath = destinationFolderPath.resolve(originalFileName);

                // Save the file to the specified location
                file.transferTo(filePath.toFile());

                // Now, you can use the filePath.toString() as the URL or store it in the database
                File fileToSave = new File(originalFileName, filePath.toString(), user);
                return fileRepository.save(fileToSave);
            } catch (IOException e) {
                // Handle the exception (e.g., log or throw a custom exception)
                e.printStackTrace();
            }
        } else {
            // Handle the case when the file is not provided
            String defaultName = "defaultName";
            File fileToSave = new File(defaultName, "", user);
            return fileRepository.save(fileToSave);
        }

        return null; // Handle this case based on your requirements
    }

    @Override
    public org.springframework.core.io.Resource downloadFile(Long fileId) throws IOException {
        // Pobierz informacje o pliku z bazy danych
        File file = fileRepository.findById(fileId)
                .orElseThrow(() -> new FileNotFoundException("Plik nie znaleziony: " + fileId));

        // Utwórz obiekt Path do pliku
        Path filePath = Paths.get(uploadFolder).resolve(file.getName()).normalize();

        // Utwórz obiekt UrlResource
        Resource resource = new UrlResource(filePath.toUri());

        // Sprawdź czy plik istnieje i czy można go odczytać
        if (Files.exists(filePath) && Files.isReadable(filePath)) {
            return resource;
        } else {
            throw new FileNotFoundException("Nie można odnaleźć pliku: " + file.getName());
        }
    }



    @Override
    @Transactional
    public void deleteFile(Long fileId) { fileRepository.deleteById(fileId); }
}
