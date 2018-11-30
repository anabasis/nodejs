# Extreme Search

<http://www.georgestarcher.com/tag/extreme-search/page/2/>
<http://www.georgestarcher.com/tag/extreme-search/>

## Splunk Getting Extreme Part One

This is going to be a series of posts on Splunk Extreme Search (XS). Something that is for folks with Splunk Enterprise Security (ES). At this time that is the only way to get Extreme Search. It comes as an included Supporting Addon. You can get the Extreme Search Visualization (XSV) app from splunkbase, but it does not have all the commands to fully use Extreme Search (XS)

Extreme Search is a tool for avoiding making searches that rely on static thresholds. The Splunk documentation example walks through this based on a simple Authentication failure example. http://docs.splunk.com/Documentation/ES/4.5.1/User/ExtremeSearchExample

I like to explain XS this way. You still are filtering search results on a range of values. The difference is rather than hard coding a simple threshold for all data like failureCount > 6 you build a “context” profiled per “class” such as src, user, app so you can search filter on a word like “anomalous”, “medium”, or “extreme”. Those terms are range mapped to values that got calculated based on your existing data. This is way better than simple thresholds.

Contexts are nothing but fancy lookup tables. They actually get created in the desired app context’s lookup folder.

To use XS we need to make the “context” and ideally freshen it up on some time interval using a scheduled search. Then we have our search that uses that context to filter for what we are looking for.

### Construction of a context generating search:

1. We need a search that gets the data we want bucketed into some time chunks that is meaningful to us.
2. Next we generate the statistics that XS needs to generate our context lookup table for us based on the data.
3. We calculate/handle the depth of our context by working with the values such as max, min, and what are called cross over points. We will talk more about those shortly.
4. We add on the context create/update statement.

### Scenario

This example needs both the XS and XSV apps installed. XSV adds a command called xsCreateADContext that we will need. This stands for Extreme Search Create Anomaly Driven Context. All these XS commands are just custom search commands in a Splunk perspective.

We are interested in event per second spikes beyond “normal” for a sending host. We will take advantage of Splunk’s own internal metrics logs to do this.

### Context Generation

This search will give us all metrics events bucketed into 5 minute averages for a host by day of week and hour of day.

```sql
index= _internal source=*metrics.log group=per_host_thruput | bucket _time span=5m | stats max(eps) as eps by _time, series, date_hour, date_wday
```

Next we expand that to generate the overall statistics.

```sql
index= _internal source=*metrics.log group=per_host_thruput | bucket _time span=5m | stats max(eps) as eps by _time, series, date_hour, date_wday | stats avg(eps) as average, stdev(eps) as stddev, count by series, date_hour, date_wday
```

![결과](./images/Screen-Shot-2016-12-06-at-7.19.12-PM-620x133.png)

We want to find EPS values that are anomalous to their normal levels. We will be using xsCreateADContext from the XSV app. That command needs the fields min, max, anomalous_normal, and normal_anomalous.

```sql
index= _internal source=*metrics.log group=per_host_thruput | bucket _time span=5m | stats max(eps) as eps by _time, series, date_hour, date_wday | stats avg(eps) as average, stdev(eps) as stddev, count by series, date_hour, date_wday | eval min=(average-3*stddev-3), max=(average+3*stddev+3), anomalous_normal=(average-2*stddev-1), normal_anomalous=(average+2*stddev+1)
```

![결과](./images/Screen-Shot-2016-12-06-at-7.23.41-PM-620x93.png)

Last we add the command to create the context file.

```sql
index= _internal source=*metrics.log group=per_host_thruput | bucket _time span=5m | stats max(eps) as eps by _time, series, date_hour, date_wday | stats avg(eps) as average, stdev(eps) as stddev, count by series, date_hour, date_wday | eval min=(average-3*stddev-3), max=(average+3*stddev+3), anomalous_normal=(average-2*stddev-1), normal_anomalous=(average+2*stddev+1) | xsCreateADContext name=eps_by_series_5m app=search container=splunk_metrics scope=app terms="anomalous,normal,anomalous" notes="eps by host by 5m" uom="eps" class="series, date_wday, date_hour"
```

![결과](./images/Screen-Shot-2016-12-04-at-4.51.38-PM-620x198.png)

#### Fields and Depth

- `Min` : We calculate min to be the average EPS minus 3 times the standard deviation minus 3. We have to subtract off that last 3 in case the standard deviation is zero. If we did not do this we would get a min=max situation when it was zero. XS has to has ranges to work with.
- `Max` : We calculate min to be the average EPS plus 3 times the standard deviation plus 3. We have to add on that last 3 in case the standard deviation is zero. If we did not do this we would get a min=max situation when it was zero. XS has to has ranges to work with.

- `Anomalous_Normal` : This is the cross over point between a low (left side) anomalous section. So it is similar to calculating Min. But we pull it in some from Min by only using 2 times standard deviation and tacking on a 1 to handle the standard deviation being zero.

- `Normal_Anomalous` : This is the cross over point between a high (right side) anomalous section. So it is similar to calculating Max. But we pull it in some from Max by only using 2 times standard deviation and tacking on a 1 to handle the standard deviation being zero.

In my experience so far playing with the computation of min, max and the cross over points are an experiment. In large volume authentication data I have used 5 times standard deviation for min/max and 3 times for the cross over points. What you use will be some trial and error to fit your data and environment. But you have to create a spread or none of your results will have a depth and then you might as well search for all raw events rather than looking for “abnormal” conditions.

#### Breaking down the xsCreateADContext command

- `Name` : that is the name of our data context. In this case we called it eps_by_series_5m to represent it is events per second by the series field values in 5 minute averages.
- `App` : this is the app context we want our stuff to exist in within Splunk. In this case we have it make the context file in the search/lookup folder.
- `Container` : this is the name of the csv file that is created in the lookup folder location. The trick to remember here is that the entire csv “container” is loaded into RAM when Splunk uses it. So you want to consider making contexts that have very large numbers of row into their own containers rather than putting multiple named contexts into the same file.
- `Scope` : this is same how to scope access permissions. Normally I just keep it to the app that I am making the context in using the word “app”
- `Terms` : Since we are making an AD context we need to set “anomalous, normal, anomalous” You can understand why when you look at the graphic below. We are saying that the left low side has the word mapped to the ranges as anomalous, the middle range is normal values, then the right high side is anomalous. This is important because when we use this context to search we will say something like “eps is anomalous” which will match any values in the ranges to the left or right of “normal”. This is what I meant by we range map values to words.

> Notes and uom: the notes and units of measure fields are just optional. They only matter when you look at the contexts in something like the XSV app GUI.

- `Class` : this is critical as this is saying we are profiling the values BY series, date_wday and date_hour. This is exactly the same as the split by in a stats command in Splunk.

In this chart notice how the light blue middle region is “normal” and to the left and right we have the “anomalous” zones. This helps you visualize what areas you will match when you make compatibility statements like “is normal”, “is anomalous”, ” is above normal”.

![결과화면](./images/Screen-Shot-2016-12-04-at-4.53.24-PM-620x275.png)

### Using our Context

The key to using the context is making sure we search for data with the same time bucketing and split by fields. Otherwise the context value model won’t line up with our real data very well.

There are several XS commands we should be familiar with in getting ready to use the context.

1. xsFindBestConcept: this takes our search and compares it to our context and gives us a guide on what “term” we should use for that result line if we wanted to get it from the filter.
2. xsgetwherecix: this shows us all the results without filtering them but gives us the CIX or compatibility fit value based on the compatibility statement we make. Aka “is anomalous”
3. xswhere: this is the filtering command we will actually use when we are done.

#### xsFindBestConcept

```sql
index= _internal source=*metrics.log group=per_host_thruput | bucket _time span=5m | stats max(eps) as eps by _time, series, date_wday, date_hour | xsFindBestConcept eps from eps_by_series_5m by series, date_wday, date_hour in splunk_metrics
```

![결과](./images/Screen-Shot-2016-12-06-at-7.10.45-PM-620x114.png)

#### xsgetwherecix

```sql
index= _internal source=*metrics.log group=per_host_thruput | bucket _time span=5m | stats max(eps) as eps by _time, series, date_wday, date_hour | xsgetwherecix eps from eps_by_series_5m by series, date_wday, date_hour in splunk_metrics is anomalous
```

![결과](./images/Screen-Shot-2016-12-06-at-7.34.25-PM-620x110.png)

#### xswhere

```sql
index= _internal source=*metrics.log group=per_host_thruput | bucket _time span=5m | stats max(eps) as eps by _time, series, date_wday, date_hour | xswhere eps from eps_by_series_5m by series, date_wday, date_hour in splunk_metrics is anomalous
```

![결과](./images/Screen-Shot-2016-12-06-at-7.35.28-PM-620x55.png)

There out of our data for yesterday only two hours were classified as “anomalous.” We did not have to hard code in specific limiting values. Our own existing data helped create an XS context and we then applied that to data going forward.

Next in our series we will start going through different use cases related to security. We will also cover the other types of contexts than just simply “anomalous.”

## Splunk Getting Extreme Part Two

Part one gave us a walk through of a simple anomalous search. Now we need to go over foundational knowledge about search construction when building extreme search contexts.

Comparing Search Methods
Traditional Search
This is what we did in part one. We ran a normal SPL search across regular events then used a bucket by _time and stats combination to get our statistics trend over time. This is handy when your event data is not tied to an accelerated Data Model.

Context Gen Search Pattern:
search events action=failure | bucket _time span=1h | stats count by _time, src | stats min, max etc | XS Create/Update

Search Speed:
tag=authentication action=failure

“This search has completed and has returned 8,348 results by scanning 14,842 events in 7.181 seconds”

tstats Search
Splunk is great at the “dynamic schema” aka search time extractions. This flexibility comes at the cost of speed when searching. An Accelerated Data Model is a method to give a step up in performance by building an indexed map of a limited set of fields based on that data. This is much faster to search at the trade off of only being able to specify fields that are mapped in the Data Model. Tstats means tsidx stats. It functions on the tsidx indexing files of the raw data plus it runs the equivalent to “ | datamodel X | stats Z” to catch data that is not accelerated already. This is a middle ground between accelerated and non accelerated only data searching.

Context Gen Search Pattern:
| tstats count from datamodel=…. by _time… span=1h | stats min, max etc | XS Create/Update

Search Speed:
| tstats count from datamodel=Authentication where nodename=Authentication.Failed_Authentication

“This search has completed and has returned 1 results by scanning 12,698 events in 1.331 seconds”

tstats summariesonly=true Search
Using summaries only with tstats tells Splunk to search ONLY the data buckets that have had their Data Model map acceleration build completed. It leaves off the attempt to even check for non accelerated data to return. This does mean you can miss data that has not yet been accelerated. Or you can miss data if something happens where acceleration data has to be rebuilt. This often happens in an index cluster after a rolling restart.

Ball park, the accelerated data copy is going to consume an extra 3.4x storage the size of the indexed data. We are trading that storage for speed for the index of the data. So keep that in mind when you decide how much data to accelerate.

￼

Context Gen Search Pattern:
| tstats summariesonly=true count from datamodel=…. by _time… span=1h | stats min, max etc | XS Create/Update

Search Speed:
| tstats count from datamodel=Authentication where nodename=Authentication.Failed_Authentication

“This search has completed and has returned 1 results by scanning 10,081 events in 0.394 seconds”

Summary:
We can see significant speed increases in the progression across how we constructed the searches.

Traditional Search took 7.2 seconds

tstats took 1.3 seconds

tstats summariesonly=true took 0.4 seconds.

This tells us that when we want to generate stats trends for Extreme Search contexts over large data sets we should use tstats, and with summariesonly=true where we can. That often makes it trivial even in multi TB/day deployments to generate and update our XS search contexts quickly, even over months of data. That is handy when you are trying to “define normal” based on the existing data. All the above speeds are just using Splunk on my late 2012 MacBook Pro. Real indexers etc will perform even better. The point is to show you the gains between the base search methods when building your XS contexts.

The next posts in our series will focus on actual search use cases and the different XS context types.

## Splunk Getting Extreme Part Three

We covered an example of an Anomalous Driven (AD) context in part one and how to use tstats in part two. We will cover the a traditional Domain type context example using Authentication data and tstats.

In XS commands DD mean Data Driven context. Here we will cover a use case using xsCreateDDContext of the type Domain. Using type=domain means we are going to need a count, max, mix. The terms we will use are minimal, low, medium, high, and extreme. This will let us find certain levels of activity without worrying about what “normal” is vs “anomalous” as we saw in part one.

Extreme Search Commands:
xsCreate
The Create method tells extreme search to create the container and populate or update all the classes if the container already exists. You have to use this if the container does not already exist.

xsUpdate
This functions exactly as the xsCreate except that it will NOT work if the container does not exist. It will return an error and stop.

xsDeleteContext
This will delete a SPECIFIC class or “all” if no class is specified from a context in a container. There is no XS command to actually remove the contents from the container. Deleting against a context/container without a class leaves all the class data but searching against the context will act as if it does not exist. The deletion without a class removed the default class lines. From there XS commands act as if the context is gone though most of the class data remains. This means the file exists with most of its file size intact. There is not even an XS command to remove an entire container. We can still cheat from within Splunk. Normally, you should NEVER touch the context files via the outputlookup command as it will often corrupt the file contents. If we want to empty a container file we can just overwrite the csv file with empty contents. The CSV file name will be in the format: containername.context.csv

If we had made a context with:
| xsupdateddcontext name=mytest container=mytestContainer app=search scope=app class=src terms=terms="minimal,low,medium,high,extreme"

We can nuke the contents of the file using the search:
makeresults | outputlookup mytestContainer.context.csv

We can now populate that container with either xsCreate or xsUpdate. xsUpdate will work since the container file exists. This trick can be handy to reset a container and cull out accumulated data because the file has grown very large over time with use or if you accidentally fed too much data into it.

Let’s talk about that for a minute. What is too large? XS has to read in the entire CSV into memory when it uses it. That has the obvious implications. A data set of 10 rows with the normal 5 domain terms of “minimal,low,medium,high,extreme” gives us 56 lines in the csv. 10 data items plus a default data item = 11 * 5 = 55 plus a header row = 56. Generally, if you are going to have 10K data items going into a context I would make one container for it and not share that container with any other contexts. That way you are not reading in a lot of large data into memory you are not using with your XS commands like for xswhere filtering.

One other thing to consider. The data size of this file is important in the Splunk data bundle replication. It is a csv file in the lookups folder and gets distributed with all the other data. If you made a context so large the CSV was 1.5GB in size you could negatively impact your search bundle replication and be in for the fun that brings.

xsFindBestConcept
This command comes from the Extreme Search Visualization app. It lets you run data against your context and have it tell you what concept terms best match the each result. This command has to work pretty hard so if your data going in is large it may take a few minutes to come back.

| tstats summariesonly=true dc(Authentication.user) as userCount from datamodel=Authentication where (nodename=Authentication.Failed_Authentication sourcetype=linux_secure) by _time, Authentication.src, Authentication.app span=1d | rename Authentication.* AS * | xsFindBestConcept userCount FROM users_by_src_1d IN auth_failures BY "src,app"



xsGetWhereCIX
This command comes acts like xswhere but does not actually filter results. It just displays ALL results that went in and what their CIX compatibility value is for the statement you used.

| tstats summariesonly=true count as failures, dc(Authentication.user) AS userCount from datamodel=Authentication where nodename=Authentication.Failed_Authentication by _time Authentication.src, Authentication.app span=1d | eval avgFailures=failures/userCount | rename Authentication.* AS * | xsgetwherecix avgFailures from failures_by_src_1d by "src,app" in auth_failures is extreme



Min and Max:
XS for the type=domain needs count, and min/max values with depth. This means where min/max are never equal. The fun part is HOW you get a min and max is up to you. You will see examples that just use the min() and max() functions. Other examples will get min() and make max the median()*someValue. You often have to experiment for what fits your data and gives you an acceptable result. We touched on this value spreading in part one of Getting Extreme.

Here a couple of different patterns though you can do it any way you like.

stats min(count) as min, max(count) as max … | eval max=if(min=max,min+5,max) | eval max=if(max-min<5,min+5,max)
stats min(count) as min, median(count) as median, average(count) as average … | eval median=if(average-median<5,median+5,average) | eval max=median*2
If you don’t get min/max spread out you will see a message like the following when trying to generate your context.

xsCreateDDContext-W-121: For a domain context failures_by_src_1d with class 103.207.36.133:sshd, min must be less than max, skipping

Use Case: Authentication Abusive Source IPs
Question: We will define our question as, what are the source IPs that are abusing our system via authentication failures by src and application type. We want to know by average failures/number of user accounts tried per day. We also want to know if it is simply an extreme number of user accounts failed regardless of the number of failures per day. Yeah, normally I would do by hour or shorter period. The test data I have is from a Raspberry Pi exposed to the Internet. The RPi is sending to Splunk using the UF for Raspberry PI. That RPi is also running fail2ban, so it limits the number of failures a source can cause before it is banned for a while. This means we will work with a scale that typically maxes out at 6 tries.

Avg Failures/userCount by src by day
Here we divide the number of failures by the number of users. This gives us a ball park number of failures for a user account from a given source. We could put user into the class but that would then make our trend too specific of being tied to a distinct src, app,user. We want more a threshold of failures per user per source in a day.

Context Gen:
| tstats summariesonly=true count as failures, dc(Authentication.user) AS userCount from datamodel=Authentication where nodename=Authentication.Failed_Authentication by _time Authentication.src, Authentication.app span=1d | eval avgFailures=failures/userCount | stats count, avg(avgFailures) as average, min(avgFailures) as min, max(avgFailures) as max by Authentication.src, Authentication.app | rename Authentication.* AS * | eval max=if(min=max,min+5,max) | xsCreateDDContext name=failures_by_src_1d app=search container=auth_failures scope=app type=domain terms="minimal,low,medium,high,extreme" notes="login failures by src by day" uom="failures" class="src,app"

Search:
Here we use the context to filter our data and find the extreme sources.

| tstats summariesonly=true count as failures, dc(Authentication.user) AS userCount from datamodel=Authentication where nodename=Authentication.Failed_Authentication by time Authentication.src, Authentication.app span=1d | eval avgFailures=failures/userCount | rename Authentication.* AS * | xswhere avgFailures from failures_by_src_1d by "src,app" in auth_failures is extreme | iplocation prefix=src src | rename src_City AS src_city, src_Country AS src_country, src_Region as src_region, src_lon AS src_long | lookup dnslookup clientip AS src OUTPUT clienthost AS src_dns

Distinct User Count by src by day
Here we are going to trend the distinct number of users tried per source without regard of the number of actual failures.

Context Gen:
| tstats summariesonly=true dc(Authentication.user) as userCount from datamodel=Authentication where (nodename=Authentication.Failed_Authentication sourcetype=linux_secure) by _time, Authentication.src, Authentication.app span=1d | stats min(userCount) as min, max(userCount) as max, count by Authentication.src, Authentication.app | rename Authentication.* as * | eval max=if(min=max,min+5,max) | xsCreateDDContext name=users_by_src_1d app=search container=auth_failures scope=app type=domain terms="minimal,low,medium,high,extreme" notes="user count failures by src by day" uom="users" class="src,app"

Search:
Here we use the context to filter our data and find the sources with user counts above medium.

| tstats summariesonly=true dc(Authentication.user) as userCount from datamodel=Authentication where (nodename=Authentication.Failed_Authentication sourcetype=linux_secure) by _time, Authentication.src, Authentication.app span=1d | rename Authentication.* AS * | xswhere userCount from users_by_src_1d in auth_failures by "src,app" is above medium

Merge to get the most abusive sources by app
We can actually merge both of these searches together. This lets us run one search over a give time period reducing our Splunk resource usage and giving us results that match either or both of our conditions.

Combined Search:
This search is bucketing the time range it runs across into days then compares to our contexts that were generated with day period as a target. Normally for an ES notable search you would not bucket time with the “by” and “span” portions as you would be only running the search over something like the previous day each day.

| tstats summariesonly=true count AS failures, dc(Authentication.user) as userCount, values(Authentication.user) as targetedUsers, values(Authentication.tag) as tag, values(sourcetype) as orig_sourcetype, values(source) as source, values(host) as host from datamodel=Authentication where (nodename=Authentication.Failed_Authentication sourcetype=linux_secure) by time, Authentication.src, Authentication.app span=1d | eval avgFailures=failures/userCount | rename Authentication.* AS * | xswhere avgFailures from failures_by_src_1d by "src,app" in auth_failures is extreme OR userCount from users_by_src_1d in auth_failures by "src,app" is above medium | iplocation prefix=src src | rename src_City AS src_city, src_Country AS src_country, src_Region as src_region, src_lon AS src_long | lookup dnslookup clientip AS src OUTPUT clienthost AS src_dns

The thing to note about the CIX value is anything that is greater than 0.5 means it matched both our contexts to some degree. The 1.0 matched them both solidly. If the CIX is 0.5 or less it means it matches only one of the contexts to some degree. Notice, I used “is extreme” on one test and “is above medium” on the other. You can adjust the statements to fit your use case and data.



Bonus Comments:
You will notice in the searches above I added some iplocation and dnslookup commands. I also used the values and extra eval functions to add to the field value content of the results. This is something you want to do when making Enterprise Security notables. This helps give your security analysts data robust notables that they might can triage without ever drilling down into the original event data.

TwitterLinkedInInstapaperPocketGoogle+FlipboardShare
POSTED ON2016-12-07

## Splunk Getting Extreme Part Four

Let’s revisit our EPS Splunk Metrics. This time we are going to use type=domain and do something else a little different. We are going to make a non classed context and apply it directly to the raw event data.

The Question:
The question we want is, what systems are generating metrics events well above low AND we want to know what concept term they fall in?

We also want get the original raw events precise in time. That is technically a different question than we asked in part one of this blog series. There we made more of a canary that asked when did a given host go over normal for its activity levels with no relation to the whole environment in a particular bucket of time.

Context Gen:
We want to make a context that is not setup for a class. Note we don’t even use a time bucketing step. The search just is set to run across the previous 30 days which is typically the retention period of Splunk index=_internal logs.

The reason we are doing it this way is we are wanting to find events that are something like high, extreme etc for our entire environment. We don’t care about trending per source system (series). We get count as the distinct count of source systems (series), then the min and max values for EPS for all sources.

index= _internal source=*metrics.log earliest=-30d latest=now group=per_host_thruput | stats dc(series) as count, min(eps) as min, max(eps) as max | xscreateddcontext name=eps container=splunk_metrics app=search scope=app type=domain terms="minimal,low,medium,high,extreme" notes="events per second" uom=“eps”

Search:
First we see if we have any extreme events in the past 30 days.

index= _internal source=*metrics.log group=per_host_thruput | xswhere eps from eps in splunk_metrics is extreme

I get one event, the largest catch up of web log imports.

11-11-2016 11:11:54.003 -0600 INFO Metrics - group=per_host_thruput, series="www.georgestarcher.com", kbps=2641.248883, eps=7144.764212, kb=81644.455078, ev=220854, avg_age=1172745.126151, max_age=2283054

Next let’s get fancier. We want to know events very above low and have XS tell us what concept term those events best fit. This is a handy way to get the word for the term it fits

index= _internal source=*metrics.log group=per_host_thruput | xswhere eps from eps in splunk_metrics is very above low | xsFindBestConcept eps from eps in splunk_metrics | table _time, series, eps, kbps, BestConcept



Summary
The point is that you can use XS to build a context profile for raw data values then apply them back to the raw events. Raw events, if you can keep the number of matches low, make great ES notable events because they have the most of the original data. Using stats and tstats boils down the fields. That requires us to pass through values as we we saw in Part Three to make the results more robust.

TwitterLinkedInInstapaperPocketGoogle+FlipboardShare
POSTED ON2016-12-10

## Splunk Getting Extreme Part Five

Part five brings another use case. We will use values in raw data not a calculated value to make our context and then match against the raw events without bucketing them.

First, we have glossed over an important question. What does data match when you use xsWhere and there is no matching class in the context? It uses the “default” class. Default is the weight average of all the existing classes within the context. If you look within the csv for the container you will find lines for your context where the class is an empty string “”. That is default. Default is also what is made for the class when no class is specified.

You get a message like the following when a class value is not in the context you are trying to use.

```txt
xsWhere-I-111: There is no context 'urllen_by_src' with class 'Not Found' from container '120.43.17.24' in scope 'none', using default context urllen_by_src
```

### Use Case: Finding long urls of interest

Just the longer URLs:
Let’s try just creating a context of all our url_length data from the Web Data Model. This version of the search will not break this up by class. We will just see if we can find “extreme” length urls in our logs based on the log data itself.

Context Gen:
| tstats dc(Web.url_length) as count, avg(Web.url_length) as average, min(Web.url_length) as min, max(Web.url_length) as max from datamodel=Web where Web.src!="unknown" | rename Web.* as * | xsCreateDDContext name=urllen container=web_stats app=search scope=app type=domain terms="minimal,low,medium,high,extreme" notes="urllen" uom="length"

The table that is displayed when the xsCreateDDContext finishes is interesting. Below we sort for extreme and see the urllen value is 678. This tells us in my data the url_length value high end is around 678 characters. If we search the logs using this context we find that our results are not a magic all bad “is extreme” situation. All the interesting URLs are down in the low/medium ranges with all the good urls. You have to come up with a another way to slice data when the signal and noise are so close to each other. This approach might work for some other use case, but not for this particular data set.



Searches:
index=weblogs | xswhere url_length from urllen in web_stats is low | stats count by url

We get an overwhelming number of matches since most of our URLs are in the low range.



index=weblogs | xswhere url_length from urllen in web_stats is extreme | stats count by url

We get a manageable 5 events from extreme but they are not interesting URLs.



URL Length by Src:
We get a different url_length distribution if we break it out by src. Remember, default is the weighted average of all the classes in the context if you use classes. The table we see when our context gen finishes is that default.

Context Gen:
Notice in our by src version our urllen for extreme in the default context is around 133. That is going to come from the weighted average of the per source classes.

| tstats avg(Web.url_length) as average, min(Web.url_length) as min, max(Web.url_length) as max from datamodel=Web where Web.src!="unknown" by _time, Web.src span=1m | rename Web.* as * | stats count, min(min) as min, max(max) as max, avg(average) as average by src | eval max=if(min=max, max+average, max) | eval max=if(max-min < average , max+average, max) | xsCreateDDContext name=urllen_by_src container=web_stats app=search scope=app type=domain terms="minimal,low,medium,high,extreme" notes="url len by src" uom="length" class="src"



Search:
index=weblogs | xsWhere url_length from urllen_by_src in web_stats by src is very very extreme | stats values(src) AS sources, dc(src) as sourceCount by url, status_description

Even using is very very extreme we get a lot of results. However the urls are much more interesting. Granted none of the searches here in Part Five are super awesome. They do show a workable example of using and XS context directly against raw events. We also get a good comparison of a classless context which does what it is supposed to vs with a class that helps draw out more interesting events. Formulating your XS context and your search questions are very important so you really have to think about what question you are trying to answer and experiment with variations against your own data.

In my data I find interesting URLs trying to redirect through my site but they land on a useless wordpress page.



TwitterLinkedInInstapaperPocketGoogle+FlipboardShare
POSTED ON2016-12-11

## Splunk Gettinxg Extreme Part Six

Welcome to part six of my series on Splunk Extreme Search. I am dedicating this to my best buddy of 18 years, Rylie. He is my Miniature Pinscher whom I need to let rest come December 29th. He has been awesome all these years and had me thinking about Time. So let’s talk Time and Extreme Search.

We saw in part five that we do not have to always bucket data and stats across time. Still, it is the most common thing to do in Extreme Search. How you handle time is important.

### Saving Time

There are two main things you can do to make your searches time efficient.

1. Use well defined searches. The more precise you can make the up front restrictions like action=success src_ip=10.0.0.0/8 the better the job the indexers can do. This also applies when using tstats by placing these up front restrictions in the where statement.
2. Use accelerated data and tstats. Use the Common Information Model data models where you can. Accelerate them over the time ranges you need. Remember, you can also make custom data models and accelerate those even if your data does not map well to the common ones.

### Accelerated Data Models

Seriously. I hot linked the title of this section. Go read it! And remember to hug a Splunk Docs team member at conf. They do an amazing job putting all that in there for us to read.

You choose how much data to accelerate by time. Splunk takes the DMs that are to be accelerated and launches special hidden searches behind the scenes. These acceleration jobs consume memory and CPU core resources like all the other searches. If you do not have enough resources you may start running into warning about hitting the maximum number of searches and your accelerations may be skipped. Think about that. If you are running ES Notables that use summariesonly=true you will miss matching data. This is because the correlation search runs over a time range and it finds no matching accelerated data. Woo! It is quiet and no notables are popping up. Maybe that isn’t so great… uh oh…

A second way you can have data model acceleration disruption is by having low memory on your indexers. This one is easier to spot. If you check the Data Model audit in Enterprise Security and see in the last error message column references to oomkiller you have less ram than you need. When that dispatched acceleration job gets killed, Splunk has to toss the acceleration job and dispatch it again on the next run. The data models will never get caught up if the jobs keep getting disrupted.

Acceleration getting behind can happen another way. Index Clustering. Acceleration builds tsidx files with the primary searchable bucket on an indexer. Index clustering exists to replicates data buckets to reduce the chance of data loss or availability if you lose one or more indexers. Prior to Splunk 6.4 there was no replication of the accelerated buckets. Just the data buckets. That was bad news when you had an indexer go down or had a rolling restart across your cluster. It would take time for the accelerations to roll back through, find that the primary bucket is now assigned as primary on a different indexer than where it was earlier. You guessed it. It has to rebuild the acceleration bucket on the indexer that now had the primary flag for that bucket. This is why if you check Data Model Audit in Enterprise Security you will see percentages complete drop most times after restarts of the indexing layer. You can turn on accelerated bucket replication in 6.4, at the cost of storage of course. Are you on version before 6.4 and using Index Clustering with Enterprise Security? You better plan that upgrade.

How far back in time your accelerations are relative to percentages complete is different between environments. Imagine the network traffic data model is behind at 96%. It sounds pretty good, but in large volume environments it could means the latest events in acceleration are 6 hours ago. What does that mean if your threat matching correlation searches only range over the past two hours and use summariesonly? It means no notables firing and you think things are quiet and great. The same thing applies to XS Context Gens. If you use summariesonly and are building averages and other statistics, those numbers are thrown off from what they should be.

If your data is pretty constant, like in high volume environments this is a down and dirty search to gauge latest event time compared to now.

```sql
| tstats summariesonly=true min(_time) as earliestTime, max(_time) as latestTime from datamodel=Authentication | eval lagHours=(now()-latestTime)/3600 | convert ctime(*Time)
```

![결과](./images/Screen-Shot-2016-12-14-at-7.00.41-PM-620x38.png)

The message is be a good Splunk Admin. Check your data model accelerations daily in your operations review process. Make sure you are adding enough indexers for your data load so DM accelerations can build quickly and stay caught up. You can increase the acceleration.max_concurrent for a given datamodel if you have the CPU resources on both Search Heads and Indexers. Use accelerated bucket replication if you can afford it.

One way you can spot acceleration jobs using search is something like the following. You may have to mess with the splunk_server field to match your search head pattern if you are on search clustering.

```sql
| rest splunk_server=local /servicesNS/-/-/search/jobs | regex label="ACCELERATE" | fields label, dispatchState ,id, latestTime, runDuration
```

![결과](./images/Screen-Shot-2016-12-15-at-3.58.19-PM-620x102.png)

There is another option to help accelerations stay caught up for your critical searches. The gui doesn’t show it but there is a setting called acceleration.backfill_time from [datamodels.conf](http://docs.splunk.com/Documentation/Splunk/latest/Admin/Datamodelsconf). You can say accelerate the Web data model for 30 days of data, but only backfill 7 days. This means if data is not accelerated, such as by an index cluster rolling restart, Splunk will only go back 7 days to catch up accelerations. That can address short run correlation searches for ES. It still creates gaps when using summariesonly for context generation searches that trend over the full 30 days. That brings you back to acceleration replication as the solution.

Oh, one other little item about data models. A data model acceleration is tied to a search head guid. If you are using search head clustering, it will use a guid for the whole cluster. ONLY searches with the matching GUID can access the accelerated data. No sharing accelerations across search heads not in the same cluster. This is why most of us cringe when Splunk customers ask about running multiple Enterprise Security instances against the same indexers. It requires data model acceleration builds for each GUID. You can imagine how resource hungry that can be at all levels.

### Context Gens and Correlation Searches

#### Search Scheduling

A context is about defining ways to ask if something is normal, high, extreme etc. Most of our context gens run across buckets of time for time ranges like 24 hours, 30 days and so on.

Scenario. Lets say we have a context gen that is anomalous login successes by source, app and user. This should let me catch use of credentials from sources not normally seen or at a volume off of normal. If I refresh that context hourly but also run my detection search that uses xswhere hourly; I run the risk of a race condition. I could normalize in the new bad or unexpected source into the context BEFORE I detect it. I would probably schedule my context gen nightly so during the day before it refreshes I get every chance to have ES Notables trigger before the data is normalized into our context. So be sure to compare how often you refresh your context compared to when you use the context.

#### Time Windows

Check your context generation time range lines up with how far back you accelerate the models. It is easy to say run over 90 days then find out you only accelerated 30 days.

Check the run duration of your searches. Validate your search is not taking longer to run than the scheduled interval of the context gen or correlation search. That always leads to tears. Your search will run on its schedule. Take longer to run and get scheduled for its next run. It will actually start to “time slide” as the next run time gets farther and farther behind compared to the real time the search job finished. I saw this happen with a threat gen search for a threat intel product app once. It was painful. Job/Activity inspector is your friend on checking run durations. Also check the scheduled search panel now and then.

Look back at the previous posts. We make contexts over time buckets and we make sure to run a search that leverages it over the same bucket width of time. Do trending over a day? Make sure you run your matching correlation search over a day’s worth of time to get numbers on the same scale. Same goes for by hour. Normally you would not make a context by day and search by hour. The scales are different. Mixing scales can lead to odd results.

### Embracing the odd

One thing you should get from this series. It is all about The Question. Imagine we trend event count, or data volume per day for a source. Would it ever make sense to use that context over only an hour’s worth of data? Sure. You would get the real low end of the terms like minimal, low, maybe medium. If you saw hits matching “is extreme” you know that you have a bad situation going on. After all, you are seeing a days worth of whatever in only an hour window. Sometimes you break the “rules” because that is the question you want to ask.

I probably would not do that with the Anomaly Driven contexts. After all, you want anomalous deviation off normal.

## Splunk Getting Extreme Part Seven

Welcome to part seven where we will try a User Driven context for Extreme Search.

Our use case is to find domain names in a from email address that are look alike domains to our own. We need to use Levenshtein to do this. There is a Splunk app for it on splunkbase. The app does have some issues and needs to be fixed. I also recommend editing the returned fields to be levenshtein_distance and levenshtein_ratio.

### Test Data

I took the new Top 1 Million Sites list from Cisco Umbrella as a source of random domain names. Then I matched it with usernames from a random name list. I needed some test data to pretend I had good email server logs. I do not have those kind of logs at home. The below data is MOCK data. Any resemblance to real email addresses is accidental.

```sql
source="testdata.txt" sourcetype="demo"
```

![결과](./images/Screen-Shot-2016-12-18-at-10.47.43-AM-620x260.png)

### Context Gen

This time we do not want to make a context based on data. We need to create a mapping of terms to values that we define regardless of the data. Technically we could just use traditional SPL to filter based on Levenshtein distance values. What fun would that be for this series? We also want to demonstrate a User Driven context. Levenshtein is the number of characters difference between two strings, aka the distance. A distance of zero means the strings match. I arbitrarily picked a max value of 15. Pretty much anything 10 or more characters different are so far out we could never care about them. I then picked terms I wanted to call the distance ranges. The closer to zero the more likely it is a look alike domain. “Uhoh” is generally going to be a distance of 0-2 then we go up from there. You could play with the max to get different value ranges mapped to the terms. It depends on your needs.

```sql
 | xsCreateUDContext name=distances container=levenshtein app=search scope=app terms=“uhoh,interesting,maybe,meh" type=domain min=0 max=15 count=4 uom=distance
```

We can use the Extreme Search Visualization app to examine our context curves and values.

![결과화면](./images/Screen-Shot-2016-12-18-at-10.47.43-AM-620x260.png)

### Exploring the Data

We can try a typical stats count and wildcard search to see what domains might resemble ours of “georgestarcher.com”

```sql
source="testdata.txt" sourcetype="demo" from="*@geo*" | rex field=from "(?P<from_user>[^@]+)@(?P<from_domain>[^$]+)"  | stats count by from_domain
```

![결과](./images/Screen-Shot-2016-12-18-at-11.03.41-AM-620x101.png)

It gets close but matches domains clearly not even close to our good one. Here is the list from my test data generation script.

```json
georgeDomain = ['georgestarcher.com','ge0rgestarcher.com', 'g5orgestarhcer.net', 'georgestarcher.au', 'georgeestarcher.com']
```

We can see we didn’t find the domain staring with g5. Trying to define a regex to find odd combinations of our domain would be very difficult. So we will start testing our Levenshtein context.

Let’s try a getwhereCIX and sort on the distance.

```sql
source="testdata.txt" sourcetype="demo" | rex field=from "(?P<from_user>[^@]+)@(?P<from_domain>[^$]+)" | search from_domain="g*" | eval mydomain="georgestarcher.com" | levenshtein distance mydomain from_domain | search levenshtein_distance!=0 | stats values(levenshtein_distance) as levenshtein_distance by from_domain | xsGetWhereCIX levenshtein_distance from distances in levenshtein is below meh
```

![결과](./images/Screen-Shot-2016-12-18-at-11.08.56-AM-620x145.png)

Next let’s try using xsFindBestConcept to see what terms match the domains we are interested in compared to their distances.

```sql
source="testdata.txt" sourcetype="demo" | rex field=from "(?P<from_user>[^@]+)@(?P<from_domain>[^$]+)" | search from_domain="g*" | eval mydomain="georgestarcher.com" | levenshtein distance mydomain from_domain | search levenshtein_distance!=0 | stats values(levenshtein_distance) as levenshtein_distance by from_domain | xsFindBestConcept levenshtein_distance from distances in levenshtein 
```

![결과](./images/Screen-Shot-2016-12-18-at-11.09.57-AM-620x137.png)

### Using our Context

We have an idea what we need to try based on our exploring the data. Still we will try a few different terms with xswhere to see what we get.

#### Using: ”is interesting”

We can see we miss the closest matches this way and get more matches that clearly are not look alikes to our domain.

```sql
source="testdata.txt" sourcetype="demo" | rex field=from "(?P<from_user>[^@]+)@(?P<from_domain>[^$]+)"  | rex field=to "(?P<to_user>[^@]+)@(?P<to_domain>[^$]+)" | eval mydomain="georgestarcher.com" | levenshtein distance mydomain from_domain | search levenshtein_distance!=0 | xswhere levenshtein_distance from distances in levenshtein is interesting | stats values(from_domain) as domains by levenshtein_distance | sort - levenshtein_distance
```

#### Using: “is near interesting”

Adding the hedge term “near” we can extend matching interesting into just a little into adjacent concept terms. We find all our terms even the closest ones. The problem is we also extended up into the higher distances too.

```sql
source="testdata.txt" sourcetype="demo" | rex field=from "(?P<from_user>[^@]+)@(?P<from_domain>[^$]+)"  | rex field=to "(?P<to_user>[^@]+)@(?P<to_domain>[^$]+)" | eval mydomain="georgestarcher.com" | levenshtein distance mydomain from_domain | search levenshtein_distance!=0 | xswhere levenshtein_distance from distances in levenshtein is near interesting | stats values(from_domain) as domains by levenshtein_distance | sort - levenshtein_distance
```

![결과](./images/Screen-Shot-2016-12-18-at-11.15.49-AM.png)

#### Using: “is near uhoh”

Again, we use near to extend up from uhoh but we find it is not far enough to find the domain “g5orgestarhcer.net”

```sql
source="testdata.txt" sourcetype="demo" | rex field=from "(?P<from_user>[^@]+)@(?P<from_domain>[^$]+)"  | rex field=to "(?P<to_user>[^@]+)@(?P<to_domain>[^$]+)" | eval mydomain="georgestarcher.com" | levenshtein distance mydomain from_domain | search levenshtein_distance!=0 | xswhere levenshtein_distance from distances in levenshtein is near uhoh | stats values(from_domain) as domains by levenshtein_distance | sort - levenshtein_distance
```

![결과](./images/Screen-Shot-2016-12-18-at-11.19.22-AM.png)

#### Using: “is very below maybe”

This time we have some fun with the hedge terms and say very to pull in the edges and below to go downward from the maybe concept. This gives us the domains we are exactly trying to find. You may have noticed we dropped where the distance was zero in our searches. That is because we don’t care where it is from our own legitimate domain name.

```sql
source="testdata.txt" sourcetype="demo" | rex field=from "(?P<from_user>[^@]+)@(?P<from_domain>[^$]+)"  | rex field=to "(?P<to_user>[^@]+)@(?P<to_domain>[^$]+)" | eval mydomain="georgestarcher.com" | levenshtein distance mydomain from_domain | search levenshtein_distance!=0 | xswhere levenshtein_distance from distances in levenshtein is very below maybe | stats values(from_domain) as domains by levenshtein_distance | sort - levenshtein_distance
```

### Last Comments

Levenshtein can be real hard to use on shorter domain names. It becomes too easy to match full legitimate other domain names compared to small distances of your own. If you try and use this in making notables you might want to incorporate a lookup table to drop known good domains that are not look alike domains. Here is the same search that worked well for my domain but for google.com. You can see it matches way too much stuff, though it does still capture interesting near domain names.

#### Example: google.com

```sql
source="testdata.txt" sourcetype="demo" | rex field=from "(?P<from_user>[^@]+)@(?P<from_domain>[^$]+)"  | rex field=to "(?P<to_user>[^@]+)@(?P<to_domain>[^$]+)" | eval mydomain="google.com" | levenshtein distance mydomain from_domain | search levenshtein_distance!=0 | xswhere levenshtein_distance from distances in levenshtein is very below maybe | stats values(from_domain) as domains by levenshtein_distance | sort - levenshtein_distance
```

![결과](./images/Screen-Shot-2016-12-18-at-11.19.22-AM.png)

## Splunk Getting Extreme Part Eight

Extreme Search has some other commands included with it. They have included the Haversine equation for calculating physical distance in the xsGetDistance command. We can couple that with the Splunk iplocation command to find user login attempts across distances too fast for realistic travel.

### Context Gen(8)

#### Class: default

First we will create a default context with a maximum speed of 500mph. Note how we do not specify the class argument.

```sql
| xsCreateUDContext name=speed container=travel app=search scope=app terms="normal,fast,improbable,ludicrous” type=domain min=0 max=500 count=4 uom=mph
```

![결과화면](./images/Screen-Shot-2016-12-22-at-2.31.58-PM-620x251.png)

#### Class: all

Second we will create a context for the class all with the same maximum speed of 500mph. We could use a different maximum if we wanted here.

```sql
| xsCreateUDContext name=speed container=travel app=search scope=app terms="normal,fast,improbable,ludicrous” type=domain min=0 max=500 count=4 uom=mph class=all
```

#### Class: foot

Last we will create a context for the class foot with a maximum speed of 27.8mph. This is approximately the maximum foot speed of a human. This could be useful if measuring speed across a place like a college campus.

```sql
| xsCreateUDContext name=speed container=travel app=search scope=app terms="normal,fast,improbable,ludicrous” type=domain min=0 max=27.8 count=4 uom=mph class=foot
```

![결과화면](./images/Screen-Shot-2016-12-22-at-2.32.14-PM-620x236.png)

### Search

We will pretend my ssh authentication failures are actually successes. This is just because it is the data I have easily available.

#### Class: all(Search)

```sql
tag=authentication action=failure user=* src_ip=* user=* app=sshd | iplocation prefix=src_ src_ip | sort + _time | streamstats current=t window=2 earliest(src_lat) as prev_lat, earliest(src_lon) as prev_lon, earliest(_time) as prev_time, earliest(src_City) as prev_city, earliest(src_Country) as prev_country, earliest(src_Region) as prev_region, earliest(src) as prev_src, by user | eval timeDiff=(_time - prev_time) | xsGetDistance from prev_lat prev_lon to src_lat src_lon | eval speed=round((distance/(timeDiff/3600)),2) | table user, src, prev_src, src_Country, src_Region, src_City, prev_country, prev_region, prev_city, speed | eval travel_method="all" | xswhere speed from speed by travel_method in travel is above improbable | convert ctime(prev_time)
```

![결과](./images/Screen-Shot-2016-12-22-at-2.20.14-PM-620x139.png)

#### Class: foot(Search)

```sql
tag=authentication action=failure user=* src_ip=* user=* app=sshd | iplocation prefix=src_ src_ip | sort + _time | streamstats current=t window=2 earliest(src_lat) as prev_lat, earliest(src_lon) as prev_lon, earliest(_time) as prev_time, earliest(src_City) as prev_city, earliest(src_Country) as prev_country, earliest(src_Region) as prev_region, earliest(src) as prev_src, by user | eval timeDiff=(_time - prev_time) | xsGetDistance from prev_lat prev_lon to src_lat src_lon | eval speed=round((distance/(timeDiff/3600)),2) | table user, src, prev_src, src_Country, src_Region, src_City, prev_country, prev_region, prev_city, speed | eval travel_method="foot" | xswhere speed from speed by travel_method in travel is above improbable | convert ctime(prev_time)
```

![결과](./images/Screen-Shot-2016-12-22-at-2.20.40-PM-620x124.png)

### Summary

We combined a User Driven context with another XS command to provide ourselves an interesting tool. We also saw how we could use different classes within that UD context to answer the question on a different scale. Try adding another class like automobile with a max=100 to find speeds that are beyond safe local travel speeds.

This would be real fun when checking webmail logs to find compromised user accounts. Especially if you combine with Levenshtein for look alike domains sent to users to build the list of whom to check.

## Splunk Getting Extreme Part Nine

I ran a series on Splunk Enterprise’s Extreme Search over a year ago. It is time to add a discussion about alfacut. I had not realized the exact behavior of alfacut at the time of that blog series. 

### Alfacut

What is alfacut in XS? Extreme Search generates a score called WhereCIX that is the measurement ranging from 0.0 to 1.0 of how compatible what you are measuring is against the Extreme Search statement you made in the xswhere command. The xswhere command uses an alfacut (the limit on the WhereCIX score) of 0.2 by default.

Here is where I rant. You CAN put alfacut>=0.7 in your xswhere command. This is like thinking you are cutting with shears and instead you are cutting with safety scissors. It doesn’t work like you would expect when you use compound xswhere commands: AND, OR.

If you specify the alfacut in the xswhere command it applies the limit to BOTH sides of the compound individually . It does NOT apply to the combined score, which is what you would expect as a user if you were looking at the output after the xswhere command. The WhereCIX  displayed from the output of the xswhere is the score of the compatibility of the entire compound statement.  If we want to filter on the combined score we simply have to know this is how things work and add our filter in the next step in the SPL pipeline.

### XSWhere Compound Statements

How you define your interesting question for ES Notables matters. Let’s take Excessive Failures.

The default Excessive Failures is not even Extreme Search based:

```sql
| from datamodel:"Authentication"."Failed_Authentication" | stats values(tag) as "tag",dc(user) as "user_count",dc(dest) as "dest_count",count by "app","src" | where 'count'>=6
```

This says we find interesting to be a failure count greater or equal to 6 by src, app.

That is going to be VERY noisy and have little context based on existing behavior. A static limit also gives bad actors a limbo bar to glide under.

What we really want to ask is: “Give me extreme non normal failure counts by source and app.” This would squash down common repetitive abuse.

We need a compound statement against anomalous and magnitude contexts.

The SA-AccessProtection app has an existing XS Context Generator named: Access – Authentication Failures By Source – Context Gen

It looks like this:

```sql
| tstats `summariesonly` count as failures from datamodel=Authentication.Authentication where Authentication.action="failure" by Authentication.src,_time span=1h 
| stats median(failures) as median, min(failures) as min, count as count 
| eval max = median*2 
| xsUpdateDDContext app="SA-AccessProtection" name=failures_by_src_count_1h container=authentication scope=app 
| stats count
```

The issue is that failures by src only is misleading because what if the failure pattern of the “app” such as ssh or mywebapp differ but from same source. You don’t want them hiding the other’s pattern.

### Magnitude Context Gen

```sql
| tstats `summariesonly` count as failure from datamodel=Authentication
    where (nodename="Authentication.Failed_Authentication" NOT
    Authentication.src_category="known_scanner" Authentication.app!=okta) by
    Authentication.src, Authentication.app, _time span=1h 
| stats median(failure) as median, avg(failure) as average, stdev(failure)
    as stdev, min(failure) as min, max(failure) as max, count as count by
    Authentication.src, Authentication.app 
| `drop_dm_object_name("Authentication")` 
| eval min=if(min=max,0,min) 
| eval max=if(min=0,6,max) 
| eval max=if(max-min<6,min+6,max) 
| xsCreateDDContext app="SA-AccessProtection"
    name=failures_by_src_app_count_1h class="src,app" container=authfails
    scope=app terms=`xs_default_magnitude_concepts` type=domain
```

That gives us the stats for a source and the app it is abusing such as sshd specifically. I used xsCreateDDContext instead of xsUpdateDDContext, because the first time we run it we need to create  a new vs update an existing context file.

We need more than this though. Because maybe there is a misbehaving script and we do not want ES Notable events for simply extreme failures but non normal extreme failure counts.

To use Anomalous XS commands you need to have the extra XS visualization app installed from splunkbase: <https://splunkbase.splunk.com/app/2855/>

### Anomalous Context Gen:

```sql
| tstats `summariesonly` count as failure from datamodel=Authentication
    where (nodename="Authentication.Failed_Authentication") by Authentication.src,
    Authentication.app, _time span=1h 
| stats stdev(failure) as stddev, avg(failure) as average, count by
    Authentication.src, Authentication.app 
| `drop_dm_object_name("Authentication")` 
| eval max=average+5*stddev+4, min=average-5*stddev-4,
    anomalous_normal=average-3*stddev-2, normal_anomalous=average+3*stddev+2 
| xsCreateADContext name=anomalous_failures_by_src_app_count_1h
    container=anomalous_authfails scope=app app="SA-AccessProtection"
    terms="anomalous,normal,anomalous" class="src,app"
```

### Combining Contexts:

Our NEW xswhere:

```sql
| xswhere failure from failures_by_src_app_count_1h in authfails by
    "src,app" is extreme AND failure from
    anomalous_failures_by_src_app_count_1h in anomalous_authfails by "src,app"
    is above normal
```

See we did not specify the alfacut in the xswhere command. Instead, we need to use a following where statement:

```sql
| where WhereCIX>=.9
```

That gives us a limit using the compatibility score of the entire compound statement. This will be much less noisy a result. If you have a compound statement and a WhereCIX of 0.5 you typically have a one sided match. Meaning it was perfectly compatible with one side of your statement but not the other at all. This is common when you combine anomalous and magnitude contexts like this. You have yup it was super noisy but that was totally normal for it so it was NOT above normal but WAS extreme. 

One possible new Excessive Failed Logins search could look something like this:

```sql
| tstats `summariesonly` count as failure, dc(Authentication.src) as srcCount,
| tstats `summariesonly` count as failure, dc(Authentication.src) as srcCount,
    values(Authentication.app) as app, values(Authentication.tag) as tag,
    values(Authentication.signature) as signature,
    values(Authentication.signature_id) as signature_id from
    datamodel=Authentication where
    (nodename=Authentication.Failed_Authentication
    Authentication.user!="unknown"
    Authentication.user!="-" Authentication.user!=*$
    Authentication.src!="unknown" Authentication.src!="\\"
    Authentication.src!="::" NOT Authentication.src_category="known_scanner" NOT
    Authentication.user_category="known_scanner" ) by
    Authentication.user, Authentication.src, Authentication.dest, _time, index,
    sourcetype 
| `drop_dm_object_name("Authentication")` 
| stats dc(user) as "user_count",dc(dest) as
    "dest_count",sum(failure) as failure, values(user) AS user, values(dest) as dest,
    values(signature) as signature, values(signature_id) as signature_id,
    values(index) as index, values(sourcetype) as sourcetype by "src","app" 
| eval src=mvjoin(src,"|"), user=mvjoin(user,"|"), dest=mvjoin(dest,"|"), sourcetype=mvjoin(sourcetype,"|"), signature=mvjoin(signature,"|"), signature_id=mvjoin(signature_id,"|") 
| xswhere failure from failures_by_src_app_count_1h in authfails by
    "src,app" is extreme AND failure from
    anomalous_failures_by_src_app_count_1h in anomalous_authfails by "src,app"
    is above normal 
| where WhereCIX>=0.9 
| eval urgency=if(failure<10,"informational",null()), src=split(src,"|"), user=split(user,"|"), dest=split(dest,"|"), sourcetype=split(sourcetype,"|"), signature=split(signature,"|"), signature_id=split(signature_id,"|")
| lookup dnslookup clientip AS src OUTPUTNEW clienthost AS src_dns
| iplocation src prefix=srcgeo_ 
| eval src_city=coalesce(src_city, srcgeo_City),
    src_country=coalesce(src_country, srcgeo_Country),
    src_lon=coalesce(src_lon, srcgeo_long) , src_lat=coalesce(src_lat,
    srcgeo_lat) 
| eval orig_index=index, orig_sourcetype=sourcetype, tag=mvappend(tag,"authentication"), action="failure"
```