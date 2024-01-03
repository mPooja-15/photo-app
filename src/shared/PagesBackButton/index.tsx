import { Link, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "./home.svg";
import NextIcon from "./next-icon.svg";

export const PagesBackButton = ({ classNameCustome }: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathRoute = location?.pathname.split("/")[1];
  const routId = location?.pathname.split("/")[2];

  return (
    <>
      <div className={`${classNameCustome}`}>
        <div className="flex items-center gap-2">
          <Link to={"/"}>
            <img src={HomeIcon} className="w-5 h-5" alt="" />
          </Link>
          {pathRoute === "photos" && (
            <>
              <img src={NextIcon} className="w-2 h-auto" alt="" />
              <p className="text-[14px]" onClick={() => navigate(-1)}>
                Albums
              </p>
            </>
          )}
          <img src={NextIcon} className="w-2 h-auto" alt="" />
          <p className="capitalize text-[14px] " onClick={() => navigate(-1)}>
            {pathRoute}
          </p>
          <img src={NextIcon} className="w-2 h-auto" alt="" />

          <p className="text-[14px] font-medium">{routId}</p>
        </div>
      </div>
    </>
  );
};
