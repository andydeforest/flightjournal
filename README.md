# ![AvMarket](public/images/logo-teal.png)

FlightJournal is a highly-customizable digital pilot logbook currently under development. It is built on top of the Laravel PHP framework, Postgresql, ReactJS, and Semantic UI.

## Images
![UI](https://i.imgur.com/Eqx5W3v.png)

![UI 2](https://i.imgur.com/O9ZdXZr.png)

## Getting started

### Install the web application

This project is built on top of the Laravel PHP framework. It's requirements can be found [here](https://laravel.com/docs/5.7/installation#server-requirements).

``` bash
git clone https://github.com/andydeforest/flightjournal.git && cd flightjournal
composer install
```

Once the composer dependencies are installed, you'll want to install the front-end dependencies

``` bash
npm install && npm run dev
```

Next, you need to make a copy of the `.env.example` file and rename it to `.env` inside your project root and update the appropriate database variables.

Run the following command to seed airport data

```
php artisan migrate:refresh --seed
```

Then start your server:

```
php artisan serve
```

The project should now be running!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details