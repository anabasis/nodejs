# 상관(correlation) 검색

상관(correlation) 검색
Splunk Enterprise Security 상관(correlation) 검색 개요
상관(correlation) 검색은 여러 데이터 원본에서 정의된 패턴을 검색합니다. 검색에서 패턴을 찾으면 adaptive response
작업을 수행합니다.
상관(correlation) 검색에서는 보안 영역의 이벤트(액세스, ID, endpoint, 네트워크), 자산 리스트, ID 리스트, 위협 인텔리전
스 및 Splunk 플랫폼의 기타 데이터 등 여러 가지 유형의 데이터 원본을 검색합니다. 그런 다음 검색에서는 SPL의 함수를 사
용하여 초기 검색 결과를 집계하고, adaptive response 작업을 통해 검색 조건과 일치하는 이벤트에 대응하는 조치를 취합
니다.
상관(correlation) 검색을 만드는 방법은 Splunk Enterprise Security 튜토리얼에서 상관(correlation) 검색 만들기를
참조하십시오.
환경에서 상관(correlation) 검색을 설정하거나 수정하는 방법은 상관(correlation) 검색 설정을 참조하십시오.
상관(correlation) 검색 예
ID 리스트와 호스트 또는 장치 인증 시도의 상관 관계를 분석하여 만료된 계정의 액세스 시도를 식별합니다.
자산 리스트와 endpoint 보호 시스템의 이벤트 간 상관 관계를 분석하여 특정 멀웨어 감염 수가 많은 다수의 호스트나
멀웨어 감염 수가 많은 단일 호스트를 식별합니다.
ID 리스트와 호스트 또는 장치 인증 시도의 상관 관계를 분석하여 단일 호스트의 높은 인증 실패 횟수에 이어 인증에
성공하는 패턴을 식별합니다. 그런 다음 검색에 임계값을 적용하여 인증 시도 횟수를 집계합니다.
Splunk Enterprise Security에서 상관(correlation) 검색 작성
상관(correlation) 검색을 직접 만들어서 주요 이벤트를 만들고, 위험 점수를 수정하고, 기타 adaptive response 작업을 이벤
트의 상관에 따라 자동으로 수행할 수 있습니다. Splunk Enterprise Security에서는 다음 두 가지 방법으로 상관
(correlation) 검색을 만들 수 있습니다.
SPL 전문가인 경우 상관(correlation) 검색을 수동으로 만드십시오. 기존 제공 상관(correlation) 검색을 검토하여 검
색 방법과 사용 가능한 옵션의 예를 찾을 수 있습니다. 상관(correlation) 검색 아이디어를 구현하기 전에 검색 페이지
에서 테스트하십시오.
상관(correlation) 검색 구문에 관한 도움이 더 필요한 경우 가이드식 검색 작성 마법사를 사용하여 상관(correlation)
검색을 만드십시오. 가이드식 검색 작성 마법사를 사용하면 데이터 모델이나 룩업을 데이터 원본으로 사용하는 상관
(correlation) 검색을 만들 수 있습니다. 마법사는 데이터 원본, 시간 범위, 필터링, 집계 함수, 분할 기준 필드 및 기타
조건에 대한 사용자 선택 사항을 사용하여 검색 구문을 자동으로 작성합니다. 상관(correlation) 검색 작성 단계별 튜토
리얼은 Splunk Enterprise Security 튜토리얼에서 상관(correlation) 검색 작성을 참조하십시오.
추가 필드가 사용자 지정 상관(correlation) 검색의 주요 이벤트 세부 정보에 표시되도록 하는 방법에 대한 자세한 내용은 주
요 이벤트 필드 변경을 참조하십시오.
참고 항목은 아래와 같습니다.
Splunk Enterprise Security에서 상관(correlation) 검색 설정
Splunk Enterprise Security의 상관(correlation) 검색 나열
Splunk Enterprise Security에서 상관(correlation) 검색 설정
상관(correlation) 검색을 설정하여 활성화하거나 비활성화하고, 검색 실행 방법과 관련된 설정을 업데이트하고, 검색 논리를
변경하고, 검색에 따른 adaptive response 작업을 조절합니다. 상관(correlation) 검색에 대해 자세히 알아보려면 Splunk
Enterprise Security 상관(correlation) 검색 개요를 참조하십시오.
상관(correlation) 검색 활성화
상관(correlation) 검색을 활성화하여 adaptive response 작업을 실행하고 주요 이벤트를 수신하기 시작합니다.
Splunk Enterprise Security는 모든 상관(correlation) 검색이 비활성화된 상태로 설치되므로, 보안 이용 사례와 가장 관련성
이 높은 검색을 선택할 수 있습니다.
1. Splunk ES 메뉴 모음에서 설정 > 콘텐츠 관리를 선택합니다.
2. 콘텐츠 관리 페이지를 상관(correlation) 검색의 유형을 기준으로 필터링하여 상관(correlation) 검색만 표시합니다.
3. 상관(correlation) 검색의 이름과 설명을 검토하여 보안 이용 사례를 지원하기 위해 활성화할 검색을 결정합니다.
예를 들어 계정 보안 침해가 문제라면 동시 로그인 시도 탐지됨 및 무차별 공격(Brute Force) 액세스 동작이 탐지
됨 상관(correlation) 검색을 활성화하는 방안을 고려하십시오.
4. 작업 컬럼에서 활성화를 클릭하여 활성화하고 싶은 검색을 활성화합니다.

상관(correlation) 검색을 활성화한 후에 주요 이벤트, 위험 점수 및 기타 데이터가 대시보드에 표시되기 시작합니다.
상관(correlation) 검색 예약 변경
상관(correlation) 검색의 기본 검색 유형을 실시간에서 예약으로 변경합니다. Splunk Enterprise Security는 기본적으로 인
덱싱된 실시간 검색을 사용합니다.
1. 콘텐츠 관리 페이지에서 변경할 상관(correlation) 검색을 찾습니다.
2. 작업 컬럼에서 예약으로 변경을 클릭합니다.
예약할 검색을 변경한 후 검색의 예약 설정을 수정할 수 있습니다.
1. 콘텐츠 관리 페이지에서 변경할 상관(correlation) 검색의 이름을 클릭합니다.
2. (선택 사항) 검색 일정을 수정합니다.
상관(correlation) 검색을 실시간 또는 연속 예약으로 실행할 수 있습니다. 실시간 예약을 사용하여 현재 데이터와 성능
을 우선시합니다. 실시간 예약 검색에서는 검색을 예약한 시간에 실행할 수 없는 경우 건너뜁니다. 실시간 예약 검색에
서는 검색을 건너뛸 경우에 발생하는 데이터 공백을 다시 채우지 않습니다. 연속 예약 검색은 건너뛰지 않으므로 데이
터 완전성을 우선시하려면 연속 예약을 사용하십시오.
3. (선택 사항) 크론 스케줄을 수정하여 검색 실행 빈도를 관리합니다.
4. (선택 사항) 검색 예약 창을 지정합니다. 예약 창을 사용하지 않으려면 0을 입력하거나, 스케줄러에서 설정한 자동 예
약 창을 사용하려면 auto를 입력하거나, 예약 창이 지속되길 원하는 분 수에 해당하는 숫자를 입력합니다.
동시에 실행하도록 설정한 예약된 보고서가 많으면 예약 창을 지정하여 검색 스케줄러가 이 검색을 연기하고 우선 순
위가 더 높은 검색을 실행할 수 있게 하십시오.
5. (선택 사항) 검색 예약 우선 순위를 지정합니다. 이 검색을 실행하는 것과 특정 시간에 실행하는 것이 얼마나 중요한지
에 따라 기본값을 더 높게 또는 가장 높게로 변경합니다.
예약 우선 순위 설정은 예약 창 설정보다 우선하므로 두 가지를 모두 설정할 필요는 없습니다.
검색 예약 우선 순위에 대한 내용은 Splunk 플랫폼 매뉴얼을 참조하십시오.
Splunk Enterprise의 경우, Splunk Enterprise 보고 매뉴얼의 Splunk Web에서 동시에 예약된 보고서 우선 순위 지
정을 참조하십시오.
Splunk Cloud의 경우, Splunk Cloud 보고 매뉴얼의 Splunk Web에서 동시에 예약된 보고서 우선 순위 지정을 참조
하십시오.
상관(correlation) 검색 편집
상관(correlation) 검색을 환경에 맞게 변경할 수 있습니다. 예를 들어 검색에 사용되는 임계값을 수정하거나, 성공적인 상관
에 따른 대응 작업을 변경하거나, 검색 실행 빈도를 변경할 수 있습니다. 상관(correlation) 검색을 수정해도 기존 주요 이벤트
에는 영향이 없습니다.
1. 콘텐츠 관리 페이지에서 편집할 상관(correlation) 검색을 찾습니다.
2. 콘텐츠 관리 페이지에서 상관(correlation) 검색의 이름을 클릭하여 검색을 편집합니다.
3. 검색 매개변수를 수정한 다음 저장을 클릭합니다.
상관(correlation) 검색 시작 시간 및 종료 시간을 수정하는 경우 상대 시간 한정자를 사용하십시오. Splunk Enterprise 검
색 매뉴얼의 검색에서 시간 한정자 지정을 참조하십시오.
가이드 모드에서 상관 (correlation) 검색 편집
가이드 모드에서 일부 상관(correlation) 검색을 편집할 수 있습니다. 모든 상관(correlation) 검색에서 가이드식 검색 편집을
지원하지는 않습니다. 검색이 회색으로 비활성화되어 표시되고 가이드 모드에서 검색 편집 옵션이 있는 경우, 검색이 가이
드 모드에서 작성되었고 가이드 모드에서 편집할 수 있음을 의미합니다. 검색을 검색란에서 편집할 수 있는 경우 가이드 모
드에서 편집할 수 없습니다. 가이드 모드로 전환하려고 하면 새 검색이 기존 검색을 덮어씁니다.
1. 가이드 모드에서 검색 편집을 클릭하여 가이드식 검색 작성 마법사를 엽니다.
2. 상관(correlation) 검색의 검색 요소를 검토하고, 원할 경우 변경합니다.
3. 검색을 저장합니다.
상관(correlation) 검색에서 생성되는 대응 작업 수 조절
조절을 설정하여 상관(correlation) 검색에서 생성되는 대응 작업의 수를 제한합니다. 상관(correlation) 검색에서 이벤트와
일치하는 항목을 찾으면 대응 작업이 트리거됩니다.
기본적으로 상관(correlation) 검색에서 반환하는 모든 결과가 대응 작업을 생성합니다. 일반적으로 특정 유형의 경고가 하나
만 필요합니다. 조절을 사용하여 상관(correlation) 검색에서 경고를 일정 기간 내에 2개 이상 생성하지 않도록 할 수 있습니
다. 대응 작업을 생성하는 결과의 유형을 변경하려면 트리거 조건을 정의하십시오. 일부 대응 작업에 대해서는 조절 외에 최
대 결과 수도 지정할 수 있습니다. Splunk Enterprise Security에서 adaptive response 작업 설정을 참조하십시오.
1. 설정 > 콘텐츠 관리를 선택합니다.

2. 편집할 상관(correlation) 검색의 제목을 클릭합니다.
3. 창 기간을 입력합니다. 이 기간 중에는 그룹화 기준 필드와 일치하는 추가 이벤트가 새 경고를 만들지 않습니다. 기간
이 끝난 후에는 다음으로 일치하는 이벤트가 새 경고를 만들고 조절 조건을 다시 적용합니다.
4. 그룹화 기준 필드를 입력하여 유사 이벤트 일치 시에 사용할 필드를 지정합니다. 여기에 나열된 필드가 생성된 경고와
일치하는 경우 상관(correlation) 검색에서 새 경고를 만들지 않습니다. 필드를 2개 이상 정의할 수 있습니다. 사용 가
능한 필드는 상관(correlation) 검색에서 반환하는 검색 필드에 따라 다릅니다.
5. 상관(correlation) 검색을 저장합니다.
조절은 상관(correlation) 검색 대응 작업의 유형에 관계없이 적용되고, 주요 이벤트 제거 전에 수행됩니다. 주요 이벤트 제거
에 대한 자세한 내용은 주요 이벤트 제거 작성 및 관리를 참조하십시오.
상관(correlation) 검색에 의해 adaptive response 작업이 생성되는 트리거 조건 정의
상관(correlation) 검색에 의해 adaptive response 작업이 생성되는 경우를 제어하는 조건을 수정할 수 있습니다. 조절은 트
리거 조건을 정의하는 것과 다르며, 검색 결과가 트리거 조건을 충족한 후에 수행됩니다. 트리거 조건을 정의하면 상관
(correlation) 검색 결과가 조건과 일치하는지 확인하기 하기 위해 평가됩니다. 검색 결과가 조건과 일치하는 경우, 조절 규칙
에 따라 adaptive response 작업 생성 여부가 제어됩니다.
상관(correlation) 검색에서 반환되는 결과의 수, 호스트 수나 원본 수 또는 사용자 지정 기준에 따라 대응 작업을 결과별로 생
성하는 트리거 조건을 설정할 수 있습니다. 사용자 지정 기준을 사용하는 경우, 사용자 지정 검색 문자열을 입력하여 조건을
만드십시오. 트리거 조건은 상관(correlation) 검색 결과를 대상으로 한 보조 검색으로 사용됩니다.
트리거 조건과 검색에 대해 트리거 조건을 설정하는 방법에 대한 내용은 Splunk 플랫폼 매뉴얼을 참조하십시오.
Splunk Enterprise의 경우, Splunk Enterprise 경고 매뉴얼에서 경고 트리거 조건 설정을 참조하십시오.
Splunk Cloud의 경우, Splunk Cloud 경고 매뉴얼에서 경고 트리거 조건 설정을 참조하십시오.
참고 항목은 아래와 같습니다.
Splunk Enterprise Security의 상관(correlation) 검색 나열
Splunk Enterprise Security에서 adaptive response 작업 설정
Splunk Enterprise Security의 상관(correlation) 검색 나열
Splunk Enterprise Security에서 사용 가능한 상관(correlation) 검색의 리스트를 얻으려면 REST 검색을 사용하여 테이블
에 포함시킬 정보를 추출하십시오.
예를 들어 환경의 앱, 보안 도메인, 이름과 모든 상관(correlation) 검색에 대한 설명이 포함된 테이블을 만들 수 있습니다.
| rest splunk_server=local count=0 /services/saved/searches | where match('action.correlationsearch.enabled',
"1|[Tt]|[Tt][Rr][Uu][Ee]") | rename eai:acl.app as app, title as csearch_name, action.correlationsearch.label as
csearch_label, action.notable.param.security_domain as security_domain | table csearch_name, csearch_label, app,
security_domain, description
또 다른 예로, 환경에서 사용 가능한 상관(correlation) 검색과 해당 검색과 관련된 adaptive response 작업만 포함된 테이블
도 만들 수 있습니다. 모든 상관(correlation) 검색에 대한 adaptive response 작업을 보려면 | where disabled=0을 제거하십
시오.
| rest splunk_server=local count=0 /servicesNS/-/SplunkEnterpriseSecuritySuite/saved/searches | where
match('action.correlationsearch.enabled', "1|[Tt]|[Tt][Rr][Uu][Ee]") | where disabled=0 | eval
actions=split(actions, ",") | table title,actions
Splunk Enterprise Security의 상관(correlation) 검색 업그레이드
Splunk Enterprise Security 4.6.0 버전부터 correlationsearches.conf는 더 이상 상관 분석을 정의하는 데 사용되지 않습니
다. 그 대신 savedsearches.conf에서 action.correlationsearch.enabled=1 매개변수를 사용하여 상관(correlation) 검색을 고
유하게 식별합니다. correlationsearches.conf 파일은 지원이 중단되었습니다.
업그레이드 시에 Splunk Enterprise Security가 적용하는 변경 사항
Splunk Enterprise Security 4.6.0으로 업그레이드할 때 Splunk Enterprise Security는 환경에 있는 모든 상관(correlation)
검색을 confcheck_es_correlationmigration.py 스크립트를 사용하여 correlationsearches.conf에서 savedsearches.conf로 마
이그레이션합니다. 업그레이드 후에 마이그레이션을 완료하는 데는 최대 5분이 소요될 수 있습니다. 검색 헤드 클러스터에
서 캡틴이 마이그레이션을 수행합니다.
Splunk Enterprise Security는 업그레이드 중에 주요 이벤트를 중단 없이 계속 만듭니다. 이렇게 변경해도 Threat -
Correlation Searches - Lookup Gen 저장된 검색에서 인시던트 검토에 의해 사용되는 correlationsearches KV 스토어 컬렉션
을 채우기 위해 correlationsearches.conf 및 savedsearches.conf를 계속 사용하므로 주요 이벤트가 인시던트 검토에 표시되

지 않거나 표시가 지연되지 않습니다.
업그레이드 후에 변경해야 하는 사항
Splunk Enterprise Security 4.6.0 이상으로 업그레이드한 후에 추가로 변경해야 하는 사항이 있습니다.
검색이 성공적으로 마이그레이션되지 않았음을 나타내는 검색 정의에 대해서는 correlationsearches.conf를 확인하십
시오. 마이그레이션된 검색은 savedsearches.conf에만 존재합니다. 검색이 성공적으로 마이그레이션되지 않은 경우 아
래의 매개변수 정의를 사용하여 correlationsearches.conf 항목을 savedsearches.conf로 수동으로 마이그레이션하십시
오.
correlationsearches REST endpoint를 호출하는 검색을 업데이트합니다.
예를 들어 환경에 있는 상관(correlation) 검색의 리스트를 표시하는 검색은 다음과 같이 변경됩니다.
| rest splunk_server=local /services/alerts/correlationsearches | rename eai:acl.app as app, title as
csearch_name | table app security_domain csearch_name description
~
| rest splunk_server=local count=0 /services/saved/searches | where
match('action.correlationsearch.enabled', "1|[Tt]|[Tt][Rr][Uu][Ee]") | rename eai:acl.app as app, title
as csearch_name, action.correlationsearch.label as csearch_label, action.notable.param.security_domain as
security_domain | table csearch_name, csearch_label, app, security_domain, description
업데이트되는 검색의 더 많은 예는 Splunk Enterprise Security의 상관(correlation) 검색 나열을 참조하십시오.
correlationsearches KV 스토어 컬렉션을 참조하는 사용자 지정 검색 매크로는 계속 전과 같이 작동하지만, 그래도 업그레이
드하는 방안을 고려하십시오.
correlationsearches.conf savedsearches.conf로 매개변수 변환
모든 correlationsearches.conf 매개변수는 이제 savedsearches.conf에 있고, correlationsearches.conf 파일은 지원이 중단되
었습니다. 상관(correlation) 검색 정의를 수동으로 마이그레이션하려는 경우를 제외하고 직접 업데이트하지 마십시오.
상관(correlation) 검색의 식별 매개변수
새로운 매개변수가 저장된 검색이 상관(correlation) 검색인지 여부와 상관(correlation) 검색의 이름을 식별합니다.
correlationsearches.conf 매
개변수
(4.6.0 전 버전)
savedsearches.conf 매개변수
4.6.0 이후
참고
해당 없음 action.correlationsearch=0 내부 매개변수이며, 무시할 수 있습니다.
검색에 대한 스탠자가 있음 action.correlationsearch.enabled=1
이 매개변수는 저장된 검색을 상관(correlation) 검
색으로 식별합니다.
rule_name action.correlationsearch.label
이 매개변수는 상관(correlation) 검색의 이름을 제
공합니다.
description description
이 매개변수는 상관(correlation) 검색에 대한 설명
을 제공합니다.
상관(correlation) 검색의 주요 이벤트 매개변수
action.notable 매개변수는 상관(correlation) 검색과 연결된 주요 이벤트를 식별합니다. 주요 이벤트와 관련된 추가적인 세
부 정보를 설명하는 매개변수는 이제 savedsearches.conf 파일에 있습니다.
correlationsearches.conf 매개변수
(4.6.0 전 버전)
savedsearches.conf 매개변수
4.6.0 이후
security_domain action.notable.param.security_domain
severity action.notable.param.severity
rule_title action.notable.param.rule_title
rule_description action.notable.param.rule_description
nes_fields action.notable.param.nes_fields

drilldown_name action.notable.param.drilldown_name
drilldown_search action.notable.param.drilldown_search
default_status action.notable.param.default_status
default_owner action.notable.param.default_owner
상관(correlation) 검색 관련 검색 매개변수
상관(correlation) 검색과 관련된 검색(극한 검색을 사용하는 상관(correlation) 검색과 연결된 콘텐츠 생성 검색 등)은 이제
JSON blob action.correlationsearch.related_searches 매개변수의 일부분입니다.
correlationsearches.conf 매개변수
(4.6.0 전 버전)
savedsearches.conf 매개변수
4.6.0 이후
related_search_name = Endpoint - Emails By Source - Context
Gen
related_search_name.0 = Endpoint - Emails By Destination
Count - Context Gen
action.correlationsearch.related_searches = [\
"Endpoint - Emails By Source - Context
Gen",\
"Endpoint - Emails By Destination Count -
Context Gen"\
]
이 버전과 이전 버전의 상관 (correlation) 검색 스탠자 예
4.6.0부터 상관(correlation) 검색에 대한 savedsearches.conf 스탠자는 다음과 같습니다.
[Access - Concurrent App Accesses - Rule]
action.correlationsearch = 0
action.correlationsearch.enabled = 1
action.correlationsearch.label = Concurrent Login Attempts Detected
action.email.sendresults = 0
action.notable = 0
action.notable.param.security_domain = access
action.notable.param.severity = medium
action.notable.param.rule_title = Concurrent Access Event Detected For $user$
action.notable.param.rule_description = Concurrent access attempts to $app1$ by $user$ from two different sources(
$src1$, $src2$ ) have been detected.
action.notable.param.nes_fields = user
action.notable.param.drilldown_name = View access attemps by $user$
action.notable.param.drilldown_search = | datamodel Authentication Authentication search | search
Authentication.user="$user$"
action.risk = 1
action.risk.param._risk_object = user
action.risk.param._risk_object_type = user
action.risk.param._risk_score = 20
alert.suppress = 1
alert.suppress.fields = user
alert.suppress.period = 86300s
alert.track = false
cron_schedule = 10 * * * *
description = Alerts on concurrent access attempts to an app from different hosts. These are good indicators of
shared passwords and potential misuse.
disabled = True
dispatch.earliest_time = -70m@m
dispatch.latest_time = -5m@m
enableSched = 1
is_visible = false
request.ui_dispatch_app = SplunkEnterpriseSecuritySuite
search = | tstats `summariesonly` count from datamodel=Authentication.Authentication by
_time,Authentication.app,Authentication.src,Authentication.user span=1s | `drop_dm_object_name("Authentication")` |
eventstats dc(src) as src_count by app,user | search src_count>1 | sort 0 + _time | streamstats current=t window=2
earliest(_time) as previous_time,earliest(src) as previous_src by app,user | where (src!=previous_src) | eval
time_diff=abs(_time-previous_time) | where time_diff<300
이전 Splunk Enterprise Security 버전에서 동일한 상관(correlation) 검색의 savedsearches.conf 및
correlationsearches.conf 정의는 다음과 같습니다. savedsearches.conf

[Access - Concurrent App Accesses - Rule]
action.email.sendresults = 0
action.risk = 1
action.risk.param._risk_object = user
action.risk.param._risk_object_type = user
action.risk.param._risk_score = 20
alert.suppress = 1
alert.suppress.fields = user
alert.suppress.period = 86300s
alert.track = false
cron_schedule = 10 * * * *
disabled = True
dispatch.earliest_time = -70m@m
dispatch.latest_time = -5m@m
enableSched = 1
is_visible = false
request.ui_dispatch_app = SplunkEnterpriseSecuritySuite
search = | tstats `summariesonly` count from datamodel=Authentication.Authentication by
_time,Authentication.app,Authentication.src,Authentication.user span=1s | `drop_dm_object_name("Authentication")` |
eventstats dc(src) as src_count by app,user | search src_count>1 | sort 0 + _time | streamstats current=t window=2
earliest(_time) as previous_time,earliest(src) as previous_src by app,user | where (src!=previous_src) | eval
time_diff=abs(_time-previous_time) | where time_diff<300
correlationsearches.conf
[Access - Concurrent App Accesses - Rule]
security_domain = access
severity = medium
rule_name = Concurrent Login Attempts Detected
description = Alerts on concurrent access attempts to an app from different hosts. These are good indicators
of shared passwords and potential misuse.
rule_title = Concurrent Access Event Detected For $user$
rule_description = Concurrent access attempts to $app1$ by $user$ from two different sources( $src1$, $src2$ )
have been detected.
nes_fields = user
drilldown_name = View access attemps by $user$
drilldown_search = | datamodel Authentication Authentication search | search Authentication.user="$user$"
default_owner =
default_status =
Splunk Enterprise Security에서 adaptive response 작업 설정
Adaptive response 작업을 통해 상관(correlation) 검색의 결과나 주요 이벤트의 세부 정보에 대응하여 정보를 수집하거
나 기타 작업을 수행할 수 있습니다. Splunk Enterprise Security에는 몇 가지 adaptive response 작업이 포함되어 있습니
다. 포함된 adaptive response 작업을 참조하십시오.
Adaptive response 작업과 경고 작업을 상관(correlation) 검색에 추가하거나, 인시던트 검토 대시보드의 주요 이벤트에서
adaptive response 작업을 실행할 수 있습니다. 조사를 시작하기 전에 정보를 수집하여 분류 시에 adaptive response 작업
을 상관(correlation) 검색에 추가해서 시간을 절약할 수 있습니다. 분류 시에 인시던트 검토 대시보드에서 adaptive
response 작업을 실행하여 조치를 취하십시오.
새 adaptive response 작업 추가
새 adaptive response 작업을 추가하려면 adaptive response 작업이 있는 추가 기능을 설치하거나 adaptive response 작
업을 직접 만들 수 있습니다. Adaptive response 작업 만들기에 대한 내용은 Splunk 개발자 포털에서 adaptive response
작업 만들기를 참조하십시오. 설치 및 업그레이드 매뉴얼에서 Splunk Enterprise Security에 포함된 배포 추가 기능을 참조
하십시오.
Adaptive Response 작업 감사(audit)
Adaptive Response 작업 센터에서 모든 adaptive response 작업에 대한 감사(audit)를 실시할 수 있습니다.
adaptive response 작업 권한 설정
경고 작업 관리자에서 adaptive response 작업에 대한 권한을 조정하여 특정 adaptive response 작업을 특정 역할로 제한

할 수 있습니다. 경고 작업 관리자에 대한 내용은 Splunk 플랫폼 매뉴얼에서 확인할 수 있습니다.
Splunk Enterprise의 경우, Splunk Enterprise 경고 매뉴얼에서 경고 작업 관리자 사용을 참조하십시오.
Splunk Cloud의 경우, Splunk Cloud 경고 매뉴얼에서 경고 작업 관리자 사용을 참조하십시오.
자격 증명 관리자에 자격 증명이 저장되어 있는 인시던트 검토 대시보드에서 adaptive response 작업을 실행하기 위해서는
해당 기능을 보유하고 있어야 합니다.
Splunk 플랫폼 6.5.0 버전 이상의 경우 list_storage_passwords
이전 Splunk 플랫폼 버전의 경우 admin_all_objects
상관(correlation) 검색에 adaptive response 작업 추가
1. Splunk Enterprise Security 메뉴 모음에서 설정 > 콘텐츠 관리를 클릭합니다.
2. 기존 상관(correlation) 검색을 클릭하거나 새로 만들기 > 상관(correlation) 검색을 클릭합니다.
3. 새 대응 작업 추가를 클릭하고 추가할 대응 작업을 선택합니다.
4. 작업에 대한 필드를 작성합니다. 원할 경우 대응 작업을 하나 더 추가합니다.
5. 저장을 클릭하여 상관(correlation) 검색에 적용한 변경 사항을 모두 저장합니다.
Splunk Enterprise Security에 포함된 adaptive response 작업을 각각 설정하는 방법에 대한 설명은 Splunk Enterprise
Security에서 상관(correlation) 검색에 대한 adaptive response 작업 설정을 참조하십시오. 사용자 지정 adaptive
response 작업을 설정하는 방법에 대한 설명은 adaptive response 작업을 제공한 앱 또는 추가 기능에 대한 매뉴얼을 참조
하십시오.
Adaptive response 작업을 선택할 수 없는 문제 해결
상관(correlation) 검색 편집기나 인시던트 검토에서 adaptive response 작업을 선택할 수 없는 경우, 몇 가지 이유 때문일
수 있습니다.
역할에 adaptive response 작업을 보고 사용할 권한이 없을 수 있습니다. 경고 매뉴얼에서 경고 작업 관리자 사용을
참조하십시오.
경고 작업 관리자에서 Splunk 플랫폼에 adaptive response 작업이 있는지 확인합니다. 경고 매뉴얼에서 경고 작업
관리자 사용을 참조하십시오.
추가 기능의 adaptive response 작업이 Splunk Enterprise Security에 표시되지 않지만 경고 작업 관리자에는 표시
되는 경우, Splunk Enterprise Security에서 추가 기능을 가져오고 있는지 확인합니다. 설치 및 업그레이드 매뉴얼에
서 사용자 지정 앱 및 추가 기능을 Splunk Enterprise Security로 가져오기를 참조하십시오.
Adaptive response 작업을 상관(correlation) 검색 편집기에서 선택할 수 있지만 인시던트 검토에서는 선택할 수 없는
경우, adaptive response 작업이 일반적인 경고 작업이거나 대응 작업이 임시 호출을 지원하지 않기 때문일 수 있습니
다. Splunk 개발자 포털에서 작업이 임시 호출을 지원하는지 여부 확인을 참조하십시오.
Splunk Enterprise Security에서 상관(correlation) 검색에 대한
adaptive response 작업 설정
Splunk Enterprise Security 관리자는 상관(correlation) 검색이 트리거하는 adaptive response 작업을 설정할 수 있습니
다.
애널리스트는 일부 adaptive response 작업을 인시던트 검토에서 임시로 실행할 수 있습니다. Splunk Enterprise Security
사용에서 Splunk Enterprise Security에 포함된 adaptive response 작업을 참조하십시오.
Splunk Enterprise Security에는 몇 가지 adaptive response 작업이 포함되어 있으며, Splunkbase에서 제공되는 추가 기
능에서 추가 작업을 얻을 수 있습니다.
포함된 Adaptive Response 작업
Splunk Enterprise Security에는 몇 가지 adaptive response 작업이 포함되어 있습니다.
주요 이벤트를 만듭니다.
위험 수정자를 사용하여 위험 점수를 수정합니다.
이메일을 보냅니다.
스크립트를 실행합니다.
Splunk Stream을 사용하여 스트림 캡처를 시작합니다.
호스트를 핑(Ping)합니다.
Nbtstat를 실행합니다.
Nslookup을 실행합니다.
위협 인텔리전스를 추가합니다.
Splunk Web 메시지를 만듭니다.
주요 이벤트 만들기

상관(correlation) 검색 조건이 충족되면 주요 이벤트를 만드십시오.
1. Splunk Enterprise Security 메뉴 모음에서 설정 > 콘텐츠 관리를 클릭합니다.
2. 기존 상관(correlation) 검색을 클릭하거나 새로 만들기 > 상관(correlation) 검색을 클릭합니다.
3. 새 Response Action 추가를 클릭하고 주요를 선택하여 주요 이벤트를 추가합니다.
4. 인시던트 검토 대시보드에서 주요 이벤트의 제목을 입력합니다. 일치하는 이벤트의 필드에서 변수 대체를 지원합니
다.
5. 주요 이벤트에 대한 설명을 입력합니다. 일치하는 이벤트의 필드에서 변수 대체를 지원합니다.
6. 주요 이벤트의 보안 도메인을 드롭다운 리스트에서 선택합니다.
7. 주요 이벤트의 심각도를 드롭다운 리스트에서 선택합니다. 심각도는 주요 이벤트의 긴급도를 계산하는 데 사용됩니
다.
8. (선택 사항) 주요 이벤트 기본 소유자를 시스템 기본값인 배정되지 않음에서 변경합니다.
9. (선택 사항) 주요 이벤트 기본 상태를 시스템 기본값인 새 이벤트에서 변경합니다.
10. 주요 이벤트의 기여 이벤트 링크에 대한 드릴다운 이름을 입력합니다.
11. 주요 이벤트의 기여 이벤트 링크에 대한 드릴다운 검색을 입력합니다.
12. 드릴다운 시작 오프셋 필드에 트리거링 이벤트 시간 전에 주요 이벤트의 기여 이벤트 링크 관련 이벤트를 찾아볼 시
간을 입력합니다.
예를 들어 트리거링 이벤트 2시간 전의 기여 이벤트를 찾아보려면 2h를 입력합니다.
13. 드릴다운 종료 오프셋 필드에 트리거링 이벤트 시간 후에 주요 이벤트의 기여 이벤트 링크 관련 이벤트를 찾아볼 시
간을 입력합니다.
예를 들어 트리거링 이벤트 1시간 후의 기여 이벤트를 찾아보려면 1h를 입력합니다.
14. (선택 사항) 주요 이벤트에 적용되는 조사 프로파일을 추가합니다.
예를 들어, "멀웨어"의 이용 사례를 멀웨어 관련 주요 이벤트에 일치시키는 조사 프로파일을 추가합니다.
15. (선택 사항) 자산이 포함된 필드를 자산 추출에 추가하여 필드 값을 추출하고 주요 이벤트가 조사에 추가될 때 필드 값
을 조사 워크벤치에 아티팩트로 추가합니다.
16. (선택 사항) ID가 포함된 필드를 ID 추출에 추가하여 필드 값을 추출하고 주요 이벤트가 조사에 추가될 때 필드 값을 조
사 워크벤치에 아티팩트로 추가합니다.
17. 주요 이벤트를 분류한 후에 애널리스트가 수행할 다음 단계를 입력합니다. 텍스트를 입력하거나, 다음 단계 텍스트의
대응 작업을 참조하려면 Adaptive Response 작업 삽입을 클릭합니다. 다음 단계 필드에는 일반 텍스트와 대응 작
업 링크만 입력할 수 있습니다. 특정한 순서로 수행해야 하는 대응 작업을 권장하려면 다음 단계를 사용하십시오.
예를 들어 호스트를 핑(ping)하여 호스트가 네트워크에서 활성인지 확인합니다. 호스트가 활성인 경우 위험 점수를
100점 올리고, 그렇지 않으면 위험 점수를 50점 올립니다.
18. 권장 작업을 선택하여 다음 단계를 보완합니다. 모든 adaptive response 작업 리스트에서 이 주요 이벤트의 분류 또
는 조사 단계로 권장할 작업의 이름을 클릭하여 애널리스트가 이 주요 이벤트에 대해 수행할 수 있는 권장 작업 리스트
에 추가합니다. 권장 작업을 원하는 수만큼 추가할 수 있습니다. 권장 작업은 특정한 순서로 수행하지 않아도 되는 대
응 작업을 권장하는 데 사용하십시오.
예를 들어 호스트의 위험 점수를 높이고 도메인 이름에 대한 nslookup을 수행하는 데 사용하십시오.
위험 수정자를 사용하여 위험 점수 수정
위험 분석 adaptive response 작업을 통해 상관(correlation) 검색의 결과에 따라, 또는 주요 이벤트 세부 사항에 대응하여
위험 점수를 수정할 수 있습니다. 위험 adaptive response 작업은 위험 수정자 이벤트를 만듭니다. Enterprise Security의
위험 분석 대시보드에서 위험 수정자 이벤트를 확인할 수 있습니다.
1. 새 대응 작업 추가를 클릭하고 위험 분석을 선택합니다.
2. 위험 개체에 배정할 점수를 입력합니다.
3. 위험 점수를 적용할 검색의 필드를 위험 개체 필드에 입력합니다.
예를 들어 소스 필드를 지정하려면 "src"를 입력하십시오.
4. 위험 점수를 적용할 위험 개체 유형을 선택합니다.
위험 점수를 수정하는 다른 방법은 Splunk Enterprise Security 사용의 개체에 위험 배정을 참조하십시오.
이메일 보내기
상관(correlation) 검색 일치의 결과로 이메일을 보냅니다.
전제 조건
이 대응 작업을 설정하기 전에 Splunk 플랫폼에 메일 서버가 설정되어 있는지 확인하십시오.
Splunk Enterprise의 경우, Splunk Enterprise 경고 매뉴얼에서 이메일 알림 설정 구성을 참조하십시오.
Splunk Cloud의 경우, Splunk Cloud 경고 매뉴얼에서 이메일 알림 설정 구성을 참조하십시오.
절차
1. 새 대응 작업 추가를 클릭하고 이메일 보내기를 선택합니다.
2. 수신 필드에 이메일을 보낼 이메일 주소의 쉼표로 구분된 리스트를 입력합니다.
3. (선택 사항) 이메일 우선 순위를 변경합니다. 기본값은 최저입니다.
4. 이메일 제목을 입력합니다. 이메일의 기본 제목은 "Splunk 경고: $name$"입니다. 여기서 $name$은 상관
(correlation) 검색의 검색 이름입니다.
5. 이메일 본문으로 포함시킬 메시지를 입력합니다. 기본값은 "예약된 보고서 '$name$'이(가) 실행되었습니다."입니다.
6. 이메일 메시지에 포함시킬 정보의 체크박스를 선택합니다.
7. 보낼 이메일 메시지의 형식을 일반 텍스트 또는 HTML과 일반 텍스트 중에서 선택합니다.
스크립트 실행
$SPLUNK_HOME/bin/scripts에 저장된 스크립트를 실행합니다.
1. 새 대응 작업 추가를 클릭하고 스크립트 실행을 선택합니다.
2. 스크립트 파일 이름을 입력합니다.
스크립트 기반 경고에 대한 자세한 내용은 Splunk 플랫폼 매뉴얼에서 확인할 수 있습니다.
Splunk Enterprise의 경우, Splunk Enterprise 경고 매뉴얼에서 스크립트 기반 경고 설정을 참조하십시오.
Splunk Cloud의 경우, Splunk Cloud 경고 매뉴얼에서 스크립트 기반 경고 설정을 참조하십시오.
Splunk Stream을 사용하여 스트림 캡처 시작
스트림 캡처를 시작하여 선택된 프로토콜의 IP 주소에서 선택된 기간 동안 패킷을 캡처할 수 있습니다. 캡처 세션 결과는 프
로토콜 인텔리전스 대시보드에서 확인할 수 있습니다.
Splunk 스트림을 Splunk Enterprise Security과 통합하지 않는 한, 스트림 캡처가 작동하지 않습니다. Splunk Enterprise
Security와 Splunk 스트림 통합을 참조하십시오.
1. 상관(correlation) 검색 일치에 대응하여 패킷 캡처를 시작하려면 새 대응 작업 추가를 클릭하고 스트림 캡처를 선택
합니다.
2. 상관(correlation) 검색 일치에 대응하여 만든 스트림에 대해 설명하는 설명을 입력합니다.
3. 스트림 캡처 유형을 정의하는 범주를 입력합니다. Splunk 스트림에서 스트림을 범주별로 볼 수 있습니다.
4. 스트림 캡처 IP 주소를 검색할 쉼표로 구분된 이벤트 필드를 입력합니다. null이 아닌 첫 번째 필드가 캡처에 사용됩니
다.
5. 캡처할 프로토콜의 쉼표로 구분된 리스트를 입력합니다.
6. 패킷 캡처 길이를 정의하는 캡처 기간을 선택합니다.
7. 스트림 캡처 제한을 입력하여 상관(correlation) 검색에 의해 시작되는 스트림 캡처 수를 제한합니다.
호스트 핑(Ping)
호스트를 핑(ping)하여 호스트가 네트워크에서 아직 활성인지 확인합니다.
1. 새 대응 작업 추가를 클릭하고 핑을 선택합니다.
2. 핑(ping)할 호스트가 있는 이벤트 필드를 호스트 필드에 입력합니다.
3. 핑(ping)에서 반환되는 최대 결과 수를 입력합니다. 기본값은 1입니다.
Nbtstat 실행
Nbtstat을 실행하여 호스트와 호스트가 실행하는 서비스에 대해 자세히 알아봅니다.
1. 새 대응 작업 추가를 클릭하고 Nbtstat을 선택합니다.
2. Nbtstat을 실행할 호스트가 있는 이벤트 필드를 호스트 필드에 입력합니다.
3. Nbtstat에서 반환되는 최대 결과 수를 입력합니다. 기본값은 1입니다.
Nslookup 실행
Nslookup을 실행하여 IP 주소의 도메인 이름이나 도메인 이름의 IP 주소를 조회합니다.
1. 새 대응 작업 추가를 클릭하고 Nslookup을 선택합니다.
2. Nslookup을 실행할 호스트가 있는 이벤트 필드를 호스트 필드에 입력합니다.
3. Nslookup에서 반환되는 최대 결과 수를 입력합니다. 기본값은 1입니다.
위협 인텔리전스 추가
위협 아티팩트를 위협 컬렉션에 만듭니다.
1. 새 대응 작업 추가를 클릭하고 위협 인텔리전스 추가를 선택합니다.
2. 이 아티팩트를 귀속시킬 위협 그룹을 선택합니다.
3. 위협 아티팩트를 삽입할 위협 컬렉션을 선택합니다.
4. 위협 아티팩트에 삽입할 값이 있는 검색 필드를 입력합니다.
5. 위협 아티팩트에 대한 설명을 입력합니다.
6. 위협 리스트와 연결된 가중치를 입력합니다. 기본값은 1입니다.
7. 최대 결과 수를 입력하여 위협 아티팩트로 처리할 결과의 수를 지정합니다. 각 고유 검색 필드 값이 결과 수에 포함됩
니다. 기본값은 100입니다.

