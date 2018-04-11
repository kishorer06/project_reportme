package com.timesheet.webapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.timesheet.webapp.jwt.config.JwtTokenUtil;
import com.timesheet.webapp.model.AuthToken;
import com.timesheet.webapp.model.User;
import com.timesheet.webapp.service.UserService;

@RestController
@RequestMapping("ots")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/token", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<?> getToken(@RequestBody User user) throws AuthenticationException {
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final User getUser = userService.find(user.getUsername());
        System.out.println("AuthenticationController:::::" + getUser);
        final String token = jwtTokenUtil.generateToken(getUser);
        return ResponseEntity.ok(new AuthToken(token));
    }
}
