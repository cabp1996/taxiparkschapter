package com.example.taxis.security;

import com.example.taxis.entity.UserEntity;
import com.example.taxis.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String phone) throws UsernameNotFoundException {
        UserEntity user= userRepository
                .findOneUserByPhone(phone)
                .orElseThrow(()->new UsernameNotFoundException("ese usuario no existe"));

        return new UserDetailsImpl(user);
    }
}
