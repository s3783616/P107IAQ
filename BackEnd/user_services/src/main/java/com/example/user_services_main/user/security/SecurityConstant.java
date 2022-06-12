package com.example.user_services_main.user.security;

public class SecurityConstant {

    public static final String SECRET = "SecretKeyToGenJWTs";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String SIGN_UP_URLS = "/api/users/**";
    public static final long SIXTY_MINUTES_IN_MILLISECONDS = 3600000;
}
