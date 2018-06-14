package com.reportme.webapp.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.reportme.webapp.model.User;


@Repository
public interface UserRepository extends MongoRepository<User, String> {

	User findByUsername(String Username);
}
