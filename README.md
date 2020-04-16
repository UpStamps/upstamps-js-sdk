# JS Vanilla Integration

Integration with JavaScript Vanilla helps and facilitates the process of testing and developing features in production and other environments. The vanilla version can be integrated into any environment that uses JavaScript, you can use this integration in projects like Vue, Svelte or other JavaScript frameworks.

Start by installing the library following the instructions below.

Quick links

- [About](https://upstamps.com/)
- [Dashboard](https://app.upstamps.com/)
- [Documentation](https://docs.upstamps.com/)

## Installation

First, let's install some packages!

```bash
npm install --save upstamps-js
```

or with yarn

```bash
yarn add upstamps-js
```

or with Script Tag

```bash
<script type="module" src="https://unpkg.com/upstamps-js"></script>
```

## Create a new instance

This params values can be found on the [UpStamps Dashboard in your project's settings](https://app.upstamps.com)

```js
import UpStamps from "upstamps-js";

let UpStampsInstance = new UpStamps({
  clientId: "xxxx-xxxx-xxx",
  projectKey: "xxxx-xxxx-xxx",
  envKey: "xxxx-xxxx-xxx"
});
```

That's it! Now your app is ready to start using feature flags and other features. Follow the instructions of the supported methods to make the most of the UpStamps functionalities.

## Usage

```js
import UpStamps from "upstamps-js";

let UpStampsInstance = new UpStamps({
  clientId: "xxxx-xxxx-xxx",
  projectKey: "xxxx-xxxx-xxx",
  envKey: "xxxx-xxxx-xxx"
});

//async/await
const MyFeature = async () => {
  try {
    const flag = await UpStampsInstance.flag("my_flag");
    //flag.show true | false
    //  ...code
  } catch (e) {
    throw e;
  }
};

//Promises
const AnotherFeature = async () => {
  UpStampsInstance.flag("my_flag")
    .then(flag => {
      //flag.show
      //...code
    })
    .catch(e => throw e);
};
```

## Scopes

---

To start using Segments or other features depending on the user's behavior, it is necessary to configure the scope. Invoke the scope method to add relevant user information.

The scope method has two parameters, name and email. The email must be unique per user.

```js
UpStampsInstance.scopes({ name: "Username", email: "user@email.com" });

/*
Success Result: { error: false, success: true, message: "Scope created", }
Error Result: { error: true, message: "Uniqueness violation. duplicate email value violates unique constraint" }
*/
```

## Flags

---

Feature flags are an excellent and new way to test features in production. Take advantage of different environments to hide or show your features. This can be used to facilitate the development process on project features that are not yet ready to be presented in production or even disable in real-time if any of the features in production are malfunctioning

```js
UpStampsInstance.flag("my_flag");

/*
Result: {show: true | false}
*/
```

## Remote Flags

---

Remote Flags have the same normal characteristics as a Flag but they can have a data payload. This data payload allows you to provide real-time properties to your project's features. If, for example, some of the features of a project need to change color, size or even other data in different environments, then the payload of data from a Remote Flag is the most suitable.

```js
UpStampsInstance.remote("my_remote_flag");

/*
Result: {show: true | false, data: Payload}
*/
```

## A/B Testing

---

It is sometimes difficult to understand whether a particular feature is having an impact on the project. To determine if a feature is being used properly, we can do A / B tests. This allows you to understand and compare the impact of functionality in different formats.

When using UpStamps' A / B Tests it is possible to see if the user clicked on a certain feature. The features placed in the A / B Tests will be randomly shown to users. Use the Emitter to send the values to the UpStamps [Dashboard](https://app.upstamps.com).

The `emitter` is a function that understands which version of the test is shown on the user's screen. This function can be used in different events or contexts, for example: click, hover, etc.

```js
UpStampsInstance.test("my_ab_test");

/*
Result: {show: true | false, variant: A | B, emitter: Function}
*/
```

## Segments

---

Users can be from different countries or even be using different platforms. Use Segments to isolate certain features by a country, browser or even the type of device. With Segments, it is possible to display features, for example, only on mobile browsers or even users who are using only Google Chrome.

Notice: To use Segments it is necessary to integrate Scopes. See the Scope method instructions above to be able to register users.

```js
UpStampsInstance.segment("my_segment", {
  country: "Portugal",
  client: "Microsoft Edge",
  clientType: "mobile"
});

/*
Result: {show: true | false}
*/
```