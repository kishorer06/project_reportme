package com.timesheet.webapp;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.timesheet.webapp.model.User;
import com.timesheet.webapp.service.UserRepository;

@SpringBootApplication()
public class Application implements CommandLineRunner {

	private static final Logger logger = LogManager.getLogger(Application.class);

	@Autowired
	private UserRepository repository;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	// TODO : Only for testing! need to remove later
	@Override
	public void run(String... arg0) throws Exception {
		repository.deleteAll();
		repository.save(new User("Alice", "Smith", "alice@gmail.com"));
		repository.save(new User("Bob", "Smith", "smith@gmail.com"));
		logger.debug("User found with findByFirstName('Alice'): {}", repository.findByFirstName("Alice"));
	}

}
