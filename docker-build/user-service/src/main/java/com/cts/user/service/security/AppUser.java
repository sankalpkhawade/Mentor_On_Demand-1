package com.cts.user.service.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.cts.user.service.model.User;

@SuppressWarnings("serial")
public class AppUser implements UserDetails {

	private User user; // entity reference
	private Collection<? extends GrantedAuthority> authorities; // to store role
																// details

	public AppUser(User user) {
		// TODO Auto-generated constructor stub
		ArrayList<String> roleList = new ArrayList<String>();
		roleList.add(user.getRole());
		this.authorities = roleList.stream().map(role -> new SimpleGrantedAuthority(role)).collect(Collectors.toList());
		this.user = user;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return authorities;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return user.getName();
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

}
