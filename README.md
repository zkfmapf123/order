# Order

# Folder

- api-gateway
- auth
- notification
- model
- common
- repository

- users
- owner
- order

# File 적용

- 파일 등록

```
    npm run cli
    > Create_Repo
    > Write Create Folder
```

- tsconfig.json

```
      "paths": {
      "app/api-gateway": ["api-gateway/src"],
      "app/api-gateway/*": ["api-gateway/src/*"],
      "base/model": ["model/src"],
      "base/model/*": ["model/src/*"],
      "base/common": ["common/src"],
      "base/common/*": ["common/src/*"],
      "base/core": ["core/src"],
      "base/core/*": ["core/src/*"]
      // ...추가
```

- babel.config.js

```
     alias: {
          '^#(.+)': './src/\\1',
          'app/api-gateway': '../dist/api-gateway/src',
          'base/model': '../dist/model/src',
          'base/common': '../dist/common/src',
          'base/core': '../dist/core/src',
          // ... 추가
```

- package.json

```
    "build-api-gateway": "babel api-gateway --out-dir dist/api-gateway --extensions \".ts\" --source-maps inline",
    "build-model": "babel model --out-dir dist/model --extensions \".ts\" --source-maps inline",
    "build-common": "babel common --out-dir dist/common --extensions \".ts\" --source-maps inline",
    "build-core": "babel core --out-dir dist/core --extensions \".ts\" --source-maps inline",
    // ... 추가
    "build": "rm -rf dist && npm run build-api-gateway && npm run build-model && npm run bui

```
