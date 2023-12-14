package pbs.edu.rekrutacja.services;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pbs.edu.rekrutacja.models.File;
import pbs.edu.rekrutacja.repository.FileRepository;

import java.util.Optional;

@Service
public class FileServiceImpl implements FileService {

    private FileRepository fileRepository;

    public FileServiceImpl(FileRepository fileRepository) { this.fileRepository = fileRepository; }


    @Override
    public Page<File> getFiles(Pageable pageable) { return fileRepository.findAll(pageable); }

    @Override
    public Optional<File> getFile(Long fileId) { return fileRepository.findById(fileId); }

    @Override
    public File setFile(@NotNull File file) {
        if (file.getName() != null) {
            File fileToSave = new File(file.getName(), file.getUrl(), file.getUser());
            return fileRepository.save(fileToSave);
        } else {
            String newName = file.getUrl().replace("/uploads/", "");
            File fileToSave = new File(newName, file.getUrl(), file.getUser());

            return fileRepository.save(fileToSave);
        }
    }

    @Override
    @Transactional
    public void deleteFile(Long fileId) { fileRepository.deleteById(fileId); }
}
