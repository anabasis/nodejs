# WebFramework Example Code

<http://dev.splunk.com/view/SP-CAAAEU7>

## Simple XML extensions

<table>
<thead><tr><th>Code example</th><th>Description</th><th>Dashboard</th><th>Dashboard Page</th></tr></thead>
<tr><td>Basic dashboard</td><td>검색 결과를 표시하는 차트 및 이벤트 뷰어가있는 기본 템플릿입니다.</td><td>01.Basic Example</td><td>example_basicpage</td></tr>
<tr><td>A collection of views on one page</td><td>한 페이지에 가장 일반적인보기를 표시합니다. 검색 컨트롤을 검색 관리자와 동기화하는 방법과 정적 옵션 및 검색 기반 선택 항목으로 양식 컨트롤을 채우는 방법을 보여줍니다.</td><td>02.Collection of Views</td><td>example_all</td></tr>
<tr><td>Charts</td><td>가능한 각 차트 유형의 예를 보여줍니다.</td><td>03.Chart Example</td><td>example_chart</td></tr>
<tr><td>Tables with custom renderers</td><td>Shows how to display a table that includes a sparkline in the search results, a custom cell renderer, and a custom row renderer.</td><td>04.Tables Example</td><td>example_customtables</td></tr>
<tr><td>Events viewers</td><td>Shows examples of each of the possible types of events viewer.</td></tr>
<tr><td>Maps</td><td>Shows data displayed on a Splunk map.</td></tr>
<tr><td>Drilldown properties</td><td>Shows the result of setting different combinations of drilldown properties for the views that allow drilldown actions.</td></tr>
<tr><td>Search controls using tokens</td><td>Shows how to use tokens to sync search controls to a search manager.</td></tr>
<tr><td>Search controls using events</td><td>Shows how to use change events to sync search controls to a search manager.</td></tr>
<tr><td>Search progress events</td><td>Shows how to retrieve the progress of a search, including the status of the search and the properties of the search job.</td></tr>
<tr><td>Search results model</td><td>Shows how to retrieve the different types of search results from the results model: events, preview, results, and summary.</td></tr>
<tr><td>Token manipulation</td><td>Shows how to use tokens to run a search using the index value that is selected from a dropdown list. Tokens are manipulated using the token change event handler.</td></tr>
<tr><td>Token transform and forwarding</td><td>Shows different ways to change a token value by using token filters and forwarders.</td></tr>
</table>

### Example: Basic dashboard using a Simple XML extension

이 예제는 간단한 XML 확장을 사용하여 차트가있는 기본 템플릿을 만들고 검색 결과를 표시하는 이벤트 뷰어를 만드는 방법을 보여줍니다.

![Basic Dashboard](./images/SWF_codeex_07.jpg)

- `$SPLUNK_HOME/etc/apps/app_name/local/data/ui/views/` example_basicpage.xml
- `$SPLUNK_HOME/etc/apps/app_name/appserver/static/` example_basicpage.js
- <http://localhost:port/app/mysplunkapp/examplenam>

#### example_basicpage.xml

```xml
<dashboard script="example_basicpage.js">
  <label>Basic example</label>
  <row>
    <panel>
      <html>
        <h3>A chart and an events viewer displaying results of a search</h3>
        <div id="mychart"></div>
        <div id="myeventsviewer"></div>
      </html>
    </panel>
  </row>
</dashboard>
```

#### example_basicpage.js

```js
require([
    "splunkjs/mvc/searchmanager",
    "splunkjs/mvc/chartview",
    "splunkjs/mvc/eventsviewerview",
    "splunkjs/mvc/simplexml/ready!"
], function(
    SearchManager,
    ChartView,
    EventsViewerView
) {

    // Instantiate the views and search manager
    var mysearch = new SearchManager({
        id: "search1",
        preview: true,
        cache: true,
        status_buckets: 300,
        search: "index=_internal | head 1000 | stats count by sourcetype"
    });

    var mychart = new ChartView ({
        id: "chart1",
        managerid: "search1",
        type: "bar",
        el: $("#mychart")
    }).render();

    var myeventsviewer = new EventsViewerView ({
        id: "eviewer1",
        managerid: "search1",
        el: $("#myeventsviewer")
    }).render();
});
```

### Example: A collection of views using a Simple XML extension

이 예제는 간단한 XML 확장을 사용하여 가장 일반적인보기를 한 페이지에 표시하고 검색 컨트롤을 검색 관리자와 동기화하는 방법을 보여 주며 고정 선택과 검색 기반 선택으로 양식 컨트롤을 채우는 방법을 보여줍니다

![A collection of views using a Simple XML extension](./images/SWF_codeex_10.jpg)

- `$SPLUNK_HOME/etc/apps/app_name/local/data/ui/views/` example_all.xml
- `$SPLUNK_HOME/etc/apps/app_name/appserver/static/` example_js.xml
- <http://localhost:port/app/mysplunkapp/myexample>

#### example_all.xml

```xml
<dashboard script="example_all.js" >
    <label>Splunk views</label>
    <row>
        <panel>
            <html>
                <p>This example shows how to set up the most common views using JavaScript. Tokens are used to keep the search controls in sync with the search manager.</p>
                <table>
                    <!-- Row -->
                    <tr>
                        <td style="width: 80%;">
                            <h3>SearchBar</h3>
                            <div id="mysearchbar"></div>
                        </td>
                        <td style="width: 20%;">
                            <h3>TimeRange<br/>(also included with SearchBar)</h3>
                            <div id="mytimerange"></div>
                        </td>
                    </tr>
                    <!-- Row -->
                    <tr>
                        <td style="width: 100%;">
                            <h3>SearchControls</h3>
                            <div id="mysearchcontrols"></div>
                        </td>
                    </tr>
                    <!-- Row -->
                    <tr>
                        <td style="width: 100%;">
                            <h3>Timeline</h3>
                            <div id="mytimeline"></div>
                        </td>
                    </tr>
                    <!-- Row -->
                    <tr>
                        <td style="width: 100%;">
                            <h3>EventsViewer</h3>
                            <div id="myeventsviewer"></div>
                        </td>
                    </tr>
                    <!-- Row -->
                    <tr>
                        <td style="width: 100%;">
                            <h3>Table</h3>
                            <div id="mytable"></div>
                        </td>
                    </tr>
                    <!-- Row -->
                    <tr>
                        <td style="width: 100%;">
                            <h3>Chart</h3>
                            <div id="mychart"></div>
                        </td>
                    </tr>
                    <!-- Row -->
                    <tr>
                        <td style="width: 33%;">
                            <h3>Single</h3>
                            <div id="mysingle"></div>
                        </td>
                        <td style="width: 34%;">
                            <h3>TextInput</h3>
                            <div id="mytextinput"></div>
                        </td>
                        <td style="width: 33%;">
                            <h3>Checkbox</h3>
                            <p>Check me:</p>
                            <div id="mycheckbox"></div>
                        </td>
                    </tr>
                    <!-- Row -->
                    <tr>
                        <td style="width: 50%;">
                            <h3>CheckboxGroup (static choices)</h3>
                            <div id="mycheckboxgroup1"></div>
                        </td>
                        <td style="width: 50%;">
                            <h3>CheckboxGroup (search-based choices)</h3>
                            <div id="mycheckboxgroup2"></div>
                        </td>
                    </tr>
                    <!-- Row -->
                    <tr>
                        <td style="width: 50%;">
                            <h3>RadioGroup (static choices)</h3>
                            <div id="myradiogroup1"></div>
                        </td>
                        <td style="width: 50%;">
                            <h3>RadioGroup (search-based choices)</h3>
                            <div id="myradiogroup2"></div>
                        </td>
                    </tr>
                    <!-- Row -->
                    <tr>
                        <td style="width: 50%;">
                            <h3>Dropdown (static choices)</h3>
                            <div id="mydropdown1"></div>
                        </td>
                        <td style="width: 50%;">
                            <h3>Dropdown (search-based choices)</h3>
                            <div id="mydropdown2"></div>
                        </td>
                    </tr>
                    <!-- Row -->
                    <tr>
                        <td style="width: 50%;">
                            <h3>MultiDropdown (static choices)</h3>
                            <div id="mymultidropdown1"></div>
                        </td>
                        <td style="width: 50%;">
                            <h3>MultiDropdown (search-based choices)</h3>
                            <div id="mymultidropdown2"></div>
                        </td>
                    </tr>

                </table>
            </html>
        </panel>
    </row>
</dashboard>
```

#### example_all.js

```js
require([
    "splunkjs/mvc",
    "splunkjs/mvc/searchmanager",
    "splunkjs/mvc/chartview",
    "splunkjs/mvc/checkboxgroupview",
    "splunkjs/mvc/checkboxview",
    "splunkjs/mvc/dropdownview",
    "splunkjs/mvc/eventsviewerview",
    "splunkjs/mvc/multidropdownview",
    "splunkjs/mvc/radiogroupview",
    "splunkjs/mvc/searchbarview",
    "splunkjs/mvc/searchcontrolsview",
    "splunkjs/mvc/singleview",
    "splunkjs/mvc/tableview",
    "splunkjs/mvc/textinputview",
    "splunkjs/mvc/timelineview",
    "splunkjs/mvc/timerangeview",
    "splunkjs/mvc/simplexml/ready!"
], function(
    mvc,
    SearchManager,
    ChartView,
    CheckboxGroupView,
    CheckboxView,
    DropdownView,
    EventsViewer,
    MultiDropdownView,
    RadioGroupView,
    SearchbarView,
    SearchControlsView,
    SingleView,
    TableView,
    TextInputView,
    TimelineView,
    TimeRangeView
) {

    // Create a token-based search to interact with search controls
    var search1 = new SearchManager({
        id: "example-search1",
        search: mvc.tokenSafe("$searchquery$"),
        earliest_time: mvc.tokenSafe("$earlyval$"),
        latest_time: mvc.tokenSafe("$lateval$"),
        preview: true,
        cache: true,
        status_buckets: 300
    });

    // Create a stats search for chart example
    var search2 = new SearchManager({
        id: "example-search2",
        search: "index=_internal | head 1000 | stats count by sourcetype",
        preview: true,
        cache: true
    });

    // Create a search that returns a single value
    var search3 = new SearchManager({
        id: "example-search3",
        search: "index=_internal | stats count",
        preview: true,
        cache: true,
        earliest_time: "-15m",
        latest_time: "now"
    });

    // Create a search on index names for populating choices
    var search4 = new SearchManager({
        id: "example-search4",
        search: "| eventcount summarize=false index=* index=_* | dedup index | fields index",
        preview: true,
        cache: true
    });

    // Create views
    var timeline1 = new TimelineView({
        id:"example-timeline",
        managerid: "example-search1",
        el: $("#mytimeline")
    }).render();

    var searchbar1 = new SearchbarView({
        id:"example-searchbar",
        managerid: "example-search1",
        value: mvc.tokenSafe("$searchquery$"),
        default: "index=_internal | head 1000",
        timerange_earliest_time: mvc.tokenSafe("$earlyval$"),
        timerange_latest_time: mvc.tokenSafe("$lateval$"),
        el: $("#mysearchbar")
    }).render();

    var timerange1 = new TimeRangeView({
        id:"example-timerange",
        managerid: "example-search1",
        earliest_time: mvc.tokenSafe("$earlyval$"),
        latest_time: mvc.tokenSafe("$lateval$"),
        el: $("#mytimerange")
    }).render();

    var searchcontrols1 = new SearchControlsView({
        id:"example-searchcontrols",
        managerid: "example-search1",
        el: $("#mysearchcontrols")
    }).render();

    var eventsviewer1 = new EventsViewer({
        id:"example-eventtable",
        managerid: "example-search1",
        el: $("#myeventsviewer")
    }).render();

    var table1 = new TableView({
        id:"example-table",
        managerid: "example-search1",
        el: $("#mytable")
    }).render();

    var chart1 = new ChartView({
        id:"example-chart",
        managerid: "example-search2",
        type: "bar",
        el: $("#mychart")
    }).render();

    var single1 = new SingleView({
        id:"example-single",
        managerid: "example-search3",
        beforeLabel: "Event count:",
        el: $("#mysingle")
    }).render();

    var textinput1 = new TextInputView({
        id:"example-textinput",
        default: " Type here",
        el: $("#mytextinput")
    }).render();

    var checkbox1 = new CheckboxView({
        id:"example-checkbox",
        label: "Check me",
        default: true,
        el: $("#mycheckbox")
    }).render();

    var checkboxgroup1 = new CheckboxGroupView({
        id:"example-checkboxgroup1",
        default: "Three",
        el: $("#mycheckboxgroup1")
    }).render();

    var checkboxgroup2 = new CheckboxGroupView({
        id:"example-checkboxgroup2",
        managerid: "example-search4",
        default: "main",
        labelField: "index",
        valueField: "index",
        el: $("#mycheckboxgroup2")
    }).render();

    var radiogroup1 = new RadioGroupView({
        id:"example-radiogroup1",
        default: "One",
        el: $("#myradiogroup1")
    }).render();

    var radiogroup2 = new RadioGroupView({
        id:"example-radiogroup2",
        managerid: "example-search4",
        default: "main",
        labelField: "index",
        valueField: "index",
        el: $("#myradiogroup2")
    }).render();

    var dropdown1 = new DropdownView({
        id:"example-dropdown1",
        default: "One",
        el: $("#mydropdown1")
    }).render();

    var dropdown2 = new DropdownView({
        id:"example-dropdown2",
        managerid: "example-search4",
        default: "main",
        labelField: "index",
        valueField: "index",
        el: $("#mydropdown2")
    }).render();

    var multidropdown1 = new MultiDropdownView({
        id:"example-multidropdown1",
        default: "Two",
        el: $("#mymultidropdown1")
    }).render();

    var multidropdown2 = new MultiDropdownView({
        id:"example-multidropdown2",
        managerid: "example-search4",
        default: "main",
        labelField: "index",
        valueField: "index",
        el: $("#mymultidropdown2")
    }).render();

    // Define a static list of choices for the form controls
    var staticchoices = [
        {label:" One", value: "One"},
        {label:" Two", value: "Two"},
        {label:" Three", value: "Three"}
    ];

    // Populate the form controls with the list of choices
    checkboxgroup1.settings.set("choices", staticchoices);
    dropdown1.settings.set("choices", staticchoices);
    multidropdown1.settings.set("choices", staticchoices);
    radiogroup1.settings.set("choices", staticchoices);

    // Whenever the user changes the timeline, update the search manager
    timeline1.on("change", function() {
        search1.settings.set(timeline1.val());
    });
});
```

### Example: Charts using a Simple XML extension

이 예제에서는 간단한 XML 확장을 사용하여 가능한 각 차트 유형의 예제를 표시합니다.

![Charts](./images/SWF_codeex_11.jpg)

- example_chart.xml
- example_chart.js

#### example_chart.xml

```xml
<dashboard script="example_chart.js" >
    <label>Charts</label>
    <row>
        <panel>
            <html>
                <table class="table">
                    <tr>
                        <!-- First cell -->
                        <td style="width: 50%;">
                            <h3>Bar</h3>
                            <div id="mybarchart"></div>
                        </td>
                        <!-- Second cell -->
                        <td style="width: 50%;">
                            <h3>Column</h3>
                            <div id="mycolumnchart"></div>
                        </td>
                    </tr>
                    <tr>
                        <!-- First cell -->
                        <td style="width: 50%;">
                            <h3>Line</h3>
                            <div id="mylinechart"></div>
                        </td>
                        <!-- First cell -->
                        <td style="width: 50%;">
                            <h3>Area</h3>
                            <div id="myareachart"></div>
                        </td>
                    </tr>
                    <tr>
                        <!-- Second cell -->
                        <td style="width: 50%;">
                            <h3>Pie</h3>
                            <div id="mypiechart"></div>
                        </td>

                        <!-- Second cell -->
                        <td style="width: 50%;">
                            <h3>Scatter</h3>
                            <div id="myscatterchart"></div>
                        </td>
                    </tr>
                    <tr>
                        <!-- first cell -->
                        <td style="width: 33%;">
                            <h3>Radial Gauge</h3>
                            <div id="myrgchart"></div>
                        </td>
                        <!-- Second cell -->
                        <td style="width: 33%;">
                            <h3>Marker Gauge</h3>
                            <div id="mymgchart"></div>
                        </td>
                        <!-- Third cell -->
                        <td style="width: 33%;">
                            <h3>Filler Gauge</h3>
                            <div id="myfgchart"></div>
                        </td>
                    </tr>
                </table>
            </html>
        </panel>
    </row>
</dashboard>
```

#### example_chart.js

```js
require([
    "splunkjs/mvc/searchmanager",
    "splunkjs/mvc/chartview",
    "splunkjs/mvc/simplexml/ready!"
], function(
   SearchManager,
   ChartView
) {

    // Set up search managers
    var search1 = new SearchManager({
        id: "example-search",
        search: "index=_internal | head 10000 | timechart count by bytes limit=10",
        preview: true,
        cache: true
    });

    var search2 = new SearchManager({
        id: "example-search-gauge",
        search: "index=_internal | stats count",
        earliest_time: "-15s",
        latest_time: "now",
        preview: true,
        cache: true
    });

    // Set up the charts
    barchart = new ChartView({
        id: "example-bar-chart",
        managerid: "example-search",
        "charting.chart.stackMode": "stacked",
        "charting.legend.placement": "bottom",
        type: "bar",
        el: $("#mybarchart")
    }).render();

    linechart = new ChartView({
        id: "example-chart-line",
        managerid: "example-search",
        type: "line",
        "charting.legend.placement": "bottom",
        el: $("#mylinechart")
    }).render();

    piechart = new ChartView({
        id: "example-chart-pie",
        managerid: "example-search",
        type: "pie",
        "charting.chart.showPercent": true,
        el: $("#mypiechart")
    }).render();

    areachart = new ChartView({
        id: "example-chart-area",
        managerid: "example-search",
        type: "area",
        el: $("#myareachart")
    }).render();

    scatterchart = new ChartView({
        id: "example-chart-scatter",
        managerid: "example-search",
        type: "scatter",
        el: $("#myscatterchart")
    }).render();

    columnchart = new ChartView({
        id: "example-chart-column",
        managerid: "example-search",
        type: "column",
        "charting.chart.stackMode": "stacked100",
        el: $("#mycolumnchart")
    }).render();

    fillergaugechart = new ChartView({
        id: "example-chart-fg",
        managerid: "example-search-gauge",
        type: "fillerGauge",
        el: $("#myfgchart")
    }).render();

    markergaugechart = new ChartView({
        id: "example-chart-mg",
        managerid: "example-search-gauge",
        type: "markerGauge",
        el: $("#mymgchart")
    }).render();

    radialgaugechart = new ChartView({
        id: "example-chart-rg",
        managerid: "example-search-gauge",
        type: "radialGauge",
        el: $("#myrgchart")
    }).render();

    // Respond to a click event on the bar chart
    barchart.on("click:chart", function (e) {
        e.preventDefault();
        console.log("Clicked chart: ", e);
    });

});
```

### Example: Tables with custom renderers using a Simple XML extension

이 예제는 Simple XML 확장을 사용하여 검색 결과에 스파크 라인을 포함하는 테이블을 표시하고 표의 두 번째 버전은 스파크 라인을 포맷하고 사용자 정의 셀 렌더러를 작성하는 방법 및 사용자 정의 행 확장 렌더러를 사용하는 세 번째 테이블을 표시합니다.

![Tables with custom renderers using a Simple XML extension](./images/SWF_codeex_12.jpg)

- example_customtables.xml
- example_customtables.js
- example_customtables.css

#### example_customtables.xml

```xml
<dashboard script="example_customtables.js" stylesheet="custom.css">
    <label>Custom table cell and row rendering</label>
    <row>
        <panel>
            <html>
                <table>
                    <tr>
                        <td style="width: 100%;">
                            <h3>Standard table cells</h3>
                            <div id="table-plain"></div>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 100%;">
                            <h3>Custom table cells</h3>
                            <div id="table-customcell"></div>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 100%;">
                            <h3>Custom expanding table rows</h3>
                            <div id="table-customrow"></div>
                        </td>
                    </tr>

                </table>
            </html>
        </panel>
    </row>
</dashboard>
```

#### example_customtables.js

```js
require([
    "underscore",
    "splunkjs/mvc/searchmanager",
    "splunkjs/mvc/tableview",
    "splunkjs/mvc/simplexml/ready!"
], function(
   _,
   SearchManager,
   TableView
) {

    // Set up search managers
    var search1 = new SearchManager({
        id: "search1",
        search: "index=_internal | head 10000 | stats sparkline count by sourcetype | rangemap field=count low=0-100 elevated=101-1000 default=severe",
        earliest_time: "-1h@h",
        latest_time: "now",
        preview: true,
        cache: true
    });

    var search2 = new SearchManager({
        id: "search2",
        preview: true,
        cache: true,
        search: "index=_internal | stats count by sourcetype, source, host"
    });

    // Create a table
    var myplaintable = new TableView({
        id: "table-plain",
        managerid: "search1",
        el: $("#table-plain")
    }).render();

    // Create a custom table and set sparkline properties
    var mycustomcelltable = new TableView({
        id: "table-customcell",
        managerid: "search1",
        el: $("#table-customcell"),
        // Format the sparkline cell
        format: {
            "sparkline": [ // This field name is required
                {
                    "type": "sparkline", // This property must be "sparkline"

                    // Sparkline options
                    "options":
                    {
                        "type": "bar",
                        "height": "40px",
                        "barWidth": "5px",
                        "colorMap":
                        {
                            "100:": "#0033CC",
                            ":99": "#00FF00"
                        }
                    }
                }
            ]
        }
    });

    // Create a table for a custom row expander
    var mycustomrowtable = new TableView({
        id: "table-customrow",
        managerid: "search2",
        drilldown: "none",
        el: $("#table-customrow")
    });

    // Define icons for the custom table cell
    var ICONS = {
        severe: "alert-circle",
        elevated: "alert",
        low: "check-circle"
    };

    // Use the BaseCellRenderer class to create a custom table cell renderer
    var CustomCellRenderer = TableView.BaseCellRenderer.extend({
        canRender: function(cellData) {
            // This method returns "true" for the "range" field
            return cellData.field === "range";
        },

        // This render function only works when canRender returns "true"
        render: function($td, cellData) {
            console.log("cellData: ", cellData);

            var icon = "question";
            if(ICONS.hasOwnProperty(cellData.value)) {
                icon = ICONS[cellData.value];
            }
            $td.addClass("icon").html(_.template('<i class="icon-<%-icon%> <%- range %>" title="<%- range %>"></i>', {
                icon: icon,
                range: cellData.value
            }));
        }
    });

    // Use the BasicRowRenderer class to create a custom table row renderer
    var CustomRowRenderer = TableView.BaseRowExpansionRenderer.extend({
        canRender: function(rowData) {
            console.log("RowData: ", rowData);
            return true;
        },

        render: function($container, rowData) {
        // Print the rowData object to the console
        console.log("RowData: ", rowData);

        // Display some of the rowData in the expanded row
        $container.append("<div>"
            + "<b>rowIndex</b>: " + rowData.rowIndex + "<br>"
            + "<b>colspan</b>: " + rowData.colspan + "<br>"
            + "<b>fields</b>: " + rowData.fields + "<br>"
            + "<b>values</b>: " + rowData.values
            + "</div>");
        }
    });

    // Create an instance of the custom cell renderer,
    // add it to the table, and render the table
    var myCellRenderer = new CustomCellRenderer();
    mycustomcelltable.addCellRenderer(myCellRenderer);
    mycustomcelltable.render();

    // Create an instance of the custom row renderer,
    // add it to the table, and render the table
    var myRowRenderer = new CustomRowRenderer();
    mycustomrowtable.addRowExpansionRenderer(myRowRenderer);
    mycustomrowtable.render();
});
```

#### example_customtables.css

```css
/* custom.css */

/* Define icon styles */

td.icon {
    text-align: center;
}

td.icon i {
    font-size: 15px;
    text-shadow: 1px 1px #aaa;
}

td.icon .severe {
    color: red;
}

td.icon .elevated {
    color: orangered;
}

td.icon .low {
    color: #006400;
}
```

## HTML dashboards

## SplunkJS Stack for apps outside Splunk Web

## Same dashboard using differenct tools