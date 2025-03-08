import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

 function Requests() {
  const [requests, setRequests] = useState([
    { id: 1, name: "محمد أحمد" },
    { id: 2, name: "سارة خالد" },
    { id: 3, name: "علي محمود" },
  ]);

  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleApprove = (id) => {
    setRequests(requests.filter((req) => req.id !== id));
  };

  const handleReject = (id) => {
    setConfirmDelete(id);
  };

  const confirmRemove = () => {
    setRequests(requests.filter((req) => req.id !== confirmDelete));
    setConfirmDelete(null);
  };

  return (
    <div className="p-6 max-w-lg mx-auto relative">
      {/* <h2 className="text-xl font-semibold mb-4">طلبات الانضمام</h2> */}
      {requests.length === 0 ? <h2 className="text-center mt-10 text-xl font-semibold underline"> لا توجد طلبات انضمام حاليا </h2>:""}

      <div className="space-y-3">
        {requests.map((request) => (
          <div key={request.id} className="flex items-center justify-between bg-gray-100 p-3 rounded shadow-md relative">
            <span className="font-semibold">{request.name}</span>
            <div className="space-x-2 flex gap-2 items-center relative">
              <button 
                onClick={() => handleApprove(request.id)}
                className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 px-3"
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>

              <button 
                onClick={() => handleReject(request.id)}
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 relative px-3" 
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

              {confirmDelete === request.id && (
                <div className="absolute top-[-20px] right-[110px] w-[10rem] bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded shadow-md">
                  <span className="text-sm">هل أنت متأكد؟</span>
                  <button
                    onClick={confirmRemove}
                    className="block bg-red-600 text-white px-2 py-1 mt-1 rounded hover:bg-red-700 w-full text-center"
                  >
                    نعم
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Requests;