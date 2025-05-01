First we will design the components.
We will begin with prisma database and use postgres sql for Database

To establish prisma use 
> npm install prisma --save-dev
> npx prisma
>npx prisma init

Now we have established a connection with postgressql using Prisma

lets create database for our work in prisma

after creating connection string in docker and editing the env file lets create the migration using the command-
>npx prisma migrate dev --name init

to see the table and interface 
>npx prisma studio

now we will add data in out database using seed.ts
for that add dependecies in package.json
>npm install -D typescript ts-node @types/node

for prisma client
>npm install @prisma/client 
this will generate the prisma client

after all this write the code for seed.ts and then run the command
>npx prisma db seed

for updating the data
1.Modify schema.prisma
2️.Run npx prisma migrate dev --name <migration-name>
3️.Run npx prisma generate
4️Update seed.ts and run npx prisma db seed
5. Manually update existing data using Prisma Studio or updateMany()
6️.Use the new column in your queries

to reset
>npx prisma migrate reset


now we will be using the api to implement the register and login functionality
we will be setting up clerk and then create a api inside the api folder for that
now we will be using ReactQuery to implement the api in the frontend of the login application


  <!-- Run the following to update                            │
│    npm i --save-dev prisma@latest                       │
│    npm i @prisma/client@latest  -->