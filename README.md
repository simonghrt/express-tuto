### Installation

```
npm install
```

### Usage

```
node server.js
```

### Curl GET request example :

```
curl -v -H "Accept:application/json" http://localhost:8000/api/users | python -m json.tool
```

### Curl POST request example :

```
curl -i -X POST -H "Content-Type:application/json" http://localhost:8000/api/users -d '{"id": "3", "name": "William Shakespeare", "age": "22"}'
```
