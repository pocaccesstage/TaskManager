package com.taskmanager.auth.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.taskmanager.auth.domain.User;

@Repository
public interface UserRepository extends CrudRepository<User, String> {

}
