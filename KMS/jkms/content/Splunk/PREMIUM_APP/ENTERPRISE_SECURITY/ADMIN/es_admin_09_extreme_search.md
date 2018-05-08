# 극단 검색

Splunk Enterprise Security가 극단 검색을 사용하는 방법
극단 검색은 명령어 집합을 사용하여 Splunk 플랫폼 검색 언어를 개선합니다. 극단 검색 명령어의 리스트는 극단 검색 명령
어어를 참조하십시오.
Splunk Enterprise Security에서 이행하는 극단 검색 명령어어를 사용하여 다음을 수행할 수 있습니다.
이벤트 데이터를 토대로 동적 임계값 작성
이벤트 수를 자연스러운 언어로 바꿔서 컨텍스트 인식 제공
예를 들어 Enterprise Security 멀웨어 센터 대시보드에서 총 감염 수 핵심 보안 지표는 지난 48시간 동안 멀웨어에 감염된
총 시스템 수를 표시합니다.
Splunk ES는 현재 감염 카운트를 전날 감염된 시스템 카운트와 비교하여 표시되는 변동률을 결정합니다. 사용자 환경에서
하루에 감염되는 시스템 수의 일반적인 범위는 자동으로 결정되지 않습니다. 임계값은 전적으로 사용자에 의해 설정됩니다.
감염 수가 3만큼 증가했지만, 이 증가폭이 중요한지 나타내는 컨텍스트가 값에 없습니다.
극단 검색을 사용하는 동일한 지표는 관련 정보를 표시하지만, 기본 총 감염 수 지표에서 제공되지 않던 심층적인 정보를 포
함합니다.
극단 검색을 사용하여, Splunk ES는 감염 수와 새 감염 비율을 동적으로 업데이트되는 모델을 사용하여 계산합니다. 핵심
보안 지표에는 상황에 맞고 이해하기 쉬운 언어가 사용됩니다. 이 사례에서는 총 멀웨어 감염 수가 다른 날보다 높지 않고 감
염 변동률이 우려할 수준이 아님을 확인할 수 있습니다.
극단 검색에서 컨텍스트와 개념이 사용되는 용도
컨텍스트와 개념이라는 핵심적인 관념은 극단 검색을 이해하는 데 중요합니다. 이 두 가지 관념은 극단 검색 명령어에서 동
적 임계값에 사용되는 데이터 모델을 책임집니다.
1. 컨텍스트: 컨텍스트는 필드 또는 데이터와의 관계를 숫자로 정의합니다. 모델링할 데이터는 검색의 결과로서 숫자 값
으로 나타내야 합니다. 컨텍스트의 예로는 지난 24시간 동안의 총 네트워크 처리량이나 지난 24시간 동안의 네트워크
대기 시간 등이 있습니다.
2. 개념: 양적인 설명이 아닌 질적인 설명을 나타내는 데이터에 적용되는 용어입니다. 개념의 예로는 "extreme," "high,"
"medium," "low," "minimal" 등이 있습니다.
극단 검색은 컨텍스트와 개념을 합쳐서 데이터에 의미와 가치를 더합니다.
지난 24시간 동안의 총 네트워크 처리량은 extreme, high, medium, low 또는 minimal이었습니다.
지난 24시간 동안의 네트워크 대기 시간은 extreme, high, medium, low 또는 minimal이었습니다.
개념 용어는 두 예에서 모두 네트워크 활동을 설명하지만, 적용되는 컨텍스트에 따라 의미가 서로 다릅니다. 환경에서 총 네
트워크 처리량이 minimal로 보고되는 경우 경고에 해당합니다. 환경에서 네트워크 대기 시간이 minimal로 보고되는 경우 네
트워크 작동이 정상임을 의미합니다.
데이터 모델과 극단 검색
데이터를 나타낼 컨텍스트와 개념을 선택한 후에는 Splunk ES가 데이터 모델을 만듭니다. 데이터 모델은 극단 검색 명령어
어를 사용하여 컨텍스트와 이벤트 통계를 개념별로 매핑합니다. 극단 검색 명령어는 이 결합 모델을 컨텍스트로 참조합니다.
저장된 검색은 동적 임계값 컨텍스트 같은 컨텍스트를 업데이트합니다. 저장된 검색은 이벤트 데이터에서 통계를 검색하여
컨텍스트를 업데이트합니다. 컨텍스트를 업데이트하는 저장된 검색의 리스트는 이 항목에서 컨테이너, 컨텍스트 및 저장된
검색을 참조하십시오.

Enterprise Security 극단 검색 설정
Enterprise Security에서 극단 검색 명령어어를 사용하기 위해 추가로 설정해야 하는 사항은 없습니다. ES의 기본 설치본이
극단 검색 명령어에 사용되는 컨텍스트를 모두 제공하고 컨텍스트를 유지하는 저장된 검색을 활성화합니다.
Enterprise Security에서 구현되는 컨텍스트와 저장된 검색의 리스트는 이 항목에서 컨테이터, 컨텍스트 및 저장된 검
색을 참조하십시오.
극단 검색을 사용하는 핵심 보안 지표의 리스트는 이 항목에서 극단 검색 핵심 보안 지표를 참조하십시오.
극단 검색을 사용하는 상관(correlation) 검색의 리스트는 이 항목에서 극단 검색을 사용하는 상관(correlation) 검색을
참조하십시오. 모든 상관(correlation) 검색은 기본적으로 비활성화됩니다.
극단 검색을 사용하는 상관 (correlation) 검색
Enterprise Security의 모든 상관(correlation) 검색은 기본적으로 비활성화됩니다. 이 매뉴얼에서 상관(correlation) 검색 활
성화를 참조하십시오.
가이드식 검색 만들기는 극단 검색 명령어어를 사용하는 상관(correlation) 검색에 사용할 수 없습니다. 이런 상관
(correlation) 검색에서는 극단 검색을 사용합니다.
검색 이름 컨텍스트
무차별 공격 동작 탐지됨 failures_by_src_count_1h
1일 동안 무차별 공격 액세스 동작 탐지됨 failures_by_src_count_1d
비정상적으로 높은 사용자별 endpoint 변경 수 change_count_by_user_by_change_type_1d
이메일을 너무 많이 보내는 호스트 recipients_by_src_1h
이벤트 대폭 증가 count_by_signature_1h
포트 활동 대폭 증가 count_by_dest_port_1d
비정상적인 네트워크 활동량 count_30m
소스별 HTTP 메서드 이벤트의 비정상적으로 높은 수 count_by_http_method_by_src_1d
극단 검색 핵심 보안 지표
극단 검색을 사용하는 핵심 지표는 숫자 값 대신 의미가 있는 언어를 사용하므로 쉽게 구별할 수 있습니다. 각 대시보드의 핵
심 보안 지표는 기본적으로 활성화됩니다.
검색 이름 컨텍스트
액세스 - 총 액세스 시도 횟수 authentication: count_1d, percentile
멀웨어 - 총 감염 수 malware: count_1d, percentile
위험 - 중간값 위험 점수 median_object_risk_by_object_type_1d, percentile
위험 - 시스템별 중간값 위험 점수 median_object_risk_by_object_type_1d, percentile
위험 - 사용자별 중간값 위험 점수 median_object_risk_by_object_type_1d, percentile
위험 - 기타별 중간값 위험 점수 median_object_risk_by_object_type_1d, percentile
위험 - 집계된 위험 total_risk_by_object_type_1d, percentile
위험 - 집계된 시스템 위험 total_risk_by_object_type_1d, percentile
위험 - 집계된 사용자 위험 total_risk_by_object_type_1d, percentile
위험 - 집계된 기타 위험 total_risk_by_object_type_1d, percentile
컨테이너 , 컨텍스트 및 저장된 검색
Enterprise Security는 컨텍스트를 컨테이너라는 개체에 저장합니다. 컨테이너는 파일 시스템의 개체이자 컨텍스트를 분류
하는 데 사용되는 논리적 설정이기도 합니다. Enterprise Security에서 컨테이너는 확장자가 .context인 파일입니다. 컨테이
너에는 여러 컨텍스트가 포함될 수 있습니다. Enterprise Security의 콘텐츠 관리 뷰에서 컨텍스트를 생성하는 저장된 검색
을 볼 수 있습니다. 자세한 내용은 Splunk Enterprise Security에서 저장된 검색 작성 및 관리를 참조하십시오.

참고: Enterprise Security는 동적 컨텍스트 저장된 검색을 기본적으로 활성화합니다.
컨테이너 이름 컨텍스트 이름 앱 위치 동적 컨
텍스트
검색 이
름
authentication
failures_by_src_count_1h
SA-AccessProtection
액세스 -
소스별
인증 실
패 수 - 컨
텍스트
생성
failures_by_src_count_1d
액세스 -
소스별
인증 실
패 수 - 일
별 - 컨텍
스트 생
성
count_1d
액세스 -
일별 인
증량 - 컨
텍스트
생성
change_analysis change_count_by_user_by_change_type_1d SA-EndpointProtection
변경 - 일
별 변경
유형별
사용자별
총 변경
횟수 - 컨
텍스트
생성
email
destinations_by_src_1h
SA-EndpointProtection
endpoint
- 대상별
이메일
수 - 컨텍
스트 생
성
recipients_by_src_1h
endpoint
- 소스별
이메일
수 - 컨텍
스트 생
성
malware count_1d SA-NetworkProtection
endpoint
- 일일 멀
웨어 수 -
컨텍스트
생성
ids_attacks count_by_signature_1h SA-NetworkProtection
네트워크
- 서명별
시간당
이벤트
수 - 컨텍
스트 생
성
count_by_dest_port_1d
네트워크
- 대상 포
트별 포
트 활동 -

network_traffic SA-NetworkProtection
컨텍스트
생성
src_count_30m
네트워크
- 30분당
트래픽
소스 수 -
컨텍스트
생성
count_30m
네트워크
- 30분당
트래픽량
- 컨텍스
트 생성
web count_by_http_method_by_src_1d SA-NetworkProtection
웹 - 1일
당 HTTP
메서드별
소스별
웹 이벤
트 수 - 컨
텍스트
생성
risk
median_object_risk_by_object_type_1d
SA-ThreatIntelligence
위험 - 일
별 개체
위험 중
간값 - 컨
텍스트
생성
total_risk_by_object_type_1d
위험 - 일
별 개체
위험 유
형별 총
위험 - 컨
텍스트
생성
default 백분위수 SA-Utils
ESS - 백
분위수 -
컨텍스트
생성
default
height
Splunk_SA_ExtremeSearch
없음.
trendchange 없음.
compatibility 없음.
Splunk Enterprise Security의 극단 검색 예
극단 검색 명령어어를 사용하도록 기존 상관(correlation) 검색을 변환할 수 있습니다. 극단 검색 명령어어를 사용하도록 변
환된 검색을 사용하기 위해 설정을 변경하거나 수정하지 않아도 됩니다. 극단 검색 명령어의 리스트는 극단 검색 명령어어를
참조하십시오.
다음은 기존 "무차별 공격(Brute Force) 액세스 동작이 탐지됨" 상관(correlation) 검색을 극단 검색 명령어어를 사용하도록
변환하는 방법의 예입니다.
이 예는 설명 용도로만 작성되었습니다. Splunk Enterprise Security에 포함된 "무차별 공격(Brute Force) 액세스 동작이 탐
지됨" 상관(correlation) 검색은 이미 극단 검색 명령어어를 사용하도록 변환되어 있습니다.
무차별 공격(Brute Force) 액세스 동작이 탐지됨 검색
"무차별 공격(Brute Force) 액세스 동작이 탐지됨" 상관(correlation) 검색은 과도한 로그인 실패 시도에 이은 성공적인 시도
횟수를 검색합니다. 기본 검색은 관련 이벤트를 찾고, "failure" 유형별로 이벤트 수를 집계하고, 그에 이은 "success" 이벤트
를 지난 1시간 동안의 모든 호스트 인증에 대해 찾습니다. 확인된 이벤트가 임계값을 충족하는 경우, 검색에서 주요 이벤트나
기타 경보 유형을 만드는 경고 작업을 트리거합니다.

극단 검색 명령어가 없는 "무차별 공격(Brute Force) 액세스 동작이 탐지됨" 상관(correlation) 검색:
| `datamodel("Authentication","Authentication")` | stats values(Authentication.tag) as
tag,count(eval('Authentication.action'=="failure")) as failure,count(eval('Authentication.action'=="success")) as
success by Authentication.src | `drop_dm_object_name("Authentication")` | search failure>6 success>0 |
`settags("access")`
극단 검색 명령어가 없으면 검색은 | search failure>6 문자열을 사용하여 "success" 이벤트에 대한 정적인 임계값을 정의
합니다. Enterprise Security 관리자는 임계값을 선택하거나 기본값을 사용해야 합니다. 관리자가 임계값을 너무 낮게 설정
하면 검색에서 주요 이벤트를 너무 많이 만듭니다. 임계값을 너무 높게 설정하면 검색이 주요 이벤트를 놓쳐서 보안 위협의
사각 지대가 생길 수 있습니다.
극단 검색을 이행하는 검색은 정적인 값을 제거하고, 이 예에서는 Splunk Enterprise에서 수집하는 인증 데이터를 사용하여
환경에서 중요한 인증 실패 수준을 결정합니다.
1. 데이터 조사
극단 검색을 사용하려면 명령어가 의존할 데이터 모델을 작성해야 합니다. 데이터 모델을 작성하려면 데이터가 무엇을 나타
내는지, 그리고 어떤 질문에 대한 답을 얻으려고 하는지 알아야 합니다.
이 예의 "무차별 공격(Brute Force) 액세스 동작이 탐지됨" 상관(correlation) 검색에서는 인증 실패 수가 영(0) 밑으로 떨어
지지 않을 것이고 범위가 훨씬 더 높을 수 있음을 압니다. 크기 척도는 검색하는 인증 값을 나타냅니다.
2. 컨텍스트 선택
데이터 지점이 3개씩 요구되는 세 가지 유형의 컨텍스트 중 하나를 선택할 수 있습니다.
평균: 이벤트의 평균값, 표준 편차 그리고 총 개수가 요구됩니다.
중간값: 이벤트의 중간값, 표준 편차 그리고 총 개수가 요구됩니다.
영역: 최소값, 최대값 그리고 총 이벤트 수가 요구됩니다.
이 예에서 인증 이벤트 수는 음수 값을 포함하지 않고 점진적이므로, 영역이 인증 데이터에 가장 적합합니다.
3. 개념 선택
개념은 데이터에 대한 질적인 설명을 나타냅니다. Splunk Enterprise Security에는 변동, 방향 및 크기를 질적인 값으로 해
석하는 데 사용되는 미리 정의된 개념이 포함되어 있습니다. 개념은 사용되는 조건으로 구별됩니다.
변동에는 다음 조건이 사용됩니다. "minimally, slightly, moderately, greatly, extremely."
방향에는 다음 조건이 사용됩니다. "decreasing, unchanged, increasing"
크기에는 다음 조건이 사용됩니다. "minimal, low, medium, high, extreme"
이 사례에서는 크기 개념이 인증 실패 동작을 가장 잘 나타냅니다.
4. 컨텍스트 만들기
이 매뉴얼의 Splunk Enterprise Security가 극단 검색을 사용하는 방법에서 설명했듯이, 컨텍스트에는 이름과 컨테이너가
모두 있고, 컨테이너는 앱 안에 있습니다. "무차별 공격(Brute Force) 액세스 동작이 탐지됨" 검색은 인증 이벤트를 대상으로
실행되므로, 컨텍스트 컨테이너의 이름은 "authentication"입니다. "authentication" 컨테이너는 인증 검색 및 기타 개체와
함께 "SA-AccessProtection" 앱에 있습니다.
ES에는 미리 초기화된 인증 컨텍스트가 포함되어 있습니다. 이 컨텍스트는 저장된 검색이 컨텍스트를 이벤트로 업데이트하
지 않는 한 사용자 환경을 나타내지 않습니다. Splunk Enterprise Security에는 이 컨텍스트가 포함되어 있으므로 업데이트
의 비중이 컨텍스트를 만드는 중에 사용되는 값보다 더 큽니다. 이 인증 컨텍스트의 영역은 min=0, max=10, count=0으로
정의됩니다.
"무차별 공격(Brute Force) 액세스 동작이 탐지됨" 검색에서는 빠른 식별에 도움이 되는 컨텍스트 이름이 선택됩니다.
failures_by_src_count_1h.
데이터 예를 사용하여 초기 컨텍스트를 만듭니다.
| xsCreateDDContext app="SA-AccessProtection" name=failures_by_src_count_1h container=authentication scope=app
terms=`xs_default_magnitude_concepts` min=0 max=10 count=0 type=domain
이 컨텍스트는 컨텍스트가 작동하는지 확인하기 위해 검색에 데이터를 지정하므로 사용자 정의 컨텍스트입니다. 최종 검색
에서는 이전 검색의 검색 결과의 데이터에 종속되므로 데이터 정의 컨텍스트입니다.
작성한 컨텍스트를 표시합니다.
| xsdisplaycontext failures_by_src_count_1h in authentication

극단 검색을 구현하기 전에 인증 실패의 정적 임계값은 육(6)이었습니다. failures_by_src_count_1h 컨텍스트를 사용하면
"medium" 용어 끝에 카운트가 육(6)으로 모델링됩니다. 업데이트된 "무차별 공격(Brute Force) 액세스 동작이 탐지됨" 검색
이 인증 데이터를 검색하고 failures_by_src_count_1h를 업데이트하는 저장된 검색이 실행된 후에 모델이 변경됩니다.
컨텍스트에 사용되는 조건을 나열합니다.
| xslistconcepts failures_by_src_count_1h in authentication
5. 컨텍스트를 검색에 적용
xsWhere 검색 명령어어를 사용하여 데이터 값을 컨텍스트와 대조하여 평가할 수 있습니다. 이 상관(correlation) 검색은
xsWhere를 사용하여 인증 실패 횟수를 failures_by_src_count_1h 컨텍스트에 비교하여 횟수가 "medium"보다 큰 값을 나타내
는지 결정합니다.
이 예에서 중간(medium)이라는 개념은 컨텍스트가 데이터로 업데이트된 후에 변경되는 값의 범위를 나타냅니다. 저장된 검
색이 컨텍스트를 업데이트합니다. 저장된 검색에서 식별된 이벤트 수가 중간보다 큰 경우, 극단 검색을 사용하는 상관
(correlation) 검색이 경고 작업을 트리거하고 주요 이벤트를 만듭니다.
극단 검색 기능이 있는 "무차별 공격(Brute Force) 액세스 동작이 탐지됨"
| `datamodel("Authentication","Authentication")` | stats values(Authentication.tag) as
tag,count(eval('Authentication.action'=="failure")) as failure,count(eval('Authentication.action'=="success")) as
success by Authentication.src | `drop_dm_object_name("Authentication")` | search success>0 | xswhere failure from
failures_by_src_count_1h in authentication is above medium | `settags("access")`
6. 컨텍스트 업데이트
검색 임계값은 저장된 검색을 사용하여 컨텍스트를 업데이트하므로 동적일 수 있습니다. 극단 검색을 위한 컨텍스트 정보를
생성하는 ES에 포함된 저장된 검색은 "컨텍스트 생성(Context Gen)"으로 끝나므로 쉽게 식별할 수 있습니다.
"무차별 공격(Brute Force) 액세스 동작이 탐지됨" 상관(correlation) 검색에서 사용하는 영역 컨텍스트는 최소, 최대 및 카운
트 값을 요구합니다. 이 세 값은 인증 데이터 모델에서 가져옵니다. "액세스 - 소스별 인증 실패 수 - 컨텍스트 생성" 저장된 검
색은 "무차별 공격(Brute Force) 액세스 동작" 상관(correlation) 검색에 사용되는 failures_by_src_count_1h 컨텍스트를 생
성합니다.
failures_by_src_count_1h 컨텍스트의 경우, 컨텍스트 생성 검색의 결과는 최대값을 중간값의 배수로 변경하여 이상값으로
인해 기본 컨텍스트가 왜곡되고 실패가 초래될 가능성을 방지합니다.
"액세스 - 소스별 인증 실패 수 - 컨텍스트 생성" 저장된 검색
| tstats `summariesonly` count as failures from datamodel=Authentication where Authentication.action="failure" by
Authentication.src,_time span=1h | stats median(failures) as median, min(failures) as min, count as count | eval max
= median*2 | xsUpdateDDContext app="SA-AccessProtection" name=failures_by_src_count_1h container=authentication
scope=app
이 검색은 failures_by_src_count_1h 컨텍스트를 xsUpdateDDContext로 업데이트합니다. 이 사례에서는 검색의 데이터가 컨텍
스트에 추가되어 컨텍스트를 알리는 과거 추세를 만듭니다. 이 검색은 검색의 첫 번째 부분에서 사용자에 의해 제공되는 것
이 아니라 컨텍스트에 의해 사용되는 데이터를 제공하므로 xsUpdateUDContext를 사용한 4단계의 컨텍스트 검색과 다릅니다.
상관(correlation) 검색과 저장된 검색 "액세스 - 소스별 인증 실패 횟수 - 컨텍스트 생성" 검색은 기본적으로 매 시간마다 실
행되도록 예약됩니다.
7. 헤지를 사용하여 결과 수정
헤지는 개념이 나타내는 범위를 수정하는 의미 용어입니다. 헤지를 사용하여 개념 용어가 데이터를 모델링하는 데 사용하는
곡선의 모양을 제한, 축소 또는 수정할 수 있습니다. "above" 및 "below" 헤지는 일치할 값의 범위를 다시 정의하므로 경고
검색에 유용합니다.
극단 검색을 사용하는 "무차별 공격(Brute Force) 액세스 동작이 탐지됨 " 상관(correlation) 검색은 실패 횟수가 "above

medium"인 경우에만 경고 작업이 트리거되도록 헤지를 적용합니다.
여러 헤지가 적용된 개념의 예:
헤지 예 이미지
| xsDisplayConcept medium from failures_by_src_count_1h in authentication
| xsDisplayConcept very medium from failures_by_src_count_1h in
authentication
| xsDisplayConcept above medium from failures_by_src_count_1h in
authentication
| xsDisplayConcept below medium from failures_by_src_count_1h in
authentication
| xsDisplayConcept around medium from failures_by_src_count_1h in
authentication
Splunk_SA_ExtremeSearch 앱의 synonyms.csv 룩업 파일에는 극단 검색 헤지가 있습니다.
요약
극단 검색을 사용하는 "무차별 공격(Brute Force) 액세스 동작이 탐지됨" 상관(correlation) 검색이 Splunk Enterprise
Security에 포함되어 있습니다. 컨텍스트 생성 검색은 컨텍스트를 반복적인 간격으로 실행하고 업데이트합니다. 상관
(correlation) 검색은 컨텍스트를 참조하고, 컨텍스트 안에 있는 개념은 임계값을 설정합니다. 개념은 "above medium"으로
헤지되므로 실패한 인증 횟수에 이은 성공적인 인증이 "high" 또는 "extreme"인 경우에만 상관(correlation) 검색이 주요 이
벤트를 만듭니다.
쉽게 말하면, 극단 검색이 "무차별 공격(Brute Force) 액세스 동작이 탐지됨" 상관(correlation) 검색을 "X 회의 실패한 인증
후에 인증에 성공한 인증 시도 모두 찾기"에서 "많거나 극도로 많은 횟수의 실패한 인증 후에 인증에 성공한 인증 시도 모두
찾기"로 변환했습니다.
극단 검색 명령어
검색 명령어 설명
xsWhere 지정된 컨텍스트 안에서 일치하는 개념을 찾고 적합성을 결정하는 데 사용합니다.
xsFindBestConcept
검색 카운트를 평가하고 카운트를 컨텍스트와 비교할 때 사용합니다. 가장 가까운 일치에서 개념
으로 사용되는 용어를 반환합니다. 핵심 보안 지표에서 이 명령어를 사용합니다.
xsUpdateDDContext
데이터 정의 컨텍스트를 업데이트하는 데 사용합니다. "xsUpdateDDContext"를 호출하는 예약
된 보고서는 이력 뷰를 나타내는 컨텍스트를 작성합니다. |xsUpdateDDContext in app=<app>
name=<context> container=<container> scope=app
xsListContexts | xsListContexts in <container> 컨테이너의 모든 컨텍스트를 나열하는 데 사용합니다.
xsListConcepts | xsListConcepts from <context> in <container> 컨텍스트의 모든 개념을 나열하는 데 사용합니
다.
xsDisplayContext | xsDisplayContext <context> IN <container> 개념에 사용되는 조건을 포함한 컨텍스트의 값 범
위를 표시하는 데 사용합니다.
xsDisplayConcept | xsDisplayConcept <concept> from <context> in <container> | xsDisplayConcept <hedge>
<concept> from <context> in <container> 개념에 사용되는 값 범위를 표시하는 데 사용합니다.