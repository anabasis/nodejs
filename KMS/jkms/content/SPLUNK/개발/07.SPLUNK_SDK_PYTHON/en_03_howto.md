# How to use the Splunk SDK for Python

This section shows how to do the basics in Splunk®. We're assuming you already followed the instructions in the Getting Started section and were able to run the examples. We're also assuming you know your way around Splunk Web and got your feet wet―you've added some data and saved a search or two. If so, you're ready to start using the SDK to develop Splunk applications. 
If you try the examples that are included with the SDK, you'll notice that they are all written from a command-line perspective―that is, they start by parsing the parameters that are provided at the command line and the parameters that are defined in the .splunkrc file (the optional file that stores your login credentials for convenience when running the SDK examples, described in Utilities).
For simplicity, the code examples in this section avoid error handling, command-line processing, and complex logic, staying focused simply on showing you how to use the SDK APIs. If you want more advanced real-world examples, see the Python code examples on GitHub.
How to...
 Connect to Splunk
Introduces the basic process of connecting to splunkd and logging in.

 Work with saved searches
Shows how to list, create, and run saved searches.


 Run searches and display results
Shows how to list search jobs, create new jobs by running different types of searches, and display the results from searches in different formats.


 Create modular inputs
Shows how to programmatically create modular inputs.


 Create custom search commands
Shows how to programmatically create custom search commands.


 Display search results
Describes the available options for displaying search results.


 Get data into Splunk
Shows how to add, view, and modify your data inputs and indexes.


 Work with users and roles
Shows how to add, view, and modify the users of the Splunk system to control access to Splunk.