How to work with users, roles, and storage passwords using the Splunk SDK for Python
With the Splunk SDKs, you can manage who can access your Splunk Enterprise system and control what they can do by setting up users and assigning them roles. You can also manage secure credentials, or storage passwords.
This topic contains the following sections:
Users, roles, and passwords
The user and password APIs
Code examples
Parameter tables
Users, roles, and passwords
This section provides a brief overview of users, roles, and storage passwords in Splunk Enterprise:
Users
Roles
Storage passwords
Users
Splunk has a single default user ("admin"), and if you are running Splunk Enterprise, you can add more users (Splunk Free doesn't support user authentication). For each new user you add to your Splunk Enterprise system, you can specify:
A username and password
A full name
An email address
A default time zone
A default app
One or more roles to control what the user can do
Roles
Roles specify what the user is allowed to do in Splunk Enterprise. Splunk Enterprise includes predefined roles that you can modify, or you can create new roles. The predefined roles are:
admin: This role has the most capabilities.
power: This role can edit all shared objects and alerts, tag events, and other similar tasks.
user: This role can create and edit its own saved searches, run searches, edit preferences, create and edit event types, and other similar tasks.
can_delete: This role has the single capability of deleting by keyword, which is required for using the delete search operator.
splunk-system-role: This role is based on admin, but has more restrictions on searches and jobs.
Each role is defined by a combination of these permissions and restrictions:
Capabilities, which specify the system settings and resources the user is allowed to view or modify. For example, you could allow users to list data inputs but not edit them. For a full list of capabilities, see Capabilities, below.
Restrictions on searches and search jobs. For example, you can set a limit on the number of concurrent search jobs the user can run, or restrict the data that the user can search by setting a search filter.
Allowed indexes, to explicitly specify which indexes the user is allowed to search.
Indexes to search by default.
Other roles to inherit properties from.
When you inherit other roles, their capabilities, restrictions, and properties are not merged with those of the current role, but rather they are maintained separately. For example, if you list capabilities of a role, its inherited capabilities are not listed—you must explicitly request a list of inherited capabilities. When a role is modified, the changes are made automatically where ever the role is inherited.
You can also assign one or more roles to each user. When multiple roles are assigned, the broadest permissions from these roles are given. Specifically, the user's permissions are the union of all capabilities and the intersection of the restrictions.
Storage passwords
Storage passwords in Splunk Enterprise allow for management of secure credentials. The password is encrypted with a secret key that resides on the same machine. The clear text passwords can be accessed by users who have access to this service. Only users in the admin role can access storage passwords.
The user, role, and storage password APIs
To work with users, roles, and storage passwords in the Splunk SDK for Python, use these classes through an instance of the splunklib.client.Service class: 
The splunklib.client.User class for an individual user.
The splunklib.client.Users class for the collection of users.
The splunklib.client.Role class for an individual role.
The splunklib.client.Roles class for the collection of roles.
The splunklib.client.StoragePassword class for an individual storage password.
The splunklib.client.StoragePasswords class for the collection of storage passwords.
Retrieve a collection, and from there you can access individual items in the collection and create new ones. For example, here's a simplified program for getting a collection of users and creating a new one:
# Connect to Splunk
service = client.connect(...)

# Get the collection of users
users = service.users

# Create a user
user = service.users.create(<em>username</em>, <em>password</em>, <em>roles</em>)
Code examples
This section provides examples of how to use the users, roles, and storage password APIs, assuming you first connect to a Splunk instance:
To list users and display properties
To add a new user and modify properties
To get the current user
To list roles and display properties
To create a new role and modify properties
To create a new storage password
To list storage passwords
To list users and display properties
This example shows how to use the splunklib.client.Users class to retrieve the collection of users that have been added to your Splunk system and list them, sorted by the realname field. This example also retrieves a few properties for each user, including their roles. For a list of available parameters to use when retrieving a collection, see Collection parameters.
# Get the collection of users, sorted by realname
kwargs = {"sort_key":"realname", "sort_dir":"asc"}
users = service.users.list(count=-1,**kwargs)

# Print the users' real names, usernames, and roles
print "Users:"
for user in users:
    print "%s (%s)" % (user.realname, user.name)
    for role in user.role_entities:
        print " - ", role.name
To add a new user and modify properties
This example shows how to create a new user. At a minimum, provide a username and password, and specify one or more roles. You can also specify additional properties for the user at the same time by providing a dictionary of key-value pairs for the properties (the possible properties are summarized in User authentication parameters). Or, modify properties after you have created the user.
Note that when you set properties, the new values overwrite any existing ones. For example, if you set a role, it replaces any existing roles already assigned to the user.
# Create a new user
newuser = service.users.create(username="testuser",
                            password="yourpassword",
                            roles=["power","user"])
# Print the user's properties
print "Properties of the new user '" + newuser.name + "':\n"
print "Full name:  ", newuser["realname"]
print "Default app:", newuser["defaultApp"]
print "Time zone:  ", newuser["tz"]
print "Role:"
# Print the roles for the user
for role in newuser.role_entities:
    print " - ", role.name

# Change some properties and update the server
kwargs = {"realname": "Test User",
          "defaultApp": "launcher",
          "tz": "Europe/Paris",
          "roles":"can_delete"}
newuser.update(**kwargs).refresh()

# Print updated info
print "\nUpdated properties:"
print "Full name:  ", newuser["realname"]
print "Default app:", newuser["defaultApp"]
print "Time zone:  ", newuser["tz"]
print "Role:"
# Print the roles for the user
for role in newuser.role_entities:
    print " - ", role.name
To get the current user
This example shows how to find out which user is currently logged in.
# Get the current user
print "The current user is", service.username
To list roles and display properties
This example shows how to use the splunklib.client.Roles class to retrieve the collection of roles that have been configured for Splunk and list them along with their capabilities. For a list of available parameters to use when retrieving a collection, see Collection parameters.
# Get the collection of roles
roles = service.roles
print "There are %s roles" % (len(roles))

# Display the name of each role and its capabilities
for role in roles:
    print role.name
    for capability in role.capabilities:
        print " - ", capability
    for capability in role.imported_capabilities:
        print " - ", capability, "(imported)"
To create a new role and modify properties
This example shows how to create a new role, then how to import capabilities and properties from existing roles. At a minimum, provide a name for the new role. You can specify additional properties at the same time by providing a dictionary of key-value pairs (the possible parameters are summarized in Roles parameters). Or, modify properties after you have created the role.
Be aware that when you set properties using a dictionary of kwargs, the new values overwrite the existing ones. However, you can use the splunklib.client.Role.grant method to add capabilities to an existing set rather than replace them. Similarly, use the splunklib.client.Role.revoke method to remove capabilities from the current set, leaving the rest of the set intact.
# Create a new role called "testrole"
newrole = service.roles.create("testrole")

# Import properties from the 'user' role and update the server
kwargs = {"imported_roles": "user"}
newrole.update(**kwargs).refresh()

# Display the properties of the new role
print "=== Properties of the new role 'testrole' ===\n"
print "Capabilities:"
for capability in newrole.capabilities:
    print " - ", capability
print "Imported roles: ", newrole["imported_roles"]
print "Imported capabilities:"
for capability in newrole.imported_capabilities:
    print " - ", capability
print "Default app: ", newrole["defaultApp"]
print "Search filter: ", newrole["srchFilter"]

# Change the properties
# Note that the imported role "user" is overwritten by "can_delete"
kwargs = {"defaultApp": "launcher",
          "srchFilter": "source=/var/log/*",
          "imported_roles": "can_delete",
          "capabilities": "use_file_operator"
          }
newrole.update(**kwargs).refresh()

# Print updated properties
print "\n\n=== Updated properties using 'update' ===\n"
print "Capabilities:"
for capability in newrole.capabilities:
    print " - ", capability
print "Imported roles: ", newrole["imported_roles"]
print "Imported capabilities:"
for capability in newrole.imported_capabilities:
    print " - ", capability
print "Default app: ", newrole["defaultApp"]
print "Search filter: ", newrole["srchFilter"]


# Add some capabilities using 'grant'
newrole.grant("indexes_edit", "edit_forwarders", "edit_monitor")
newrole.refresh()

# Print updated properties
print "\n\n=== Updated properties using 'grant' ===\n"
print "Capabilities:"
for capability in newrole.capabilities:
    print " - ", capability
print "Imported roles: ", newrole["imported_roles"]
print "Imported capabilities:"
for capability in newrole.imported_capabilities:
    print " - ", capability
print "Default app: ", newrole["defaultApp"]
print "Search filter: ", newrole["srchFilter"]
To create a new storage password
This example shows how to create a new storage password.
service client.connect(...)
storage_passwords = service.storage_passwords
 
# Create a storage password 
storage_password = storage_passwords.create("yourpassword", "someusername", "somerealm")
print "Created storage password with name: " + storage_password.name
To list storage passwords
This example shows how to list the storage passwords visible to the current user.
service client.connect(...)
storage_passwords = service.storage_passwords
 
# List storage passwords
for storage_password in storage_passwords:
    print storage_password.name
Parameter tables
Here are the available parameters for working with users, roles, and storage passwords:
Capabilities
Collection parameters
User authentication parameters
Roles parameters
Capabilities
Here are the capabilities you can allow in a role. Check authorize.conf for the most up-to-date version of this list. The admin role has all the capabilities in this list except for the "delete_by_keyword" capability.
Capability name
What it lets you do
accelerate_datamodel 
Enable or disable acceleration for data models. 
accelerate_search 
Enable or disable acceleration for reports. For a role to use this it must also have the schedule_search capability. 
admin_all_objects 
Access and modify any object in the system (user objects, search jobs, etc.). (Overrides any limits set in the objects.) 
change_authentication 
Change authentication settings and reload authentication. 
change_own_password 
User can change their own password. 
delete_by_keyword 
Use the "delete" operator in searches. 
edit_deployment_client 
Change deployment client settings. 
edit_deployment_server 
Change deployment server settings. 
edit_dist_peer 
Add and edit peers for distributed search. 
edit_forwarders 
Change forwarder settings. 
edit_httpauths 
Edit and end user sessions. 
edit_input_defaults 
Change default hostnames for input data. 
edit_monitor 
Add inputs and edit settings for monitoring files. 
edit_roles 
Edit roles and change user/role mappings. 
edit_scripted 
Create and edit scripted inputs. 
edit_search_server 
Edit general distributed search settings like timeouts, heartbeats, and blacklists. 
edit_server 
Edit general server settings like server name, log levels, etc. 
edit_splunktcp 
Change settings for receiving TCP inputs from another Splunk instance. 
edit_splunktcp_ssl 
Can list or edit any SSL-specific settings for Splunk TCP input. 
edit_tcp 
Change settings for receiving general TCP inputs. 
edit_udp 
Change settings for UDP inputs. 
edit_user 
Create, edit, or remove users. 
edit_view_html 
Create, edit, or modify HTML-based views. 
edit_web_settings 
Change settings for web.conf. 
embed_reports 
Embed reports and disable embedding for embedded reports. 
get_diag 
Use the /streams/diag endpoint to get a remote diag from a Splunk instance. 
get_metadata 
Use the "metadata" search processor. 
get_typeahead 
Use typeahead. 
indexes_edit 
Change index settings like file size and memory limits. 
input_file 
Add a file as an input. 
license_tab 
Access and change the license. 
license_edit 
Edit the license. 
list_deployment_client 
View deployment client settings. 
list_deployment_server 
View deployment server settings. 
list_forwarders 
View forwarder settings. 
list_httpauths 
View user sessions. 
list_inputs 
View list of various inputs, including input from files, TCP, UDP, scripts, etc. 
output_file 
Add a file as an output. 
pattern_detect 
Controls ability to see and use the Patterns tab in the Search view. 
request_remote_tok 
Get a remote authentication token. 
rest_apps_management 
Edit settings in the python remote apps handler. 
rest_apps_view 
List properties in the python remote apps handler. 
rest_properties_get 
Can get information from the services/properties endpoint. 
rest_properties_set 
Edit the services/properties endpoint. 
restart_splunkd 
Restart Splunk through the server control handler. 
rtsearch 
Run real-time searches. 
run_debug_commands 
Run debug commands. 
schedule_search 
Schedule saved searches, create and update alerts, and review triggered alert information. 
schedule_rtsearch 
Schedule real-time saved searches. In order for a user to use this capability their role must also have the schedule_search capability. 
search 
Run searches. 
use_file_operator 
Use the "file" search operator. 
Collection parameters
By default, all entries are returned when you retrieve a collection. But by using the parameters below, you can also specify the number of entities to return and how to sort them. These parameters are available whenever you retrieve a collection.
Name
Datatype
Default
Description
count 
Number 
30 
Maximum number of entries to return. Set value to zero to get all available entries. 
offset 
Number 
0 
Index of first item to return. 
search 
String 

Response filter, where the response field values are matched against this search expression. 
Example: 
search=foo matches on any field with the string foo in the name. 
search=field_name%3Dfield_value restricts the match to a single field. (Requires URI-encoding.) 
sort_dir 
Enum 
asc 
Response sort order: 
asc = ascending 
desc = descending 
sort_key 
String 
name 
Field name to use for sorting. 
sort_mode 
Enum 
auto 
Collated ordering: 
auto = If all field values are numeric, collate numerically. Otherwise, collate alphabetically. 
alpha = Collate alphabetically, not case-sensitive. 
alpha_case = Collate alphabetically, case-sensitive. 
num = Collate numerically. 
summarize 
Bool 
false 
Response type: 
true = Summarized response, omitting some index details, providing a faster response. 
false = full response. 
User authentication parameters
The parameters you can use for user authentication correspond to the parameters for the authentication/* endpoints in the REST API.
The following parameters are available for user authentication:
Name
Description
authString 
Unique identifier for this session. 
capabilities 
List of capabilities assigned to role. 
defaultApp 
Default app for the user, which is invoked at login. 
defaultAppIsUserOverride 
Default app override indicates:
true = Default app overrides the user role default app.
false = Default app does not override the user role default app. 
defaultAppSourceRole 
The role that determines the default app for the user, if the user has multiple roles. 
email 
User email address. 
password 
User password. 
realname 
User full name. 
restart_background_jobs 
Restart background search job that has not completed when Splunk Enterprise restarts indication:
true = Restart job.
false = Do not restart job. 
roles 
Roles assigned to the user. 
searchId 
Search ID associated with the session, if it was created for a search job. If it is a login-type session, the value is empty. 
timeAccessed 
Last time the session was touched. 
type 
User authentication system type: 
LDAP 
Scripted 
Splunk 
System (reserved for system user) 
tz 
User timezone. 
username 
Authenticated session owner name. 
Roles parameters
The parameters you can use for working with roles correspond to the parameters for the authorization/* endpoints in the REST API.
The following parameters are available for roles:
Name
Description
capabilities 
List of capabilities assigned to role. 
The Securing Splunk manual describes List of available capabilities. 
cumulativeRTSrchJobsQuota 
Maximum number of concurrently running real-time searches for all role members. Warning message logged when limit is reached. 
cumulativeSrchJobsQuota 
Maximum number of concurrently running searches for all role members. Warning message logged when limit is reached. 
defaultApp 
The name of the app to use as the default app for this role. 
A user-specific default app overrides this. 
imported_capabilities 
List of capabilities assigned to role made available from imported roles. 
imported_roles 
List of imported roles for this role. 
Importing other roles imports all aspects of that role, such as capabilities and allowed indexes to search. In combining multiple roles, the effective value for each attribute is value with the broadest permissions. 
imported_rtSrchJobsQuota 
The maximum number of concurrent real time search jobs for this role. This count is independent from the normal search jobs limit. 
imported_rtSrchJObsQuota specifies the quota imported from other roles. 
imported_srchDiskQuota 
The maximum disk space in MB that can be used by a user's search jobs. For example, 100 limits this role to 100 MB total. 
imported_srchDiskQuota specifies the quota for this role that have imported from other roles. 
imported_srchFilter 
Search string, imported from other roles, that restricts the scope of searches run by this role. 
Search results for this role only show events that also match this search string. When a user has multiple roles with different search filters, they are combined with an OR. 
imported_srchIndexesAllowed 
A list of indexes, imported from other roles, this role has permissions to search. 
imported_srchIndexesDefault 
A list of indexes, imported from other roles, that this role defaults to when no index is specified in a search. 
imported_srchJobsQuota 
The maximum number of historical searches for this role that are imported from other roles. 
imported_srchTimeWin 
Maximum time span of a search, in seconds. 
0 indicates searches are not limited to any specific time window. 
imported_srchTimeWin specifies the limit from imported roles. 
rtSrchJobsQuota 
The maximum number of concurrent real time search jobs for this role. This count is independent from the normal search jobs limit. 
srchDiskQuota 
The maximum disk space in MB that can be used by a user's search jobs. For example, 100 limits this role to 100 MB total. 
srchFilter 
Search string that restricts the scope of searches run by this role. 
Search results for this role only show events that also match this search string. When a user has multiple roles with different search filters, they are combined with an OR. 
srchIndexesAllowed 
A list of indexes this role has permissions to search. 
srchIndexesDefault 
List of search indexes that default to this role when no index is specified. 
srchJobsQuota 
The maximum number of concurrent real time search jobs for this role. 
This count is independent from the normal search jobs limit. 
srchTimeWin 
Maximum time span of a search, in seconds. 
0 indicates searches are not limited to any specific time window. 