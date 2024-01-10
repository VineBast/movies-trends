# movie trends
> Vincent RODRIGUEZ
## Lancer movie-trends avec docker-compose

En premier lieu (très important), **mettre à jour Docker.**

Puis pull le projet et lancer `docker-compose` :

```bash
git clone git@github.com:VineBast/movies-trends.git

cd movie-trends

docker-compose up
```

Lorsque que le docker compose est terminé aller sur : [http://localhost:3000](http://localhost:3000)

Deux autres pages sont disponibles : [http://localhost:3000/movies](http://localhost:3000/movies) et : [http://localhost:3000/about](http://localhost:3000/about)

> Pour info : le home `/` utilise le scrapper Puppeteer, le `/movies` interroge la base de données mysql avec l'ORM Prisma et le `/about` est statique.

Si l'une des pages n'est pas fonctionnelle, ne pas hésiter à supprimer les conteneurs et les images et relancer `docker-compose up`, un problème peut vite se glisser au téléchargement.

Les images ont été testées sur plusieurs environnements (Mac M1, Fedora, Windows 11), elle devrait être fonctionnelle, mais si jamais le problème persiste, passez à l'étape suivante avec le lancement en local (ou reverifier que Docker est bien à jour !).

## Lancer le projet en local

Premièrement, allez à la racine du projet et modifier le `.env`

```bash
# remplacer :
DATABASE_URL="mysql://movietrends:Movietrends2198!@movies-trends-db-1:3306/movietrends"

# par :
DATABASE_URL="mysql://movietrends:Movietrends2198!@localhost:3306/movietrends"
```
Lancer `mysql` (l'installer si besoin) et executer le script suivant (qui est aussi disponible à la racine du projet : `init.sql`) :
```sql
CREATE DATABASE `movietrends`;

USE `movietrends`;

CREATE TABLE movies (
    movieId INT AUTO_INCREMENT PRIMARY KEY,
    movieName VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    tmdbId INT NOT NULL,
    likesCount INT NOT NULL,
    watchesCount INT NOT NULL
);

CREATE TABLE dates (
    dateId INT AUTO_INCREMENT PRIMARY KEY,
    date VARCHAR(255)
);

CREATE TABLE movie_dates (
    movieId INT,
    dateId INT,
    FOREIGN KEY (movieId) REFERENCES movies(movieId) ON DELETE CASCADE,
    FOREIGN KEY (dateId) REFERENCES dates(dateId) ON DELETE CASCADE,
    PRIMARY KEY (movieId, dateId)
);

INSERT INTO `dates` VALUES (65,'2024-01-05');
INSERT INTO `movies` VALUES (31,'You Can\'t Stay Here','https://image.tmdb.org/t/p/original/qgJKbZ0v3WfY029II0Bk3lQLfBv.jpg',994629,16,62),(32,'Artie Shaw: Time Is All You\'ve Got','https://image.tmdb.org/t/p/original/wF1dlABQvRxU34y7B0DENzweOvC.jpg',114521,20,117),(33,'The Bricklayer','https://image.tmdb.org/t/p/original/36pYugctLa70NmwMEgXTR1G31Kq.jpg',927107,60,550),(34,'He Went That Way','https://image.tmdb.org/t/p/original/lMiBS03cEg6kMCdZ0p28oyx8d6i.jpg',836972,27,278),(35,'Mayhem!','https://image.tmdb.org/t/p/original/tCxdbYDOh8zhHfpkCeHbICBQTdG.jpg',959092,26,131);
INSERT INTO `movie_dates` VALUES (31,65),(32,65),(33,65),(34,65),(35,65);

```

Une fois ceci fait, lancer les commandes :

```bash
yarn
# ou :
npm install

#puis :
npx prisma generate
```
Le projet peut maintenant être lancé avec :
```bash
yarn dev
```
Si jamais des soucis persistent (mais il n'y pas de raison), n'hésitez pas à me contacter je pourrais essayer de fournir un environnement déployé.
