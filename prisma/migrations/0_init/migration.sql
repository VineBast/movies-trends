-- CreateTable
CREATE TABLE `dates` (
    `dateId` INTEGER NOT NULL AUTO_INCREMENT,
    `dateNumber` BIGINT NOT NULL,

    PRIMARY KEY (`dateId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movie_dates` (
    `movieId` INTEGER NOT NULL,
    `dateId` INTEGER NOT NULL,

    INDEX `dateId`(`dateId`),
    PRIMARY KEY (`movieId`, `dateId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movies` (
    `movieId` INTEGER NOT NULL AUTO_INCREMENT,
    `movieName` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `tmdbId` INTEGER NOT NULL,
    `likesCount` INTEGER NOT NULL,
    `watchesCount` INTEGER NOT NULL,

    PRIMARY KEY (`movieId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `movie_dates` ADD CONSTRAINT `movie_dates_ibfk_1` FOREIGN KEY (`movieId`) REFERENCES `movies`(`movieId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `movie_dates` ADD CONSTRAINT `movie_dates_ibfk_2` FOREIGN KEY (`dateId`) REFERENCES `dates`(`dateId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

