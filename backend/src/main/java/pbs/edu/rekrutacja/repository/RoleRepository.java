package pbs.edu.rekrutacja.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pbs.edu.rekrutacja.models.ERole;
import pbs.edu.rekrutacja.models.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
  boolean existsByName(ERole roleName);
}
