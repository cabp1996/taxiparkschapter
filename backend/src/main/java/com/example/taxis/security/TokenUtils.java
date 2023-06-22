package com.example.taxis.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.util.*;

public class TokenUtils {

    private final static String ACCESS_TOKEN_SECRET = "andreatequiero";
    private final static Long ACCESS_TOKEN_VALIDITY_SECONDS = 2_592_000L;

    public static String createToken(String phone, String name) {

        long expirationTime = ACCESS_TOKEN_VALIDITY_SECONDS * 1000;
        Date expirationDate = new Date(System.currentTimeMillis() + expirationTime);

        Map<String, Object> claims = new HashMap<>();
        claims.put("phone", phone);
        claims.put("name", name);

        return Jwts.builder()
                .setSubject(phone)
                .setExpiration(expirationDate)
                .addClaims(claims)
                .signWith(SignatureAlgorithm.HS256, ACCESS_TOKEN_SECRET.getBytes())
                .compact();

    }

    public static UsernamePasswordAuthenticationToken getAuthentication(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(ACCESS_TOKEN_SECRET.getBytes())
                    .parseClaimsJws(token)
                    .getBody();

            String phone = claims.getSubject();

            return new UsernamePasswordAuthenticationToken(phone, null, Collections.emptyList());
        } catch (JwtException jwtException) {
            return null;
        }
    }
}
