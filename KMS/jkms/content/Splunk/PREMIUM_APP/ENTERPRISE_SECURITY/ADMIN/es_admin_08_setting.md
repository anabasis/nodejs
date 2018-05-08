# 설정 및 문제 해결

Splunk Enterprise Security의 일반 설정 구성
Splunk Enterprise 관리자는 Splunk Enterprise Security 설치본의 설정을 변경할 수 있습니다. 임계값, 매크로 정의, 검색
필터 및 기타 흔히 변경되는 값을 일반 설정 페이지에서 변경하십시오.
Enterprise Security 메뉴 모음에서 설정 > 일반 > 일반 설정을 선택합니다.
설정 설명
자산 원본 자산 상관에 사용되는 자산 정보가 포함된 룩업 테이블을 열거하는 검색 매크로입니다.
자동 일시 중지 드릴다운 검색을 일시 중지하기 전의 시간(초)을 입력합니다.
기본 관심 대상 검색 '관심 대상 이벤트' 상관(correlation) 검색용 관심 대상 이벤트를 정의합니다.
도메인 분석 웹 도메인에 대한 WHOIS 추적을 활성화하거나 비활성화합니다.
URL 추출 정규식의 도메인 URL에서 도메인(url_domain)을 추출하는 데 사용하는 정규식입니다.
ID 생성 자동 업데이트 활성
화
true인 경우 ID 관리자가 asset_sources, identity_sources, generate_identities 매크로
를 자동으로 업데이트할 수 있습니다. 기본값은 true입니다.
일반 오류 검색 오류 발생을 나타내는 이벤트를 정의하는 검색 필터입니다.
가장 빠른 HTTP 범주 분석
sparkline
HTTP 사용자 범주 분석 대시보드에 표시되는 sparkline의 시작 시간을 설정합니다.
HTTP 범주 분석 sparkline
기간
HTTP 사용자 범주 분석 대시보드에 표시되는 sparkline의 시간 범위를 설정합니다.
가장 빠른 HTTP 사용자 에
이전트 분석 sparkline
HTTP 사용자 에이전트 분석 대시보드에 표시되는 sparkline의 시작 시간을 설정합니다.
HTTP 사용자 에이전트 분
석 sparkline 기간
HTTP 사용자 에이전트 분석 대시보드에 표시되는 sparkline의 시간 범위를 설정합니다.
IRT 디스크 동기화 지연 Enterprise Security가 디스크 플러시가 완료될 때까지 기다리는 초 수를 설정합니다. 인
덱싱된 실시간 검색과 관련이 있습니다.
ID 생성 ID 정보를 정규화하는 데 사용되는 변환을 정의합니다. Splunk Enterprise Security가 자
산 및 ID 데이터를 처리 및 병합하는 방법을 참조하십시오.
ID 생성 제한 시간 ID 관리자가 identity_manager.log에 느린 검색 완료 경고를 표시하기 전에 기다리는 초
수입니다.
ID 소스 ID 정보가 포함된 소스 룩업 테이블을 열거합니다.
인시던트 검토 분석 용량
애널리스트에게 배정되는 주요 이벤트의 추정 최대 용량입니다. 분석 워크로드의 상대적
인 측정치입니다.
인덱싱된 실시간 인덱싱된 실시간 모드를 검색에 대해 활성화하거나 비활성화합니다.
대용량 이메일 임계값 '대용량'으로 간주되는 크기(바이트)를 초과하는 이메일입니다.
라이선싱 이벤트 수 필터 "일별 이벤트" 요약에서 제외된 인덱스 리스트를 정의합니다.
일괄 저장(kvstore) 최대 문
서 수 KV 스토어에 일괄로 한 번에 저장할 수 있는 최대 문서 수입니다.
새로운 도메인 분석
sparkline 기간
새로운 도메인 분석 대시보드에 표시되는 sparkline의 시간 범위를 설정합니다.
주요 모듈화 경고 파이프라
인 주요 이벤트 adaptive response 작업의 SPL입니다.
이메일 경고 작업 재정의
인시던트 검토 대시보드의 adaptive response 작업에서 사용자가 이메일을 통해 주요 이
벤트를 보낼 수 있도록 이메일 경고 작업 설정을 재정의합니다.
위험 모듈화 경고 파이프라
위험 한정자 adaptive response 작업의 SPL입니다.

참고 항목은 아래와 같습니다.
Splunk Enterprise Security에서 입력 자격 증명 관리
Splunk Enterprise Security에서 권한 관리
Splunk Enterprise Security의 메뉴 모음 사용자 지정
Splunk Enterprise Security에서 패널별 필터링 설정
Splunk Enterprise Security에서 자격 증명 관리
스크립트 기반 또는 모듈식 입력의 자격 증명을 저장하려면 자격 증명 관리 페이지를 사용합니다. 자격 증명을 참조하는 입
력 설정에서는 자격 증명 관리에 저장된 자격 증명을 사용합니다. 사용자 이름 및 암호와 같은 자격 증명 또는 타사 시스템을
사용한 인증에 사용되는 인증서를 저장할 수 있습니다. 서버간 통신을 암호화하는 데 사용되는 인증서를 관리하기 위해 이
페이지를 사용하지 마십시오.
역할에 자격 증명 및 인증서를 추가하고 수정하고 볼 수 있는 적절한 기능이 있어야 합니다. 설치 및 업그레이드 매뉴얼에서
사용자 및 역할 설정을 참조하십시오.
새 입력 자격 증명 추가
1. Enterprise Security 메뉴 모음에서 설정 > 일반 > 자격 증명 관리를 선택합니다.
2. 새 자격 증명을 클릭하여 새 사용자 자격 증명을 추가합니다.
3. 사용자 이름을 입력합니다.
4. (선택 사항) 사용자 이름이 같은 여러 자격 증명을 구별하려면 영역 필드를 입력합니다.
5. 자격 증명에 대한 암호를 입력하고 암호 확인에 다시 입력합니다.
6. 자격 증명의 앱을 선택합니다.
7. 저장을 클릭합니다.
기존 입력 자격 증명 편집
기존 입력 자격 증명의 암호를 편집할 수 있습니다.
1. Enterprise Security 메뉴 모음에서 설정 > 일반 > 자격 증명 관리를 선택합니다.
2. 자격 증명의 작업 컬럼에서 편집을 클릭합니다.
3. 자격 증명에 대한 새 암호를 입력하고 암호 확인에 다시 입력합니다.
4. 저장을 클릭합니다.
새 인증서 추가
검색 헤드 클러스터(SHC)에 자격 증명 관리를 사용하여 새 인증서를 추가할 수 없습니다. SHC에서 Splunk Enterprise
Security에 새 인증서를 추가하려면 주 배포 노드의 $SPLUNK_HOME/etc/apps/<app_name>/auth에 인증서를 추가하고 인증서를
SHC 구성원에게 배포합니다.
1. Enterprise Security 메뉴 모음에서 설정 > 일반 > 자격 증명 관리를 선택합니다.

2. 새 인증서를 클릭하여 새 인증서를 추가합니다.
3. 인증서의 파일 이름을 입력합니다. 이 이름은 인증서가 $SPLUNK_HOME/etc/apps/<app_name>/auth 디렉터리에 저장되는
파일 이름입니다.
4. 인증서의 인증서 텍스트를 추가합니다. 인증서를 Splunk Enterprise Security에 추가하려면 기존 인증서 파일의 콘
텐츠를 여기에 붙여넣습니다.
5. 인증서를 저장할 앱을 선택합니다.
6. 저장을 클릭합니다.
기존 인증서 편집
자격 증명 관리에서 기존 인증서의 인증서 텍스트를 편집할 수 있습니다. 검색 헤드 클러스터에서 인증서를 편집할 수 없습
니다.
1. Enterprise Security 메뉴 모음에서 설정 > 일반 > 자격 증명 관리를 선택합니다.
2. 인증서의 작업 컬럼에서 편집을 클릭합니다.
3. 인증서의 새 인증서 텍스트를 입력합니다.
4. 저장을 클릭합니다.
기존 입력 자격 증명 또는 인증서 삭제
검색 헤드 클러스터에서 인증서를 삭제할 수 없습니다.
1. Enterprise Security 메뉴 모음에서 설정 > 일반 > 자격 증명 관리를 선택합니다.
2. 자격 증명 또는 인증서의 작업 컬럼에서 삭제를 클릭합니다.
3. 확인을 클릭하여 확인합니다.
Splunk Enterprise Security에서 권한 관리
권한 페이지를 사용하여 Enterprise Security 기능을 관리자가 아닌 역할에 배정합니다.
1. Enterprise Security 메뉴 모음에서 설정 > 일반 > 권한을 선택합니다.
2. 역할과 해당 역할의 권한에 해당하는 체크박스를 선택합니다.
3. 저장을 클릭합니다.
ES 기능에 대한 자세한 내용은 설치 및 업그레이드 매뉴얼에서 사용자 및 역할 설정을 참조하십시오.
Splunk Enterprise Security의 메뉴 모음 사용자 지정
탐색 편집 뷰를 사용하여 Splunk Enterprise Security의 메뉴 모음을 사용자 지정합니다. 새 대시보드, 보고서, 뷰, 필터링된
대시보드 링크 또는 웹 링크를 메뉴 모음에 추가할 수 있습니다. 메뉴 모음 탐색을 변경하려면 Enterprise Security 관리자
권한이 있어야 합니다.
뷰를 여러 뷰를 그룹으로 묶는 컬렉션의 일부로 메뉴 모음에 추가하거나, 메뉴 모음의 개별 항목으로 추가할 수 있습니다. 예
를 들어 인시던트 검토는 메뉴 모음의 개별 대시보드고, 감사(audit)는 감사(audit) 대시보드의 컬렉션입니다.
Splunk Enterprise Security는 이전 버전에서 탐색 메뉴에 적용된 사용자 지정을 계속 유지합니다.
업데이트된 뷰 확인
사용자가 설치한 앱 버전에서 새로 만들거나 업데이트하거나 지원이 중단된 뷰와 컬렉션은 관련 변경 사항을 나타내는 작은
아이콘으로 강조 표시됩니다.
새 Splunk Enterprise Security 버전이나 Enterprise Security에서 사용하는 뷰와 컬렉션을 제공하는 앱의 새로운 버전을
설치한 후에는 탐색 편집 뷰를 방문하여 해당 뷰 또는 컬렉션이 업데이트되었는지 확인하십시오.
1. Enterprise Security 메뉴 모음에서 설정 > 일반 > 탐색을 선택합니다.
2. 업데이트된 콘텐츠가 있는 경우 탐색 편집기 상단에 "콘텐츠 업데이트 사용 가능" 메시지가 표시됩니다.
3. 편집기 창의 뷰에 아이콘이 있는지 찾아보고 추가되거나 업데이트되거나 지원이 중단된 콘텐츠를 찾습니다. 새 뷰 추
가 및 새 컬렉션 추가 메뉴에도 동일한 아이콘이 표시됩니다.
Splunk Enterprise Security의 기본 뷰 설정
사용자가 Splunk Enterprise Security를 열 때 특정 뷰 또는 링크를 표시하려면 기본 뷰를 설정하십시오.
1. Enterprise Security 메뉴 모음에서 설정 > 일반 > 탐색을 선택합니다.
2. 기본 뷰로 사용할 뷰나 링크를 찾습니다.
3. 뷰 위로 마우스를 움직이면 나타나는 체크 표시 아이콘을 클릭하여 이 항목을 기본 뷰로 설정합니다.

4. 저장을 클릭하여 변경 사항을 저장합니다.
5. 확인을 클릭하여 페이지를 새로 고치고 변경 사항을 확인합니다.
기본 메뉴 모음 탐색 편집
1. Enterprise Security 메뉴 모음에서 설정 > 일반 > 탐색을 선택합니다.
2. 뷰나 뷰 컬렉션이 메뉴에 표시되는 위치를 변경하려면 뷰나 뷰 컬렉션을 클릭하고 끌어서 옮깁니다.
3. 뷰 또는 컬렉션을 메뉴에서 제거하려면 뷰 또는 컬렉션 옆의 X를 클릭합니다.
4. 컬렉션 이름을 편집하려면 아이콘을 클릭합니다.
5. 구분선을 추가하고 컬렉션의 항목을 시각적으로 분리하려면 아이콘을 클릭합니다.
6. 저장을 클릭하여 변경 사항을 저장합니다.
7. 확인을 클릭하여 페이지를 새로 고치고 변경 사항을 확인합니다.
메뉴 모음에 단일 뷰 추가
새 뷰를 컬렉션에 추가하지 않고 메뉴 모음에 추가할 수 있습니다.
1. Enterprise Security 메뉴 모음에서 설정 > 일반 > 탐색을 선택합니다.
2. 새 뷰 추가를 클릭합니다.
3. 뷰 옵션 설정을 기본값인 뷰로 놔둡니다.
4. 사용하지 않는 뷰에서 뷰 선택을 클릭합니다.
5. 리스트에서 대시보드 또는 뷰를 선택합니다.
6. 저장을 클릭합니다. 대시보드가 탐색 편집기에 표시됩니다.
7. 메뉴에 항목을 추가하는 작업을 마치면 저장을 클릭하여 변경 사항을 저장합니다.
8. 확인을 클릭하여 페이지를 새로 고치고 변경 사항을 확인합니다.
메뉴 모음에 컬렉션 추가
컬렉션을 사용하여 메뉴 모음의 여러 뷰 또는 링크를 함께 정리합니다.
1. Enterprise Security 메뉴 모음에서 설정 > 일반 > 탐색을 선택합니다.
2. 새 컬렉션 추가를 클릭합니다.
3. 이름을 입력합니다. 예: 감사(audit)
4. 저장을 클릭합니다. 컬렉션이 탐색 편집기에 표시됩니다.
뷰 또는 링크를 메뉴 탐색에 표시하려면 컬렉션에 먼저 추가해야 합니다.
기존 컬렉션에 뷰 추가
뷰를 기존 컬렉션에 추가합니다.
1. Enterprise Security 메뉴 모음에서 설정 > 일반 > 탐색을 선택합니다.
2. 뷰를 추가할 컬렉션을 찾습니다.
3. 아이콘을 클릭합니다.
4. 뷰 옵션 설정을 기본값인 뷰로 놔둡니다.
5. 사용하지 않는 뷰에서 뷰 선택을 클릭합니다.
6. 리스트에서 뷰를 선택합니다.
7. 저장을 클릭합니다. 뷰가 탐색 편집기에 표시됩니다.
8. 메뉴에 항목을 추가하는 작업을 마치면 저장을 클릭하여 변경 사항을 저장합니다.
9. 확인을 클릭하여 페이지를 새로 고치고 변경 사항을 확인합니다.
메뉴 모음에 링크 추가
Splunk Enterprise Security의 메뉴 모음에 링크를 추가할 수 있습니다. 예를 들어 링크를 인스던트 검토의 구체적으로 필터
링된 뷰나 외부 티케팅 시스템에 추가할 수 있습니다.
메뉴에 외부 시스템 또는 웹페이지 링크 만들기
1. Enterprise Security 메뉴 모음에서 설정 > 일반 > 탐색을 선택합니다.
2. 새 뷰 추가를 클릭하여 뷰를 메뉴에 추가하거나, 기존 컬렉션을 찾고 아이콘을 클릭하여 링크를 기존 뷰 컬렉션에
추가합니다.
3. 뷰 옵션에서 링크를 선택합니다.

4. Splunk Enterprise Security 메뉴에 표시할 이름을 입력합니다 . 예: Splunk 응답 페이지
5. 링크를 입력합니다. 예: https://answers.splunk.com/
6. 저장을 클릭합니다.
7. 메뉴에 항목을 추가하는 작업을 마치면 저장을 클릭하여 변경 사항을 저장합니다.
8. 확인을 클릭하여 페이지를 새로 고치고 변경 사항을 확인합니다.
인시던트 검토의 필터링된 뷰에 링크 추가
메뉴 모음에 많이 추가되는 링크 중 하나는 인시던트 검토의 필터링된 뷰입니다.
1. 인시던트 검토를 원하는 필터로 필터링하십시오. 대시보드를 필터링하면 필터와 일치하는 쿼리 문자열 매개변수로
URL이 업데이트됩니다.
2. 웹 브라우저 주소 표시줄에서 URL의 /app/SplunkEnterpriseSecuritySuite/로 시작되는 부분을 복사하여 일반 텍스트
파일에 참고용으로 붙여넣습니다.
예를 들어 중요한 주요 이벤트만 표시되도록 대시보드를 필터링한 경우 URL에서 복사하는 부분은
/app/SplunkEnterpriseSecuritySuite/incident_review?form.selected_urgency=critical과 유사합니다.
3. Enterprise Security 메뉴 모음에서 설정 > 일반 > 탐색을 선택합니다.
4. 새 뷰 추가를 클릭하여 뷰를 메뉴에 추가하거나, 기존 컬렉션을 찾고 뷰 추가 아이콘을 클릭하여 링크를 기존 뷰 컬렉
션에 추가합니다.
5. 뷰 옵션에서 링크를 선택합니다.
6. Splunk Enterprise Security 메뉴에 표시할 이름을 입력합니다 . 예: IR - 중요
7. 링크 필드에 URL의 일부분을 붙여넣습니다. 예: /app/SplunkEnterpriseSecuritySuite/incident_review?
form.selected_urgency=critical
8. 저장을 클릭합니다.
9. 메뉴에 항목을 추가하는 작업을 마치면 저장을 클릭하여 변경 사항을 저장합니다.
10. 확인을 클릭하여 페이지를 새로 고치고 변경 사항을 확인합니다.
매개변수가 여러 개인 링크를 추가하는 경우 매개변수를 &amp;로 분리하는 &를 인코딩하여 쿼리 문자열 매개변수를 수정해
야 합니다. 예를 들어 배정되지 않은 새 주요 이벤트를 /app/SplunkEnterpriseSecuritySuite/incident_review?
form.status_form=1&amp;form.owner_form=unassigned로 표시하는 인시던트 검토의 필터링된 뷰에 대한 링크를 입력하십시오.
다음 테이블에 있는 매개변수를 사용하여 URL을 수동으로 구성할 수도 있습니다. 특정 매개변수에 대해 모든 결과를 표시하
려면 별표를 사용하십시오. 모든 매개변수가 필요하지는 않습니다.
매개변수 설명 가능한 값
form.selected_urgency
주요 이벤트
를 이 매개변
수를 통해 지
정되는 긴급
도와 함께 표
시합니다.
critical, high, medium, low, informational
form.status_form
주요 이벤트
를 이 매개변
수를 통해 지
정되는 상태
와 함께 표시
합니다. 정수
는 각 상태
값에 해당합
니다.
0은 배정되지 않음, 1은 새 이벤트, 2는 진행 중, 3은 보류 중, 4는 해결됨, 5는
종료됨에 해당합니다.
form.owner_form
이 매개변수
를 통해 지정
되는 사용자
가 소유한 주
요 이벤트를
표시합니다.
usernames
이 매개변수
를 통해 지정
된 상관
(correlation)
검색에서 만
드는 주요 이
벤트를 표시
합니다. 상관
(correlation)

form.source
검색 이름의
공백을
HTML로 인
코딩하고 주
요 이벤트에
표시되는 이
름을 콘텐츠
관리에 표시
되는 이름 대
신 사용하십
시오.
Endpoint - Host With Multiple Infections - Rule
form.rule_name
이 매개변수
를 통해 지정
된 상관
(correlation)
검색에서 만
드는 주요 이
벤트를 표시
합니다. 상관
(correlation)
검색 이름의
공백을
HTML로 인
코딩합니다.
콘텐츠 관리
에 표시되는
이름을 사용
합니다.
Host With Multiple Infections
form.tag
이 매개변수
를 통해 지정
된 태그가 있
는 주요 이벤
트를 표시합
니다.
malware, 사용지 지정 태그 값
form.srch
이 매개변수
에 지정된
SPL과 일치
하는 주요 이
벤트를 표시
합니다. 키
값 쌍의 = 같
은 특수 문자
를 HTML로
인코딩하십
시오.
dest=127.0.0.1
form.security_domain_form
이 매개변수
를 통해 지정
된 보안 도메
인의 주요 이
벤트를 표시
합니다.
access, endpoint, network, threat, identity, audit
earliest= 및 latest=
이 매개변수
를 통해 지정
된 시간 범위
의 주요 이벤
트를 표시합
니다. 상대
시간 범위를
지정하십시
오. @ 같은
특수 문자를
HTML로 인
코딩하십시
오.
-24h@h, now

form.new_urgency_count_form
이 매개변수
를 통해 지정
된 긴급도가
없는 주요 이
벤트를 표시
합니다.
critical, high, medium, low, informational
form.selected_urgency
이 매개변수
를 통해 긴급
도가 지정된
주요 이벤트
를 표시합니
다. 여러 긴
급도 설정을
선택하려면
이 매개변수
의 여러 인스
턴스를 사용
합니다.
critical, high, medium, low, informational
event_id
지정된
event_id와
일치하는 주
요 이벤트를
표시합니다.
3C84A9D8-87F6-4066-8659-
C7DD680F98E6@@notable@@80e0f89da83cad6665dd1de7447cedb4
form.association_type
form.association_id
함께 사용되
면 짧은 ID
또는 조사와
연결된 주요
이벤트를 표
시합니다.
short_id, investigation
EYIYNW, 5a4be2b8cdc9736b2352c7c3

기본 탐색 복원
Splunk Enterprise Security 메뉴 모음의 기본 탐색을 복원하는 방법:
1. Enterprise Security 메뉴 모음에서 설정 > 일반 > 탐색을 선택합니다.
2. 오른쪽 상단 모서리에서 기본 설정 복원을 클릭합니다.
3. 확인을 클릭하여 확인합니다.
4. 페이지 하단으로 스크롤하고 저장을 클릭합니다.
Splunk Enterprise Security에서 패널별 필터링 설정
Splunk Enterprise Security의 일부 대시보드에는 필터링을 통해 항목을 대시보드 뷰에서 제거할 수 있는 패널별 필터 옵션
이 있어 조사할 필요가 있는 이벤트를 더 쉽게 찾을 수 있습니다.
이벤트가 위협이라고 확인될 경우 패널별 필터 편집기를 사용하여 항목을 알려진 위협 차단 리스트에 추가하십시오.
이벤트가 위협이 아니라고 확인될 경우 허용 리스트에 추가하여 대시보드 뷰에서 제거할 수 있습니다.
참고: 패널별 필터 단추는 사용자에게 권한이 있는 경우에만 표시됩니다. 이 권한을 설정하는 방법은 설치 및 설정 매뉴얼에
서 사용자 및 역할 설정을 참조하십시오.
허용 리스트 이벤트
이벤트가 위협이 아니라고 확인된 후에는 이벤트를 허용 리스트에 추가하여 대시보드 뷰에서 숨길 수 있습니다. 요약 통계는
허용 리스트에 추가된 항목을 계속 계산하지만, 대시보드에 항목이 표시되지 않습니다.
허용 리스트에 이벤트 추가
패널별 필터를 사용하여 대시보드에 있는 이벤트를 허용 리스트에 추가하거나 필터링합니다.
예를 들어 트래픽 크기 분석 대시보드에서 트래픽 이벤트를 허용 리스트에 추가하는 방법은 다음과 같습니다.
1. 체크박스를 사용하여 필터링할 항목을 선택합니다.
2. 오른쪽 상단 모서리에 있는 패널별 필터를 클릭하여 이 대시보드에서 필터링할 수 있는 이벤트에 대한 옵션을 표시합
니다.

3. 라디오 단추를 선택하여 이 대시보드에서 이벤트를 필터링합니다. 예를 들어 트래픽 크기 분석 대시보드에서는 이벤
트를 필터링하여 더 이상 표시되지 않게 하거나 강조 표시하여 중요한 이벤트로 분류할 수 있습니다.
4. 완료되면 저장을 클릭합니다.
참고: 필터링된 이벤트는 이 대시보드 계산에서 제거되지 않고 뷰에서만 제거됩니다.
이 예에서, 항목을 허용 리스트에 추가한 후에는 항목이 (위협이 아닌) 좋은 것으로 간주되고 트래픽 크기 분석 대시보드에
더 이상 표시되지 않습니다.
허용 리스트에서 항목 제거
1. 패널별 필터를 클릭한 다음 룩업 파일 보기/편집을 클릭하여 현재 필터링되고 있는 항목의 리스트를 확인합니다.
2. 테이블에서 셀을 마우스 오른쪽 단추로 클릭하여 컨텍스트 메뉴를 표시합니다.
3. 행 제거를 선택하여 허용 리스트에 있는 항목이 포함된 행을 제거합니다.
4. 저장을 클릭합니다.
차단 리스트에 이벤트 추가
이벤트를 차단 리스트에 추가할 수도 있습니다. 항목을 차단 리스트에 추가하면 악성이라고 알려진 이벤트나 악성이라고 알
려진 명령어 및 관리 서버와 통신한다고 의심되는 이벤트를 식별했음을 의미합니다. 이 이벤트나 문자열이 데이터에 나타날
때는 항상 시스템, 시스템과 연결된 사용자, 웹 활동을 조사하여 위협의 성격과 확산 가능성을 이해해야 합니다.
이벤트 또는 문자열을 차단 리스트에 추가하는 방법은 허용 리스트와 비슷합니다. 대시보드에서 필터링된 이벤트만 차단 리
스트에 추가할 수 있습니다.
예를 들어 트래픽 크기 분석 대시보드에 있는 트래픽 이벤트를 차단 리스트에 추가하려면 다음 작업을 수행하십시오.
1. 고급 필터 페이지에서 룩업 파일 보기/편집을 클릭하여 현재 필터링되고 있는 항목의 리스트를 확인합니다.
2. 차단 리스트에 추가할 항목을 찾습니다. 필터 컬럼에서 whitelist라는 단어를 두 번 클릭하여 셀을 편집합니다.
"whitelist"를 삭제하고 "blacklist"를 입력합니다.
3. 저장을 클릭합니다.
패널별 필터 리스트 편집
현재 패널별 필터 리스트를 대시보드별로 보려면 설정 > 데이터 보강 > 리스트 및 룩업으로 이동합니다. 대시보드 필터임
을 나타내는 설명이 있는 리스트에 해당 대시보드의 현재 패널별 필터가 표시됩니다. 대시보드의 허용 리스트에 추가된 이벤
트가 여기에 나열됩니다.
예를 들어 위협 활동 필터 리스트에는 위협 활동 대시보드의 필터가 표시됩니다.
패널별 필터 리스트를 편집합니다.
1. 관련 대시보드의 필터 리스트를 엽니다. 필터 이름(예: ppf_threat_activity)이 왼쪽 상단 모서리에 표시됩니다.
2. 필드를 편집하려면 셀을 선택하고 입력을 시작합니다.
3. 필터에(서) 행 또는 컬럼을 삽입하거나 제거하려면 옵션 편집 필드를 마우스 오른쪽 단추로 클릭합니다. 행을 제거하면
해당 항목이 대시보드 패널 뷰에 다시 추가되고 허용 리스트에서 제거됩니다.
4. 항목을 차단 리스트에 추가하려면 편집기를 사용하여 새 행을 테이블에 추가하고 "filter" 컬럼에 "blacklist"를 사용합
니다.
5. 마치면 저장을 클릭합니다.
패널별 필터 감사 (audit)
패널별 필터에 적용한 변경 사항은 패널별 필터링 감사(audit) 로그에 기록됩니다. 룩업 편집기와 패널별 필터 모듈이 패널별
필터를 수정합니다. 패널별 필터 감사(audit) 대시보드를 사용하여 패널별 필터를 감사(audit)하십시오.
Splunk Enterprise Security에서 Splunk Web 메시지 만들기
Splunk Web에서 Splunk 메시지 만들기 경고 작업을 사용하여 검색의 결과를 기반으로 메시지를 만듭니다. 관리자만 이
경고 작업을 사용하여 메시지를 만들 수 있습니다.
이 경고 작업을 사용하여 만드는 메시지는 이미 messages.conf에 존재해야 합니다. 메시지 만들기에 대한 자세한 내용은
Splunk Enterprise 관리자 매뉴얼의 Splunk Web 메시지 사용자 지정을 참조하십시오.
1. 검색 또는 상관(correlation) 검색에서 Splunk Web 메시지를 만들 수 있습니다.
옵션 절차
새 경고 만들기
검색 및 보고 앱의 검색 페이지에서 다른 이름으로 저장 > 경고를 선택합니다. 경고 세부
정보를 입력 및 선택하고 필요에 따라 트리거 및 조절을 설정합니다.

상관(correlation)
검색 만들기 또는
편집
ES 메뉴 모음에서 설정 > 콘텐츠 관리를 선택합니다. 새 콘텐츠 만들기 > 상관
(correlation) 검색을 선택합니다. 필요에 따라 상관(correlation) 검색 설정을 입력 및 선택
합니다.
상관(correlation)
검색 편집
ES 메뉴 모음에서 설정 > 콘텐츠 관리를 선택합니다. 상관(correlation) 검색을 선택합니
다.
2. 작업 추가를 클릭하고 Splunk 메시지 작성을 선택합니다.
3. 이름을 선택합니다. 이 이름은 기존 메시지의 messages.conf에 있는 스탠자에 해당합니다.
예: DISK_MON:INSUFFICIENT_DISK_SPACE_ERROR.
4. (선택 사항) 메시지를 나타내는 메시지 ID를 입력합니다.
예: insufficient_diskspace.
5. (선택 사항) 메시지에서 필드 대체를 사용하는 경우 사용할 필드를 입력합니다. 인수 대체에 사용되는 필드는 검색 결
과에 반환되어야 메시지에 포함됩니다. 필드를 메시지에서 대체되어야 하는 순서대로 입력합니다.
예를 들어, Host %s has free disk space %d, below the minimum 5GB. 메시지의 경우 src,FreeMBytes 필드를 입력합니
다.
6. (선택 사항) 최근 메시지만 유지에 대해 예를 선택하고 검색에 의해 생성된 최근 메시지만을 유지합니다.
예를 들어, 3일 동안 디스크 공간이 적으면 3일 동안 매일 메시지를 받는 대신 이 설정에 대해 예를 선택하여 하나의 메
시지만 표시합니다.
7. 저장을 클릭합니다.
Splunk Enterprise Security에서 스크립트 오류 문제 해결
Splunk Enterprise Security에서 모듈식 입력의 스크립트 오류 문제를 해결합니다. 스크립트가 비정상적으로 종료되었거나
스크립트의 상태를 알 수 없다는 메시지가 표시되면 오류가 발생한 스크립트와 스탠자를 조사하십시오.
Audit - Script Errors 검색은 설정 확인 스크립트를 대체하고 Splunk 배포의 스크립트 결과 발생하는 0이 아닌 종료 코드에
대해 경고하기 위해 Splunk 메시지를 만듭니다.
가능한 근본 원인 확인 해결 방법
스크립트가 성공적으로 실행되지
않았습니다.
스크립트의 로그 파일을 검토합니다. 스크립트를
수동으로 실행하여 성공적으로 실행되는지 확인
하고 결과로 발생하는 종료 코드를 검토합니다.
스크립트가 0이 아닌 종료 코드
로 종료된 이유를 설명합니다.
스크립트가 성공적으로 실행되고
0이 아닌 종료 코드가 발생했습니
다.
스크립트를 수동으로 실행하여 성공적으로 실행
되는지 확인하고 결과로 발생하는 종료 코드를 검
토합니다.
검색에 대한 제거에 스크립트를
포함하여 이 스크립트에 대한 메
시지를 표시하지 않도록 합니다.
스크립트의 상태를 알 수 없습니
다. 스크립트의 중지 시간이 있지
만 종료 상태나 시작 시간이 없습
니다.
모듈식 입력 설정이 올바른지 확인합니다. 모듈식 입력 설정을 수정합니다.
특정 스크립트에 대한 메시지가 표시되지 않도록 하기
필요한 경우 `script_error_message_ignore` 매크로에서 일치 구문을 수정하여 특정 스크립트에 대한 메시지를 표시하지 않
을 수 있습니다.
[configuration_check://confcheck_script_errors] 스탠자에 로컬로 정의된 스크립트 제거 정규식이 있으면 매크로에 복제할
수 있습니다. 예를 들어, 제거 스탠자에는 다음과 같은 정규식이 포함됩니다.
suppress = ((streamfwd|splunk-
(wmi\.path|MonitorNoHandle\.exe|winevtlog\.exe|netmon\.exe|perfmon\.exe|regmon\.exe|winprintmon\.exe|admon\.exe)).*exited
with code 1)
매크로는 다음과 같은 정의를 사용하여 이 제거를 복제합니다.
match(script, "(streamfwd|splunk-
(wmi\.path|MonitorNoHandle\.exe|winevtlog\.exe|netmon\.exe|perfmon\.exe|regmon\.exe|winprintmon\.exe|admon\.exe|powershell\.exe))")
AND exit_status=1
특정 스크립트를 표시하지 않는 대신 특정 스크립트에 대한 메시지의 빈도를 줄이려면 경고를 조절합니다. script 필드 등 필
요한 값을 기반으로 Audit - Script Errors 검색에 대한 경고 조절을 설정합니다.
Splunk Enterprise의 경우 경고 매뉴얼에서 경고 조절을 참조하십시오.

Splunk Cloud의 경우 경고 매뉴얼에서 경고 조절을 참조하십시오.
관리자 역할에 의해 검색된 기본 인덱스에 대한 메시지 문제 해결
Splunk 플랫폼에서 관리자 역할에 의해 검색된 기본 인덱스에 대한 Splunk 메시지의 문제를 해결합니다.
기본 관리자 검색에 요약 인덱스 포함
관리자 역할에서 기본적으로 요약 인덱스를 검색하는 경우 성능이 저하될 수 있습니다. 관리자 역할에 의해 검색되는 인덱스
를 제한하거나 검색을 비활성화하여 이 설정에 대한 메시지를 표시하지 않을 수 있습니다.
관리자 역할에 의해 검색되는 인덱스 제한
관리자 역할에서 요약 인덱스를 검색하지 못하도록 합니다. 인덱스 이름이 _summary(예: endpoint_summary)로 끝나므로 요약
인덱스 이름을 식별할 수 있습니다.
1. 설정 > 액세스 제어를 선택합니다.
2. 역할을 클릭합니다.
3. 관리자를 클릭합니다.
4. 인덱스에서 선택된 인덱스에서 제거할 요약 인덱스를 클릭합니다.
5. 저장을 클릭합니다.
메시지를 표시하지 않도록 검색 비활성화
관리자 역할에 의해 검색된 인덱스를 제한하지 않지만 메시지를 표시하지 않으려면 검색을 비활성화하십시오.
1. 설정 > 검색, 보고서 및 경고를 선택합니다.
2. 감사(Audit) - 기본 관리자 검색 인덱스 검색을 찾습니다.
3. 편집 > 비활성화를 선택합니다.
4. 비활성화를 클릭합니다.
기본 관리자 검색에는 내부 인덱스가 아닌 모든 인덱스가 포함됩니다
관리자 역할에서 기본적으로 내부 인덱스가 아닌 모든 인덱스를 검색하는 경우 성능이 저하될 수 있습니다. 관리자 역할에
의해 검색되는 인덱스를 제한하거나 검색을 비활성화하여 이 설정에 대한 메시지를 표시하지 않을 수 있습니다.
관리자 역할에 의해 검색되는 인덱스 제한
관리자 역할에서 내부 인덱스가 아닌 모든 인덱스를 검색하지 못하도록 합니다.
1. 설정 > 액세스 제어를 선택합니다.
2. 역할을 클릭합니다.
3. 관리자를 클릭합니다.
4. 인덱스에서 선택된 인덱스에서 제거할 내부 인덱스가 아닌 모든 인덱스를 클릭합니다.
5. 저장을 클릭합니다.
메시지를 표시하지 않도록 검색 비활성화
관리자 역할에 의해 검색된 인덱스를 제한하지 않지만 메시지를 표시하지 않으려면 검색을 비활성화하십시오.
1. 설정 > 검색, 보고서 및 경고를 선택합니다.
2. 감사(Audit) - 기본 관리자 검색 내부 인덱스가 아닌 모든 검색을 찾습니다.
3. 편집 > 비활성화를 선택합니다.
4. 비활성화를 클릭합니다.
Splunk Enterprise Security에서 인텔리전스 다운로드 실패 문제 해결
위협 리스트가 다운로드되지 않았다는 메시지가 표시되는 경우 여러 가지 가능한 근본 원인이 있습니다.
가능한 근본 원인 확인 해결 방법
IP 주소 또는 URL에서 더 이상 위협
또는 인텔리전스 소스를 사용할 수
없습니다.
URL을 방문하거나 위협 소스를 수동으로
curl하려고 시도합니다.
인텔리전스 소스를 더 이상 다운로
드할 수 없는 경우 비활성화합니다.

방화벽 또는 프록시 설정으로 인해
인텔리전스 소스에 액세스할 수 없
습니다.
다른 컴퓨터에서 URL를 방문하거나 수동으
로 인텔리전스 소스를 curl할 수 있는지 테스
트합니다.
인텔리전스 소스에 액세스할 수 있
도록 방화벽 또는 프록시 설정을 수
정합니다.
Splunk Enterprise Security에서 대시보드 문제 해결
Enterprise Security의 각 대시보드는 여러 데이터 모델의 데이터를 참조합니다. 관련 데이터가 없으면 대시보드가 계속 비
어 있습니다. 표시되어야 하는 데이터가 있거나 기대한 것보다 더 오래된 데이터가 표시되는 경우, 다음 문제 해결 절차를 따
르십시오.
1. 데이터 모델을 검색합니다. 대시보드 뷰의 왼쪽 하단 모서리에 있는 검색에서 열기를 클릭하여 데이터 모델을 직접 검
색합니다. 새 검색 대시보드에는 특정 뷰를 채우는 데 사용된 검색 명령어와 개체도 표시됩니다.
2. 검색 결과가 없는 경우, 대시보드에 필요한 데이터 중에 데이터 모델에서 사용 가능한 데이터가 있는지 확인합니다.
1. 대시보드에서 사용되는 데이터 모델 데이터 집합을 확인하려면 이 매뉴얼에서 대시보드 요구사항 표를 참조하
십시오.
2. 데이터 모델 및 데이터 모델 데이터 집합을 사용하여 데이터 모델에서 이벤트를 검색합니다.
작업 검색 예상되는 결과
데이터가 Common
Information Model로
정규화되는지 확인
| datamodel data_model_name
root_object_name search | table _time,
sourcetype, root_object_name.*
예:
| datamodel Network_Traffic All_Traffic
search | dedup sourcetype | table _time,
sourcetype, All_Traffic.*
sourcetype과 해당 sourcetype으
로 채워지는 데이터 모델 개체 및
필드의 리스트 반환
3. 사용 가능한 데이터가 없는 경우 데이터 모델이 가속되고 있는지 확인합니다.
1. Enterprise Security에서 감사(audit) > 데이터 모델 감사(audit)로 이동합니다.
2. 가속 세부정보 패널을 검토하여 최근에 데이터 모델 가속가 수행된 시간이나 가속 100% 완료 여부 등 데이터
모델 가속 상태에 대한 정보를 확인합니다. 설치 및 업그레이드 매뉴얼에서 Splunk Enterprise Security의 데이
터 모델 설정을 참조하십시오.
4. 데이터 모델 가속 상태가 예상한 것과 같으면 추가로 필요한 데이터 원본이 사용 가능한지 확인합니다. 예를 들어 사용
자 작업 대시보드에서는 추가 데이터 원본을 사용합니다.
대시보
드 이름
데이터 유형 데이터 원본
사용자
작업
룩업 클라우드 도메인, 기업 이메일 도메인, 기업 웹 도메인 룩업 파일
ID
ID 필드; bunit, email, watchlist, work_city, work_country, work_lat 및 work_long. 자세한
내용은 이 매뉴얼에서 ID 룩업 필드를 참조하십시오.
상관
(correlation)
검색
* 비기업 도메인을 사용한 대량 이메일 작업
* 허용 리스트에 있는 이벤트 관찰됨
* 사용자가 웹에서 비기업 사이트에 업로드
액세스
이상
상관
(correlation)
검색
* 사용자에게 불가능한 여행 이벤트 탐지됨
Splunk Enterprise Security 대시보드 요구사항 표
Enterprise Security 대시보드는 CIM(Common Information Model)을 준수하는 이벤트에 의존하며, 달리 명시되어 있지 않
은 한 데이터 모델 가속를 사용하여 채워집니다.
대시보드 패널과 데이터 모델
A - E
대시보드 이름 패널 제목 데이터 모델 데이터 모델 데이터 집합
액세스 이상
지리적으로 가능성이 매우 낮은 액
세스 인증
Authentication.app, .src, .user
동시 애플리케이션 액세스 Authentication.app, .src, .user

액세스 센터
작업별 시간에 따른 액세스
인증
Authentication.action
앱별 시간에 따른 액세스 Authentication.app
소스별 상위 액세스 Authentication.src
고유 사용자별 상위 액세스 Authentication.user,.src
액세스 검색 Authentication.action, .app, src, .dest,
.user, src_user
액세스 추적기
첫 번째 액세스 - 최근 7일
없음. access_tracker 룩업 비활성 계정 사용량 - 최근 90일 호출
완전히 비활성화된 계정 - 최근 90
일
만료된 ID에 대한 계정 사용량 - 최
근 7일 인증 Authentication.dest
계정 관리
시간에 따른 계정 관리
변경 사항 분석
All_Changes.Account_Management,
.action
계정 잠금 All_Changes.Account_Management,
.result
소스 사용자별 계정 관리 All_Changes.Account_Management,
.src_user
상위 계정 관리 이벤트 All_Changes.Account_Management,
.action
자산 센터
우선순위별 자산
자산 및 ID
All_Assets.priority, .bunit, .category,
.owner
사업 부문별 자산
범주별 자산
자산 정보
Asset Investigator Asset Investigator 스윔 레인(Swim lane) 선택에 따름
대시보드 이름 패널 제목 데이터 모델 데이터 모델 데이터 집합
데이터 보호
인덱스별 데이터 무결성 제어 인시던트 관리
민감한 데이터 없음. 데이터 무결성 컨트롤이 있는지 확인하는 인덱스에서
REST 검색 호출
기본 계정 작업
앱별 시간에 따른 기본 계정 사용
량
인증
Authentication.Default_Authentication,
.action, .app
사용 중인 기본 계정 Authentication.user_category, .dest,
.user
기본 로컬 계정 없음. useraccounts_tracker 룩업 호출
DNS 작업
고유 소스별 상위 응답 코드
네트워크 분석
DNS
DNS.message_type, DNS.reply_code
상위 DNS 쿼리 소스 DNS.message_type, DNS.src
상위 DNS 쿼리 DNS.message_type, DNS.query
도메인별 쿼리 DNS.message_type, DNS.query
최근 DNS 쿼리 DNS.message_type
DNS 검색
DNS.message_type,
DNS.reply_code, DNS.dest, DNS.src
,DNS.query_type, DNS.query,
DNS.answer

대시보드 이름 패널 제목 데이터 모델 데이터 모델 데이터 집합
이메일 작업
상위 이메일 소스
이메일
All_Email.src
대용량 이메일 All_Email.size, src, .src_user, .dest
거의 보이지 않는 발신자 All_Email.protocol, .src, .src_user,
.recipient
거의 보이지 않는 수신자 All_Email.protocol, .src, .recipient
이메일 검색 All_Email.protocol, .recipient, .src,
.src_user, .dest
endpoint 변경 사항
작업별 endpoint 변경 사항
변경 사항 분석
All_Changes.Endpoint_Changes,
.action
유형별 endpoint 변경 사항 All_Changes.Endpoint_Changes,
.object_category
시스템별 endpoint 변경 사항 All_Changes.Endpoint_Changes,
.object_category, .dest
F - M
대시보드 이름 패널 제목 데이터 모
델
데이터 모델 데이터 집합
포워더 감사
(audit)
호스트별 시간에 따른 이벤
트 수 없음. host_eventcount 매크로 및 검색 호출
마지막 보고 시간별 호스트
Splunkd 프로세스 이용률
애플리케이
션 상태
All_Application_State.Processes.cpu_load_percent,
.mem_used, .process, All_Application_State.dest
Splunk 서비스 시작 모드 All_Application_State.Services.start_mode, .status,
.service
HTTP 범주 분석
범주 분포
웹
Web.src, .category
범주 세부정보 Web.src, .dest, .category,
HTTP 사용자 에
이전트 분석
사용자 에이전트 분포
웹
Web.http_user_agent_length, .http_user_agent
사용자 에이전트 세부정보 Web.http_user_agent_length, .src, .dest,
.http_user_agent
대시보드 이름 패널 제목 데이터 모
델
데이터 모델 데이터 집합
ID 센터
우선순위별 ID
자산 및 ID All_Identities.priority, .bunit, .category
사업 부문별 ID
범주별 ID
ID 정보
Identity
Investigator
Identity Investigator 스윔 레인(Swim lane) 선택에 따름
인시던트 검토 감
사(audit)
검토자별 검토 작업
없음. es_notable_events KV 스토어 컬렉션을 통해 검색 호출
상위 검토자
상태별 주요 이벤트 - 최
근 48시간
소유자별 주요 이벤트 -
최근 24시간


최근 검토 작업
인덱싱 감사
(audit)
시간에 따른 일별 이벤
트
없음. licensing_epd KV 일별 이벤트 스토어 컬렉션을 통해 검색 호출
인덱스별 이벤트(마지막
날)
침입 센터
심각도별 시간에 따른
공격
침입 탐지
IDS_Attacks.severity
상위 공격 IDS_Attacks.dest, .src, .signature
스캔 작업(여러 공격) IDS_Attacks.signature
새로운 공격 IDS_Attacks.ids_type
침입 검색 IDS_Attacks.severity, .category, .signature, .src, .dest
조사
조사 없음. 조사 KV 스토어 컬렉션을 통해 검색 호출
조사 시간 표시줄 없음. investigation_event KV 스토어 컬렉션을 통해 검색 호출
조사 메모 첨부 파일 없음. investigation_attachment KV 스토어 컬렉션을 통해 검색 호출
작업 이력
없음. 다섯 개 중 하나의 검색 호출 Splunk Enterprise Security에서 조사
관리를 참조하십시오.
조사 워크벤치 아티팩트 없음. investigation_leads KV 스토어 컬렉션을 통해 검색 호출
조사 워크벤치
인증 데이터 인증 Authentication.app, .action, .src, .src_user, .dest, .user
인증서 활동 인증서
Certificates.SSL, .src, .src_port, .dest, .dest_port,
.ssl_is_valid, .ssl_validity_window, .ssl_hash,
.ssl_serial, .ssl_subject, .ssl_start_time, .ssl_end_time
컴퓨터 인벤토리 인벤토리 Compute_Inventory.All_Inventory, .os, .vendor_product,
.user, .dest
DNS 데이터
네트워크
분석 DNS
Network_Resolution.DNS, DNS.dest, .query,
.query_count, .message_type, .answer, .reply_code
이메일 데이터 이메일 Email.All_Email, .src, .dest, .src_user, .action, .recipient,
.recipient_count, .subject
파일 시스템 변경 사항 변경 사항
분석
Change_Analysis.All_Changes, .user, .dest, .action,
.status,
All_Changes.Endpoint_Changes.Filesystem_Changes,
.file_name, .file_hash, .file_path, .file_size,
.file_create_time, .file_modify_time, .file_access_time
IDS 경고 침입 탐지
Intrusion_Detection.IDS_Attacks, .user, .src, .dest,
.severity, .category, .signature, .ids_type,
.vendor_product, .dvc
최신 OS 업데이트 업데이트 Updates.status, .user, .dest, .signature_id, .signature,
.vendor_product
네트워크 세션 데이터 네트워크
세션
Network_Sessions.All_Sessions, .src_ip, .dest_ip,
.dest_nt_host, .tag, .action, .vendor_product
네트워크 트래픽 데이터 네트워크
트래픽
Network_Traffic.All_Traffic, .packets, .src_ip, .dest_ip,
.user, .transport, .action, .src, .src_port, .dest, .dest_port
주요 이벤트
인시던트
관리
Incident_Management.Notable_Events, .user, .src,
.dest, .rule_name, .severity, .urgency, .security_domain,
.status_label, .owner, .savedsearch_description
포트 활동
애플리케이
션 상태
Application_State.Ports, .dest, .user, dest_port,
.transport, .process_name, .process

프로세스 활동
애플리케이
션 상태
Application_State.All_Application_State, .dest, .user,
.process_name, .process
레지스트리 활동 변경 사항
분석
Change_Analysis_All_Changes, .user, .dest, .action,
.status, .object, object_path, .object_attrs, .object_id,
.Endpoint_Changes.Registry_Changes
위험 점수 위험 분석 Risk.All_Risk, .risk_score, .risk_object_type,
.risk_object
서비스 작업
애플리케이
션 상태
Application_State.Services, .dest, .user, .service,
.service_id, .status, .start_mode, .process_name,
.process
시스템 취약점 취약점 Vulnerabilities.Vulnerabilities, .user, .dest, .severity,
.signature, .category, .vendor_product
사용자 계정 변경 사항
변경 사항
분석
Change_Analysis.All_Changes, .user, .dest, .action,
.status, .object, .object_path, .object_attrs, .object_id,
.Account_Management
웹 활동 웹
Web.Web, .src, .dest, .user, .action, .http_method, .url,
.http_referrer, .http_user_agent, .http_content_type,
.status
대시보드 이름 패널 제목 데이터 모델 데이터 모델 데이터 집합
멀웨어 센터
작업별 시간에 따른 멀웨어
작업
멀웨어
Malware_Attacks.action
서명별 시간에 따른 멀웨어
작업 Malware_Attacks.signature
상위 감염 Malware_Attacks.signature, .dest
새로운 멀웨어 - 최근 30일 없음. malware_tracker 룩업 호출
멀웨어 작업
제품 버전별 클라이언트
없음. malware_operations_서명 버전별 클라이언트 tracker 룩업 호출
가장 오래된 감염
반복적인 감염
멀웨어
Malware_Attacks.action, .signature, .dest
멀웨어 검색 Malware_Attacks.action, .file_name, .user,
.signature, .dest
모듈식 작업 센터
이름별 시간에 따른 작업 호
출
Splunk 감사
(audit) 로그
Modular_Actions.Modular_Action_Invocations,
.action_name
이름별 상위 작업
Modular_Actions.Modular_Action_Invocations,
.action_mode, .user, .duration, .search_name,
.rid, .sid
검색별 상위 작업
Modular_Actions.Modular_Action_Invocations,
.action_name, .action_mode, .user,
.search_name, .rid, .sid
N - S
대시보드 이름 패널 제목 데이터 모델 데이터 모델 데이터 집합
네트워크 변경 사항
작업별 네트워크 변경 사항
변경 사항 분석
All_Changes.Network_Changes,
.action
장치별 네트워크 변경 사항 All_Changes.Network_Changes, .dvc
새로운 도메인 분석
새로운 도메인 작업
기간별 새로운 도메인 작업 웹 Web.dest

TLD별 새로운 도메인 작업
등록 세부정보 없음
대시보드 이름 패널 제목 데이터 모델 데이터 모델 데이터 집합
포트 및 프로토콜 추적
기
포트/프로토콜 프로파일러
네트워크 트래
픽
All_Traffic.transport, .dest_port
시간에 따른 금지된 트래픽 또는
안전하지 않은 트래픽 - 최근 24시
간
All_Traffic.src_category,
.dest_category, .src, .dest, .transport,
.dest_port
금지된 트래픽 세부정보 - 최근 24
시간
All_Traffic.src_category,
.dest_category, .src, .dest, .transport,
.dest_port
새로운 포트 작업 - 최근 7일 없음. 애플리케이션 프로토콜 룩업 호출
프로토콜 센터
프로토콜별 연결
네트워크 트래
픽
All_Traffic.app
프로토콜별 사용량 All_Traffic.app, .bytes
상위 연결 소스 All_Traffic.src
잘 알려진 포트에 대한 사용량 All_Traffic.bytes, .dest_port
장시간 운용 가능한 연결 All_Traffic.src, .src_port, .duration,
.dest, .dest_port, .transport
위험 분석
시간에 따른 위험 수정자
위험 분석
All_Risk.risk_score
개체별 위험 점수 All_Risk.risk_score
가장 활성화된 소스 All_Risk.risk_score, .risk_object
최근 위험 수정자 All_Risk.*
대시보드 이름 패널 제목 데이터 모델 데이터 모델 데이터 집합
보안 포스처
긴급도별 주요 이벤트
없음. es_notable_events KVStore 컬렉션을 통해 검색 호출
시간에 따른 주요 이벤트
상위 주요 이벤트
상위 주요 이벤트 소스
세션 센터
시간에 따른 세션 네트워크 세
션
All_Sessions.Session_*
세션 세부정보 All_Sessions.*
SSL 작업
공통 이름별 SSL 작업
인증서
All_Certificates.SSL.ssl_subject_common_name
SSL 클라우드 세션 All_Certificates.SSL.ssl_subject_common_name,
.src,
최근 SSL 세션
SSL 검색
All_Certificates.src, .dest,
.ssl_subject_common_name, .ssl_subject_email,
.ssl_issuer_common_name,
.ssl_issuer_organization, .ssl_start_time,
.ssl_end_time, .ssl_validity_window, .ssl_is_valid
제거 감사(audit)
시간에 따른 제거된 이벤트 -
최근 24시간
없음
주요 이벤트를 검색하기 위한 매크로 호출
시간에 따른 제거 내역 - 최
근 30일 요약 생성 정보에 대한 매크로 및 검색 호출
제거 관리 작업 eventtype별 검색 호출
만료된 제거 eventtype별 검색 호출

시스템 센터
운영 체제 없음. system_version_tracker 룩업 호출
시스템별 상위 평균 CPU 로
드
성능 All_Performance.CPU.cpu_load_percent,
All_Performance.dest
시스템 수별 서비스 애플리케이
션 상태
All_Application_State.Services
시스템 수별 포트 All_Application_State.Ports
T - Z
대시보드 이름 패널 제목 데이터 모델 데이터 모델 데이터 집합
위협 활동
시간에 따른 위협 활동
침입 탐지, 네트워크 트래픽, 웹. 자세한 내용은 위협 활동 데이
터 소스를 참조하십시오.
가장 활동적인 위협 컬렉션
가장 활동적인 위협 소스
위협 활동 세부정보
위협 아티팩트
위협 개요
없음. 위협 인텔리전스 KV 스토어 컬렉션을 호출합니다. 위협
인텔리전스 컬렉션 리스트는 Splunk Enterprise Security에서
지원되는 위협 인텔리전스 유형을 참조하십시오.
endpoint 아티팩트
네트워크 아티팩트
이메일 아티팩트
인증서 아티팩트
위협 인텔리전스 감
사(audit)
위협 인텔리전스 다운로드 없음. REST endpoint별로 검색 호출
위협 인텔리전스 감사(audit) 이
벤트 없음. eventtype별 검색 호출
시간 센터
시간 동기화 실패
성능
All_Performance.OS.Timesync,
All_Performance.dest,
.dest_should_timesync,
OS.Timesync.action
시간 동기화하지 않은 시스템
인덱싱 시간 지연 없음. Summary Gen 검색 결과 호출
시간 서비스 시작 모드 이상
애플리케이션
상태
All_Application_State.Services.start_mode,
.Services.status, .dest_should_timesync,
.tag, .dest
트래픽 센터
작업별 시간에 따른 트래픽
네트워크 트래
픽
All_Traffic.action
프로토콜별 시간에 따른 트래픽 All_Traffic.transport
스캔 작업(여러 시스템) All_Traffic.dest, .src
상위 소스 All_Traffic.src
트래픽 검색 All_Traffic.action, .src_port, .src, .dest,
.transport, .dest_port
트래픽 크기 분석
시간에 따른 트래픽 크기 이상 네트워크 트래
픽
All_Traffic.transport, .src
트래픽 크기 세부정보 All_Traffic.bytes, .dest, .src
대시보드 이름 패널 제목 데이터 모델 데이터 모델 데이터 집합
업데이트 센터
업데이트가 필요한 상위 시스템
업데이트
Updates.status, .dest, .signature_id,
.vendor_product
필요한 상위 업데이트 Updates.status, .dest, .signature_id,
.vendor_product
업데이트하지 않은 시스템 - 30
일 이상
Updates.dest_should_update, .dest,
.signature_id, .vendor_product, .status

업데이트 서비스 시작 모드 이
상
애플리케이션
상태
All_Application_State.Services.start_mode,
.Services.status, .Services.service, .tag
업데이트 검색 업데이트 Updates.dest_should_update, .status,
.dest, .signature_id, .vendor_product
URL 길이 분석
시간에 따른 URL 길이 이상
웹
Web.http_method, .url
URL 길이 세부정보 Web.url_length, .src, .dest, .url
사용자 작업
위험 점수별 사용자 위험 분석 All_Risk.risk_object
비기업 웹 업로드 웹 Web.bytes, .user, .http_method, .url
비기업 이메일 작업 이메일 All_Email.size, .recipient, .src_user,
관심 대상 사이트 작업 웹 Web.src, .url
원격 액세스 인증 Authentication.src, .user
티켓 작업 티켓 관리 All_Ticket_Management.description,
.priority, . severity, .src_user
대시보드 이름 패널 제목 데이터 모델 데이터 모델 데이터 집합
뷰 감사(audit)
시간에 따른 뷰 작업 Splunk 감사
(audit) 로그
View_Activity.app, .view
예상된 뷰 작업 View_Activity.app, .view, .user
취약성 센터
상위 취약성
취약점
Vulnerabilities.signature, .dest
가장 취약한 호스트 Vulnerabilities.signature, .severity,
.dest
심각도별 취약성 Vulnerabilities.signature, .severity,
.dest
새로운 취약성 vuln_signature_reference 룩업 호출
취약성 작업
시간에 따른 스캔 작업 취약점 Vulnerabilities.dest
기간별 취약성 vulnerability_tracker 룩업 호출
지체된 스캐닝
취약점
Vulnerabilities.dest
취약성 검색 Vulnerabilities.category, .signature,
.dest, .severity, .cve,
웹 센터
메서드별 시간에 따른 이벤트
웹
Web.http_method
상태별 시간에 따른 이벤트 Web.status
상위 소스 Web.dest, .src
상위 대상 Web.dest, .src
웹 검색 Web.http_method, .status, .src, .dest,
.url
추가할 대시보드
다음 대시보드는 Splunk Enterprise Security에 포함되어 있습니다. 탐색 편집기를 사용하여 대시보드를 메뉴 모음에(서) 추
가하거나 재배열하십시오. 탐색 편집기 사용에 대한 자세한 내용은 Splunk Enterprise Security의 메뉴 모음 사용자 지정을
참조하십시오.
Enterprise Security의 전체 대시보드 리스트를 보려면 검색 > 대시보드를 선택하십시오. Enterprise Security의 대시보드
리스트를 추가 기능별로 보려면 콘텐츠 프로파일 대시보드를 사용하십시오. 콘텐츠 프로파일을 참조하십시오.
대시보드 이름 보안 도메인 추가 기능의 일부분
액세스 이상 액세스 DA-ESS-AccessProtection
액세스 센터 액세스 DA-ESS-AccessProtection

액세스 검색 액세스 DA-ESS-AccessProtection
액세스 추적기 액세스 DA-ESS-AccessProtection
계정 관리 액세스 DA-ESS-AccessProtection
자산 센터 자산 SA-IdentityManagement
Asset Investigator 자산 SA-IdentityManagement
콘텐츠 프로파일 감사(audit) SplunkEnterpriseSecuritySuite
데이터 모델 감사(audit) 감사(audit) Splunk_SA_CIM
기본 계정 작업 액세스 DA-ESS-AccessProtection
DNS 작업 네트워크 DA-ESS-NetworkProtection
DNS 검색 네트워크 DA-ESS-NetworkProtection
이메일 작업 네트워크 DA-ESS-NetworkProtection
이메일 검색 네트워크 DA-ESS-NetworkProtection
endpoint 변경 사항 Endpoint DA-ESS-EndpointProtection
포워더 감사(audit) 감사(audit) SA-AuditAndDataProtection
HTTP 범주 분석 네트워크 DA-ESS-NetworkProtection
HTTP 사용자 에이전트
분석 네트워크 DA-ESS-NetworkProtection
ID 센터 ID SA-IdentityManagement
Identity_investigator ID SA-IdentityManagement
인시던트 검토 위협 SA-ThreatIntelligence
인시던트 검토 감사
(audit)
위협 SA-ThreatIntelligence
인덱싱 감사(audit) 감사(audit) SA-AuditAndDataProtection
침입 센터 네트워크 DA-ESS-NetworkProtection
침입 검색 네트워크 DA-ESS-NetworkProtection
멀웨어 센터 Endpoint DA-ESS-EndpointProtection
멀웨어 작업 Endpoint DA-ESS-EndpointProtection
멀웨어 검색 Endpoint DA-ESS-EndpointProtection
네트워크 변경 사항 네트워크 DA-ESS-NetworkProtection
새로운 도메인 분석 네트워크 DA-ESS-NetworkProtection
패널당 필터 감사(audit) 감사(audit) SA-Utils
포트 및 프로토콜 추적기 네트워크 DA-ESS-NetworkProtection
예측 분석 Splunk_SA_CIM
프로토콜 센터 네트워크 DA-ESS-NetworkProtection
REST 감사(audit) 감사(audit) SA-Utils
위험 분석 위협 SA-ThreatIntelligence
검색 감사(audit) 감사(audit) SA-AuditAndDataProtection
보안 포스처 SplunkEnterpriseSecuritySuite
세션 센터 ID SA-IdentityManagement

SSL 작업 네트워크 DA-ESS-NetworkProtection
SSL 검색 네트워크 DA-ESS-NetworkProtection
제거 감사(audit) 위협 SA-ThreatIntelligence
시스템 센터 Endpoint DA-ESS-EndpointProtection
위협 활동 위협 DA-ESS-ThreatIntelligence
위협 아티팩트 위협 DA-ESS-ThreatIntelligence
위협 인텔리전스 감사
(audit)
감사(audit) DA-ESS-ThreatIntelligence
시간 센터 Endpoint DA-ESS-EndpointProtection
트래픽 센터 네트워크 DA-ESS-NetworkProtection
트래픽 검색 네트워크 DA-ESS-NetworkProtection
트래픽 크기 분석 네트워크 DA-ESS-NetworkProtection
업데이트 센터 Endpoint DA-ESS-EndpointProtection
업데이트 검색 Endpoint DA-ESS-EndpointProtection
URL 길이 분석 네트워크 DA-ESS-NetworkProtection
사용자 작업 ID DA-ESS-IdentityManagement
뷰 감사(audit) 감사(audit) SplunkEnterpriseSecuritySuite
취약성 센터 네트워크 DA-ESS-NetworkProtection
취약성 작업 네트워크 DA-ESS-NetworkProtection
취약성 검색 네트워크 DA-ESS-NetworkProtection
웹 센터 네트워크 DA-ESS-NetworkProtection
웹 검색 네트워크 DA-ESS-NetworkProtection


