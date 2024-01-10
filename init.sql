CREATE DATABASE /*!32312 IF NOT EXISTS*/ `movietrends` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

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
