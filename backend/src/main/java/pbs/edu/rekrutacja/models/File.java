package pbs.edu.rekrutacja.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Entity
@Data
//@AllArgsConstructor
//@NoArgsConstructor
@Table(name = "files")
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="file_id")
    private Integer fileId;

    @Column(name = "name")
    private String name;

    @Column(name = "url")
    private String url;

    @ManyToOne
    @JsonIgnoreProperties({"users"})
    @JoinColumn(name = "email")
    private User user;

    public File() {

    }

    public File(Integer fileId, String name, String url, User user) {
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
}
