// import {
//   useContext,
//   createContext,
//   Children,
//   useState,
//   useEffect,
// } from "react";

// const CountriesContext = createContext();
// export const useCountries = () => useContext(CountriesContext);

// export const CountriesProvider = ({ Children }) => {
//   const [countries, setCountries] = useState([]);

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await fetch("https://raw.githubusercontent.com/stefangabos/world_countries/master/data/en/countries.json");
//         if (response.ok) {
//           const data = response.json();
//           setCountries(data);
//         } else {
//           console.log("response is not ok");
//         }
//       } catch (e) {
//         console.log("error in fetching data");
//       }
//     };
//     fetchCountries();
//   }, []);
//   return (
//     <CountriesContext.Provider value={countries}>
//       {Children}
//     </CountriesContext.Provider>
//   );
// };
