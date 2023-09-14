### <a name="about">About</a>

A simple REST API capable of CRUD operations on a "PERSON" resource

`src` -> Inside the src folder all the actual source code regarding the project will reside, this will not include any kind of tests. (You might want to make separate tests folder)

Lets take a look inside the `src` folder

- `config` -> In this folder anything and everything regarding any configurations or setup of a library or module will be done. For example: setting up `dotenv` so that we can use the environment variables anywhere in a cleaner fashion, this is done in the `server-config.js`. One more example can be to setup you logging library that can help you to prepare meaningful logs, so configuration for this library should also be done here.

- `routes` -> In the routes folder, we register a route and the corresponding middleware and controllers to it.

- `controllers` -> they are kind of the last middlewares as post them you call you business layer to execute the budiness logic. In controllers we just receive the incoming requests and data and then pass it to the business layer, and once business layer returns an output, we structure the API response in controllers and send the output.


- `utils` -> this contains validation, etc.

### Prerequisites

Before you begin, ensure you have the following:

- [Node.js](https://nodejs.org/) installed on your machine.
- A database system (Mysql) Mysql Workbench .

### Setup the project

1. Clone this repository:

   ```bash
   git clone https://github.com/adefoluso/stage2-Task.git
   ```

- Go inside the folder path and execute the following command:

  ```
  npm install
  ```

- In the root directory create a `.env` file and add the following env variables

    ```
        PORT=<port number of your choice>
    ```

    ex:

    ```
        PORT=3000
    ```

- go inside the `src` folder and execute the following command:

    ```
      npx sequelize init
    ```

- By executing the above command you will get migrations and seeders folder along with a config.json inside the config folder.
- If you're setting up your development environment, then write the username of your db, password of your db and in dialect mention whatever db you are using for ex: mysql, mariadb etc
- If you're setting up test or prod environment, make sure you also replace the host with the hosted db url.

Below is an example of how your `config.json` file should be structured for development mode only.

## Configuration File Example (`config.json`)

```json
{
  "development": {
    "username": "<YOUR_DB_USERNAME OR DEFAULT root>",
    "password": "<YOUR_DB_PASSWORD>",
    "database": "<YOUR PREFERRED DB NAME FOR THE PROJECT",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```

- To run the server execute

 ```
 npm start
 ```

##### UML DIAGRAM FOR PROJECT
The UML diagram can be found [here] <https://github.com/adefoluso/stage2-Task/blob/main/src/UML-IMAGE/UML_screenshot.png>
