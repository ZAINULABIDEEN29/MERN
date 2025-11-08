npm init -y
tsc --init 

package json
start : node dist/server.js
dev : nodemon src/server.ts
build : tsc --build
watch : tsc --watch

simply install the dependencies
npm i express mongoose dotenv

then write this command

npm i --save-dev typescript  ts-node nodemon @types/express @types/node @types/mongoose

