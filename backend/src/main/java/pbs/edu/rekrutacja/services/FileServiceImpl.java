package pbs.edu.rekrutacja.services;

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

import java.io.IOException;
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

    @Override
    public Page<File> getFiles(Pageable pageable) { return fileRepository.findAll(pageable); }

    @Override
    public Optional<File> getFile(Long fileId) { return fileRepository.findById(fileId); }

    @Value("${upload.folder}")
    private String uploadFolder; // Make sure you have the corresponding property in your application.properties file

    @Override
    public File setFile(@NotNull MultipartFile file, Long userId) {
        User user = userService.getUserById(userId);

        if (file != null && !file.isEmpty()) {
            try {
                // Generate a unique filename
                String originalFileName = Objects.requireNonNull(file.getOriginalFilename());
                String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
                String newName = "customFileName" + System.currentTimeMillis() + fileExtension;

                // Create the destination folder path
                java.nio.file.Path destinationFolderPath = Paths.get(uploadFolder).toAbsolutePath().normalize();

                // Combine the destination folder path and the unique filename
                Path filePath = destinationFolderPath.resolve(newName);

                // Save the file to the specified location
                file.transferTo(filePath.toFile());

                // Now, you can use the filePath.toString() as the URL or store it in the database

                File fileToSave = new File(newName, filePath.toString(), user);
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
    @Transactional
    public void deleteFile(Long fileId) { fileRepository.deleteById(fileId); }
}
