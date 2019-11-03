# Splunk Dashboard Examples

[Simple XML Reference](https://docs.splunk.com/Documentation/Splunk/8.0.0/Viz/PanelreferenceforSimplifiedXML)
[Chart configuration reference](https://docs.splunk.com/Documentation/Splunk/8.0.0/Viz/PanelreferenceforSimplifiedXML)
[Event Handler Reference](https://docs.splunk.com/Documentation/Splunk/8.0.0/Viz/EventHandlerReference)
[Token reference](https://docs.splunk.com/Documentation/Splunk/8.0.0/Viz/TokenReference)
[Customize Simple XML](https://docs.splunk.com/Documentation/Splunk/8.0.0/Viz/CustomizeSimpleXML)

## Basic Elements

Chart Element
Table Element
Single Value Element
Map Element
Events Viewer Element
HTML Element

## Chart Elements

Chart Element
Chart Overay
Trellis Visualization Layout
Chart Enhancements
Event Annotations
Splunk Gauges
Chart Color Options
Bar Chart
Bubble Chart
Scatter Chart

## Table Elements

Table Element
Table Element with Data Overlay
Table Formats
Table Element with Sparklines
Table Element with Hidden Fields
Table Icon Set(Rangemap)
Table Icon Set(Inline)
Table Row Highlighting
Table Cell Highlighting
Table with Data Bars
Table Row Expansion
Table Custom Column Width

## Single Value Elements

Single Value Element
Single Value With Color

## Map Elements

Map Element
Choropleth Map
Choropleth Map Color Modes

## Search Types

### Inline Search

직접 쿼리

```xml
<table>
    <title>Inline Search Table</title>
    <search>
        <query>index=_internal | head 1000 | top limit=100 sourcetype | eval percent = round(percent,2)</query>
    </search>
</table>
<chart>
    <title>Inline Search Chart</title>
    <search>
        <query>index=_internal | head 1000 | timechart count</query>
    </search>
    <option name="charting.chart">area</option>
</chart>
```

### Report Search

Saved Search 사용

```xml
<table>
    <title>Report Table</title>
    <search ref="reporting_search_table"/>
    <option name="count">5</option>
</table>
<chart>
    <title>Report Chart</title>
    <search ref="reporting_search_timechart"/>
    <option name="charting.chart">area</option>
</chart>
```

### Post Process Search

```xml
<search id="internal_data">
    <query>index=_internal | head 1000</query>
</search>
...
<chart>
    <title>Events over Time</title>
    <search base="internal_data">
        <query>timechart count</query>
    </search>
    <option name="charting.chart">column</option>
</chart>
<table>
    <title>Top Sourcetypes</title>
    <search base="internal_data">
        <query>top limit=100 sourcetype | eval percent = round(percent,2)</query>
    </search>
    <option name="rowNumbers">true</option>
</table>

```

### Recursive Search Post-process

```xml
<search id="baseSearch">
    <query>index=_internal component=* | fields _time sourcetype component log_level</query>
    <earliest>-1h@h</earliest>
    <latest>@h</latest>
</search>
...
<!-- Post process search that includes a filter, and sets ID for additional post process -->
<chart>
    <title>Log Level Trend over Time</title>
    <search id="firstPostProcess" base="baseSearch">
        <query>search sourcetype="$sourcetypeSelection$" | timechart count by log_level</query>
    </search>
    <option name="charting.drilldown">none</option>
</chart>
<!-- Recursive Post Process to sum a specific series from the post process above -->
<single>
    <title>Error Count</title>
    <search base="firstPostProcess">
        <query>fillnull value=0 ERROR | stats sum(ERROR) as errorCount</query>
    </search>
</single>
<single>
    <title>WARN Count</title>
    <search base="firstPostProcess">
        <query>fillnull value=0 WARN | stats sum(WARN) as warnCount</query>
    </search>
</single>
```

### Real-time Search

실시간 차트

```xml
<search>
    <query>index=_internal | head 1000 | top limit=100 sourcetype | eval percent = round(percent,2)</query>
    <earliest>rt-30s</earliest>
    <latest>rt</latest>
</search>
```

### Multi-Search Management

```xml
<search id="components_search">
    <query>index=_internal sourcetype=splunkd component!="Metrics" | chart count over component by log_level | addtotals</query>
    <earliest>-7d@h</earliest>
    <latest>now</latest>
</search>

<single>
    <search base="components_search">
        <query>stats sum(INFO)</query>
    </search>
    <option name="unit">events</option>
    <option name="underLabel">INFO Level logs</option>
    <option name="refresh.time.visible">false</option>
</single>
<single>
    <search base="components_search">
        <query>stats sum(WARN)</query>
    </search>
    <option name="unit">events</option>
    <option name="underLabel">WARN Level logs</option>
    <option name="refresh.time.visible">false</option>
</single>
<single>
    <search base="components_search">
        <query>stats sum(ERROR)</query>
    </search>
    <option name="unit">events</option>
    <option name="underLabel">ERROR Level logs</option>
    <option name="refresh.time.visible">false</option>
</single>
<chart>
<title>Top 10 Components</title>
    <search base="components_search">
        <query>| sort -Total limit=10 | fields - Total</query>
    </search>
    <option name="charting.chart">bar</option>
    <option name="charting.legend.placement">bottom</option>
    <option name="charting.fieldColors">{"ERROR":0xD85E3D, "WARN":0xFAC61D, "INFO":0x6BB7C8}</option>
    <option name="charting.chart.stackMode">stacked</option>
    <option name="height">300</option>
</chart>


```

### Null Search Swapper

```xml
<search id="search_logic">
    <query>$index_switcher$ |  top sourcetype</query>
    <earliest>-60m@m</earliest>
    <latest>now</latest>

    <!-- Progress event has access to job properties only -->
    <progress>
        <condition match="$job.resultCount$ == 0">
            <set token="show_html">foob</set>
        </condition>
        <condition>
            <unset token="show_html"/>
        </condition>
    </progress>
</search>
...
<html depends="$show_html$">
    <p style="color:blue;margin-left:30px;font-size:14px">Search returned no results, so we've hidden the chart!</p>
</html>
```

### Search Result Setter

Common search tokens:
Job Metadata
\$job.earliestTime$ - Initial time a search job starts
\$job.latestTime$ - Latest time recorded for the search job
\$job.resultCount$ - Number of results returned by the search job
\$job.runDuration$ - Time, in seconds, that the search took to complete
\$job.messages$ - List of error and debug messages generated by the search job
Search Results (first result only)
\$result.[fieldName]$ - Results are referenced directly by their field name

```xml
<chart>
    <title>Top sourcetypes ($sourcetype_count$ total sourcetypes)</title>
    <search>
        <query>index=_internal |  top sourcetype</query>
        <earliest>-60m</earliest>
        <latest>now</latest>

        <progress>
        <set token="sourcetype_count">$job.resultCount$</set>
        </progress>

        <cancelled>
        <unset token="sourcetype_count"></unset>
        </cancelled>
    </search>
    <option name="charting.chart">bar</option>
    <option name="charting.legend.placement">none</option>
</chart>
```

### Eval Token Expressions

```xml
<search id="search_logic">
    <query>index=_internal |  top sourcetype</query>
    <earliest>0</earliest>
    <latest>now</latest>

    <progress>
    <eval token="duration">tostring(tonumber($job.runDuration$),"duration")</eval>
    </progress>
</search>

<chart>
    <title>Top sourcetypes for index=_internal</title>
    <search base="search_logic" />
    <option name="charting.chart">bar</option>
</chart>
<html>
<h3>Duration</h3>
<div class="custom-result-value">$duration$</div>
</html>
```

### Refresh Controls

```xml
<single>
    <title>Disable refresh time</title>
    <search>
        <query>index=_internal | stats count</query>
        <earliest>-60m@m</earliest>
        <latest>now</latest>
    </search>
    <option name="unit">Incidents</option>
    <option name="refresh.time.visible">false</option>
</single>
```

### Dashboard Data Sampling

```xml
<title>1/10 Sample Ratio</title>
<chart>
    <title>Trend Analysis for splunkd events (last 7 days)</title>
    <search>
        <query>index=_internal sourcetype=splunkd | timechart count</query>
        <earliest>-7d@d</earliest>
        <latest>now</latest>
        <sampleRatio>10</sampleRatio><!-- 1/10-->
        <progress>
        <eval token="10.duration">tostring(tonumber($job.runDuration$),"duration")</eval>
        <eval token="10.eventCount">tostring($job.eventCount$,"commas")</eval>
        </progress>
    </search>
    <option name="charting.chart">line</option>
</chart>

<html>
    <div style="text-align:center;">
        <p>Duration:</p>
        <h1>$10.duration$</h1>
        <p>Event Count:</p>
        <h1>$10.eventCount$</h1>
    </div>
</html>
```

### Search Refresh and Refresh Display

How to control search refresh
The search refresh behaviour can be controlled by following options

refresh = `<integer>|<relative-time-expression>`

- The amount of time between refreshes
- If an integer value is specified, then it is treated as seconds
- Otherwise it's a relative time expression corresponding to the search language (eg, 1h5m or 5s)
- Default is to not refresh the element

refreshType = `[delay|interval]`

- Defines the point from which the refresh time is counted.
- "delay" means to start counting down when the search is done.
- "interval" means we start counting when the search is dispatched. If the runtime of the search is longer than the configured time, then the job is cancelled and a new one is dispatched.
- default is "delay"

#### How to control refresh display

`<option name="refresh.display">none|preview|progressbar</option>`

- "preview" means shows loading message and progress bar
- "progressbar" (the new default) means only shows progress bar while the search refreshes, no loading message
- "none" means show no progress bar or loading message while the search is reloading

```xml
<single>
    <search>
        <query>index=_internal | stats count</query>
        <earliest>-7d</earliest>
        <latest>now</latest>
        <refresh>10s</refresh>
        <refreshType>delay</refreshType>
    </search>
    <option name="drilldown">none</option>
    <option name="refresh.display">none</option>
    <option name="useThousandSeparators">1</option>
</single>
```

```xml
<single>
    <search>
        <query>index=_internal | stats count</query>
        <earliest>-7d</earliest>
        <latest>now</latest>
        <refresh>10s</refresh>
        <refreshType>delay</refreshType>
    </search>
    <option name="refresh.display">progressbar</option>
</single>

 <single>
    <search>
        <query>index=_internal | stats count</query>
        <earliest>-7d</earliest>
        <latest>now</latest>
        <refresh>10s</refresh>
        <refreshType>delay</refreshType>
    </search>
    <option name="refresh.display">preview</option>
</single>
```

### Show Search Time Range

```xml
<chart>
    <title>Top Sourcetypes - Time Window: $timewindow.formatted$</title>
    <search>
        <query>index=_internal | top sourcetype</query>
        <earliest>$time.earliest$</earliest>
        <latest>$time.latest$</latest>
        <progress>
            <eval token="parsed.earliest">strptime($job.earliestTime$, "%Y-%m-%dT:%H:%M:%S.%Q%z")</eval>
            <eval token="parsed.latest">strptime($job.latestTime$, "%Y-%m-%dT:%H:%M:%S.%Q%z")</eval>
            <eval token="formatted.earliest">strftime($parsed.earliest$, "%c")</eval>
            <eval token="formatted.latest">if(isnull($job.latestTime$), "the end of time", strftime($parsed.latest$, "%c"))</eval>
            <eval token="timewindow.formatted">if(isnull($formatted.earliest$), "...", $formatted.earliest$ + " to " + $formatted.latest$) + if($job.isRealTimeSearch$, " (real-time)", "")</eval>
        </progress>
        <!-- Clear time window message when the search gets cancelled or fails -->
        <cancelled>
            <unset token="timewindow.formatted" />
        </cancelled>
        <error>
            <unset token="timewindow.formatted" />
        </error>
        <fail>
            <unset token="timewindow.formatted" />
        </fail>
    </search>
    <option name="charting.chart">bar</option>
</chart>
```

### Search Event Handler Condition Matches

```xml
<table>
    <search>
        <query>index=_internal | stats count by sourcetype</query>
        <earliest>-15m</earliest>
        <latest>now</latest>
        <done>
            <condition match="match($result.sourcetype$, &quot;\\w{5,}&quot;)">
            <set token="sourcetype_regex_condition">Matched! First row of result.sourcetype is $result.sourcetype$ that has at least 5 characters.</set>
            </condition>
            <condition>
            <set token="sourcetype_regex_condition">No match! First row of result.sourcetype is $result.sourcetype$ that has less than 5 characters.</set>
            </condition>
        </done>
    </search>
</table>
<html>
    <h1>Condition: $sourcetype_regex_condition$</h1>
</html>
```

## Form Input Elements

## Drilldown Elements

## Layout Elements

## Custom Visualizations

## Token Customization
