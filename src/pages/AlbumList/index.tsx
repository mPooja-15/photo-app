import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "services/api";
import Album from "types/AlbumType";

import { Loading } from "shared/Loading";
import { Pagination } from "shared/Pagination";

export const AlbumList = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const albumsPerPage = 8;
  const pages = Math.ceil(albums.length / albumsPerPage);
  const startIndex = currentPage * albumsPerPage;
  const endIndex = startIndex + albumsPerPage;
  const currentAlbums = albums.slice(startIndex, endIndex);

  useEffect(() => {
    const getAlbumList = async () => {
      try {
        setIsLoading(true);
        const albumList = await api.getAlbums();

        if (albumList) {
          setAlbums(albumList);
          setIsLoading(false);
        }
      } catch (error) {
        alert(error);
      }
    };

    getAlbumList();
  }, []);

  return (
    <div className="container mx-auto max-[576px]:w-full max-[576px]:px-4 pt-10 px-4">
      {isLoading && <Loading />}

      <div className="grid grid-cols-3 gap-[30px] max-[768px]:grid-cols-2 max-[425px]:grid-cols-1">
        {currentAlbums.map(({ id, title }) => {
          return (
            <Link key={id} to={`/albums/${id}`} className="text-inherit">
              <div
                key={id}
                className="hover:bg-[#00a9aa] hover:ring-[#00a9aa] h-full hover:shadow-md group rounded-md p-5 hover:text-white duration-200 bg-white ring-2 ring-[#00a9aa] shadow-sm"
              >
                <div className=" font-semibold capitalize max-[576px]:text-center">
                  {title}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
