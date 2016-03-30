# todomvc-multiuser

Multiuser TodoMVC example using React, Relay and [Reindex](https://www.reindex.io).

You need to setup authentication providers for login to work. See
[guide](https://www.reindex.io/docs/tutorial/authenticating-users/) and
[docs](https://www.reindex.io/docs/security/authentication/).

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

## Demo

Deployed at [https://reindex-todomvc.surge.sh/](https://reindex-todomvc.surge.sh/)
