# BigBlueButton

- [API](https://docs.bigbluebutton.org/dev/api.html)
- [recording](https://docs.bigbluebutton.org/dev/recording.html)
- HTML5(iOS 12.2+ and Android 6.0+), fireFox,Chrome


- 이전 버전보다 2배 빠른 로딩
- 고품질 오디오, 비디오 및 화면 공유 (WebRTC 사용)
- 다중 사용자 편집을 위한 공유 메모 (우수한 EtherPad 프로젝트 사용)
- 화면 판독기에 완전히 액세스
- 세션 중에 YouTube 비디오 공유

## Requirement

### 최소 서버 요구 사항

- Linux 커널 4.x를 실행하는 Ubuntu 16.04 64 비트 OS
- 스왑이 활성화 된 4GB 메모리 (8GB 메모리 권장)
- CPU코어 4개 (8개가 좋음)
- TCP 포트 80 및 443에 액세스
- UDP 포트 16384-32768에 액세스
- 다른 응용 프로그램에서 포트 80을 사용하고 있지 않습니다

### 제품용

- 녹화를 위한 500G 이상의 디스크 여유 공간
- 250Mbits / sec 대역폭 (대칭)이상
- 전용 (베어 메탈) 하드웨어
- SSL 인증서 설정을위한 호스트 이름 (예 : bbb.example.com)
- IPV4 및 IPV6 주소

>> 베어메탈 서버를 권장하는 이유 : BigBlueButton은 수신 오디오 패킷 처리에 FreeSWITCH를 사용하며 FreeSWITCH는 가상화되지 않은 환경에서 가장 잘 작동(FreeSWITCH 권장 구성 참조).

### 워크 스테이션에서 로컬 개발용

BigBlueButton을 설정하는 경우 서버를 사용하는 유일한 서버이기 때문에 서버 요구 사항을 약간 완화
BigBlueButton을 실행 가능

- 2개의 CPU 코어
- 로컬 VM 또는 LXC 컨테이너에 설치
- IPV4 주소 만 (호스트 이름 없음)

>> 서버에서 SSL을 구성하지 않으면 웹실시간 통신(WebRTC)을 사용하여 마이크, 웹캠 또는 화면을 공유 할 수 없음. 다시 말해 모든 브라우저는 HTML5 응용 프로그램이 미디어 공유를 위해 액세스를 요청하기 전에 HTTPS를 통해 페이지를 로드해야 함

### Cloud

Amazon EC2에 BigBlueButton을 설치하려면 c5.xlarge (또는 더 큰 CPU) 인스턴스에서 BigBlueButton을 실행(최신 컴퓨팅 인스턴스는 베어 메탈 성능에 매우 가깝움)

### 사용자

- 최종 사용자의 최소 요구 사항은 최신 버전의 Firefox 또는 Chrome과 다음 최소 대역폭 요구 사항을 권장

## Pre-installation 체크

### 로컬 encoding확인

```bash
cat /etc/default/locale
LANG = "en_US.UTF-8"
```

LANG = "en_US.UTF-8"이 표시되지 않으면 다음 명령을 입력하여 로컬을 en_US.UTF-8로 설정

```bash
sudo apt-get install language-pack-en
sudo update-locale LANG=en_US.UTF-8
```

>> 참고 : LC_ALL=en_US.UTF-8 행이 추가로 표시되면 '/etc/default/locale'에서 LC_ALL항목을 제거하고 로그아웃 한 후 다시 로그인

다음으로 'sudo systemctl show-environment'를 수행하고 출력에 LANG=en_US.UTF-8이 표시되는지 확인

```bash
sudo systemctl show-environment
LANG = ko_KR.UTF-8
PATH = /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/ bin
```

표시되지 않으면 'sudo systemctl set-environment LANG=en_US.UTF-8'을 수행하고 위의 'sudo systemctl show-environment'를 다시 실행하고 출력에 LANG=en_US.UTF-8이 표시되는지 확인

그런 다음 free -h 명령을 사용하여 서버에 4G의 메모리가 있는지 확인

```bash
$ free -h
              total        used        free      shared  buff/cache   available
Mem:            31G        5.9G        314M        1.8G         25G         21G
Swap:           31G        360M         31G
```

4G 미만의 전체 열에 Mem : 값이 표시되면 (위의 예는 31G로 표시됨) 서버에 BigBlueButton을 실행하기 위한 메모리가 부족. 서버의 메모리를 4G 이상으로 늘려야 함

다음으로 서버에 Ubuntu가 16.04인지 확인

```bash
$  cat /etc/lsb-release
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=16.04
DISTRIB_CODENAME=xenial
DISTRIB_DESCRIPTION="Ubuntu 16.04.x LTS"
```

그런 다음 서버에서 64 비트 버전의 Ubuntu 16.04를 실행하고 있는지 확인

```bash
$ uname -m
x86_64
```

다음으로 서버가 IPV6을 지원하는지 확인

```bash
$ ip addr | grep inet6
inet6 ::1/128 scope host
...


'inet6 :: 1/128 범위 호스트'행이 표시되지 않으면 BigBlueButton을 설치 한 후 FreeSWITCH 구성을 수정하여 IPV6 지원을 비활성화 해야 함

그런 다음 서버에서 Linux 커널 4.x를 실행하고 있는지 확인

```bash
uname -r
4.15.0-38-generic
```

```bash
uname -r
4.15.0-38-generic

$ cat /proc/cpuinfo | awk '/^processor/{print $3}' | wc -l
4
```

>> 참고 : BigBlueButton은 2.6 커널 (예 : OpenVZ VPS의 x86_64의 Linux 2.6.32-042stab133.2)에서 실행되지 않음

## OS 환경

### 한글폰트

```bash
# 1. fbterm(Frame Buffer Terminal) 설치
sudo apt-get install fbterm

# 2. 한글 폰트 설치(오픈 폰트인 나눔폰트)
sudo apt-get install fonts-nanum-coding

# 위의 명령어는 우분투 14버젼 기준인데 그 이상의 버젼에서도 잘 실행되나 설치하는 운영체제 버젼이 14.04 하위 버젼인 경우엔 아래의 명령어를 사용해 보세요.
sudo apt-get install ttf-nanum-coding

#3. 아래의 명령어를 입력해보고 한글이 제대로 출력되는지 확인
sudo fbterm
sudo apt-get update
```

### SSH

```bash
sudo apt-get install openssl-server

sudo service ssh start
sudo service ssh status
```

### Networking

```bash
vi /etc/network/interfaces

# DHCP로 설정
auto lo
iface lo inet loopback
auto eth0
iface eth0 inet dhcp

# STATIC

auto lo
iface lo inet loopback

auto eth0
iface eth0 inet static
address xxx.xxx.xxx.xxx
netmask xxx.xxx.xxx.xxx
gateway xxx.xxx.xxx.xxx
dns-nameservers xxx.xxx.xxx.xxx
```

## Install





##