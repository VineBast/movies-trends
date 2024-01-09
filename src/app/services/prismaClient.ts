// Importer le client Prisma généré
import { PrismaClient } from '@prisma/client';

// Instancier le client Prisma
const prisma = new PrismaClient();

export default async function submitData(movieData: any, dateString: string) {
  try {


    let existingDate = await prisma.dates.findFirst({
      where: {
        date: dateString,
      },
    });

    if (!existingDate) {
      existingDate = await prisma.dates.create({
        data: {
          date: dateString,
        },
      })
    }

    let existingMovie = await prisma.movies.findFirst({
      where: {
        movieName: movieData.movieName,
      },
    });

    if (!existingMovie) {
      existingMovie = await prisma.movies.create({
        data: {
          ...movieData,
          movie_dates: {
            create: {
              dates: {
                connect: {
                  dateId: existingDate.dateId,
                },
              },
            },
          },
          watchesCount: movieData.watchesCount ? movieData.watchesCount : 0
        },
      });
    } else {
      existingMovie = await prisma.movies.update({
        where: {
          movieId: existingMovie.movieId,
        },
        data:
        {
          watchesCount: movieData.watchesCount
        }
      });

    }

    return { success: true };
  } catch (error) {
    console.error('Erreur lors de la soumission des données :', error);
    return { success: false, error };
  } finally {
    // Fermer la connexion Prisma
    await prisma.$disconnect();
  }
}
