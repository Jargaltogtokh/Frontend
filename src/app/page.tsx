"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import RootLayout from "./layout";
import Add from "@/component/addbutton";
import EditButton from "@/component/EditButton";
import DeleteButton from "@/component/DeleteButton";

type Movie = {
  id: number;
  name: "string";
};

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  async function getMovies() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies`);
    const data = await res.json();
    setMovies(data);
  }
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <>
      <table className="table-fixed border border-slate-500 w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left"> Movies</th>
            <th className="px-4 py-2">
              {" "}
              <Add />{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => (
            <tr key={index}>
              <td> {movie.name} </td>
              <td className="flex px-4 py-2 gap-5">
                <EditButton movie={movie} />
                <DeleteButton movie={movie} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
