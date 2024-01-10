import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function submitData(movieData: any, dateString: string) {
  try {
    let existingDate;
    
    try {
      existingDate = await prisma.dates.findFirst({
        where: {
          date: dateString,
        },
      });
    } catch (error) {
      console.error('Erreur :', error);
    }

    if (!existingDate) {
      existingDate = await prisma.dates.create({
        data: {
          date: dateString,
        },
      })
    }

    let existingMovie;

    try {
      existingMovie = await prisma.movies.findFirst({
        where: {
          movieName: movieData.movieName,
        },
      });
    } catch (error) {
      console.error('Erreur :', error);
    }

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
    console.error('Erreur :', error);
    return { success: false, error };
  } finally {
    await prisma.$disconnect();
  }
}
