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
