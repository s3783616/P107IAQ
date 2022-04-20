package com.p107iaq.indoorairquality.repository;

import com.p107iaq.indoorairquality.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
}
