# Simple Implementation of a Dashboard for a small Clinic

Built on the MERN (MongoDB/Express/React/Node.js) 
### Features (Currently still under development)
- [x] Authentication/Authorization
- [x] Patient Information
- [ ] Clinic Revenue Info
- [ ] More to come

### Requirements
```
Node.js
MongoDB
[Optional] Docker
```
### Usuage

Using Docker
1. Run `docker-compose up` to build the container 
   - use the `-d` args to run in the background
   - Rebuild the container using `docker-compose build`
2. Access the website at [http://localhost:3000]("http://localhost:3000")

Manually
1. MongoDB
    - Check MongoDB status by running `mongo`
    - [More Information about Installation]("https://docs.mongodb.com/guides/server/install/")
2. Back-end (Express)
   - `cd backend`
   - Edit the `.env` file using the `template.env`
   - `npm run start`
   - Test API Connection by GET Request to `http://localhost:4000`
3. Front-end (React)
    - `cd frontend`
    - `npm run start`
    - Access the website from [http://localhost:3000]("http://localhost:3000")
