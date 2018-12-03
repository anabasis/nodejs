# Splunk SDK for Python

## Overview

- What's new
- Python 2.7 End-of-Life Statement

## Getting started

- Requirements
- Installation
- Utilities

## Examples

- Command line
- Unit tests
- How to
- Connect to Splunk Enterprise
- Work with saved searches
- Run searches and jobs
- Create modular inputs
- Create custom search commands
- Display search results
- Get data into Splunk Enterprise
- Work with users, roles, and storage passwords

## Troubleshooting

## Python API Reference

--------------------------------------------------------

## Overview(상세내용)

The Splunk® Software Development Kit (SDK) for Python is open source and uses the Apache v2.0 license. If you want to make a code contribution, go to the Open Source page for more information.

This overview tells you more about:

- [What you can do with the Splunk SDK for Python](http://dev.splunk.com/view/python-sdk/SP-CAAAEBB#whattodo)
- [The Splunk SDK for Python architecture](http://dev.splunk.com/view/python-sdk/SP-CAAAEBB#architecture)

### What you can do with the Splunk SDK for Python

With the Splunk SDK for Python you can write Python applications to programmatically interact with the Splunk engine. The SDK is built on top of the REST API, providing a wrapper over the REST API endpoints. So that means with fewer lines of code, you can write applications that:

- Search your data, run saved searches, and work with search jobs.
- Manage Splunk configurations and objects.
- Integrate search results into your applications.
- Log directly to Splunk.
- Present a custom UI.

In addition to creating Python applications, you can also integrate Splunk data with other reporting tools. Here's an example of an application that uses a Leftronic Dashboard to show real-time Twitter data that was indexed using the Twitted example in this SDK:

![SDK](./images/leftronic_sm.jpg)

For more examples of applications created with Splunk SDKs, see the [Python code examples](https://github.com/splunk/splunk-sdk-python/tree/master/examples) on GitHub.

### The Splunk SDK for Python architecture

This section describes the following parts of the Splunk SDK for Python architecture:

- [Modules](http://dev.splunk.com/view/python-sdk/SP-CAAAEBB#modules)
- [The Service class](http://dev.splunk.com/view/python-sdk/SP-CAAAEBB#serviceclass)
- [Entities and collections](http://dev.splunk.com/view/python-sdk/SP-CAAAEBB#entitiescollections)
- [State caching](http://dev.splunk.com/view/python-sdk/SP-CAAAEBB#statecaching)
- [Namespaces](http://dev.splunk.com/view/python-sdk/SP-CAAAEBB#namespaces)

### Modules

Each of the modules in the Splunk SDK for Python can be used independently:

- The binding module provides an abstraction layer over raw HTTP.
- The client module provides an abstraction layer over the Splunk REST API.
- The results module provides a Splunk-specific streaming XML reader.
- The data module converts Atom Feed data to a Pythonic format.

#### Binding module

The binding module (splunklib.binding) provides a thin abstraction over raw HTTP that:

- Provides access to a low-level HTTP interface and handles certificates for HTTPS access.
- Handles authentication with a host, remembers the session key, and appends the - Authorization header to all requests.
- Manages namespaces.
- Constructs URLs from the endpoint fragments in the correct format for the underlying calls to the REST API. For example, the search/jobs endpoint fragment becomes <https://localhost:8089/servicesNS/-/-/search/jobs>.
- Supports custom HTTP request handlers.

The __binding__ module contains the following components:

__Context class__ . This utility class contains the main functionality in the binding layer—the Context class remembers your login information and session key, constructs URLs, and makes HTTP requests.

__HTTPError exceptions__ . The Splunk SDK for Python exposes HTTP errors as HTTPError exceptions. Any response code that is greater or equal to 400 raises an HTTPError exception that includes the following information:

- Response code
- Error reason
- Returned headers
- Splunk-supplied error message
- Response body

__Custom HTTP request handlers__ . The Splunk SDK for Python provides a default HTTP request handler, based on the [httplib](https://docs.python.org/2/library/httplib.html) module. The default hander will make an HTTP request to a specified URL when provided with a dictionary that contains the HTTP method, URL, headers, and body. However, you can create and use your own HTTP request handler for features that aren't included in the default handler, such as:

- Support for HTTP proxies.
- Server certificate validation.
- Event libraries, such as gevent or Eventlet.
- Additional logging or diagnostic output for debugging.

#### Client module

The client module (splunklib.client) provides an abstraction layer over the REST API, allowing you to access the endpoints in a stateless, Pythonic approach. The client layer sits on top of the binding layer, and uses its HTTP capabilities to access the REST API.

Most importantly, this module contains the Service class, which is the primary entry point for the client library. Using the Service class you can access many parts of the Splunk REST API.

Although you can use the binding module alone, using the client module has benefits:

- Consistent access to Splunk resources. For example, whether you want to access apps or users, the code to list, add, remove, and update items is similar.
- Useful abstractions of the REST API. For example, you can easily use the receivers/simple endpoint just by getting the index you want to submit to:

```python
index = service.indexes["my_index"]
index.submit("some event", sourcetype="myevent")
The client module contains the following components:
```

- __Service class__ . This utility class inherits from splunklib.binding.Context, and provides functions to access various parts of the Splunk REST API (such as apps, jobs, users, inputs, and so on).
- __Endpoint class__ . This base class provides common functions that are relevant to all Splunk REST API endpoints. The Endpoint class builds the path, and provides methods to execute GET and POST HTTP requests against that path.
- __Entity class__ . This abstract base class is a subclass of Endpoint, and provides functions that implement the Splunk entity protocol such as the ability to read properties of the entity, update properties, read metadata, and so on.
- __Collection class__ . This class is a subclass of Endpoint, and provides functions that implement the Splunk collection protocol such as listing all entries in the collection, getting a specific item, creating new items, and so on.
- __Endpoint extensions__ . These include implementations and extensions that are specific to certain REST endpoints.

#### Results module

The results module (splunklib.results) provides a Splunk-specific streaming XML reader. The results module abstracts over the details of the Splunk XML responses and provides a Pythonic way to access the stream of data.

The results module contains several classes, including the ResultsReader class, which can use with the search/export endpoint for streaming output as results become available.

#### Data module

The data module (splunklib.data) converts Splunk's Atom Feed response into a Pythonic structure (a dictionary or list), and provides a utility to navigate dictionaries using dot syntax.

### The Service class

The Service class is the primary entry point for the client library. Construct an instance of the Service class and provide any arguments that are required to connect to an available Splunk server. Once the Service instance is created, call the login method and provide login credentials. Once you have an authenticated Service instance, you can use it to navigate, enumerate, and operate on a wide variety of Splunk resources.

### Entities and collections

The Splunk REST API has over 160 endpoints (resources) that provide access to almost every feature of Splunk. The Splunk SDK for Python API exposes many of these resources as collections of entities, where an entity is a resource that has properties, actions, and descriptive metadata. Examples of entities are: jobs, indexes, apps, and configuration stanzas.

This pattern provides a consistent approach to interacting with entities and collections of entities. Collections use a common mechanism to create and remove entities. Entities use a common mechanism to retrieve and update property values, and access entity metadata. Once you're familiar with this pattern, you'll have a reasonable understanding of how the SDK and underlying REST API work.

The Splunk SDK for Python contains the base classes Entity and Collection, both of which derive from the common base class Endpoint. Note that Service is not an Entity, but is a container that provides access to all features associated with a Splunk instance.

The class hierarchy for the Splunk SDK for Python library is as follows:

```properties
Service
Endpoint
    Entity
    Collection
```

### State caching

The client module enables state caching for Entity objects. When you instantiate an Entity object, a state record (a dictionary of key-value pairs) is read and copied from the server, creating a local snapshot of its properties. The state record dictionary contains the following keys:

- title: The entity name, which is the title of the Splunk REST endpoint that this resource corresponds to (for example, alert or savedsearch).
- links: The URI of the resource, relative to the management port of a Splunk instance.
- access: A dictionary containing the permissions for accessing the resource. (For more about access control lists (ACLs), see Accessing Splunk resources).
- fields: A dictionary containing values that indicate which resource fields are wildcards, required, and optional.
- content: The full dictionary of properties and values of a resource, including access and fields.

Calls to the Entity object return values from the local cache rather than from the server. The cached state record in the Entity object can be accessed using a variety of properties, including:

- Entity.state returns a snapshot of the state record from the server.
- Entity.content returns the value of the content key of the local state record.
- Entity.access returns the value of the access key of the local state record.
- Entity.fields returns the value of the fields key of the local state record.

This interface is designed to give you complete control of when round-trips are issued to the server, and to enable multiple updates to be made at a time. Use these methods to retrieve and update state record values on the local cache and server:

- Entity.refresh retrieves the current state record from the server and updates the local, cached copy. (If a local state record does not exist, the read method is called instead.)
- Entity.read returns the current state record from the server, but does not replace the values in the local, cached copy. Use this method to implement your own caching system.
- Entity.update updates the properties on the server with the values you provide, but this method does not update your local, cached copy (you must do that explicitly).

> Note that refreshing the local state cache is always explicit and always requires a call to Entity.refresh. When you call Entity.update and then retrieve local values, you will still see the cached values because they have not been updated with new values from the server. To update the local copy, you must call refresh after update. For example:

```python
entity.update(attr=value).refresh()
```

### Namespaces

To account for permissions to view apps, system files, and other entity resources by users throughout a Splunk installation, Splunk provides access to entity resources based on a namespace. This is similar to the app/user context that is used by the Splunk REST API when accessing resources using endpoints.

The namespace is defined by:

- An owner, which is the Splunk username, such as "admin". A value of "nobody" means no specific user. The "-" wildcard means all users.
- An app, which is the app context for this resource (such as "search"). The "-" wildcard means all apps.
- A sharing mode, which indicates how the resource is shared. The sharing mode can be:
  "user": The resource is private to a specific user, as specified by owner.
  "app": The resource is shared through an app, as specified by app. The owner is "nobody", meaning no specific user.
  "global": The resource is globally shared to all apps. The owner is "nobody", meaning no specific user.
  "system": The resource is a system resource (owner is "nobody", app is "system").

In general, when you specify a namespace you can specify any combination of owner, app, and sharing the SDK library will reconcile the values, overriding them as appropriate. If a namespace is not explicitly specified, the current user is used for owner and the default app is used for app.

Here are some example combinations of owner, app, sharing:

- List all of the saved searches for a specific user named Kramer: kramer, -, user
- Create an index to be used within the Search app: nobody, search, app

## Python 2.7 End-of-Life Statement

Splunk is preparing for the Python 2.7 end of life on January 1, 2020. We know how much the Splunk platform relies on Python 2.7, as do other Splunk products, third-party applications, and integrations. We are exploring multiple solutions to adapt to this change in a way that is architecturally sound and secure.

Splunk은 2020 년 1 월 1 일에 Python 2.7의 단종을 준비 중입니다. 다른 Splunk 제품, 타사 응용 프로그램 및 통합과 마찬가지로 Splunk 플랫폼이 Python 2.7에 의존하는지 알 수 있습니다. 우리는 구조적으로 건전하고 안전한 방식으로 이러한 변화에 적응할 수있는 여러 솔루션을 모색하고 있습니다.

Splunk is committed to:

Splunk는 다음을 위해 최선을 다하고 있습니다.

- Ensuring the stability of Splunk software installations and the Splunk platform.
- Ensuring the security of Splunk software installations and the Splunk platform.
- Providing sufficient, but not unlimited, time for our customers and developer community to transition.

- Splunk 소프트웨어 설치 및 Splunk 플랫폼의 안정성 보장.
- Splunk 소프트웨어 설치 및 Splunk 플랫폼의 보안 보장.
- 고객 및 개발자 커뮤니티가 전환 할 수있는 충분한 시간을 제공하지만 무제한은 아닙니다.

We are looking for interested Splunk software users and developers to help us exceed your expectations by:

우리는 Splunk 소프트웨어 사용자와 개발자가 다음과 같은 방법으로 귀하의 기대를 뛰어 넘는 데 도움이 될만한 제품을 찾고 있습니다.

- Helping Splunk understand concerns and the implications of this change on your business.
- Being part of a customer feedback group for this change.
- Testing and providing feedback on potential solutions.

- Splunk가 귀하의 비즈니스에 대한 이러한 변화의 시사점과 의미를 이해하도록 도와줍니다.
- 이러한 변화에 대한 고객 피드백 그룹에 속합니다.
- 잠재적 인 솔루션에 대한 피드백을 테스트하고 제공합니다.

Anyone interested in working with us to shape this next chapter for the Splunk platform should email python27-eol@splunk.com.

Splunk 플랫폼에 대한이 다음 장을 만들기 위해 우리와 함께 일하는 데 관심이있는 사람은 python27-eol@splunk.com으로 전자 메일을 보내야합니다.