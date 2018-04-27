# Asset and Identities

## Format an asset or identity list as a lookup in Splunk Enterprise Security

asset 된 자산 또는 identity 데이터를 조회 파일로 포맷하여 Splunk Enterprise Security에서 처리

선결 요건

* Splunk Enterprise Security의 Asset 및 Identity 데이터 수집 및 추출
* (선택 사항) Splunk Enterprise Security에서 Identity 형식 정의

단계

1. Unix 줄 끝과 .csv 파일 확장명이 있는 일반 텍스트, CSV 형식의 파일을 만듬
2. CSV 파일에 올바른 헤더를 사용. Splunk Enterprise Security에서 예상하는 헤더의 Asset 조회 헤더 또는 Identity 조회 헤더를 참조
3. CSV 행에 Asset 또는 Identity 필드를 채움. 참조를 위해 Asset 조회 필드 또는 Identity 조회 필드를 참조

Asset목록 예를 보려면 데모 Asset Lookup을 검토

* Configure> Content Management로 이동하여 Splunk Web에서 목록을 찾음
* 파일시스템에서 목록을 찾으면 demo_assets.csv 파일은 SA-IdentityManagement/lookups/ 디렉토리

Lookup를 생성하기 위해 Custom Search를 사용하는 경우 검색 결과에서 생성 된 Lookup에 헤더와 일치하는 필드가 포함되어 있는지 확인

다음 단계 :

[Configure the new asset or identity list in Splunk Enterprise Security](http://docs.splunk.com/Documentation/ES/5.0.0/Admin/Configurenewassetoridentitylist)

### Asset lookup header

ip,mac,nt_host,dns,owner,priority,lat,long,city,country,bunit,category,pci_domain,is_expected,should_timesync,should_update,requires_av

### Asset lookup fields

Populate the following fields in an asset lookup.

* To add multi-homed hosts or devices to the asset list, add each IP address to the ip field for the host, pipe-delimited. Multi-homed support is limited, and having multiple hosts with the same IP address on different network segments can cause conflicts in the merge process.

|Field|Data type|Description|Example values|
|:--:|:--:|:--|:--|
|ip|pipe-delimited numbers|A pipe-delimited list of single IP address or IP ranges. An asset is required to have an entry in the ip, mac, nt_host, or dns fields. Do not use pipe-delimiting for more than one of these fields per asset.|2.0.0.0/8\|1.2.3.4\|192.168.15.9\-192.169.15.27\|5.6.7.8\|10.11.12.13|
|mac|pipe-delimited strings|A pipe-delimited list of MAC address. An asset is required to have an entry in the ip, mac, nt_host, or dns fields. Do not use pipe-delimiting for more than one of these fields per asset.|00:25:bc:42:f4:60\|00:50:ef:84:f1:21\|00:50:ef:84:f1:20|
|nt_host|pipe-delimited strings|A pipe-delimited list of Windows machine names. An asset is required to have an entry in the ip, mac, nt_host, or dns fields. Do not use pipe-delimiting for more than one of these fields per asset.|ACME-0005\|SSPROCKETS-0102\|COSWCOGS-013|
|dns|pipe-delimited strings|A pipe-delimited list of DNS names. An asset is required to have an entry in the ip, mac, nt_host, or dns fields. Do not use pipe-delimiting for more than one of these fields per asset.|acme\-0005\.corp1\.acmetech\.org\|SSPROCKETS-0102\.spsp\.com\|COSWCOGS\-013\.cwcogs\.com|
|owner|string|The user or department associated with the device|f.prefect@acmetech.org, DevOps, Bill|
|priority|string|Recommended. The priority assigned to the device for calculating the Urgency field for notable events on Incident Review. An "unknown" priority reduces the assigned Urgency by default. For more information, see How urgency is assigned to notable events in Splunk Enterprise Security.|unknown, low, medium, high or critical.|
|lat|string|The latitude of the asset|41.040855|
|long|string|The longitude of the asset|28.986183|
|city|string|The city in which the asset is located|Chicago|
|country|string|The country in which the asset is located|USA|
|bunit|string|Recommended. The business unit of the asset. Used for filtering by dashboards in Splunk Enterprise Security.|EMEA, NorCal|
|category|pipe-delimited strings|Recommended. A pipe-delimited list of logical classifications for assets. Used for asset and identity correlation and categorization. See Asset/Identity Categories.|server\|web_farm\|cloud|
|pci_domain|pipe-delimited strings|A pipe-delimited list of PCI domains. See Configure assets in the Splunk App for PCI Compliance Installation and Configuration Manual.|cardholder, trust\|dmz, untrust If left blank, defaults to untrust.|
|is_expected|boolean|Indicates whether events from this asset should always be expected. If set to true, the Expected Host Not Reporting correlation search performs an adaptive response action when this asset stops reporting events.|"true", or blank to indicate "false"|
|should_timesync|boolean|Indicates whether this asset must be monitored for time-sync events. It set to true, the Should Timesync Host Not Syncing correlation search performs an adaptive response action if this asset does not report any time-sync events from the past 24 hours.|"true", or blank to indicate "false"|
|should_update|boolean|Indicates whether this asset must be monitored for system update events.|"true", or blank to indicate "false"|
|requires_av|boolean|Indicates whether this asset must have anti-virus software installed.|"true", or blank to indicate "false"|

### Identity lookup header

identity,prefix,nick,first,last,suffix,email,phone,phone2,managedBy,priority,bunit,category,watchlist,startDate,endDate,work_city,work_country,work_lat,work_long

### Identity lookup fields

|Field|Data type|Description|Example|
|:--:|:--:|:--|:--|
|identity|pipe-delimited strings|Required. A pipe-delimited list of username strings representing the identity. After the merge process completes, this field includes generated values based on the identity lookup configuration settings.  a.vanhelsing|abraham.vanhelsing\|a.vanhelsing@acmetech.org|
|prefix|string|Prefix of the identity.|Ms., Mr.|
|nick|string|Nickname of an identity.|Van Helsing|
|first|string|First name of an identity.|Abraham|
|last|string|Last name of an identity.|Van Helsing|
|suffix|string|Suffix of the identity.|M.D., Ph.D|
|email|string|Email address of an identity.|a.vanhelsing@acmetech.org|
|phone|string|A telephone number of an identity.|123-456-7890|
|phone2|string|A secondary telephone number of an identity.|012-345-6789|
|managedBy|string|A username representing the manager of an identity.|phb@acmetech.org|
|priority|string|Recommended. The priority assigned to the identity for calculating the Urgency field for notable events on Incident Review. An "unknown" priority reduces the assigned Urgency by default. For more information, see How urgency is assigned to notable events in Splunk Enterprise Security.|unknown, low, medium, high or critical.|
|bunit|string|Recommended. A group or department classification for identities. Used for filtering by dashboards in Splunk Enterprise Security.|Field Reps, ITS, Products, HR|
|category|pipe-delimited strings|Recommended. A pipe-delimited list of logical classifications for identities. Used for asset and identity correlation and categorization. See Asset/Identity Categories.|Privileged\|Officer\|CISO|
|watchlist|boolean|Marks the identity for activity monitoring.|Accepted values: "true" or empty. See User Activity Monitoring in this manual.|
|startDate|string|The start or hire date of an identity.|Formats: %m/%d/%Y %H:%M, %m/%d/%y %H:%M, %s|
|endDate|string|The end or termination date of an identity.|Formats: %m/%d/%Y %H:%M, %m/%d/%y %H:%M, %s|
|work_city|string|The primary work site City for an identity.||
|work_country|string|The primary work site Country for an identity.||
|work_lat|string|The latitude of primary work site City in DD with compass direction.|37.78N|
|work_long|string|The longitude of primary work site City in DD with compass direction.|122.41W|