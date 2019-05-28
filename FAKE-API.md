# Faking the API to develop locally

Based on article:

https://www.techiediaries.com/fake-api-jwt-json-server/


1. Install Dev Dependencies:

    ```
    npm i -D json-server jsonwebtoken
    // check if body-parser  is needed, it might be included with node
    ```

2. Create your `mocks/bd.json` and `mocks/users.json`.
    * `db.json` has all the collections and resources of the fake api, basically all the data
    * `users.json` has all the fake user data used to mock the authentication

3. Start your fake server using: Saleskaan github path to `mocks/server.json`

4. Add your scripts to the package.json:

    ```
    [...]
    "scripts": {
        [...] 
        "start": "npm run serve & npm run mock-server",
        "serve": "ng serve --proxy-config proxy.conf.json",
        "mock-server": "node mocks/server.js",
        [...]
    },
    [...]
    ```


        
