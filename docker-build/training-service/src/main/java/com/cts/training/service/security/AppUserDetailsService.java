package com.cts.training.service.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cts.training.service.TrainingServiceApplication;
import com.cts.training.service.model.User;
import com.cts.training.service.repository.UserRepository;

@Service
public class AppUserDetailsService implements UserDetailsService {

	@Autowired
	UserRepository userRepository;

	private static final Logger LOGGER = LoggerFactory.getLogger(TrainingServiceApplication.class);

	public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
		User nameUser = userRepository.findByName(name);
		User emailUser = userRepository.findByEmail(name);
		LOGGER.info("User Name/Email: " + name);
		LOGGER.info("Name User: {}"+nameUser);
		LOGGER.info("Email User: {}"+emailUser);
		if (nameUser == null && emailUser == null) {
			LOGGER.info("Email user  : {}"+emailUser);
			throw new UsernameNotFoundException(name);
		} else {
			if (nameUser != null) {
				LOGGER.info("User if not null: {}"+nameUser);
				AppUser appUser = new AppUser(nameUser);
				return appUser;
			} else {
				LOGGER.info("Email user if null: {}"+emailUser);
				AppUser appUser = new AppUser(emailUser);
				return appUser;
			}
		}
	}
}
