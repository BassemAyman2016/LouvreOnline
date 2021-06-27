# LouvreOnline Frontend

## Setup for Local Testing

1. Create a `.env` file in the frontend folder
2. Add `REACT_APP_API_URL` variable to the `.env` and add `http://localhost:`+`PORT`+`/` where `PORT` is the backend port number
3. Use a terminal to run the the command `npm i`
4. When the previous command is done run the the command `npm run start`

Now the frontend is running on the specified port

#### Dockerized Frontend
To run a dockerized image of the frontend run `sudo docker-compose up` in the frontend folder