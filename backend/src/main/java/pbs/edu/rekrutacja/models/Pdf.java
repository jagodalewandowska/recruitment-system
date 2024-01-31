package pbs.edu.rekrutacja.models;

import jakarta.persistence.*;

@Entity
@Table(name = "pdf_data")
public class Pdf {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_pdf;

    @Lob
    private byte[] pdfData;

    @ManyToOne
    @JoinColumn(name = "user_id") // Assuming the column in pdf_data table is named user_id
    private User user;

    public void setId_pdf(Long idPdf) {
        this.id_pdf = idPdf;
    }

    public Long getId_pdf() {
        return id_pdf;
    }

    public byte[] getPdfData() {
        return pdfData;
    }

    public void setPdfData(byte[] pdfData) {
        this.pdfData = pdfData;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Pdf() {
    }

    public Pdf(byte[] pdfData) {
        this.pdfData = pdfData;
    }

    public Pdf(byte[] pdfData, User user) {
        this.pdfData = pdfData;
        this.user = user;
    }
}
