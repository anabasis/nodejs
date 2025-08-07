# wisdom-isp-main-backend
통합 서비스 플랫폼 메인 WEB을 위한 Backend API 서버 \
-----
## Application Info
- `Springboot Version : 3.0.6`
- `Java Version : 17`
- `KeyCloak 20.0.5`
- `Mysql Version : 8`
- `Library : jpa, security, validation, actuator, lang, aop, aws, mysql, gson, swagger ...`
-----
## API Docs (swagger-ui)
> local : http://localhost:8088/swagger-ui/index.html \
> dev : https://main-isp.dev.sg-drdp.com/swagger-ui/index.html \
> stg : https://main-isp.stg.sg-drdp.com/swagger-ui/index.html
-----
## Keycloak Info
> Relam : seegene  
> Client : platform-client
-----
## Application Build Setting
- [Edit Configurations] - [VM Options] : -Dspring.profiles.active={activeMode}, 
- activeMode: local, stg, test
----------
## Git Branch 
```bash
└── main
    └── develop
        └── feature
            └── devOps Task Number
    └── release 
        └── CI_STG