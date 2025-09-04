import investor from "/src/assets/imgs/investor.jpg";
import prog from "/src/assets/imgs/programming.jpg";
import ActivitiesUi from "./ActivitiesUi";
function Activities() {
  const data = [
    {
      image:  investor ,
      text: " ستوك سكويرز تطلق مبادره تدريب و تأهيل 1000 مستثمر ",
    },
    {
      image: prog ,
      text: " ستوك سكويرز تطلق مبادره تدريب مبرمجين المستقبل ",
    },
  ];
  return (
    <ActivitiesUi list={data}/>
    
  );
}

export default Activities;
