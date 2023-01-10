# eazypass-test

## Features

- :heavy_check_mark: User should be able to insert a new type of ticket customer
- :heavy_check_mark: User should be able to see type of ticket customer
- :heavy_check_mark: User should be able to upload and preview the data before upload
- :heavy_check_mark: User should be able to see a list of ticket customer
- :heavy_check_mark: User should be able to see a list of ticket customer
      Package event or Date

## CSV Template
Ticket Id,Package Event,Name  
123456001,Day 1,Siska  
123456002,Day 2,Joshua  
123456003,2 Day Pass,Brian  

**Note: No spaces after each comma (,)**

## Installations

1. Clone the Repo 
```git
https://github.com/rdhhauzan/eazypass-test.git
```

2. Install Requirement for Backend
```npm
npm install
```

3. Move to Frontend Folder
```cmd
cd frontend/
```

4. Install Requirement for Frontend
```npm
npm install
```

## How to run

1. Run Backend Server (Outside Frontend Folder)
```npm
npx nodemon app.js
```

2. In new terminal, Run Json Server (Outside Frontend Folder)
```npm
npx json-server --w db.json --port 15674
```

3. In new terminal, Run Frontend (Inside Frontend Folder)
```cmd
cd frontend/
```
```npm
npm start
```

## Notes
1. If you run the app, make sure you have 3 terminals open because you are running 3 servers at the same time  
2. Make sure you run the backend server on port 3001, Json Server on port 15674, and Frontend on port 3006  
3. Make sure your CSV file uses the exact same format as given above
