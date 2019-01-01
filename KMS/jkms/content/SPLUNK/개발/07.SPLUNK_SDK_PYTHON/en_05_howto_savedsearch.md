# How to work with saved searches using the Splunk SDK for Python

The most fundamental feature in Splunk Enterprise is searching your data. But before diving into the details of how to use the SDK to search, let's clarify the terms:

- A search query is a set of commands and functions you use to retrieve events from an index or a real-time stream, for example: "search * | head 10".
- A saved search is a search query that has been saved to be used again and can be set up to run on a regular schedule. The results from the search are not saved with the query.
- A search job is an instance of a completed or still-running search operation, along with the results. A search ID is returned when you create a job, allowing you to access the results of the search when they become available. Search results are returned in JSON, JSON_ROWS, JSON_COLS, XML, or CSV format.

This topic focuses on working with saved searches. For more about working with search jobs, see [How to run searches and display results](http://dev.splunk.com/view/python-sdk/SP-CAAAEE5).

## The search APIs

The classes for working with saved searches are:

- The splunklib.client.SavedSearches class for the collection of saved searches.
- The splunklib.client.SavedSearch class for an individual saved search.

Access these classes through an instance of the splunklib.client.Service class. Retrieve a collection, and from there you can access individual items in the collection and create new ones. For example, here's a simplified program for getting a collection of saved searches and creating a new one:

```python
# Connect to Splunk Enterprise
service = client.connect(...)

# Get the collection of saved searches
savedsearches = service.saved_searches

# Create a saved search
mysearch = savedsearches.create(name, query)
```

## Code examples

This section provides examples of how to use the search APIs, assuming you first [connect to a Splunk Enterprise instance](http://dev.splunk.com/view/python-sdk/SP-CAAAEE4):

- To list saved searches
- To view the history of a saved search
- To create a saved search
- To view and modify the properties of a saved search
- To run a saved search and display search results
- To delete a saved search

Here is some more information about search parameters:

- Collection parameters
- Saved search parameters

### To list saved searches

This example shows how to use the [splunklib.client.SavedSearches](http://docs.splunk.com/DocumentationStatic/PythonSDK/1.6.5/client.html#splunklib.client.SavedSearches) class to retrieve and list the saved searches in the saved search collection for the current namespace.

```python
# List the saved searches that are available to the current user
savedsearches = service.saved_searches

for savedsearch in savedsearches:
    print "  " + savedsearch.name
    print "      Query: " + savedsearch["search"]
```

To retrieve a collection for a specific namespace—for example, to list the saved searches available to a specific user—create a second Service instance, specifying the owner and app. This example lists the saved searches for the user "username":

```python
# Create a second Service instance
HOST = "localhost"
PORT = 8089
USERNAME = "admin"
PASSWORD = "yourpassword"
OWNER = "username"       # Replace this with a valid username
APP   = "search"

service2 = client.connect(
    host=HOST,
    port=PORT,
    username=USERNAME,
    password=PASSWORD,
    owner=OWNER,
    app=APP)

savedsearches2 = service2.saved_searches

for savedsearch in savedsearches2:
    print "  " + savedsearch.name
```



To view the history of a saved search
The history of a saved search contains the past and current instances (jobs) of the search. This example shows the history for all the saved searches in the current collection:
# Print the job history of saved searches
for savedsearch in service.saved_searches:
    print savedsearch.name + ":"

    history = savedsearch.history()
    if len(history) > 0:
        for job in history:
            print "   %s" % job.name
    else: 
        print "No jobs for this search"
    print
To create a saved search
When you create a saved search, at a minimum you need to provide a search query and a name for the search. You can also specify additional properties for the saved search at this time by providing a dictionary of key-value pairs for the properties (the possible properties are summarized in Saved search parameters). Or, modify properties after you have created the saved search.
This example shows how to create a basic saved search:
# Create a saved search--search everything, return 1st 10 events
# Note: Do not include the 'search' keyword for a saved search
myquery = "* | head 10"
mysearchname = "Test Search"

mysavedsearch = service.saved_searches.create(mysearchname, myquery)
print "Created: " + mysavedsearch.name
To view and modify the properties of a saved search
This example shows how to iterate through all the saved searches in the current collection and list the properties for each:
# Iterate all saved searches and list properties
for savedsearch in service.saved_searches:
    print "'" + savedsearch.name + "' properties"

    searchprops = savedsearch.content
    for key in sorted(searchprops.keys()):
        value = searchprops[key]
        print "   %s: %s" % (key, value)
    print
This example shows how to view specific properties of the new saved search:
# Retrieve the new search
mysavedsearch = service.saved_searches["Test Search"]

# Print the properties of the saved search
print "Description:         ", mysavedsearch["description"]
print "Is scheduled:        ", mysavedsearch["is_scheduled"]
print "Cron schedule:       ", mysavedsearch["cron_schedule"]
print "Next scheduled time: ", mysavedsearch["next_scheduled_time"]
To set properties, create a dictionary of key-value pairs (keyword arguments, or kwargs), then pass that dictionary to the update method to make the changes on the server. Next, call the refresh method to update your local, cached copy of the object with these changes. See Saved search parameters for a list of all the possible properties you can set for a saved search.
This example continues from the previous one, showing how to set the description and schedule the saved search in cron format:
# Retrieve the new search
mysavedsearch = service.saved_searches["Test Search"]

# Specify a description for the search
# Enable the saved search to run on schedule
# Run the search on Saturdays at 4:15am
# Search everything in a 24-hour time range starting June 19, 12:00pm
kwargs = {"description": "This is a test search",
        "is_scheduled": True,
        "cron_schedule": "15 4 * * 6",
        "earliest_time": "2014-06-19T12:00:00.000-07:00",
        "latest_time": "2014-06-20T12:00:00.000-07:00"}

# Update the server and refresh the local copy of the object
mysavedsearch.update(**kwargs).refresh()

# Print the properties of the saved search
print "Description:         ", mysavedsearch["description"]
print "Is scheduled:        ", mysavedsearch["is_scheduled"]
print "Cron schedule:       ", mysavedsearch["cron_schedule"]
print "Next scheduled time: ", mysavedsearch["next_scheduled_time"]
To run a saved search and display search results
Running a saved search creates a search job that is scheduled to run right away. Use the SavedSearch.dispatch method to run a saved search, which returns a Job object that corresponds to the search job. The Job object gives you access to information about the search job, such as the search ID, the status of the search, and the search results once the search job has finished.
The dispatch method takes these optional parameters:
dispatch.now: A time string that is used to dispatch the search as though the specified time were the current time.
dispatch.*: Overwrites the value of the search field specified in *.
trigger_actions: A Boolean that indicates whether to trigger alert actions.
force_dispatch: A Boolean that indicates whether to start a new search if another instance of this search is already running.
This example runs the search that was created above and shows how to poll the status to determine when the search has completed. Once the search has finished, it retrieves the search results from the Job object, displaying the raw XML results.
from time import sleep
import sys

...

# Retrieve the new search
mysavedsearch = service.saved_searches["Test Search"]

# Run the saved search
job = mysavedsearch.dispatch()

# Create a small delay to allow time for the update between server and client
sleep(2)

# Wait for the job to finish--poll for completion and display stats
while True:
    job.refresh()
    stats = {"isDone": job["isDone"],
             "doneProgress": float(job["doneProgress"])*100,
              "scanCount": int(job["scanCount"]),
              "eventCount": int(job["eventCount"]),
              "resultCount": int(job["resultCount"])}
    status = ("\r%(doneProgress)03.1f%%   %(scanCount)d scanned   "
              "%(eventCount)d matched   %(resultCount)d results") % stats

    sys.stdout.write(status)
    sys.stdout.flush()
    if stats["isDone"] == "1":
        break
    sleep(2)

# Display the search results now that the job is done
jobresults = job.results()

while True:
    content = jobresults.read(1024)
    if len(content) == 0: break
    sys.stdout.write(content)
    sys.stdout.flush()
sys.stdout.write("\n")
For an example of using the XML reader to parse results, see the To create a basic oneshot search and display results example.
To delete a saved search
Delete a saved search using the splunklib.client.SavedSearches.delete(name) method. Any jobs for the saved search are not deleted.
This example shows how to delete a saved search:
# Delete the test search
service.saved_searches.delete("Test Search")
Collection parameters
The following parameters are available when retrieving a collection of saved searches.
Parameter
Description
count
A number that indicates the maximum number of entries to return. A value of 0 means all entries are returned.
earliest_time
A string that contains all the scheduled times starting from this time. (not just the next run time).
latest_time
A string that contains all the scheduled times until this time.
offset
A number that specifies the index of the first item to return.
For oneshot inputs, this value refers to the current position in the source file, indicating how much of the file has been read.
search
A string that specifies a search expression to filter the response with, matching field values against the search expression. For example, "search=foo" matches any object that has "foo" as a substring in a field, and "search=field_name%3Dfield_value" restricts the match to a single field.
sort_dir
An enum value that specifies how to sort entries. Valid values are "asc" (ascending order) and "desc" (descending order).
sort_key
A string that specifies the field to sort by.
sort_mode
An enum value that specifies how to sort entries. Valid values are "auto", "alpha" (alphabetically), "alpha_case" (alphabetically, case sensitive), or "num" (numerically).
Saved search parameters
The properties that are available for saved searches correspond to the parameters for the saved/searches endpoint in the REST API.
This table summarizes the properties you can set for a saved search. For an example of setting properties, see To view and modify the properties of a saved search.
Parameter
Description
name
Required. A string that contains the name of the saved search.
search
Required. A string that contains the search query.
action.*
A string with wildcard arguments to specify specific action arguments.
action.email
A Boolean that indicates the state of the email alert action. Read only.
action.email.auth_password
A string that specifies the password to use when authenticating with the SMTP server. Normally this value is set while editing the email settings, but you can set a clear text password here that is encrypted when Splunk Enterprise is restarted.
action.email.auth_username
A string that specifies the username to use when authenticating with the SMTP server. If this is empty string, authentication is not attempted.
action.email.bcc
A string that specifies the BCC email address to use if "action.email" is enabled.
action.email.cc
A string that specifies the CC email address to use if "action.email" is enabled.
action.email.command
A string that contains the search command (or pipeline) for running the action.
action.email.format
An enum value that indicates the format of text and attachments in the email ("plain", "html", "raw", or "csv"). Use "plain" for plain text.
action.email.from
A string that specifies the email sender's address.
action.email.hostname
A string that specifies the hostname used in the web link (URL) that is sent in email alerts. Valid forms are "hostname" and "protocol://hostname:port".
action.email.inline
A Boolean that indicates whether the search results are contained in the body of the email.
action.email.mailserver
A string that specifies the address of the MTA server to be used to send the emails.
action.email.maxresults
The maximum number of search results to send when "action.email" is enabled.
action.email.maxtime
A number indicating the maximum amount of time an email action takes before the action is canceled. The valid format is number followed by a time unit ("s", "m", "h", or "d"), for example "5d".
action.email.pdfview
A string that specifies the name of the view to deliver if "action.email.sendpdf" is enabled.
action.email.preprocess_results
A string that specifies how to pre-process results before emailing them.
action.email.reportCIDFontList
Members of an enumeration in a space-separated list specifying the set (and load order) of CID fonts for handling Simplified Chinese(gb), Traditional Chinese(cns), Japanese(jp), and Korean(kor) in Integrated PDF Rendering.
action.email.reportIncludeSplunkLogo
A Boolean that indicates whether to include the Splunk logo with the report.
action.email.reportPaperOrientation
An enum value that indicates the paper orientation ("portrait" or "landscape").
action.email.reportPaperSize
An enum value that indicates the paper size for PDFs ("letter", "legal", "ledger", "a2", "a3", "a4", or "a5").
action.email.reportServerEnabled
A Boolean that indicates whether the PDF server is enabled.
action.email.reportServerURL
A string that contains the URL of the PDF report server, if one is set up and available on the network.
action.email.sendpdf
A Boolean that indicates whether to create and send the results as a PDF.
action.email.sendresults
A Boolean that indicates whether to attach search results to the email.
action.email.subject
A string that specifies the subject line of the email.
action.email.to
A string that contains a comma- or semicolon-delimited list of recipient email addresses. Required if this search is scheduled and "action.email" is enabled.
action.email.track_alert
A Boolean that indicates whether running this email action results in a trackable alert.
action.email.ttl
The number of seconds indicating the minimum time-to-live (ttl) of search artifacts if this email action is triggered. If the value is a number followed by "p", it is the number of scheduled search periods.
action.email.use_ssl
A Boolean that indicates whether to use secure socket layer (SSL) when communicating with the SMTP server.
action.email.use_tls
A Boolean that indicates whether to use transport layer security (TLS) when communicating with the SMTP server.
action.email.width_sort_columns
A Boolean that indicates whether columns should be sorted from least wide to most wide, left to right. This value is only used when "action.email.format"="plain", indicating plain text.
action.populate_lookup
A Boolean that indicates the state of the populate-lookup alert action. Read only.
action.populate_lookup.command
A string that specifies the search command (or pipeline) to run the populate-lookup alert action.
action.populate_lookup.dest
A string that specifies the name of the lookup table or lookup path to populate.
action.populate_lookup.hostname
A string that specifies the host name used in the web link (URL) that is sent in populate-lookup alerts. Valid forms are "hostname" and "protocol://hostname:port".
action.populate_lookup.maxresults
The maximum number of search results to send in populate-lookup alerts.
action.populate_lookup.maxtime
The number indicating the maximum amount of time an alert action takes before the action is canceled. The valid format is number followed by a time unit ("s", "m", "h", or "d").
action.populate_lookup.track_alert
A Boolean that indicates whether running this populate-lookup action results in a trackable alert.
action.populate_lookup.ttl
The number of seconds indicating the minimum time-to-live (ttl) of search artifacts if this populate-lookup action is triggered. If the value is a number followed by "p", it is the number of scheduled search periods.
action.rss
A Boolean that indicates the state of the RSS alert action. Read only.
action.rss.command
A string that contains the search command (or pipeline) that runs the RSS alert action.
action.rss.hostname
A string that contains the host name used in the web link (URL) that is sent in RSS alerts. Valid forms are "hostname" and "protocol://hostname:port".
action.rss.maxresults
The maximum number of search results to send in RSS alerts.
action.rss.maxtime
The maximum amount of time an RSS alert action takes before the action is canceled. The valid format is number followed by a time unit ("s", "m", "h", or "d").
action.rss.track_alert
A Boolean that indicates whether running this RSS action results in a trackable alert.
action.rss.ttl
The number of seconds indicating the minimum time-to-live (ttl) of search artifacts if this RSS action is triggered. If the value is a number followed by "p", it is the number of scheduled search periods.
action.script
A Boolean that indicates the state of the script alert action. Read only.
action.script.command
A string that contains the search command (or pipeline) that runs the script action.
action.script.filename
A string that specifies the file name of the script to call, which is required if "action.script" is enabled.
action.script.hostname
A string that specifies the hostname used in the web link (URL) that is sent in script alerts. Valid forms are "hostname" and "protocol://hostname:port".
action.script.maxresults
The maximum number of search results to send in script alerts.
action.script.maxtime
The maximum amount of time a script action takes before the action is canceled. The valid format is number followed by a time unit ("s", "m", "h", or "d").
action.script.track_alert
A Boolean that indicates whether running this script action results in a trackable alert.
action.script.ttl
The number of seconds indicating the minimum time-to-live (ttl) of search artifacts if this script action is triggered. If the value is a number followed by "p", it is the number of scheduled search periods.
action.summary_index
A Boolean that indicates the state of the summary index alert action. Read only.
action.summary_index._name
A string that specifies the name of the summary index where the results of the scheduled search are saved.
action.summary_index.command
A string that contains the search command (or pipeline) that runs the summary-index action.
action.summary_index.hostname
A string that specifies the hostname used in the web link (URL) that is sent in summary-index alerts. Valid forms are "hostname" and "protocol://hostname:port".
action.summary_index.inline
A Boolean that indicates whether to run the summary indexing action as part of the scheduled search.
action.summary_index.maxresults
The maximum number of search results to send in summary-index alerts.
action.summary_index.maxtime
A number indicating the maximum amount of time a summary-index action takes before the action is canceled. The valid format is number followed by a time unit ("s", "m", "h", or "d"), for example "5d".
action.summary_index.track_alert
A Boolean that indicates whether running this summary-index action results in a trackable alert.
action.summary_index.ttl
The number of seconds indicating the minimum time-to-live (ttl) of search artifacts if this summary-index action is triggered. If the value is a number followed by "p", it is the number of scheduled search periods.
actions
A string that contains a comma-delimited list of actions to enable, for example "rss,email".
alert.digest_mode
A Boolean that indicates whether Splunk Enterprise applies the alert actions to the entire result set or digest ("true"), or to each individual search result ("false").
alert.expires
The amount of time to show the alert in the dashboard. The valid format is number followed by a time unit ("s", "m", "h", or "d").
alert.severity
A number that indicates the alert severity level (1=DEBUG, 2=INFO, 3=WARN, 4=ERROR, 5=SEVERE, 6=FATAL).
alert.suppress
A Boolean that indicates whether alert suppression is enabled for this scheduled search.
alert.suppress.fields
A string that contains a comma-delimited list of fields to use for alert suppression.
alert.suppress.period
A value that indicates the alert suppression period, which is only valid when "Alert.Suppress" is enabled. The valid format is number followed by a time unit ("s", "m", "h", or "d").
alert.track
An enum value that indicates how to track the actions triggered by this saved search. Valid values are: "true" (enabled), "false" (disabled), and "auto" (tracking is based on the setting of each action).
alert_comparator
A string that contains the alert comparator. Valid values are: "greater than", "less than", "equal to", "rises by", "drops by", "rises by perc", and "drops by perc".
alert_condition
A string that contains a conditional search that is evaluated against the results of the saved search.
alert_threshold
A value to compare to before triggering the alert action. Valid values are: integer or integer%. If this value is expressed as a percentage, it indicates the value to use when "alert_comparator" is set to "rises by perc" or "drops by perc".
alert_type
A string that indicates what to base the alert on. Valid values are: "always", "custom", "number of events", "number of hosts", and "number of sources". This value is overridden by "alert_condition" if specified.
args.*
A string containing wildcard arguments for any saved search template argument, such as "args.username"="foobar" when the search is search $username$.
auto_summarize
A Boolean that indicates whether the scheduler ensures that the data for this search is automatically summarized.
auto_summarize.command
A string that contains a search template that constructs the auto summarization for this search.
auto_summarize.cron_schedule
A string that contains the cron schedule for probing and generating the summaries for this saved search.
auto_summarize.dispatch.earliest_time
A string that specifies the earliest time for summarizing this saved search. The time can be relative or absolute; if absolute, use the "dispatch.time_format" parameter to format the value.
auto_summarize.dispatch.latest_time
A string that contains the latest time for summarizing this saved search. The time can be relative or absolute; if absolute, use the "dispatch.time_format" parameter to format the value.
auto_summarize.dispatch.ttl
The number of seconds indicating the time to live (in seconds) for the artifacts of the summarization of the scheduled search. If the value is a number followed by "p", it is the number of scheduled search periods.
auto_summarize.max_disabled_buckets
A number that specifies the maximum number of buckets with the suspended summarization before the summarization search is completely stopped, and the summarization of the search is suspended for the "auto_summarize.suspend_period" parameter.
auto_summarize.max_summary_ratio
A number that specifies the maximum ratio of summary size to bucket size, which specifies when to stop summarization and deem it unhelpful for a bucket. The test is only performed if the summary size is larger than the value of "auto_summarize.max_summary_size".
auto_summarize.max_summary_size
A number that specifies the minimum summary size, in bytes, before testing whether the summarization is helpful.
auto_summarize.max_time
A number that specifies the maximum time (in seconds) that the summary search is allowed to run. Note that this is an approximate time because the summary search stops at clean bucket boundaries.
auto_summarize.suspend_period
A string that contains the time indicating when to suspend summarization of this search if the summarization is deemed unhelpful.
auto_summarize.timespan
A string that contains a comma-delimited list of time ranges that each summarized chunk should span. This comprises the list of available granularity levels for which summaries would be available.
cron_schedule
A string that contains the cron-style schedule for running this saved search.
description
A string that contains a description of this saved search.
disabled
A Boolean that indicates whether the saved search is enabled.
dispatch.*
A string that specifies wildcard arguments for any dispatch-related argument.
dispatch.buckets
The maximum number of timeline buckets.
dispatch.earliest_time
A time string that specifies the earliest time for this search. Can be a relative or absolute time. If this value is an absolute time, use "dispatch.time_format" to format the value.
dispatch.latest_time
A time string that specifies the latest time for this saved search. Can be a relative or absolute time. If this value is an absolute time, use "dispatch.time_format" to format the value.
dispatch.lookups
A Boolean that indicates whether lookups for this search are enabled.
dispatch.max_count
The maximum number of results before finalizing the search.
dispatch.max_time
The maximum amount of time (in seconds) before finalizing the search.
dispatch.reduce_freq
The number of seconds indicating how frequently Splunk Enterprise runs the MapReduce reduce phase on accumulated map values.
dispatch.rt_backfill
A Boolean that indicates whether to back fill the real-time window for this search. This value is only used for a real-time search.
dispatch.spawn_process
A Boolean that indicates whether Splunk Enterprise spawns a new search process when running this saved search.
dispatch.time_format
A string that defines the time format that Splunk Enterprise uses to specify the earliest and latest time.
dispatch.ttl
The number indicating the time to live (ttl) for artifacts of the scheduled search (the time before the search job expires and artifacts are still available), if no alerts are triggered. If the value is a number followed by "p", it is the number of scheduled search periods.
displayview
A string that contains the default UI view name (not label) in which to load the results.
is_scheduled
A Boolean that indicates whether this saved search runs on a schedule.
is_visible
A Boolean that indicates whether this saved search is visible in the saved search list.
max_concurrent
The maximum number of concurrent instances of this search the scheduler is allowed to run.
next_scheduled_time
A string that indicates the next scheduled time for this saved search. Read only.
qualifiedSearch
A string that is computed during run time. Read only.
realtime_schedule
A Boolean that specifies how the scheduler computes the next time a scheduled search is run: 
When "true": The schedule is based on the current time. The scheduler might skip some scheduled periods to make sure that searches over the most recent time range are run.
When "false": The schedule is based on the last search run time (referred to as "continuous scheduling") and the scheduler never skips scheduled periods. However, the scheduler might fall behind depending on its load. Use continuous scheduling whenever you enable the summary index option ("action.summary_index").
The scheduler tries to run searches that have real-time schedules enabled before running searches that have continuous scheduling enabled.
request.ui_dispatch_app
A string that contains the name of the app in which Splunk Web dispatches this search.
request.ui_dispatch_view
A string that contains the name of the view in which Splunk Web dispatches this search.
restart_on_searchpeer_add
A Boolean that indicates whether a real-time search managed by the scheduler is restarted when a search peer becomes available for this saved search. The peer can be one that is newly added or one that has become available after being down.
run_on_startup
A Boolean that indicates whether this search is run when Splunk Enterprise starts. If the search is not run on startup, it runs at the next scheduled time. It is recommended that you set this value to "true" for scheduled searches that populate lookup tables.
vsid
A string that contains the view state ID that is associated with the view specified in the "displayview" attribute.