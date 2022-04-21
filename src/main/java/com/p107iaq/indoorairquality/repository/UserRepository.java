package com.p107iaq.indoorairquality.repository;

import com.p107iaq.indoorairquality.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface UserRepository extends CrudRepository<User,Long> {
    @Override
    Iterable<User> findAll();
    User findByUsername(String username);
    User getById(Long id);


}
