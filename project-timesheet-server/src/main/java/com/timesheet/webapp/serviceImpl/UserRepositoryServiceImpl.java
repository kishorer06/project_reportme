package com.timesheet.webapp.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.timesheet.webapp.service.UserRepository;
import com.timesheet.webapp.service.UserService;

public class UserRepositoryServiceImpl implements UserService {

	@SuppressWarnings("unused")
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	MongoTemplate template;
	
	// Service Impl goes here
}
