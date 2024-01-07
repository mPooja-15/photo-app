import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import PagesBackButton from "../../shared/PagesBackButton";
import Loading from "../../shared/Loading";
import Title from "../../shared/Title";


export const Photo = () => {
  const [photo, setPhoto] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { photoID } = useParams();

  useEffect(() => {
    const getPhotoUrl = async () => {
      if (photoID) {
        setIsLoading(true);
        const photo = await api.getPhoto(photoID);

        if (photo) {
          setPhoto(photo);
          setIsLoading(false);
        }
      }
    };

    getPhotoUrl();
  }, [photoID]);

  return (
    <div className=" container max-[991px]:min-w-full px-4 relative  mx-auto  max-[1100px]:mx-auto pt-10">
      <PagesBackButton classNameCustome="max-[1100px]:top-[-47px] max-[1100px]:py-1.5  max-[1100px]:px-2.5" />
      <div className=" flex items-center max-[576px]:flex-col-reverse ">
        {photo && <Title title={photo.title} />}
      </div>
      {isLoading && <Loading />}

      {photo && (
        <>
          <img
            src={photo.url}
            alt={"photo_600x600"}
            className="block mx-auto mb-0 mt-10 p-[30px] border-2 rounded-md border-solid border-black ease-in duration-200 hover:border-[#00a9aa] max-[900px]:p-5 max-[900px]:max-w-full"
          />
        </>
      )}
    </div>
  );
};
