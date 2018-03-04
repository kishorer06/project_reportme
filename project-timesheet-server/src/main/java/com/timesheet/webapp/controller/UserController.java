package com.timesheet.webapp.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.timesheet.webapp.model.User;

@RestController
@RequestMapping("/ots")
public class UserController {

	@RequestMapping("/getUser")
	public User getUserInfo(HttpServletRequest request, HttpServletResponse response) {
		return null;
		
	}
}
