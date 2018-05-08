# 위협 인텔리전스

Splunk Enterprise Security에 위협 인텔리전스 추가
ES 관리자는 위협 인텔리전스를 Splunk Enterprise Security에 추가하여 수상한 활동 또는 알려진 위협이나 잠재적 위협의
지표를 이벤트와 상관할 수 있습니다. 위협 인텔리전스를 추가하면 애널리스트의 보안 모니터링 기능이 강화되고 조사에 컨
텍스트가 추가됩니다.
Splunk Enterprise Security에는 엄선된 위협 인텔리전스 소스가 포함되어 있고, 원하는 위협 인텔리전스를 추가할 수 있도
록 여러 가지 유형의 위협 인텔리전스가 지원됩니다.
ES 관리자는 인터넷에서 피드를 다운로드하거나, 구조화된 파일을 업로드하거나, Splunk Enterprise Security의 이벤트에
서 직접 위협 인텔리전스를 삽입하여 위협 인텔리전스를 Splunk Enterprise Security에 추가할 수 있습니다.
전제 조건
Splunk Enterprise Security가 지원하는 위협 인텔리전스 유형을 검토하십시오. Splunk Enterprise Security에서 지원되는
위협 인텔리전스 유형을 확인하십시오.
절차
1. Splunk Enterprise Security에 포함된 위협 인텔리전스 소스를 설정합니다.
2. Splunk Enterprise Security에 이미 포함되어 있지 않은 각각의 추가적인 위협 인텔리전스 소스에 대해, 추가하려는
인텔리전스의 소스 및 형식과 일치하는 위협 인텔리전스를 다음 절차에 따라 추가합니다.
인터넷에서 위협 인텔리전스 피드 다운로드
구조화된 STIX 또는 OpenIOC 위협 인텔리전스 파일 업로드
위협 인텔리전스의 사용자 지정 CSV 파일 업로드
Splunk Enterprise Security에서 Splunk 이벤트로부터 위협 인텔리전스 추가
Splunk Enterprise Security에서 위협 인텔리전스를 로컬에서 추가 및 유지 관리
Splunk Enterprise Security에서 사용자 지정 룩업 파일을 사용하여 위협 인텔리전스 추가
3. Splunk Enterprise Security에서 위협 인텔리전스를 성공적으로 추가했는지 확인합니다.
참고 항목은 아래와 같습니다.
Splunk Enterprise Security에서 기존 위협 인텔리전스 변경
adaptive response 작업을 통해 위협 인텔리전스 추가
REST API 조회에서 위협 인텔리전스 API 참조
Splunk 개발자 포털의 Splunk ES의 위협 인텔리전스 프레임워크
Splunk Enterprise Security에서 지원되는 위협 인텔리전스 유형
Splunk Enterprise Security는 여러 가지 유형의 위협 인텔리전스를 지원합니다. 지원되는 위협 인텔리전스 유형은 위협 인
텔리전스가 저장된 KV 스토어 컬렉션에 해당합니다.
위협 인텔리전스 관리자 모듈식 입력은 다운로드 및 업로드된 파일을 파싱하고 이 컬렉션에 지표를 추가합니다. 파일에는 임
의의 지표 조합이 포함될 수 있습니다.
KV 스토어의
위협 컬렉션
지원되
는 IOC
데이터
유형
로컬 룩
업 파일
룩업 파일에 필요한 헤더
certificate_intel
X509 인
증서
로컬 인
증서 인
텔리전스
certificate_issuer, certificate_subject, certificate_issuer_organization,
certificate_subject_organization, certificate_serial,
certificate_issuer_unit, certificate_subject_unit, description, weight
email_intel 이메일
로컬 이
메일 인
텔리전스
description, src_user, subject, weight
file_intel
파일 이
름 또는
해시
로컬 파
일 인텔
리전스
description, file_hash, file_name, weight
로컬


http_intel URL HTTP 인
텔리전스
description, http_referrer, http_user_agent, url, weight
ip_intel
IP 주소
로컬 IP
인텔리전
스
description, ip, weight
도메인
로컬 도
메인 인
텔리전스
description, domain, weight
process_intel 프로세스
로컬 프
로세스
인텔리전
스
description, process, process_file_name, weight
registry_intel
레지스트
리 항목
로컬 레
지스트리
인텔리전
스
description, registry_path, registry_value_name, registry_value_text,
weight
service_intel 서비스
로컬 서
비스 인
텔리전스
description, service, service_file_hash, service_dll_file_hash, weight
user_intel 사용자
로컬 사
용자 인
텔리전스
description, user, weight
DA-ESS-ThreatIntelligence 하위 디렉터리의 collections.conf 파일에는 이런 KV 스토어 컬렉션이 나열되어 있습니다.
Splunk Enterprise Security에 포함된 인텔리전스 소스 설정
Splunk Enterprise Security에는 인터넷에서 정보를 검색하는 여러 인텔리전스 소스가 포함되어 있습니다.
이런 인텔리전스 소스 중 어느 인텔리전스 소스도 기본적으로 활성화되지 않습니다. 소스에 의해 제공되는 인텔리전스의 유
형을 검토하고 특정 소스를 활성화하기 전에 포함된 인텔리전스가 팀에 유용한지 확인하십시오.
전제 조건
Splunk Enterprise 배포가 인터넷에 연결되어 있어야 합니다. 배포가 인터넷에 연결되어 있지 않은 경우 이런 소스를
비활성화하거나 다른 방법으로 제공받으십시오.
이런 소스에 대한 방화벽 규칙을 설정하려면 프록시 서버를 사용하여 인텔리전스를 수집한 후 Splunk Enterprise
Security에 전달하고 프록시 서버의 IP 주소에서 Splunk Enterprise Security에 액세스하는 것을 허용해야 할 수 있습
니다. 이런 소스의 IP 주소는 변경될 수 있습니다.
절차
1. Enterprise Security 메뉴 모음에서 설정 > 데이터 보강 > 인텔리전스 다운로드를 선택합니다.
2. 정의된 모든 인텔리전스 소스에 대한 설명 필드를 검토하여 이벤트와 상관될 수 있는 정보 또는 위협 지표의 유형에 대
해 자세히 알아봅니다.
3. 보안 이용 사례에 적합한 인텔리전스 소스를 활성화합니다.
4. 소스 웹사이트로 연결되는 링크를 사용해 소스 제공자의 문서를 검토하여 보안 이용 사례에 적합한 활성화된 인텔리전
스 소스를 설정합니다. 각 소스 웹사이트에서는 폴링 간격 및 기타 설정 요구사항에 대한 제안을 Splunk Enterprise
Security와 별도로 제공합니다.
Splunk Enterprise Security는 모든 인텔리전스 소스가 올바른 형식의 데이터와 가치 있는 인텔리전스 정보를 전송한다고
예상합니다. 피드 제공자는 형식이 잘못된 데이터와 이로 인해 환경에서 확인될 수 있는 가양성에 대해 책임져야 합니다.
Splunk Enterprise Security 설치본이 예기치 않은 IP 주소에서 데이터를 검색하고 있다고 판단될 경우, WHOIS 또는
nslookup을 수행하여 IP 주소가 환경에서 설정된 인텔리전스 소스의 주소와 일치하는지 확인하십시오.
다음 단계
사용자 지정 위협 소스를 추가하려면 Splunk Enterprise Security에 위협 인텔리전스 추가를 참조하고 추가할 소스와 일치
하는 링크를 따르십시오.
인텔리전스 소스 추가를 완료했으면 Splunk Enterprise Security에 인텔리전스를 성공적으로 추가했는지 확인을 참조하십
시오.

포함된 위협 인텔리전스 소스
위협 인텔리전스 소스는 위협 지표에 대해 파싱되며 관련 KV 스토어 컬렉션에 추가됩니다.
위협 소스 위협 리스트 제공자 위협 소스 웹사이트
Emerging Threats compromised IPs blocklist Emerging Threats http://rules.emergingthreats.net/blockrules
Emerging Threats firewall IP rules Emerging Threats http://rules.emergingthreats.net/fwrules
Malware domain host list Hail a TAXII.com http://hailataxii.com
iblocklist Logmein I-Blocklist https://www.iblocklist.com/lists
iblocklist Piratebay I-Blocklist https://www.iblocklist.com/lists
iblocklist Proxy I-Blocklist https://www.iblocklist.com/lists
iblocklist Rapidshare I-Blocklist https://www.iblocklist.com/lists
iblocklist Spyware I-Blocklist https://www.iblocklist.com/lists
iblocklist Tor I-Blocklist https://www.iblocklist.com/lists
iblocklist Web attacker I-Blocklist https://www.iblocklist.com/lists
Malware Domain Blocklist Malware Domains http://mirror1.malwaredomains.com
abuse.ch Palevo C&C IP Blocklist abuse.ch https://palevotracker.abuse.ch
Phishtank Database Phishtank http://www.phishtank.com/
SANS blocklist SANS http://isc.sans.edu
abuse.ch ZeuS blocklist(악성 IP만) abuse.ch https://zeustracker.abuse.ch
abuse.ch ZeuS blocklist(기본) abuse.ch https://zeustracker.abuse.ch
포함된 일반 인텔리전스 소스
Splunk Enterprise Security에는 위협 인텔리전스 KV 스토어 컬렉션에 추가되지 않고 Splunk Enterprise Security의 데이
터를 보강하는 데 대신 사용되는 일반 인텔리전스가 포함됩니다.
데이터 리스트 데이터 제공자 데이터 제공자 웹사이트
Alexa Top 1 Million Sites Alexa Internet http://www.alexa.com/topsites
Mozilla Public Suffix List Mozilla https://publicsuffix.org
ICANN Top-level Domains List IANA http://www.iana.org/domains/root/db
인터넷에서 Splunk Enterprise Security로 위협 인텔리전스 피드 다운로
드
Splunk Enterprise Security는 인터넷에서 제공되는 위협 인텔리전스 피드를 정기적으로 다운로드 및 파싱하고 관련 KV 스
토어 컬렉션에 추가할 수 있습니다.
1. (선택 사항) 위협 인텔리전스 검색 프록시를 설정합니다.
2. 다음 절차 중 위협 소스의 형식에 해당하는 절차를 따릅니다.
URL 기반 위협 소스 추가
TAXII 피드 추가
위협 인텔리전스 검색 프록시 설정
프록시 서버를 사용하여 위협 인텔리전스를 Splunk Enterprise Security로 전송하는 경우, 위협 소스 프록시 옵션을 설정하
십시오.
사용자는 자격 증명 관리에 Splunk가 안전하게 저장한 자격 증명의 이름과 일치해야 합니다. 인텔리전스 다운로드 설정 편

집기에서 기존 프록시 사용자 및 암호를 제거하면 다운로드 프로세스에서 저장된 자격 증명을 더 이상 참조하지 않습니다.
자격 증명 참조를 제거해도 저장된 자격 증명이 자격 증명 관리에서 삭제되지 않습니다. Splunk Enterprise Security에서 자
격 증명 관리를 참조하십시오.
1. Enterprise Security 메뉴 모음에서 설정 > 데이터 보강 > 인텔리전스 다운로드를 선택합니다.
2. 위협 다운로드 소스를 선택하거나 새 위협 다운로드 소스를 추가합니다. URL 기반 위협 소스 추가 또는 TAXII 피드 추
가를 참조하십시오.
3. 프록시 옵션을 설정합니다.
1. 프록시 서버 주소를 입력합니다. 프록시 서버는 URL일 수 없습니다. 예: 10.10.10.10 또는 server.example.com
2. 프록시 서버 주소에 액세스하기 위해 사용할 프록시 서버 포트를 입력합니다.
3. 프록시 서버의 프록시 사용자 자격 증명을 입력합니다. 기본 및 다이제스트 인증 방법만 지원됩니다.
4. 변경 사항을 저장합니다.
URL 기반 위협 소스 추가
인터넷에서 URL을 통해 제공되는 TAXII 이외의 인텔리전스 소스를 추가합니다. URL 기반 위협 인텔리전스 소스를 추가하
는 방법은 예: Splunk Enterprise Security에 랜섬웨어 위협 피드 추가를 참조하십시오.
1. Enterprise Security 메뉴 모음에서 설정 > 데이터 보강 > 인텔리전스 다운로드를 선택합니다.
2. 새로 추가를 클릭하여 새 인텔리전스 소스를 추가합니다.
3. 위협 다운로드의 이름을 입력합니다. 이름에는 영숫자, 하이픈, 밑줄만 포함될 수 있습니다. 이름에 공백이 있으면 안
됩니다.
4. 위협 인텔리전스? 체크박스를 선택하거나 선택 해제합니다.
5. (선택 사항) 싱크홀 체크박스를 선택하거나 선택 해제합니다. 처리 후 다운로드된 파일을 삭제하려면 체크박스를 선택
합니다.
6. 위협 다운로드 유형을 입력합니다. 유형은 피드에 포함된 위협 지표 유형을 식별합니다.
7. 설명을 입력합니다. 위협 피드에 있는 지표에 대해 설명합니다.
8. 위협 지표의 가중치로 사용할 정수를 입력합니다. Enterprise Security는 위협 피드의 가중치를 사용하여 위협 피드의
지표와 연결된 자산 또는 ID의 위험 점수를 계산합니다. 가중치가 클수록 더 중요하거나 환경에 더 큰 위험을 제기함을
나타냅니다.
9. (선택 사항) 위협 피드의 기본 다운로드 간격을 변경합니다. 기본값은 43200초, 즉 매 12시간입니다.
10. (선택 사항) 위협 피드 POST 인수를 입력합니다.
11. (선택 사항) 최대 기간을 입력하여 이 위협 소스의 보존 기간을 상대 시간으로 정의합니다. 해당 저장된 검색을 활성화
하여 이 설정을 적용합니다. 위협 소스 보존 기간 설정을 참조하십시오.
예: -7d. 피드가 마지막으로 업데이트된 시간이 이 설정을 사용하여 정의한 최대 기간보다 큰 경우, 위협 인텔리전스 모
듈식 입력이 데이터를 위협 컬렉션에서 제거합니다.
12. (선택 사항) 환경의 네트워크 보안 컨트롤을 우회하기 위해 사용자 지정 사용자 에이전트 문자열을 지정해야 하는 경
우 <user-agent>/<version> 형식으로 입력합니다. 예: Mozilla/5.0 또는 AppleWebKit/602.3.12 이 필드의 값은 다음 정규
식과 일치해야 합니다. ([A-Za-z0-9_.-]+)/([A-Za-z0-9_.-]+). 여기에 입력하는 문자열이 네트워크 보안 컨트롤에 의해
허용되는지 보안 장치 관리자에게 확인하십시오.
13. 위협 리스트가 성공적으로 파싱되도록 파싱 옵션 필드를 작성합니다. 구분 정규식 또는 추출 정규식을 작성해야 합니
다. 두 필드를 모두 비워둘 수 없습니다.
필
드
설명 예
구
분
정
규
식
인텔리전스 소스에서 줄을 분할하거나 구분하는 데 사용되는 정규식
문자열입니다. 구분자가 복잡한 경우 추출 정규식을 사용하십시오. , 또는 : 또는 \t
추
출
정
규
식
위협 소스 문서의 각 줄에서 필드를 추출하는 데 사용되는 정규식입니
다. 위협 소스의 값을 추출하는 데 사용합니다. ^(\S+)\t+(\S+)\t+\S+\t+\S+\t*(\S*)
필
드
문서의 줄이 구분된 경우에 필요합니다. 위협 리스트에서 추출할 필드
의 쉼표로 구분된 리스트입니다. 필드의 이름을 바꾸거나 필드를 결합
하는 데 사용할 수도 있습니다. 설명은 필수 필드입니다. 추가로 위협
인텔리전스에 해당하는 KV 스토어 컬렉션의 필드가 허용되며, 로컬 룩
업 파일 또는 DA-ESS-ThreatIntelligence/collections.conf 파일에서 볼
수 있습니다. 기본값은 description:$1,ip:$2입니다.
<fieldname>:$<number>,<field
name>.$<number>
ip:$1,description:domain_blocklist
무
시
정
규
위협 소스에서 줄을 무시하는 데 사용되는 정규식입니다. 기본값은 빈
줄 및 #로 시작되는 코멘트 무시입니다. ^\s*$)


식
헤
더
줄
건
너
뛰
기
위협 소스를 처리할 때 건너뛸 헤더 줄의 수입니다. 0
인
텔
리
전
스
파
일
인
코
딩
파일 인코딩이 ASCII 또는 UTF8이 아니면 여기에 인코딩을 지정하십
시오. 그렇지 않으면 비워 두십시오.
latin1
14. (선택 사항) 위협 리스트가 성공적으로 다운로드되도록 다운로드 옵션 필드를 변경합니다.
필드 설명 예
재시
도 간
격
다운로드 재시도 사이의 대기 시간(초)입니다. 재시도 간격을 변경하기 전에 권장 위협 소스 제공자 폴
링 간격을 검토하십시오.
60
원격
사이
트 사
용자
위협 피드를 사용하려면 인증이 필요한 경우, 원격 인증에 사용할 사용자 이름을 입력합니다(필요한
경우). 이 필드에 추가하는 사용자 이름은 자격 증명 관리에 있는 자격 증명 이름과 일치해야 합니다.
Splunk Enterprise Security에서 자격 증명 관리를 참조하십시오.
관
리
자
재시
도
최대 재시도 횟수입니다. 3
제한
시간
다운로드 시도를 실패로 표시하기 전 대기 시간(초)입니다. 30
15. (선택 사항) 프록시 서버를 사용하는 경우 위협 피드에 대한 프록시 옵션을 작성합니다. 위협 인텔리전스 검색 프록시
설정을 참조하십시오.
16. 변경 사항을 저장합니다.
다음 단계
다른 사용자 지정 위협 소스를 추가하려면 Splunk Enterprise Security에 위협 인텔리전스 추가를 참조하고 추가할 소스와
일치하는 링크를 따르십시오.
위협 인텔리전스 소스 추가를 완료했으면 Splunk Enterprise Security에 위협 인텔리전스를 성공적으로 추가했는지 확인을
참조하십시오.
TAXII 피드 추가
TAXII 피드 형식으로 제공되는 위협 인텔리전스를 Splunk Enterprise Security에 추가합니다.
전제 조건
TAXII 피드에 인증서 인증이 필요한지 결정합니다. 인증이 필요한 경우, TAXII 피드를 정의한 앱 디렉터리와 동일한 디렉터
리에 인증서와 키를 추가합니다. 예: DA-ESS-ThreatIntelligence.
1. 인증서와 비공개 키 파일을 모두 추가하려면 Splunk Enterprise Security에 새 인증서를 추가하는 단계를 따르십시
오. Splunk Enterprise Security에서 자격 증명 관리를 참조하십시오.
2. cert_file 및 key_file POST 인수를 사용하여 TAXII 피드를 Splunk Enterprise Security에 추가하는 절차에 따라 인
증서와 개인 키 파일의 파일 이름을 지정합니다.
절차
1. Enterprise Security 메뉴 모음에서 설정 > 데이터 보강 > 인텔리전스 다운로드를 선택합니다.
2. 새로 추가를 클릭하여 새 TAXII 피드를 추가합니다.
3. 위협 인텔리전스 피드의 이름을 입력합니다.
4. 위협 인텔리전스? 체크박스를 선택합니다.
5. 5. (선택 사항) 싱크홀 체크박스를 선택하거나 선택 해제합니다. 처리 후 다운로드된 파일을 삭제하려면 체크박스를 선택
합니다.
6. 유형에 taxii를 입력합니다.
7. 위협 인텔리전스 피드에 대한 설명을 입력합니다.
8. TAXII 피드를 다운로드하는 데 사용할 URL을 입력합니다.
9. (선택 사항) 위협 인텔리전스 피드의 기본 가중치를 변경합니다. 위협 피드의 위협이 신뢰도가 높고 위협 소스의 지표
와 상호작용하는 자산 및 ID의 위험 점수를 높여야 하는 악성 위협인 경우 가중치를 높이십시오.
10. (선택 사항) 위협 인텔리전스를 다운로드할 간격을 조정합니다. 기본값은 43200초, 즉 하루 2번입니다.
11. 위협 인텔리전스 피드의 공백으로 구분된 TAXII 관련 POST 인수를 입력합니다.
<POST argument>="<POST argument value>"
POST 인수 예 설명 예
collection TAXII 피드의 데이터 컬렉션 이름입니다. collection="A_TAXII_Feed_Name"
earliest TAXII 피드에서 가져올 가장 이른 위협 데이터입니다. earliest="-1y"
taxii_username TAXII 피드 사용자 이름을 제공하는 방법(선택 사항)입니다. taxii_username="user"
taxii_password
TAXII 피드 암호를 제공하는 방법(선택 사항)입니다. 암호를
제공하지 않고 사용자 이름을 제공할 경우, 위협 인텔리전스
모듈식 입력은 자격 증명 관리에서 암호를 찾으려고 합니다.
Splunk Enterprise Security에서 자격 증명 관리를 참조하십
시오.
taxii_password="password"
cert_file
TAXII 피드가 인증서 인증을 사용하는 경우 인증서 파일 이름
을 추가합니다. 파일 이름은 정확히 일치해야 하며, 대소문자
를 구별합니다.
cert_file="cert.crt"
key_file
TAXII 피드가 인증서 인증을 사용하는 경우 인증서의 키 파일
이름을 추가합니다. 파일 이름은 정확히 일치해야 하며, 대소
문자를 구별합니다.
key_file="cert.key"
12. TAXII 피드는 최대 기간 설정을 사용하지 않습니다. TAXII 파일에 대한 파일 보존을 설정하려면 인텔리전스 파일 보
존 설정을 참조하십시오.
13. TAXII 피드는 사용자 에이전트 설정을 사용하지 않습니다.
14. TAXII 피드는 파싱 옵션 설정을 사용하지 않습니다.
15. (선택 사항) 다운로드 옵션을 변경합니다.
16. (선택 사항) 프록시 옵션을 변경합니다. 위협 인텔리전스 검색 프록시 설정을 참조하십시오.
17. 변경 사항을 저장합니다.
Enterprise Security에서 사용하는 libtaxii 라이브러리는 인증된 프록시를 지원하지 않으므로 인증된 프록시를 TAXII 피드
와 함께 사용할 수 없습니다. 가능한 경우 인증되지 않은 프록시를 대신 사용하십시오.
다음 단계
다른 사용자 지정 위협 소스를 추가하려면 Splunk Enterprise Security에 위협 인텔리전스 추가를 참조하고 추가할 소스와
일치하는 링크를 따르십시오.
위협 인텔리전스 소스 추가를 완료했으면 Splunk Enterprise Security에 위협 인텔리전스를 성공적으로 추가했는지 확인을
참조하십시오.
Splunk Enterprise Security에 구조화된 STIX 또는 OpenIOC 인텔리전
스 파일 업로드
다음 방법 중 하나를 사용하여 STIX 또는 OpenIOC 파일의 위협 인텔리전스를 Splunk Enterprise Security에 업로드하십
시오.
Splunk Enterprise Security 인터페이스를 사용하여 STIX 또는 OpenIOC 파일 업로드
REST API를 사용하여 STIX 또는 OpenIOC 파일 추가
파일 시스템을 사용하여 STIX 또는 OpenIOC 파일 추가
Splunk Enterprise Security 인터페이스를 사용하여 STIX 또는 OpenIOC 파일 업로드
Splunk Enterprise Security는 OpenIOC, STIX 및 CSV 파일 형식을 Splunk Enterprise Security 인터페이스에서 직접 추
가하는 기능을 지원합니다.
1. Enterprise Security 메뉴 모음에서 설정 > 데이터 보강 > 위협 인텔리전스 업로드를 선택합니다.
2. 업로드할 파일의 파일 이름을 입력합니다. 입력하는 파일 이름은 $SPLUNK_HOME/etc/apps/DA-ESSThreatIntelligence/
local/data/threat_intel에 저장되는 파일의 이름이 됩니다. 파일 이름에 공백이나 특수 문자가 있

으면 안 됩니다.
3. OpenIOC 또는 STIX 형식 파일을 업로드합니다.
4. 위협 인텔리전스 파일의 가중치를 입력합니다. 위협 인텔리전스 파일의 가중치는 이 리스트에 있는 위협 인텔리전스
와 연결된 개체의 위험 점수를 높입니다.
5. (선택 사항) 위협 범주를 입력합니다. 이 필드를 비워둘 경우, OpenIOC 또는 STIX 파일에 범주가 지정되어 있으면
Splunk Enterprise Security가 파일에 지정되어 있는 위협 범주를 사용합니다.
6. (선택 사항) 위협 그룹을 입력합니다. 이 필드를 비워둘 경우, OpenIOC 또는 STIX 파일에 그룹이 지정되어 있으면
Splunk Enterprise Security가 파일에 지정되어 있는 위협 그룹을 사용합니다.
7. (선택 사항) 덮어쓰기 체크박스를 선택합니다. 이전에 파일 이름이 같은 파일을 업로드한 경우, 이 체크박스를 선택하
여 이전 파일 버전을 덮어쓰십시오.
8. (선택 사항) 싱크홀 체크박스를 선택합니다. 파일의 인텔리전스가 처리된 후 파일이 삭제됩니다.
9. 저장을 클릭합니다.
다음 단계
다른 사용자 지정 위협 소스를 추가하려면 Splunk Enterprise Security에 위협 인텔리전스 추가를 참조하고 추가할 소스와
일치하는 링크를 따르십시오.
위협 인텔리전스 소스 추가를 완료했으면 Splunk Enterprise Security에 위협 인텔리전스를 성공적으로 추가했는지 확인을
참조하십시오.
REST API를 사용하여 STIX 또는 OpenIOC 파일 추가
Splunk Enterprise Security REST API는 OpenIOC, STIX 또는 CSV 위협 인텔리전스 파일 형식의 업로드를 지원합니다.
위협 인텔리전스 API 참조를 참조하십시오.
다음 단계
다른 사용자 지정 위협 소스를 추가하려면 Splunk Enterprise Security에 위협 인텔리전스 추가를 참조하고 추가할 소스와
일치하는 링크를 따르십시오.
위협 인텔리전스 소스 추가를 완료했으면 Splunk Enterprise Security에 위협 인텔리전스를 성공적으로 추가했는지 확인을
참조하십시오.
파일 시스템을 사용하여 STIX 또는 OpenIOC 파일 추가
올바른 형식의 파일을 파일 시스템 폴더에 추가하여 Splunk Enterprise Security에 위협 인텔리전스를 추가할 수도 있습니
다.
1. 파일 확장자가 .xml인 STIX 형식 파일이나 파일 확장자가 .ioc인 OpenIOC 파일을 Splunk Enterprise Security 검색
헤드의 $SPLUNK_HOME/etc/apps/DA-ESS-ThreatIntelligence/local/data/threat_intel 폴더에 추가하거나, 해당 파일 디
렉터리를 마운트된 로컬 네트워크 공유에서 사용할 수 있게 합니다.
2. 기본적으로, da_ess_threat_local 모듈식 입력은 이런 파일을 처리하고 검색된 위협 인텔리전스를 관련 KV 스토어 컬
렉션에 저장합니다.
3. 기본적으로, 모듈식 입력은 파일에 있는 인텔리전스를 처리한 후 싱크홀 설정이 기본적으로 활성화되어 있기 때문에
파일을 삭제합니다.
da_ess_threat_local 입력 설정 변경
1. Enterprise Security 메뉴 모음에서 설정 > 데이터 보강 > 위협 인텔리전스 관리를 선택합니다.
2. da_ess_threat_local 모듈식 입력을 클릭합니다.
3. 필요에 따라 설정을 검토하거나 변경합니다.
기본 da_ess_threat_default 입력을 변경하지 마십시오.
사용자 지정 위협 소스 폴더 및 입력 모니터 설정
올바른 형식의 파일을 사용자 지정 파일 디렉터리에 추가하여 Splunk Enterprise Security에 위협 인텔리전스를 추가할 수
도 있습니다. 파일 디렉터리는 $SPLUNK_HOME/etc/apps/<app_name>/local/data/<directory_name> 패턴과 일치해야 하며, 해당
파일 디렉터리에서 위협 인텔리전스를 모니터링할 입력 모니터를 만들어야 합니다.
위협 소스 입력 모니터를 만들어 da_ess_threat_local 모듈식 입력에 의해 모니터링되는 폴더가 아닌 다른 폴더에 위협 인
텔리전스를 추가합니다.
1. Enterprise Security 메뉴 모음에서 설정 > 데이터 보강 > 위협 인텔리전스 관리를 선택합니다.
2. 새로 만들기를 클릭합니다.
3. 모듈식 입력을 설명하는 이름을 입력합니다. 이름에 공백이 있으면 안 됩니다.
4. 파일 리포지토리 경로를 입력합니다. 파일 리포지토리는
$SPLUNK_HOME/etc/apps/<app_name>/local/data/<directory_name>이어야 합니다.

5. (선택 사항) 최대 파일 크기를 바이트 단위로 입력합니다.
6. (선택 사항) 싱크홀 체크박스를 선택합니다. 이 체크박스를 선택하면 모듈식 입력이 파일을 처리한 후 디렉터리에서
각 파일을 삭제합니다.
7. (선택 사항) 사용할 수 없는 파일 제거 체크박스를 선택합니다. 이 체크박스를 선택하면 모듈식 입력이 파일을 처리한
후 파일에 실행 가능한 위협 인텔리전스가 없는 경우 파일을 삭제합니다.
8. (선택 사항) 이 디렉터리에서 사용되는 모든 위협 인텔리전스 문서에 대한 기본 가중치로 사용할 숫자를 입력합니다.
다음 단계
다른 사용자 지정 위협 소스를 추가하려면 Splunk Enterprise Security에 위협 인텔리전스 추가를 참조하고 추가할 소스와
일치하는 링크를 따르십시오.
위협 인텔리전스 소스 추가를 완료했으면 Splunk Enterprise Security에 위협 인텔리전스를 성공적으로 추가했는지 확인을
참조하십시오.
Splunk Enterprise Security에서 사용자 지정 위협 인텔리전스 CSV 파일
업로드
사용자 지정 위협 인텔리전스 파일을 Splunk Enterprise Security에 추가할 수 있습니다.
전제 조건
사용자 지정 CSV 파일의 형식을 지정합니다. 사용자 지정 파일에는 여러 유형의 인텔리전스를 포함할 수 있지만 CSV 파일
의 각 컬럼에 대한 헤더를 포함해야 합니다. 각 위협 인텔리전스 유형과 관련된 헤더에 대해서는 Splunk Enterprise
Security에서 지원되는 위협 인텔리전스 유형을 참조하십시오.
사용자 지정 파일을 Splunk Enterprise Security에 추가합니다.
1. Enterprise Security 메뉴 모음에서 설정 > 데이터 보강 > 위협 인텔리전스 업로드를 선택합니다.
2. 업로드할 파일의 파일 이름을 입력합니다. 입력하는 파일 이름은 $SPLUNK_HOME/etc/apps/DA-ESSThreatIntelligence/
local/data/threat_intel에 저장되는 파일의 이름이 됩니다. 파일 이름에 공백이나 특수 문자가 있
으면 안 됩니다.
3. CSV 형식 파일을 업로드합니다.
4. 위협 리스트의 가중치를 입력합니다. 위협 파일의 가중치는 이 리스트에 있는 위협 인텔리전스와 연결된 개체의 위험
점수를 높입니다.
5. (선택 사항) 위협 범주를 입력합니다.
6. (선택 사항) 위협 그룹을 입력합니다.
7. (선택 사항) 덮어쓰기 체크박스를 선택합니다. 이전에 파일 이름이 같은 파일을 업로드한 경우, 이 체크박스를 선택하
여 이전 파일 버전을 덮어쓰십시오.
8. (선택 사항) 싱크홀 체크박스를 선택합니다. 파일의 인텔리전스가 처리된 후 파일이 삭제됩니다.
9. 저장을 클릭합니다.
다음 단계
다른 사용자 지정 위협 소스를 추가하려면 Splunk Enterprise Security에 위협 인텔리전스 추가를 참조하고 추가할 소스와
일치하는 링크를 따르십시오.
위협 인텔리전스 소스 추가를 완료했으면 Splunk Enterprise Security에 위협 인텔리전스를 성공적으로 추가했는지 확인을
참조하십시오.
Splunk Enterprise Security에서 Splunk 이벤트로부터 위협 인텔리전스
추가
위협 인텔리전스를 Splunk 이벤트에서 로컬 위협 인텔리전스 룩업에 추가할 수 있습니다.
1. 위협 지표를 생성하는 검색을 작성합니다.
2. | outputlookup local_<threat intelligence type>_intel append=t를 검색 끝에 추가합니다.
예를 들어 웹 서버의 취약성을 테스트하는 IP 주소의 리스트를 생성하는 검색을 작성하고 모듈식 입력에 의해 처리되고
ip_intel KV 스토어 컬렉션에 추가될 local_ip_intel 룩업에 추가합니다.
다음 단계
다른 사용자 지정 위협 소스를 추가하려면 Splunk Enterprise Security에 위협 인텔리전스 추가를 참조하고 추가할 소스와
일치하는 링크를 따르십시오.
위협 인텔리전스 소스 추가를 완료했으면 Splunk Enterprise Security에 위협 인텔리전스를 성공적으로 추가했는지 확인을
참조하십시오.

Splunk Enterprise Security에서 위협 인텔리전스를 로컬에서 추가 및 유
지 관리
각 위협 컬렉션에는 위협 인텔리전스를 수동으로 추가하기 위해 사용할 수 있는 로컬 룩업 파일이 있습니다.
1. Enterprise Security 메뉴 모음에서 설정 > 콘텐츠 관리를 선택합니다.
2. 추가할 위협 지표 유형과 일치하는 로컬 룩업을 찾습니다. 예를 들어 악성 또는 스푸핑된 인증서에 대한 정보를 추가하
려면 로컬 인증서 인텔리전스를 찾습니다.
3. 룩업 이름을 클릭하여 룩업을 편집합니다.
4. 지표를 룩업에 추가합니다. 아래에 행 삽입을 마우스 오른쪽 단추으로 클릭하고 선택하여 새 행을 필요에 따라 추가합
니다.
5. (선택 사항) 가중치 숫자를 입력하여 이 위협 인텔리전스 소스의 지표와 연결된 개체에 대한 위험 점수를 변경합니다.
6. 저장을 클릭합니다.
다음 단계
다른 사용자 지정 위협 소스를 추가하려면 Splunk Enterprise Security에 위협 인텔리전스 추가를 참조하고 추가할 소스와
일치하는 링크를 따르십시오.
위협 인텔리전스 소스 추가를 완료했으면 Splunk Enterprise Security에 위협 인텔리전스를 성공적으로 추가했는지 확인을
참조하십시오.
Splunk Enterprise Security에서 사용자 지정 룩업 파일을 사용하여 위협
인텔리전스 추가
위협 인텔리전스를 Splunk Enterprise Security에 사용자 지정 룩업 파일로 추가할 수 있습니다. Splunk Enterprise
Security에서 룩업 파일을 편집하려면 이 방법으로 사용자 지정 룩업 파일을 추가하십시오. 한 번 추출된 후 인텔리전스가 포
함될 룩업 파일을 추가하려면 CSV 파일을 대신 업로드하십시오. Splunk Enterprise Security에서 사용자 지정 위협 인텔리
전스 CSV 파일 업로드를 참조하십시오.
룩업 기반 위협 소스는 지원되는 위협 인텔리전스 데이터 유형(파일 또는 IP 인텔리전스 등)을 추가할 수 있습니다. Splunk
Enterprise Security에서 지원되는 위협 인텔리전스 유형을 확인하십시오.
전제 조건
사용자 지정 CSV 파일을 만듭니다. 사용자 지정 파일에는 여러 유형의 인텔리전스를 포함할 수 있지만 CSV 파일의 각 컬럼
에 대한 헤더를 포함해야 합니다. 각 위협 인텔리전스 유형과 관련된 헤더에 대해서는 Splunk Enterprise Security에서 지원
되는 위협 인텔리전스 유형을 참조하십시오.
절차
먼저 Splunk Enterprise Security에 룩업을 추가합니다.
1. 설정 > 콘텐츠 관리를 선택합니다.
2. 새 콘텐츠 만들기 > 룩업을 선택합니다.
3. 새로 만들기를 클릭합니다.
4. 업로드할 룩업 파일을 선택합니다.
5. SA-ThreatIntelligence의 앱을 선택합니다.
6. (선택 사항) 파일 이름을 수정합니다. 예를 들어 threatindicatorszerodayattack.csv를 입력합니다.
7. (선택 사항) 정의 이름을 수정합니다. 예를 들어 zero_day_attack_threat_indicators_list)로 수정합니다.
8. 수동 편집의 기본 룩업 유형을 놔둡니다.
9. 룩업 레이블을 입력합니다. 레이블은 콘텐츠 관리 페이지의 룩업 이름으로 표시됩니다. 예: 제로 데이 위협 지표.
10. 룩업 설명을 입력합니다. 예: 제로 데이 멀웨어의 파일 기반 위협 지표
11. 저장합니다.
다음으로 ES가 위협 인텔리전스를 파싱할 수 있도록 룩업 파일에 해당하는 위협 소스 입력 스탠자를 추가합니다.
1. 설정 > 데이터 보강 > 인텔리전스 다운로드를 선택합니다.
2. 새로 만들기를 클릭합니다.
3. 이름을 입력합니다. 이름에 공백이 있으면 안 됩니다. 예: zero_day_attack_threat_indicators.
4. 유형을 입력합니다. 예: zero_day_IOCs
5. 설명을 입력합니다. 예: 제로 데이 멀웨어의 파일 기반 위협 지표
6. 위에서 만든 룩업 정의를 참조하는 URL을 입력합니다. 예: lookup://zero_day_attack_threat_indicators_list
7. (선택 사항) 위협 데이터의 기본 가중치를 변경합니다.
8. (선택 사항) 룩업의 기본 재시도 간격을 변경합니다.
9. 룩업에 여러 유형의 위협 인텔리전스가 포함된 경우 필드 섹션에 헤더를 입력하십시오.

10. 저장합니다.
다음 단계
다른 사용자 지정 위협 소스를 추가하려면 Splunk Enterprise Security에 위협 인텔리전스 추가를 참조하고 추가할 소스와
일치하는 링크를 따르십시오.
위협 인텔리전스 소스 추가를 완료했으면 Splunk Enterprise Security에 위협 인텔리전스를 성공적으로 추가했는지 확인을
참조하십시오.
Splunk Enterprise Security에 인텔리전스를 성공적으로 추가했는지 확
인
새 인텔리전스 소스를 추가하거나 기본 제공 인텔리전스 소스를 설정한 후 인텔리전스가 성공적으로 파싱되고 있고 위협 지
표가 위협 인텔리전스 KV 스토어 컬렉션에 추가되고 있는지 확인합니다. 인텔리전스 파싱을 담당하는 모듈식 입력은 60초
마다 실행됩니다.
인텔리전스 소스가 다운로드되고 있는지 확인
이 확인 절차는 URL 기반 소스 및 TAXII 피드와만 관련이 있습니다.
1. Enterprise Security 메뉴 모음에서 감사 > 위협 인텔리전스 감사(audit)를 선택합니다.
2. 인텔리전스 소스를 찾고 download_status 컬럼에 위협 리스트 다운로드됨이 표시되는지 확인합니다.
3. 인텔리전스 감사(audit) 이벤트를 검토하여 룩업 이름과 연결된 오류가 있는지 확인합니다.
다운로드에 실패하는 경우 curl 또는 wget 유틸리티를 사용하여 Splunk 서버 터미널에서 직접 다운로드를 시도합니다. 이
두 유틸리티 중 하나를 사용하여 인텔리전스 소스를 성공적으로 다운로드할 수 있지만 Splunk Enterprise Security에는 성
공적으로 다운로드되지 않는 경우, 사용자 지정 사용자 에이전트 문자열을 지정하여 환경의 네트워크 보안 컨트롤을 우회해
야 하는지 시스템 관리자에게 문의하십시오. URL 기반 위협 소스 추가에서 10 단계를 참조하십시오.
위협 지표가 위협 컬렉션에 있는지 확인
위협 인텔리전스 소스의 경우 위협 인텔리전스가 성공적으로 파싱되고 위협 컬렉션에 위협 지표가 존재하는지 확인합니다.
1. 보안 인텔리전스 > 위협 인텔리전스 > 위협 아티팩트를 선택합니다.
2. 인텔리전스 소스 ID 필드에서 위협 소스 이름을 검색합니다.
3. 위협 소스에 대한 위협 지표가 있는지 확인합니다.
파싱 오류 문제 해결
다음 로그 파일을 검토하여 인텔리전스 소스를 Enterprise Security에 추가하기 위해 파싱할 때 발생할 수 있는 오류 문제를
해결합니다.
문제 제안
인텔리전소 소스 다
운로드와 관련된 문
제
위협 인텔리전스 감사(audit) 대시보드의 인텔리전스 감사(audit) 이벤트 패널을 확인합니다.
threatintel:download sourcetype을 사용하여 threatlist.log 파일에서 이벤트를 찾습니다.
파싱 또는 처리와
관련된 문제.
위협 인텔리전스 감사(audit) 대시보드의 인텔리전스 감사(audit) 이벤트 패널을 확인합니다.
threatintel:manager sourcetype을 사용하여 threat_intelligence_manager.log 파일에서 이벤트를
찾습니다.
파일 업로드 결과
오류. threat_intel_file_upload_rest_handler.log 파일을 검토합니다.
기타 파싱 오류.
모듈식 입력이 예상대로 실행되는지 확인합니다. 모듈식 입력 문제와 관련된 오류는
python_modular_input.log를 참조하십시오.
Splunk Enterprise Security에서 기존 인텔리전스 변경
인텔리전스를 Splunk Enterprise Security에 추가한 후, 이벤트와 상관하는 인텔리전스가 유용하도록 설정을 변경할 수 있
습니다.
인텔리전스 소스 비활성화
소스에서 정보 다운로드를 중지하려면 인텔리전스 소스를 비활성화합니다. 이렇게 하면 비활성화된 소스의 새 위협 지표가

위협 인텔리전스 컬렉션에 추가되지 않습니다.
1. Enterprise Security 메뉴 모음에서 설정 > 데이터 보강 > 인텔리전스 다운로드를 선택합니다.
2. 인텔리전스 소스를 찾습니다.
3. 상태 아래에서 비활성화를 클릭합니다.
개별 위협 아티팩트 비활성화
위협 리스트의 개별 위협 아티팩트가 환경의 이벤트와 일치하는 경우 주요 이벤트를 만들지 않도록 하려면 개별 위협 아티팩
트를 비활성화합니다. Enterprise Security 검색 헤드에 대한 명령줄 접근 권한이 있는 경우, REST API를 사용하여 개별 위
협 아티팩트를 비활성화할 수 있습니다. Splunk Enterprise Security REST API 조회에서 위협 인텔리전스 API 참조를 참
조하십시오.
인텔리전스 소스 편집
인텔리전스 소스 보존 기간 또는 다운로드 간격 등 기존 소스에 대한 정보를 변경합니다.
1. Enterprise Security 메뉴 모음에서 설정 > 데이터 보강 > 인텔리전스 다운로드를 선택합니다.
2. 편집할 인텔리전스 소스의 이름을 클릭합니다.
3. 필드를 필요에 따라 변경합니다.
4. 변경 사항을 저장합니다.
기본적으로 관리자만 인텔리전스 소스를 편집할 수 있습니다. 관리자가 아닌 사용자가 인텔리전스 소스를 편집할 수 있게 하
는 방법은 설치 및 업그레이드 매뉴얼에서 역할에 기능 추가를 참조하십시오.
위협 소스 보존 설정
위협 인텔리전스가 Enterprise Security에 추가된 날짜를 기준으로 Splunk Enterprise Security의 KV 스토어 컬렉션에서
인텔리전스를 제거합니다.
1. 위협 인텔리전스 소스가 TAXII 피드가 아닌 경우 위협 인텔리전스의 최대 기간을 정의하십시오. TAXII 피드의 경우 이
필드는 사용되지 않습니다.
1. Enterprise Security 메뉴 모음에서 설정 > 데이터 보강 > 인텔리전스 다운로드를 선택합니다.
2. 인텔리전스 소스를 선택합니다.
3. 상대 시간 지정자를 사용하여 최대 기간 설정을 변경합니다. 예: -7d 또는 -30d
2. 컬렉션 보존 검색을 활성화합니다.
1. Splunk 플랫폼 메뉴 모음에서 설정을 선택하고 검색, 보고서 및 경고를 클릭합니다.
2. 검색 필터를 사용하여 "retention"을 검색합니다.
3. 위협 소스를 호스트하는 컬렉션에 대해 보존 검색을 활성화합니다. 모든 보존 검색은 기본적으로 비활성화됩니
다.
위협 인텔리전스 파일 보존 설정
파일이 처리된 후 Splunk Enterprise Security에 의해 저장되는 기간을 설정합니다. 위협 인텔리전스 관리 페이지에서 관리
되는 모듈식 입력이 인텔리전스 소스의 파일 파싱을 처리합니다. 로컬 모듈식 입력의 설정을 인텔리전스 소스의 글로벌 파일
보존을 관리하도록 수정하거나 각 다운로드 또는 업로드의 개별 설정을 파일 보존을 더 미세하게 제어하도록 수정합니다.
다음 테이블을 사용하여 Splunk Enterprise Security에서 파일을 처리한 후 삭제하는 조건을 결정합니다. 예를 들어, 스크립
트에 의해 디렉터리에 삽입된 파일의 경우 모듈식 입력 싱크홀을 사용합니다.
모듈식 입력을 위한 싱크홀 집합 개별 파일을 위한 싱크홀 집합 결과
False False 파일이 삭제되지 않음.
False True 파일이 삭제됨.
True True 파일이 삭제됨.
True False 파일이 삭제됨.
특정 모듈식 입력에서 관리하는 파일 제거
싱크홀 또는 사용할 수 없는 파일 제거 설정을 사용하여 모듈식 입력에서 관리하는 파일을 선택적으로 제거합니다.
1. Enterprise Security 메뉴 모음에서 설정 > 데이터 보강 > 위협 인텔리전스 관리를 선택합니다.
2. 수정할 파일 보존 설정에 대한 모듈식 입력을 선택합니다.
1. 다운로드된 파일의 경우 sa_threat_local 모듈식 입력을 선택합니다.
2. 업로드된 파일의 경우 da_ess_threat_local 모듈식 입력을 선택합니다.
3. 모듈식 입력이 파일을 처리한 후 디렉터리의 파일을 삭제하도록 싱크홀 체크박스를 선택합니다.

4. 모듈식 입력이 파일을 처리한 후 파일에 실행 가능한 인텔리전스가 없는 경우 파일을 삭제하도록 사용할 수 없는 파
일 제거 체크박스를 선택합니다.
5. 변경 사항을 저장합니다.
특정 다운로드와 관련된 파일 제거
위협 인텔리전스 다운로드와 연결된 파일을 제거하려면 싱크홀 체크박스를 사용합니다.
1. Enterprise Security 메뉴 모음에서 설정 > 데이터 보강 > 인텔리전스 다운로드를 선택합니다.
2. 위협 인텔리전스 다운로드를 찾습니다.
3. 싱크홀 체크박스를 선택합니다.
4. 변경 사항을 저장합니다.
특정 업로드와 관련된 파일 제거
파일을 업로드할 때 파일을 처리한 후 삭제하려면 싱크홀 체크박스를 선택합니다.
Splunk Enterprise Security에 구조화된 STIX 또는 OpenIOC 인텔리전스 파일 업로드를 참조하십시오.
Splunk Enterprise Security에서 사용자 지정 위협 인텔리전스 CSV 파일 업로드를 참조하십시오.
예: Splunk Enterprise Security에 랜섬웨어 위협 피드 추가
다음은 랜섬웨어를 호스트할 수 있는 차단 도메인 리스트를 Splunk Enterprise Security에 추가하여 조직의 랜섬웨어 공격
대비 수준을 높이는 방법의 예입니다. 이 예에는 abuse.ch의 피드가 사용되었습니다.
1. Enterprise Security 메뉴 모음에서 설정 > 데이터 보강 > 인텔리전스 다운로드를 선택합니다.
2. 새로 추가를 클릭하여 새 위협 인텔리전스 소스를 추가합니다.
3. 위협 다운로드 소스를 설명하는 ransomware_tracker의 이름을 입력합니다.
4. 도메인의 유형을 입력하여 위협 소스에 포함된 위협 인텔리전스의 유형을 식별합니다.
5. 설명에 랜섬웨어를 호스트할 수 있는 차단된 도메인을 입력합니다.
6. https://ransomwaretracker.abuse.ch/downloads/RW_DOMBL.txt의 URL을 입력합니다.
7. (선택 사항) 랜섬웨어는 심각한 위협이어서 차단된 랜섬웨어 도메인과 연결된 자산 또는 ID에는 추가 위험 점수 배수가
필요하므로 기본 가중치를 1에서 2로 변경합니다.
8. 기본 간격을 43200초, 즉 매 12시간으로 놔둡니다.
9. 이 피드 유형은 POST 인수를 수락하지 않으므로 POST 인수 필드를 비워 둡니다.
10. 위협 인텔리전스의 최대 기간을 정의할지 결정합니다. 랜섬웨어 트래커 웹사이트에 따르면, 차단 리스트에 있는 항목
은 30일 동안 차단 리스트에 남아 있습니다. Enterprise Security에서 항목을 이 기간보다 빨리 차단 리스트에서 삭제
하려면 최대 기간을 30일 미만으로 설정합니다. 최대 기간을 -7d로 입력합니다.
11. 환경의 보안 컨트롤로 인해 사용자 에이전트 문자열을 지정해야 하는지 결정합니다. 지정하지 않아도 되는 경우 이 필
드를 비워둡니다.
12. 필드를 추가하여 위협 지표를 보강할 수 있도록 :를 기본 구분 정규식으로 입력합니다.
13. 도메인 이름은 줄로 구분되어 추출할 필요가 없으므로 추출 정규식 필드를 비워 둡니다.
14. domain:$1,description:ransomware_domain_blocklist의 필드를 입력하여 이 차단 리스트의 필드를 정의합니다.
15. (선택 사항) 기본 무시 정규식 필드를 놔둡니다.
16. 무시 정규식은 피드의 맨 위에 있는 코멘트를 무시하므로 헤더 줄 건너뛰기 필드를 0으로 변경합니다.
17. 재시도 간격을 기본값인 60초로 놔둡니다.
18. (선택 사항) 이 피드는 어떤 형식의 인증도 요구하지 않으므로 원격 사이트 사용자 필드를 비워 둡니다.
19. 재시도 횟수 필드를 기본값인 3으로 놔둡니다.
20. 제한 시간 필드를 기본값인 30초로 놔둡니다.
21. 프록시 서버를 사용하여 위협 인텔리전스를 Splunk Enterprise Security에 추가하는 경우를 제외하고, 프록시 옵션
섹션을 무시합니다.
22. 저장을 클릭합니다.
23. Splunk 플랫폼 메뉴 모음에서 앱 > Enterprise Security를 선택하여 Splunk Enterprise Security로 돌아갑니다.
24. Enterprise Security 메뉴 모음에서 감사 > 위협 인텔리전스 감사(audit)를 선택합니다.
25. 위협 인텔리전스 다운로드 패널에서 ransomware_tracker 스탠자를 찾고 상태가 위협 리스트 다운로드됨인지
확인합니다.
26. Enterprise Security 메뉴 모음에서 보안 인텔리전스 > 위협 인텔리전스 > 위협 아티팩트를 선택합니다.
27. ransomware_tracker의 인텔리전스 소스 ID를 입력하여 새 위협 피드에서 Splunk Enterprise Security에 추가된
도메인을 검색합니다.
28. 제출을 클릭하여 검색합니다.
29. 네트워크 탭을 클릭하고 도메인 인텔리전스 패널을 검토하여 ransomware_tracker 위협 소스의 위협 인텔리전스가 표
시되는지 확인합니다.
