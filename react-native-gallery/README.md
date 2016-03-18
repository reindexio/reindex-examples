# Reindex :heart: React Native Example App

Instagram clone. A multi-user gallery app, with file uploads.

Currently only Android, iOS is coming soon.

Features:

* Relay and Reindex
* Authentication through Auth0
* File upload via Uploadcare
* Infinite scrolling

## Screenshots, yay!

![Login](http://i.imgur.com/47DvjEq.png?1)
![Picture](http://imgur.com/A2BQpe9.png)
![Stream](http://imgur.com/sjMmNbo.png)
![Sidebar](http://imgur.com/FiDlJaG.png)
![Grid](http://imgur.com/fw7YyKk.png)

## Running

* `npm install -g react-native reindex-cli`
* `npm install`
* Set up 3rd party service configuration in config.js (Reindex, Auth0, Uploadcare)
* Push Reindex schema

```
reindex schema-push
```

* Get Relay schema

```
reindex schema-relay scripts/RelaySchema.json
```

* Add Auth0 authentication provider to Reindex, eg with GraphiQL
(`reindex graphiql`)

```
mutation {
  createReindexAuthenticationProvider(input: {
    type: auth0,
    isEnabled: true,
    domain: "YOUR-AUTH0-DOMAIN.auth0.com",
    clientId: "YOUR-AUTH0-CLIENT-ID",
    clientSecret: "YOUR-AUTH0-SECRET",
  }) {
    id
  }
}
```

* Run and enjoy

```
react-native run-android
```
