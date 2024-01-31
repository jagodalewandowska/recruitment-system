package pbs.edu.rekrutacja.services;

import org.springframework.stereotype.Service;
import pbs.edu.rekrutacja.models.Pdf;
import pbs.edu.rekrutacja.models.User;
import pbs.edu.rekrutacja.repository.PdfRepository;

import java.util.List;

@Service
public class PdfService {

    private final PdfRepository pdfRepository;
    private final UserService userService;

    public PdfService(PdfRepository pdfRepository, UserService userService) {
        this.pdfRepository = pdfRepository;
        this.userService = userService;
    }

    public void savePdf(byte[] pdfBytes, Long user_id) {
        Pdf pdfEntity = new Pdf();
        pdfEntity.setPdfData(pdfBytes);

        User user = userService.getUserById(user_id);
        pdfEntity.setUser(user);

        pdfRepository.save(pdfEntity);
    }

    public Pdf getPdfById(Long id) {
        return pdfRepository.findById(id).orElse(null);
    }

    public List<Pdf> getAllPdfs() {
        return pdfRepository.findAll();
    }
}