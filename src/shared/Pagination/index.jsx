

 const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  return (
    <div className="flex flex-wrap justify-center w-[80vw] my-[30px] mb-0 mx-auto">
      {Array.from({ length: pages }).map((_, index) => (
        <div
          key={index}
          className={`${
            currentPage === index ? "active-pagination" : ""
          } list-none h-[25px] w-[30px] m-[5px] rounded-[5px] text-center cursor-pointer ease-in duration-150  hover:border-[#00a9aa] hover:text-white hover:bg-[#00a9aa] hover:scale-[1.01]`}
          onClick={() => setCurrentPage(index)}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};
export default Pagination