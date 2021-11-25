# Dockerized Movie App 

## Instructions
1. Inside the server/ folder execute ``` npm install``` in a terminal.
2. Inside the client/ folder execute ``` yarn``` in a terminal.
3. In the main folder execute ```docker-compose up --build``` in a terminal.
4. Then you should make the migrations and execute the seeds, with the following commands:
 - ```docker exec -it movie_back node_modules/.bin/sequelize db:migrate```
 - ```docker exec -it movie_back node_modules/.bin/sequelize db:seed:all```

...and that's all! 👌 

