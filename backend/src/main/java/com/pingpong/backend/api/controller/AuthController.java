package com.pingpong.backend.api.controller;

import com.pingpong.backend.api.domain.dto.TokenDto;
import com.pingpong.backend.api.domain.request.UserRequest;
import com.pingpong.backend.api.service.AuthService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Api(value = "로그인 인증 API", tags={"JWT로 로그인인증"})
@RestController
@RequestMapping("/be/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody UserRequest.Login login) {
        return ResponseEntity.ok(authService.login(login));
    }

    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestBody TokenDto tokenDto) {
        return ResponseEntity.ok(authService.reissue(tokenDto));
    }

    @DeleteMapping("/logout/{id}")
    public ResponseEntity<String> logout(@PathVariable int id){
        try{
            authService.logout(id);
            return new ResponseEntity<String>(id+"Refresh Token 삭제 성공", HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>(id+"Refresh Token 삭제 실패", HttpStatus.NOT_FOUND);
        }
    }
}