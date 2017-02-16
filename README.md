#Repo for social HU code

#Project Setup

```
npm install
```

```
npm start
```

Now go to http://localhost:3000 in your Web Browser

## Running Test cases

```
npm run test
```

## Getting production build and deploying on S3

```
npm run build
```

This will create bundled files in a folder called build. Now to deploy your code, run the following command

```
cd build
aws s3 sync . s3:://<your-bucket-name>
```
