# todomvc-single-user

Single-user TodoMVC example using React, Relay and [Reindex](https://www.reindex.io).

To run examples:

Add your REINDEX_URL to `./src/config.js`.

```
export default {
  REINDEX_URL: 'YOUR-REINDEX-URL',
};
```

```
npm install
npm install -g reindex-cli
reindex login
reindex schema-push
reindex schema-relay ./data/schema.json
npm start
```
