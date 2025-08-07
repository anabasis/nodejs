package com.seegene.main.global.config;

import static io.swagger.v3.oas.models.security.SecurityScheme.In.*;
import static io.swagger.v3.oas.models.security.SecurityScheme.Type.*;

import java.util.Arrays;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.seegene.main.global.util.props.SwaggerProperties;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI mainOpenAPI(SwaggerProperties swaggerProperties) {
        SecurityScheme securityScheme = new SecurityScheme()
                .type(HTTP)
                .in(HEADER)
                .scheme("Bearer")
                .bearerFormat("JWT")
                .name("Authorization");

        SecurityRequirement securityRequirement = new SecurityRequirement().addList("Bearer");

        Info info = new Info()
                .title("WISDOM-ISP-MAIN-BACKEND OPEN API")
                .description("WISDOM-ISP-MAIN-BACKEND OPEN API Description입니다.")
                .version("v0.0.1");

        Server server = new Server();
        server.setUrl(swaggerProperties.getUrl());
        server.setDescription(swaggerProperties.getDescription());

        return new OpenAPI()
                .components(new Components().addSecuritySchemes("Bearer", securityScheme))
                .info(info)
                .servers(Arrays.asList(server))
                .security(Arrays.asList(securityRequirement));
    }

    @Bean
    public GroupedOpenApi demo() {
        String[] paths = {"/demo/**", "/test/**"};
        return GroupedOpenApi.builder().group("demo").pathsToMatch(paths)
                .build();
    }

    @Bean
    public GroupedOpenApi account() {
        String[] paths = {"/account/**", "/test/**"};
        return GroupedOpenApi.builder().group("account").pathsToMatch(paths)
                .build();
    }

    @Bean
    public GroupedOpenApi databox() {
        String[] paths = {"/databox/**", "/test/**"};
        return GroupedOpenApi.builder().group("databox").pathsToMatch(paths)
                .build();
    }

    @Bean
    public GroupedOpenApi software() {
        String[] paths = {"/software/**", "/test/**"};
        return GroupedOpenApi.builder().group("software").pathsToMatch(paths)
                .build();
    }

    @Bean
    public GroupedOpenApi datastore() {
        String[] paths = {"/datastore/**", "/test/**"};
        return GroupedOpenApi.builder().group("datastore").pathsToMatch(paths)
            .build();
    }

    @Bean
    public GroupedOpenApi notification() {
        String[] paths = {"/notification/**"};
        return GroupedOpenApi.builder().group("notification").pathsToMatch(paths)
                .build();
    }

    @Bean
    public GroupedOpenApi notice() {
        String[] paths = {"/notice/**"};
        return GroupedOpenApi.builder().group("notice").pathsToMatch(paths)
            .build();
    }

    @Bean
    public GroupedOpenApi mypage() {
        String[] paths = {"/mypage/**"};
        return GroupedOpenApi.builder().group("mypage").pathsToMatch(paths)
            .build();
    }

    @Bean
    public GroupedOpenApi board() {
        String[] paths = {"/board/**"};
        return GroupedOpenApi.builder().group("board").pathsToMatch(paths)
                .build();
    }

    @Bean
    public GroupedOpenApi search() {
        String[] paths = {"/search/**"};
        return GroupedOpenApi.builder().group("search").pathsToMatch(paths)
                .build();
    }

    @Bean
    public GroupedOpenApi datacodemanagement() {
        String[] paths = {"/data-code-management/**"};
        return GroupedOpenApi.builder().group("data-code-management").pathsToMatch(paths)
                .build();
    }

    @Bean
    public GroupedOpenApi login() {
        String[] paths = {"/login/**"};
        return GroupedOpenApi.builder().group("login").pathsToMatch(paths)
                .build();
    }

    @Bean
    public GroupedOpenApi join() {
        String[] paths = {"/join/**"};
        return GroupedOpenApi.builder().group("join").pathsToMatch(paths)
                .build();
    }

    @Bean
    public GroupedOpenApi dashboard() {
        String[] paths = {"/dashboard/**"};
        return GroupedOpenApi.builder().group("dashboard").pathsToMatch(paths)
                .build();
    }

    @Bean
    public GroupedOpenApi project() {
        String[] paths = {"/project/**"};
        return GroupedOpenApi.builder().group("project").pathsToMatch(paths)
                .build();
    }

    @Bean
    public GroupedOpenApi request() {
        String[] paths = {"/request/**"};
        return GroupedOpenApi.builder().group("request").pathsToMatch(paths)
                .build();
    }

    @Bean
    public GroupedOpenApi guide() {
        String[] paths = {"/guide/**"};
        return GroupedOpenApi.builder().group("guide").pathsToMatch(paths)
                .build();
    }

    @Bean
    public GroupedOpenApi tools() {
        String[] paths = {"/tools/**"};
        return GroupedOpenApi.builder().group("tools").pathsToMatch(paths)
                .build();
    }

    @Bean
    public GroupedOpenApi common() {
        String[] paths = {"/common/**"};
        return GroupedOpenApi.builder().group("common").pathsToMatch(paths)
            .build();
    }

    @Bean
    public GroupedOpenApi external() {
        String[] paths = {"/external/**"};
        return GroupedOpenApi.builder().group("external").pathsToMatch(paths)
            .build();
    }
}
