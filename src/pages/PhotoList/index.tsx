import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "services/api";

import { ScrollToTop } from "shared/ScrollToTop";
import { PagesBackButton } from "shared/PagesBackButton";
import { Loading } from "shared/Loading";
import { Title } from "shared/Title";

import Photo from "types/PhotoType";
import UserType from "types/UserTypes";

export const PhotoList = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [albumTitle, setAlbumTitle] = useState("");
  const [userData, setUserData] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { albumID } = useParams();

  useEffect(() => {
    if (albumID) {
      try {
        const getPhotoList = async () => {
          if (albumID) {
            setIsLoading(true);
            const title = await api.getAlbumTitle(albumID);
            const photoList = await api.getPhotos(albumID);

            if (photoList) {
              setAlbumTitle(title);
              setPhotos(photoList);
              setIsLoading(false);
            }
          }
        };

        getPhotoList();
      } catch (err) {}
    }
  }, [albumID]);

  useEffect(() => {
    if ((albumTitle as any)?.userId) {
      try {
        const getUserList = async () => {
          if ((albumTitle as any)?.userId) {
            setIsLoading(true);
            const userInfo = await api.getUser((albumTitle as any)?.userId);
            if (userInfo) {
              setUserData(userInfo);
              setIsLoading(false);
            }
          }
        };
        getUserList();
      } catch (err) {}
    }
  }, [(albumTitle as any)?.userId]);

  return (
    <div className="container mx-auto pt-10 px-4 max-[991px]:min-w-full">
      <PagesBackButton />
      <div className=" flex items-center max-[576px]:flex-col-reverse	">
        <Title title={(albumTitle as any)?.title} />
      </div>
      <div className=" relative  pt-30 w-80vw flex flex-wrap justify-center items-center gap-[30px] my-10  max-[576px]:gap-8 max-[425px]:gap-4 max-[1024px]:gap-5">
        {isLoading && <Loading />}
        {userData && (
          <div className="w-80 h-80 max-[1440px]:w-[282px] max-[1440px]:h-[282px]  bg-[#00a9aa] rounded-md border-2 border-solid border-black p-5 max-[768px]:w-full">
            <div className="">
              <h2 className="text-[24px] text-white border-b border-white font-semibold pb-2 mb-6">
                Author Details
              </h2>
              <div className="">
                <h3 className="font-semibold text-white text-[18px]">Info:</h3>
                <ul className="text-white text-[16px]">
                  <li className="pb-1">
                    Name: <em>{(userData as any)?.name}</em>
                  </li>
                  <li className="pb-1">
                    Email: <em>{(userData as any)?.email}</em>
                  </li>
                  <li className="pb-1">
                    Phone: <em>{(userData as any)?.phone}</em>
                  </li>
                  <li className="pb-1">
                    Website: <em>{(userData as any)?.website}</em>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {photos.map((photo) => {
          return (
            <Link
              key={photo.id}
              to={`/photos/${photo.id}`}
              className="max-[375px]:w-full"
            >
              <div className=" 2xl:p-20 border-2 rounded-md border-black transition-transform transition-border-color duration-150 ease-linear hover:transform-hover hover:border-[#00a9aa] max-[991px]:p-16 lg:p-16 max-[768px]:p-24 max-[576px]:m-0 max-[576px]:p-12 max-[425px]:p-4 ">
                <img
                  src={photo.thumbnailUrl}
                  alt="thumbnail_150x150"
                  className="h-full w-full flex justify-center items-center"
                />
              </div>
            </Link>
          );
        })}

        <ScrollToTop />
      </div>
    </div>
  );
};
