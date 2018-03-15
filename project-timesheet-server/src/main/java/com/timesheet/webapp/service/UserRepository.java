package com.timesheet.webapp.service;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.timesheet.webapp.model.User;

public interface UserRepository extends MongoRepository<User, String> {

	public User findByFirstName(String firstName);

	public List<User> findByLastName(String lastName);

	public User findByEmail(String lastName);
}
