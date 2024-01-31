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
        initializeUsers();
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

    private void initializeUsers() {
        // Użytkownik 1
        String user1Username = "janKowalski";
        String user1Email = "jan.kowalski@gmail.com";
        String user1Password = "haslo123";
        if (!userRepository.existsByUsername(user1Username)) {
            Set<Role> roles = new HashSet<>();
            roles.add(roleRepository.findByName(ERole.ROLE_USER).orElseThrow());
            User user1 = new User(user1Username, user1Email, passwordEncoder.encode(user1Password), roles);
            user1.setFirstName("Jan");
            user1.setLastName("Kowalski");
            user1.setAddress("ul. Kwiatowa 12");
            user1.setCity("Warszawa");
            user1.setPostalCode("00-001");
            user1.setExperience("Doświadczenie zawodowe");
            user1.setPhoneNumber("123-456-789");
            userRepository.save(user1);
            System.out.println("Użytkownik dodany: " + user1Username);
        }

        // Użytkownik 2
        String user2Username = "annaNowak";
        String user2Email = "anna.nowak@gmail.com";
        String user2Password = "haslo456";
        if (!userRepository.existsByUsername(user2Username)) {
            Set<Role> roles = new HashSet<>();
            roles.add(roleRepository.findByName(ERole.ROLE_USER).orElseThrow());
            User user2 = new User(user2Username, user2Email, passwordEncoder.encode(user2Password), roles);
            user2.setFirstName("Anna");
            user2.setLastName("Nowak");
            user2.setAddress("ul. Słoneczna 5");
            user2.setCity("Kraków");
            user2.setPostalCode("30-002");
            user2.setExperience("Inne doświadczenie");
            user2.setPhoneNumber("987-654-321");
            userRepository.save(user2);
            System.out.println("Użytkownik dodany: " + user2Username);
        }

        String user3Username = "pawelPaczek";
        String user3Email = "pawel.paczek@gmail.com";
        String user3Password = "haslo789";
        if (!userRepository.existsByUsername(user3Username)) {
            Set<Role> roles = new HashSet<>();
            roles.add(roleRepository.findByName(ERole.ROLE_USER).orElseThrow());
            User user3 = new User(user3Username, user3Email, passwordEncoder.encode(user3Password), roles);
            user3.setFirstName("Paweł");
            user3.setLastName("Pączek");
            user3.setAddress("ul. Dębowa 7");
            user3.setCity("Wrocław");
            user3.setPostalCode("50-100");
            user3.setExperience("Nowe wyzwania");
            user3.setPhoneNumber("111-222-333");
            userRepository.save(user3);
            System.out.println("Użytkownik dodany: " + user3Username);
        }

        String user4Username = "katarzynaWisniewska";
        String user4Email = "katarzyna.wisniewska@gmail.com";
        String user4Password = "hasloABC";
        if (!userRepository.existsByUsername(user4Username)) {
            Set<Role> roles = new HashSet<>();
            roles.add(roleRepository.findByName(ERole.ROLE_USER).orElseThrow());
            User user4 = new User(user4Username, user4Email, passwordEncoder.encode(user4Password), roles);
            user4.setFirstName("Katarzyna");
            user4.setLastName("Wiśniewska");
            user4.setAddress("ul. Piękna 20");
            user4.setCity("Poznań");
            user4.setPostalCode("60-200");
            user4.setExperience("Kreatywność");
            user4.setPhoneNumber("444-555-666");
            userRepository.save(user4);
            System.out.println("Użytkownik dodany: " + user4Username);
        }

        // Użytkownik 5
        String user5Username = "michalNowakowski";
        String user5Email = "michal.nowakowski@gmail.com";
        String user5Password = "hasloXYZ";
        if (!userRepository.existsByUsername(user5Username)) {
            Set<Role> roles = new HashSet<>();
            roles.add(roleRepository.findByName(ERole.ROLE_USER).orElseThrow());
            User user5 = new User(user5Username, user5Email, passwordEncoder.encode(user5Password), roles);
            user5.setFirstName("Michał");
            user5.setLastName("Nowakowski");
            user5.setAddress("ul. Spacerowa 15");
            user5.setCity("Gdańsk");
            user5.setPostalCode("80-001");
            user5.setExperience("Rozwijam umiejętności");
            user5.setPhoneNumber("777-888-999");
            userRepository.save(user5);
            System.out.println("Użytkownik dodany: " + user5Username);
        }

        // Użytkownik 6
        String user6Username = "karolinaLis";
        String user6Email = "karolina.lis@gmail.com";
        String user6Password = "haslo123ABC";
        if (!userRepository.existsByUsername(user6Username)) {
            Set<Role> roles = new HashSet<>();
            roles.add(roleRepository.findByName(ERole.ROLE_USER).orElseThrow());
            User user6 = new User(user6Username, user6Email, passwordEncoder.encode(user6Password), roles);
            user6.setFirstName("Karolina");
            user6.setLastName("Lis");
            user6.setAddress("ul. Radosna 8");
            user6.setCity("Łódź");
            user6.setPostalCode("90-005");
            user6.setExperience("Praca w zespole");
            user6.setPhoneNumber("111-222-333");
            userRepository.save(user6);
            System.out.println("Użytkownik dodany: " + user6Username);
        }

        // Użytkownik 7
        String user7Username = "adamKowal";
        String user7Email = "adam.kowal@gmail.com";
        String user7Password = "haslo456DEF";
        if (!userRepository.existsByUsername(user7Username)) {
            Set<Role> roles = new HashSet<>();
            roles.add(roleRepository.findByName(ERole.ROLE_USER).orElseThrow());
            User user7 = new User(user7Username, user7Email, passwordEncoder.encode(user7Password), roles);
            user7.setFirstName("Adam");
            user7.setLastName("Kowal");
            user7.setAddress("ul. Spokojna 22");
            user7.setCity("Płock");
            user7.setPostalCode("60-120");
            user7.setExperience("Kierownik projektu");
            user7.setPhoneNumber("444-555-666");
            userRepository.save(user7);
            System.out.println("Użytkownik dodany: " + user7Username);
        }

        // Użytkownik 8
        String user8Username = "magdalenaWozniak";
        String user8Email = "magdalena.wozniak@gmail.com";
        String user8Password = "haslo789GHI";
        if (!userRepository.existsByUsername(user8Username)) {
            Set<Role> roles = new HashSet<>();
            roles.add(roleRepository.findByName(ERole.ROLE_USER).orElseThrow());
            User user8 = new User(user8Username, user8Email, passwordEncoder.encode(user8Password), roles);
            user8.setFirstName("Magdalena");
            user8.setLastName("Wozniak");
            user8.setAddress("ul. Słowackiego 10");
            user8.setCity("Szczecin");
            user8.setPostalCode("70-010");
            user8.setExperience("Specjalista ds. marketingu");
            user8.setPhoneNumber("777-888-999");
            userRepository.save(user8);
            System.out.println("Użytkownik dodany: " + user8Username);
        }

        // Użytkownik 9
        String user9Username = "ewaZielinska";
        String user9Email = "ewa.zielinska@gmail.com";
        String user9Password = "haslo000JKL";
        if (!userRepository.existsByUsername(user9Username)) {
            Set<Role> roles = new HashSet<>();
            roles.add(roleRepository.findByName(ERole.ROLE_USER).orElseThrow());
            User user9 = new User(user9Username, user9Email, passwordEncoder.encode(user9Password), roles);
            user9.setFirstName("Ewa");
            user9.setLastName("Zielińska");
            user9.setAddress("ul. Piękna 25");
            user9.setCity("Płock");
            user9.setPostalCode("60-150");
            user9.setExperience("Inżynier");
            user9.setPhoneNumber("111-222-333");
            userRepository.save(user9);
            System.out.println("Użytkownik dodany: " + user9Username);
        }

        // Użytkownik 10
        String user10Username = "tomaszWojcik";
        String user10Email = "tomasz.wojcik@gmail.com";
        String user10Password = "haslo999MNO";
        if (!userRepository.existsByUsername(user10Username)) {
            Set<Role> roles = new HashSet<>();
            roles.add(roleRepository.findByName(ERole.ROLE_USER).orElseThrow());
            User user10 = new User(user10Username, user10Email, passwordEncoder.encode(user10Password), roles);
            user10.setFirstName("Tomasz");
            user10.setLastName("Wojcik");
            user10.setAddress("ul. Kwiatowa 30");
            user10.setCity("Kraków");
            user10.setPostalCode("30-005");
            user10.setExperience("Programista");
            user10.setPhoneNumber("444-555-666");
            userRepository.save(user10);
            System.out.println("Użytkownik dodany: " + user10Username);
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
