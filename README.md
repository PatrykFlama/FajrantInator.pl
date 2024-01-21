# FajrantInator.pl
### Table of contents
- [FajrantInator.pl](#fajrantinatorpl)
    - [Table of contents](#table-of-contents)
    - [Installation and running](#installation-and-running)
    - [Docker](#docker)

### Installation and running
Use `npm install` to install all dependencies.  
Create `src/.env` file:   
* `PORT` - port on which server will be running  
* `DB_HOST` - database host   
* `DB_USER` [optional] - database user
* `DB_PASS` [optional] - database password  
* `DB_PORT` - database port

Download **MongoDB** database  
Use `npm start` to run the server.  
Use `npm run dev` to run the server in development mode.

### Docker
Use `docker build . -t fajrantinator` to build the image.  
Create `compose.yaml` file:
```yaml
version: "3"

services:
  mongo:
    image: mongo
    container_name: finator-db
    restart: unless-stopped
    volumes:
      - ./data:/data/db
  fajrantinator:
    image: fajrantinator
    container_name: finator
    restart: unless-stopped
    ports:
      - 3000:3000
    volumes:
      - ./uploads:/app/src/database/uploads
```

Use `docker-compose up -d` to run the server.
