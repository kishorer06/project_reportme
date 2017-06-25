package com.timesheet.webapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ots")
public class HelloWorld {

	@RequestMapping("/")
	public String Index() {
		return "Hello World!!!";
	}
	
	@RequestMapping("/welcome")
	public String helloWorld() {
		return "Hello World!";
	}
}
