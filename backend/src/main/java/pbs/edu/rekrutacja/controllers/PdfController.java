package pbs.edu.rekrutacja.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pbs.edu.rekrutacja.models.Pdf;
import pbs.edu.rekrutacja.services.PdfService;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/pdf")
public class PdfController {
    @Autowired
    private PdfService pdfService;

    @PostMapping("/upload")
    public void uploadPdf(@RequestParam("file") MultipartFile file,
                          @RequestParam("user_id") Long user_id) throws IOException {
        System.out.println(user_id);
        pdfService.savePdf(file.getBytes(), user_id);
    }

    @GetMapping("/download/{id}")
    public byte[] downloadPdf(@PathVariable Long id) {
        Pdf pdf = pdfService.getPdfById(id);
        return pdf != null ? pdf.getPdfData() : null;
    }

    @GetMapping("/all")
    public List<Pdf> getAllPdfs() {
        return pdfService.getAllPdfs();
    }
}
