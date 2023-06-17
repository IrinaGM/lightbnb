# Lighthouse BnB

This project demonstrates database design and the usage of server-side JavaScript to display information from queries to a web page.

## Description

Lighthouse BnB is an app that allow homeowners to rent out their homes to people on vacation, creating an alternative to hotels and bed and breakfasts. Users can view property information, book reservations, view their reservations, and write reviews.
This project was developed as part of Lighthouse Labs Web Development course.

## Dependencies

- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [cookie-session](https://www.npmjs.com/package/cookie-session)
- [express](https://expressjs.com/)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [pg](https://www.npmjs.com/package/pg)

## Installing Lighthouse BnB

To install Lighthouse BnB, follow these steps:

1. On GitHub.com, navigate to the [IrinaGM/lightbnb](https://github.com/IrinaGM/lightbnb) repository.
2. In the top-right corner of the page, click **Fork** and **Create fork**
3. On GitHub.com, navigate to your fork of the lightbnb repository.
4. Above the list of files, click **Code**.
5. Copy the URL for the repository

- To clone the repository using HTTPS, under "HTTPS", click on the copy button.
- To clone the repository using an SSH key, including a certificate issued by your organization's SSH certificate authority, click SSH, then click on the copy button.
- To clone a repository using GitHub CLI, click GitHub CLI, then click on the copy button.

6. Open Terminal.
7. Change the current working directory to the location where you want the cloned directory.
8. Type **git clone**, and then paste the URL you copied earlier. It will look like this, with your GitHub username instead of YOUR-USERNAME:

```
$ git clone https://github.com/YOUR-USERNAME/lightbnb
```

9. Press Enter. Your local clone will be created.

## Database Setup Instructions

1. In the `psql` terminal create a database called `lightbnb` from:

```sql
CREATE DATABASE lightbnb;
```

2. Connect to the database:

```sql
\c lightbnb
```

3. Run the following commands in order to setup the database:
   3.1 Create tables of the database:

```sql
\i migrations/01_schema.sql
```

3.2 Verify tables were created by running the following command:

```sql
\dt
```

4 tables should have been created:

- `properties`
- `property_reviews`
- `reservetions`
- `users`

  3.3 Populate database data:

```sql
\i seeds/01_seeds.sql
```

```sql
\i seeds/02_seeds.sql
```

## Usage

1. Install dependencies:

```console
npm install
```

2. Start the application:

```console
npm run local
```

3. Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.

## License

[MIT License](https://choosealicense.com/licenses/mit/)

Copyright (c) 2023 IrinaGM
