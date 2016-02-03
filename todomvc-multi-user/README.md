# todomvc-multiuser

Multiuser TodoMVC example using React, Relay and [Reindex](https://www.reindex.io).

You need to setup authentication providers for login to work. See 
[guide](https://www.reindex.io/docs/tutorial/authenticating-users/) and
[docs](https://www.reindex.io/docs/security/authentication/).

To run examples:

```
export REINDEX_URL="https://YOUR-REINDEX-APP.myreindex.com"
export REINDEX_TOKEN="YOUR-REINDEX-TOKEN"
npm install
npm run schema-push
npm run schema-relay
npm start
```

## Demo

Deployed at [https://reindex-todomvc.surge.sh/](https://reindex-todomvc.surge.sh/)

