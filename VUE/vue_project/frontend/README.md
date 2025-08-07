# Front-end 작업 환경 초기 설정

## ROOT 초기 설치

- [nodejs](https://nodejs.org/en/download) : v18
- [pnpm](https://pnpm.io/ko/installation) : v8
- [Turborepo](https://turbo.build/repo/docs/installing) : 설치 안해도 개발은 가능
- [VSCode](https://code.visualstudio.com/download) : 추천하는 extensions은 설치할 것
- [git]() : 내부망 링크 막혀있음

## 개발 환경 초기 설정

```bash
$ git config --global user.name "Your Name"
$ git config --global user.email you@example.com
```

### Seegene wisdom 프로젝트 클론

- ex VSCode : 커멘드 팔렛트 오픈(command + shift + p)
- 'Git: clone' 입력 후 clone 주소 입력 https://github.com/seegene/wisdom-frontend.git
- 연결 후 추천하는 extensions은 설치할 것

이후

```bash
pnpm install

pnpm dev
```

### directory

- apps : Front pages
  - admin : Platform back office
  - platform
  - insilico
  - storybook
- packages : 공통 모듈
  - ui : 공통 컴포넌트 모음
  - editor : 공통 에디터
  - library : 공통 라이브러리

---

## 배포 참조

[GitHub Action](https://turbo.build/repo/docs/ci/github-actions)

```sh
pnpm i
pnpm build
```

- platform s3 : ./apps/platform/out/
- insilico s3 : ./apps/isc/insilico/
- platform back office s3 : ./apps/admin/out/

## turborepo 참조

- [Turborepo gen](https://turbo.build/repo/docs/reference/command-line-reference/gen)
- [Turborepo package](https://turbo.build/repo/docs/handbook/package-installation)
- [Turborepo workspaces](https://turbo.build/repo/docs/handbook/workspaces)
