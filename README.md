# Backend labs

#### Deployment link: https://backend-labs-a790.onrender.com

#### Postman workspace: https://www.postman.com/sxlwrl/workspace/backend-labs<br/><br/>

## Variant

<br/>7 mod 3 = 1 (Currencies)<br/><br/>

My number in the group list is 7



## How to install a project

<br/>To install a project you have to run the installation command in CLI<br/><br/>

```
npm install
```

## How to build a project

<br/>To build a project you have to run the build command in CLI<br/><br/>

```
npm run build
```

## How to run a project

<br/>First of all, you need to decide in which mode you want to run the project.<br/><br/>
If you want to run in ***developing mode*** then enter the following command:<br/><br/>

```
npm run dev
```

<br/>And if you want to run in ***production mode*** then enter the following command:<br/><br/>

```
npm run prod
```

<br/>*P.S. If you need to change any command, you can easily do so in package.json scripts*<br/><br/>

## How to migrate a DB

```
npm run migrate:create
npm run migrate
```

## How to dockerize a project

<br>To create a Docker image you have to enter the following command:<br/><br/>

```
docker build . -t <image name>:<tag>
```

<br>To run a Docker image you have to enter the following command:<br/><br/>

```
docker run --rm -it -p <port>:<port> --init <image name>:<tag>
```
