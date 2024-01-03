import { useState, useEffect } from "react";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const toggleVisibility = () => {
    if (window.pageYOffset > 400) {
      setIsVisible(true);
      return;
    }

    setIsVisible(false);
  };

  const handleScrollToTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`h-[60px] w-[60px] font-bold text-center leading-[3.3] m-[50px] rounded-[50%] bg-[#00a9aa] text-white fixed right-0 bottom-0 cursor-pointer transition ease-in-out duration-300 scroll-top ${
        isVisible ? "opacity-100" : "opacity-0"
      } max-[560px]:h-[50px] max-[560px]:w-[50px] max-[560px]:m-2 max-[560px]:leading-[2.9]`}
      onClick={handleScrollToTopClick}
    >
      /\
    </div>
  );
};
