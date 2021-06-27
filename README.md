# LouvreOnline Backend

## Setup for Local Testing

1. Create a `.env` file in the backend folder
2. Create a MongoCluster online and get the connection string
3. Add `MONGO_URI` variable to the `.env` and paste the connection string
4. Add `PORT` variable and choose a port for the app to listen on, if not specified it will run on port 4000
5. Add `SECRET` variable and choose a secret string for the authentication module
6. Use a terminal to run the the command `npm i`
6. When the previous command is done run the the command `npm run start`

Now the backend is running on the specified port

#### Dockerized Backend
To run a dockerized image of the backend run `sudo docker-compose up` in the backend folder

# Endpoints

- /login
    - POST `//=> user login`
        - user_name
        - password

- /user
    - POST `//=> user singup`
        - user_name
        - password
        -user_role ("ADMIN" or "GUEST" only) 
        -phone_number

- /users?page=`INTEGER`&size=`INTEGER`
    - GET `//=> get guests (admins only)`

- /art?page=`INTEGER`&size=`INTEGER`
    - GET `//=> get arts (logged in users only)`

- /art
    - POST `//=> create art instance (admins only)`
        -name
        -artist
        -description
        -picture (image URL)
        
- /art
    - PUT `//=> update art instance (admins only)`
        -name
        -artist
        -description
        -picture (image URL)
        
- /art?id=`INTEGER`
    - DELETE `//=> delete art instance (admins only)`
       
