# 주문관리 시스템

## 그냥 MicroService 연습 겸

## Tech

- Express
- fxts
- prisma + sql Query
- joi

## Implemnetation

- [x] 인증
- [ ] 사장님
- [ ] 고객
- [ ] 배달 기사님
- [ ] 주문 관리
- [ ] 배달 관리

## File Register

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
