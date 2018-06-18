package com.reportme.webapp.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.reportme.webapp.model.User;
import com.reportme.webapp.service.UserService;
import com.reportme.webapp.util.CustomErrorType;

@RestController
@RequestMapping("ots")
public class UserController {

	public static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;
	
	@Autowired
	BCryptPasswordEncoder passwordEncoder;

	// request method to create a new account by a guest
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@CrossOrigin
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<User> createUser(@RequestBody User newUser) {
		if (userService.find(newUser.getUsername()) != null) {
			System.out.println("request received");
			logger.error("Email already exists " + newUser.getUsername());
			return new ResponseEntity(new CustomErrorType("Account already exists!"), HttpStatus.CONFLICT);
		}
		newUser.setRole("USER");
		newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
		return new ResponseEntity<User>(userService.save(newUser), HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/getUser", method = RequestMethod.GET)
	public User getUser(@RequestParam String email) {
		return userService.find(email);
	}
}
