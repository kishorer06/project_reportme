package com.reportme.webapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reportme.webapp.dao.UserRepository;
import com.reportme.webapp.model.User;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;

	public User save(User user) {
		return userRepository.save(user);
	}

	public User update(User user) {
		return userRepository.save(user);
	}

	public User find(String userName) {
		return userRepository.findByUsername(userName);
	}

	public User findById(String id) {
		return userRepository.findOne(id);
	}
}