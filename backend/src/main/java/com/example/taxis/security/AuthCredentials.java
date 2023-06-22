package com.example.taxis.security;

import lombok.Data;

@Data
public class AuthCredentials {
    private String phone;
    private String password;
}
