package pbs.edu.rekrutacja.services;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;
import pbs.edu.rekrutacja.models.File;

import java.io.IOException;
import java.util.Optional;

public interface FileService {
    Page<File> getFilesByUser(Long userId, Pageable pageable);

    Page<File> getFiles(Pageable pageable);

    Optional<File> getFile(Long fileId);

    File setFile(@NotNull MultipartFile file, Long userId);

    Resource downloadFile(Long fileId) throws IOException;

    @Transactional
    void deleteFile(Long fileId);
}
