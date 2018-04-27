# Asset and Identities

## Collect and extract asset and identity data in Splunk Enterprise Security

Collect and extract your asset and identity data in order to add it to Splunk Enterprise Security. In a Splunk Cloud deployment, work with Splunk Professional Services to design and implement an asset and identity collection solution. For examples of adding asset and identity data, see Example methods of adding asset and identity data to Splunk Enterprise Security.

1. Determine where the asset and identity data in your environment is stored.
2. Collect and update your asset and identity data automatically to reduce the overhead and maintenance that manual updating requires and improve data integrity.
    * Use Splunk DB Connect or another Splunk platform add-on to connect to an external database or repository.
    * Use scripted inputs to import and format the lists.
    * Use events indexed in the Splunk platform with a search to collect, sort, and export the data to a list.

Suggested collection methods for assets and identities. 

|Technology|Asset or Identity data|Collection methods|
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

Next step

(Optional) [Define identity formats in Splunk Enterprise Security](http://docs.splunk.com/Documentation/ES/5.0.0/Admin/Defineidentityformats)
[Format an asset or identity list as a lookup in Splunk Enterprise Security](http://docs.splunk.com/Documentation/ES/5.0.0/Admin/Formatassetoridentitylist)
