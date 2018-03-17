package com.timesheet.webapp.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.timesheet.webapp.model.User;
import com.timesheet.webapp.service.UserRepository;

@RestController
public class UserController {
	
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	 
	@Autowired
	private UserRepository userRepository;
	
	@RequestMapping(value = "/getUser", method = RequestMethod.GET, produces = "application/json")
	public User getUserInfo(HttpServletRequest request, HttpServletResponse response) {
		logger.debug("GET Request received from the user");
		return userRepository.findByEmail("alice@gmail.com");
	}
}
