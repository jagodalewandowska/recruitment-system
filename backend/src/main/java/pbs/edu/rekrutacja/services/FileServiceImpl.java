package pbs.edu.rekrutacja.services;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pbs.edu.rekrutacja.models.File;
import pbs.edu.rekrutacja.models.User;
import pbs.edu.rekrutacja.repository.FileRepository;

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

    @Override
    public File setFile(@NotNull File file, Long userId) {
        User user = userService.getUserById(userId);
        if (file.getName() != null) {
            File fileToSave = new File(file.getName(), file.getUrl(), user);
            return fileRepository.save(fileToSave);
        } else {
            String newName = file.getUrl().replace("/uploads/", "");
            File fileToSave = new File(newName, file.getUrl(), user);

            return fileRepository.save(fileToSave);
        }
    }

    @Override
    @Transactional
    public void deleteFile(Long fileId) { fileRepository.deleteById(fileId); }
}
