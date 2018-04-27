# Asset and Identities

## Collect and extract asset and identity data in Splunk Enterprise Security

Asset 및 Identity 데이터를 수집하고 추출하여 Splunk Enterprise Security에 추가
Splunk Cloud 배포에서는 Splunk 전문 서비스를 사용하여 Asset 및 Identity 솔루션을 설계 및 구현
Asset 및 Identity 데이터를 추가하는 예는 Asset 및 Identity 데이터를 Splunk Enterprise Security에 추가하는 방법 예제를 참조

1. 사용자 환경의 Asset 및 Identity 데이터가 저장되는 위치를 판별
2. Asset 및 Identity 데이터를 자동으로 수집하여 업데이트하여 수동 업데이트에 필요한 오버 헤드 및 유지 관리를 줄이고 데이터 무결성을 향상
    * Splunk DB Connect 또는 다른 Splunk 플랫폼 애드온을 사용하여 외부 데이터베이스 또는 저장소에 연결
    * 스크립트 입력을 사용하여 목록을 가져오고 형식을 지정
    * Splunk 플랫폼에서 인덱싱 된 이벤트를 사용하여 데이터를 수집, 정렬 및 목록으로 내보내기

Asset 및 Identity에 대한 제안 된 수집 방법.

|기술|Asset or Identity data|수집 방법|
|:--:|:--:|:--:|
|Active Directory|Both|SA-ldapsearch and a custom search. See Example methods of adding asset and identity data.|
||Both|SecKit Windows Add On for ES Asset and Identities|
|LDAP|Both|SA-ldapsearch and a custom search.|
|CMDB|Asset|DB Connect and a custom search.|
|ServiceNow|Both|Splunk Add-on for ServiceNow|
|Asset Discovery|Asset|Splunk for Asset Discovery|
|Bit9|Asset|Splunk Add-on for Bit9 and a custom search.|
|Cisco ISE|Both|Splunk Add-on for Cisco ISE and a custom search.|
|Microsoft SCOM|Asset|Splunk Add-on for Microsoft SCOM and a custom search.|
|Okta|Identity|Splunk Add-on for Okta and a custom search.|
|Sophos|Asset|Splunk Add-on for Sophos and a custom search.|
|Symantec Endpoint Protection|Asset|Splunk Add-on for Symantec Endpoint Protection and a custom search.|
|Splunk platform|Asset|Add asset data from indexed events in Splunk platform.|
|Amazon Web Services (AWS)|Asset|SecKit AWS Add On for ES Asset and Identities|
|Configuration Management Database (CMDB)|Asset|SecKit SA Common Tools for ES Asset and Identities|

다음 단계 :

(Optional) [Define identity formats in Splunk Enterprise Security](http://docs.splunk.com/Documentation/ES/5.0.0/Admin/Defineidentityformats)
[Format an asset or identity list as a lookup in Splunk Enterprise Security](http://docs.splunk.com/Documentation/ES/5.0.0/Admin/Formatassetoridentitylist)
