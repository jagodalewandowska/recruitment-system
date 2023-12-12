package pbs.edu.rekrutacja.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "files")
public class Files {
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

    public Files() {

    }

    public Files(Integer fileId, String name, String url, User user) {
        super();
        this.fileId = fileId;
        this.name = name;
        this.url = url;
        this.user = user;
    }

    public Files(String name, String url, User user) {
        this.name = name;
        this.url = url;
        this.user = user;
    }

    public User getUser() {return user;}
}
