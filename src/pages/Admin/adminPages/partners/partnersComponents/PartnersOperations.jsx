import { useState } from "react";
function PartnersOperations() {
  const employees = [" احمد محمد ", " مروه محمد ", " خالد اشرف ", " مني جمال "];

  const [data, setData] = useState([
    { partner: " ab ", employee: " احمد محمد " },
    { partner: " bc ", employee: " مروه محمد " },
    { partner: " cd ", employee: " خالد اشرف " },
    { partner: " xy", employee: " مني جمال " },
  ]);

  const [selected, isSelected] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForNew, setIsOpenForNew] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState("");
  const [newPartner, addNewPartner] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const handleChange = (partner) => {
    setSelectedPartner(partner);
    setIsOpen(true);
  };

  const handleSubmit = () => {
    const filteredData = data.filter((d) => d.partner !== selectedPartner);
    const updatedData = [
      ...filteredData,
      { partner: selectedPartner, employee: selected },
    ];
    setData(updatedData);
    setIsOpen(false);
    isSelected("");
  };

  const addNew = () => {
    const newData=[ ...data, {partner: newPartner, employee: selectedEmployee}];
    setData(newData);
    setIsOpenForNew(false);
    setSelectedEmployee("");
  };

  return (
    <>
      <div className="p-4 ">
        {/* اضافه ونقل شريك */}
        <div>
          <table className="m-auto w-[700px] text-center border-2">
            <thead>
              <th className="p-2 bg-green-500 text-white font-semibold">
                الشريك
              </th>
              <th className="p-2 bg-green-500 text-white font-semibold">
                الموظف
              </th>
              <th className="p-2 bg-green-500 text-white font-semibold">
                تغيير الموظف
              </th>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx} className="p-2 border-2">
                  <td className="p-2">{item.partner}</td>
                  <td>
                    <p className="">{item.employee}</p>
                  </td>
                  <td>
                    <button
                      className="ms-5 text-sm px-4 py-[3px] rounded-lg bg-accent-700  hover:bg-accent-950"
                      onClick={() => handleChange(item.partner)}
                    >
                      تغيير
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={3}
                  className="bg-gray-100 cursor-pointer hover:bg-gray-200"
                  onClick={()=> setIsOpenForNew(true)}
                >
                  +
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <h2 className="text-xl font-bold mb-4 mt-5">
          -: انشاء كود دعوة/ خصم :-
        </h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
          إنشاء كود دعوة
        </button>
        <p className="mt-2">
          كود الدعوة: <strong></strong>
        </p>
      </div>

      {isOpen && (
        <div className="fixed inset-0  flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="absolute bg-white rounded-lg w-[500px] h-auto mt-5 p-4 flex flex-col shadow-md ">
            <h2 className="text-xl text-center font-bold mb-2">
              اختر الموظف المناسب
            </h2>
            {employees.map((employee, idx) => (
              <p
                key={idx}
                className={`${
                  selected === employee ? "bg-accent-700" : "hover:bg-gray-100 "
                } text-lg p-1 font-semibold mb-2 rounded-lg cursor-pointer `}
                onClick={() => isSelected(employee)}
              >
                {employee}
              </p>
            ))}
            <button
              className="px-5 py-1 rounded-lg bg-primary-900 text-white self-center hover:bg-primary-950"
              onClick={() => handleSubmit()}
            >
              حفظ التغيير
            </button>
          </div>
        </div>
      )}

      {isOpenForNew && (
        <div className="fixed inset-0  flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className=" bg-white rounded-lg w-[500px] h-auto mt-5 p-4 flex flex-col shadow-md">
            <h2 className="text-xl text-center font-bold mb-2">
              اضافه شريك جديد
            </h2>
            <div> 
            <label> اسم الشريك: </label>
            <input type="text" className="rounded-lg focus:outline-none focus:border-0 mb-5 mt-1" value={newPartner} onChange={(e)=> addNewPartner(e.target.value)} />
            <label>  الموظف المناسب :</label>
            <select className="mt-1 w-full rounded-lg" onChange={(e)=>setSelectedEmployee(e.target.value)}>
              <option> اختر </option>
              {employees.map((employee, idx)=>(
                <option key={idx} value={employee}> {employee} </option>
              ))}
            </select>  
            </div>
            <button className="px-4 py-1 rounded-lg bg-primary-900 text-white self-center mt-4 mb-2" onClick={()=>addNew()}> اضافه </button>         

          </div>
        </div>
      )}
    </>
  );
}

export default PartnersOperations;
