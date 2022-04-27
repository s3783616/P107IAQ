package com.p107iaq.indoorairquality.user.repository;

import com.p107iaq.indoorairquality.user.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface UserRepository extends CrudRepository<User,Long> {
    @Override
    Iterable<User> findAll();

    @Query("select u from User u where u.username = ?1")
    User findByUsername(String username);

    @Query("select u from User u where u.id = ?1")
    User getById(Long id);


}
