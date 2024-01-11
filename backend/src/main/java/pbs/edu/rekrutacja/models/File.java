package pbs.edu.rekrutacja.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "files")
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="file_id")
    private Long fileId;

    @Column(name = "name")
    private String name;

    @Column(name = "url")
    private String url;

    @ManyToOne
    @JsonIgnoreProperties({"users"})
    @JoinColumn(name = "user_id")
    private User user;

    public File(Long fileId, String name, String url, User user) {
        super();
        this.fileId = fileId;
        this.name = name;
        this.url = url;
        this.user = user;
    }

    public File(String name, String url) {
        this.name = name;
        this.url = url;
    }

    public File(String name, String url, User user) {
        this.name = name;
        this.url = url;
        this.user = user;
    }

    public File() {

    }
}
