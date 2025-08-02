import style from "./adminPages.module.css";

function PageHeader({Buttons, Clicked, HandleClicked}){
return(
    <div className={`controlButtons justify-center grid grid-cols-2 md:grid-cols-${Buttons.length} gap-5 mb-4 `}>
          {Buttons.map((btn, idx) => (
            <button
              key={idx}
              className={`px-3 py-2  text-md md:text-lg font-semibold rounded-full transition ${
                Clicked === idx ? style.btnn : style.btn
              }`}
              onClick={() => HandleClicked(idx)}
            >
              {btn}
            </button>
          ))}
        </div>
);
}
export default PageHeader;