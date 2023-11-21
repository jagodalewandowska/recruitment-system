package pbs.edu.rekrutacja.init;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pbs.edu.rekrutacja.models.ERole;
import pbs.edu.rekrutacja.models.Job;
import pbs.edu.rekrutacja.models.Role;
import pbs.edu.rekrutacja.models.User;
import pbs.edu.rekrutacja.repository.JobRepository;
import pbs.edu.rekrutacja.repository.RoleRepository;
import pbs.edu.rekrutacja.repository.UserRepository;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JobRepository jobRepository;

    @Autowired
    public DataInitializer(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder, JobRepository jobRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jobRepository = jobRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        initializeRoles();
        initializeJobs();
        initializeAdministrator();
    }

    private void initializeRoles() {
        createRoleIfNotExists("ROLE_USER");
        createRoleIfNotExists("ROLE_MODERATOR");
        createRoleIfNotExists("ROLE_ADMIN");
    }

    private void createRoleIfNotExists(String roleName) {
        ERole roleEnum = ERole.valueOf(roleName);
        if (!roleRepository.existsByName(roleEnum)) {
            Role role = new Role(roleEnum);
            roleRepository.save(role);
            System.out.println("Role added: " + roleName);
        }
    }

    private void initializeAdministrator() {
        String adminUsername = "admin";
        String adminEmail = "administrator@gmail.com";
        String adminPassword = "admin123";
        if (!userRepository.existsByUsername(adminUsername)) {
            Set<Role> roles = new HashSet<>();
            roles.add(roleRepository.findByName(ERole.ROLE_ADMIN).orElseThrow());
            User admin = new User(adminUsername, adminEmail, passwordEncoder.encode(adminPassword), roles);
            userRepository.save(admin);
            System.out.println("Administrator added: " + adminUsername);
        }
    }

    private void initializeJobs() {
        createJobIfNotExists("Programista Java", "Poszukujemy doświadczonego programisty Java do pracy nad rozbudowanym systemem zarządzania projektami. Oferujemy atrakcyjne wynagrodzenie i elastyczne godziny pracy.");
        createJobIfNotExists("Specjalista ds. Marketingu Cyfrowego", "Firma marketingowa poszukuje kreatywnego specjalisty ds. marketingu cyfrowego. Odpowiedzialność za kampanie reklamowe online, analizę danych i strategię marketingową.");
        createJobIfNotExists("Inżynier Testów Oprogramowania", "Pracuj z nami nad testowaniem oprogramowania najnowszej generacji. Doświadczenie w testowaniu aplikacji webowych i mobilnych mile widziane.");
        createJobIfNotExists("Grafik Komputerowy", "Agencja reklamowa poszukuje grafika komputerowego do projektowania materiałów reklamowych, stron internetowych i materiałów promocyjnych.");
        createJobIfNotExists("Konsultant ds. Obsługi Klienta", "Dołącz do naszego zespołu obsługi klienta i pomóż naszym klientom w rozwiązaniu problemów, udzieleniu informacji o produktach i zapewnieniu doskonałej obsługi.");
    }

    private void createJobIfNotExists(String title, String description) {
        if (!jobRepository.existsByTitle(title)) {
            Job job = new Job(title, description);
            jobRepository.save(job);
            System.out.println("Job added: " + title);
        }
    }

}
