import emptyImg from "../../assets/imgs/empty.svg";
function NotFound() {
  return (
    <div className="w-full h-[70vh] flex justify-center items-center">
      <div className="flex flex-col gap-3  items-center">
        <img src={emptyImg} />
        <h1 className="text-lg"> Ooh! this page is not found </h1>
      </div>
    </div>
  );
}

export default NotFound;
