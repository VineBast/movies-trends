import { PrismaClient } from "@prisma/client"
import styles from '../page.module.css'
import CentralImage from "../components/CentralImage";

const prisma = new PrismaClient()

export default async function handle(req: any, res: any) {
    const movies = await prisma.movies.findMany({
        include: {
            movie_dates: {
                select: {
                    dates: true,
                },
            },
        },
    });

    return (
        <>
            <div className={styles.main}>
                <CentralImage />
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Movies</th>
                                <th>Release Dates</th>
                                <th>Views</th>
                                <th>Total Likes</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row */}
                            {movies.map((movie) => (
                                <tr>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={movie.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{movie.movieName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-ghost badge-sm">{movies[0].movie_dates[0].dates.date}</span>
                                    </td>
                                    <td>{movie.watchesCount}</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">{movie.likesCount}</button>
                                    </th>
                                </tr>
                            ))}

                        </tbody>
                        {/* foot */}
                        <tfoot>
                            <tr>
                                <th>Movies</th>
                                <th>Release Dates</th>
                                <th>Views</th>
                                <th>Total Likes</th>
                                <th></th>
                            </tr>
                        </tfoot>

                    </table>
                </div></div>
        </>
    )

}