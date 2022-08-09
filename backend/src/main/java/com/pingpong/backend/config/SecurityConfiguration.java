package com.pingpong.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

//@Configuration
//public class CorsConfig {
//
//   @Bean
//   public CorsFilter corsFilter() {
//      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//      CorsConfiguration config = new CorsConfiguration();
//      config.setAllowCredentials(true);
//      config.addAllowedOrigin("*"); // e.g. http://domain1.com
//      config.addAllowedHeader("*");
//      config.addAllowedMethod("*");
//
//      source.registerCorsConfiguration("/**", config);
//      return new CorsFilter(source);
//   }
//
//}

@EnableWebSecurity
@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
   @Override
   protected void configure(HttpSecurity http) throws Exception {
      http
              .authorizeRequests()
              .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
              .anyRequest().authenticated().and()
              .cors().and(); // - (2)
   }

   @Bean
   public CorsConfigurationSource corsConfigurationSource() {
      CorsConfiguration configuration = new CorsConfiguration();
      // - (3)
      configuration.addAllowedOrigin("*");
      configuration.addAllowedMethod("*");
      configuration.addAllowedHeader("*");
      configuration.setAllowCredentials(true);
      configuration.setMaxAge(3600L);
      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      source.registerCorsConfiguration("/**", configuration);
      return source;
   }
}