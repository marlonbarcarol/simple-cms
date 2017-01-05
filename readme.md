## Simple CMS
Simples CMS is basically an API using Laravel and AngularJS for front end.

### Installing back-end(API)
Access "api" folder and run the following commands:

~~~
composer install --dev
~~~

Import the database structure using a file called "cms-database.sql" on your database and configure the database name and credentials in ".env" file.

### Installing Front End
Access "cms" folder and run the following commands:

~~~
npm install
bower install
grunt lib // to concat and minify library files
grunt custom // to concat and minify library files
grunt //Init as watcher(only watch the custom files, same files as grunt custom)
~~~

### Access	
API:
The url probably will be something like "localhost/api".

CMS:
The url probably will be something like "localhost/cms".
Username: test
Password: test123


### Laravel Requirements
	- PHP >= 5.4, PHP < 7.
	- Mcrypt PHP Extension.
	- OpenSSL PHP Extension.
	- Mbstring PHP Extension.
	- Tokenizer PHP Extension.

- Advise to create a Virtual Host.
