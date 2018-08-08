Develop an app or add-on
Create an app
Create an add-on
Create dashboards and visualizations
Add navigation
Manage state
Add app supportability
Add licensing requirements
Create a setup page
Create custom search commands
Tips
 
Create an app
Create an app using Splunk Web, then configure the properties, data inputs, knowledge objects, permissions, and alerts for the app.

>  Learn more about creating Splunk apps

Overview of creating an app
To get started developing an app or add-on for Splunk Enterprise or Splunk Cloud, you'll need:

A Splunk Enterprise test environment.
Use an installation of Splunk Enterprise on a single-instance development environment, such as a laptop. For more about supported computing environments, see System requirements for use of Splunk Enterprise on-premises in the Installation Manual.
Development tools.
Splunk Web has a built-in source code editor with syntax highlighting and auto-indent features, or use your own editor for XML, CSS, and HTML files. You can also use debugging tools that are included with web browsers.
A plan for your app.
Determine the scope of your app and decide on the use case you want to address. Storyboard your app and create mockups of the dashboards, panels, and navigation.
Sample data.
Decide what data you want to work with and how you're going to import it. Get some sample data to test your app.
The basic process for developing a Splunk app is as follows:

Create an app using Splunk Web. See Create a Splunk app for details.
Configure app properties, such as the app configuration settings and static assets. See Configure app properties for details.
Get data into Splunk using data inputs, indexes, and modular inputs. See Configure the data layer for details.
Search your data using the Splunk search language and optimize your searches (filter, limit scope, avoid real-time searches). For more, read the Search Manual.
Enrich the search with Splunk knowledge objects such as saved searches, event types, transactions, tags, field extractions, transforms, lookups, search commands, and data models. See Configure knowledge objects for details.
Set permissions for the objects in your app to specify what users can see (read) and interact with (write). See Set permissions for objects in a Splunk app for details.
Create alerts using both out-of-the-box alert actions, as well as custom alert actions to integrate with other systems. For more, read the Alerting Manual.

Next steps
Continue developing your app by adding visualizations, navigation, and more. See Develop an app or add-on.

When you are ready to package, inspect, certify, and publish your app, see Release an app or add-on.


 
Create an add-on
Use the Splunk Add-on Builder to create add-ons, configure data inputs, create a setup page, perform field extractions, and add CIM mapping using a UI. The Add-on Builder also validates your add-on against best practices and provides suggestions for fixing issues before you package your add-on for distribution.

>  Learn more about the Splunk Add-on Builder


 
Create dashboards and visualizations
The Splunk Web Framework is the full stack that makes building a Splunk app looks and feel like building any modern web application. Developers can build an application with custom dashboards, charts, form searches, and other functionality using Simple XML, HTML, and JavaScript.

>  Learn more about the Splunk Web Framework


 
Add navigation
Add navigation to your app to specify how users will access the dashboards, reports, data models, and alerts in your app. Build navigation for your app so users can access the dashboards, reports, and other features of your app.

>  Learn how to add navigation


 
Manage state
The App Key Value Store (KV Store) feature of Splunk Enterprise provides a way to save and retrieve data within your Splunk apps, thereby enabling you to manage and maintain the state of the application.

>  Learn more about the App Key Value Store


 
Add supportability
Provide additional data about the troubleshooting information that Splunk Diag collects from your app to support your customers, and use this information yourself for troubleshooting.

>  Learn how to add app supportability


 
Add licensing requirements
Add licensing requirements for an entire app or for specific functions within the app.

>  Learn how to add licensing requirements


 
Create a setup page
If your app requires user input to be configured, add a setup page for users to fill out the first time they run the app.

>  Learn how to create setup pages


 
Create custom search commands
Customize search commands to better meet your needs to perform custom processing or calculations. You can add a custom Python search script to Splunk Enterprise, or make calls directly to the Splunk REST API to build a search that runs recursively.

>  Learn how to create custom search commands using the Splunk SDK for Python

>  Read about custom search commands in the Search Manual


 
Tips
>  For help with search efficiency and dashboards, see tips for creating Splunk apps