Gebruik:

In development mode met hot reloading:

`docker run -it --rm -p 8080:8080 -v $PWD/src:/src -w /src node:8 bash -c "npm install gulp-cli -g && npm install --no-bin-links && npm install nodemon -g && npm run dev"`

** FOR WINDOWS USERS
ip-adres van container vinden, die gebruiken als vervanging van localhost.
OF
In kitematic van Docker de draaiende container selecteren en in web-preview window het vergroot-icon klikken.

*** Virtualbox config for localhost discoverability
Go to VirtualBox -> Your BOX -> Settings -> Network ->
Choose NAT
Open Advanced
Click Port Forwarding
Add new rule to map whatever port you need from host to guest - In our case Host port 8080 to guest port 8080
Click OK, OK
Then stop, start the BOX

Standaard poort 8080

localhost:8080/login.html