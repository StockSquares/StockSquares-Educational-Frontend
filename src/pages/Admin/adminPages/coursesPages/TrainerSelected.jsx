import { useState } from "react";
import { Modal } from "../../../../components";

function TrainerSelected() {
  const [clients, setClients] = useState([
    { id: 1, name: "أحمد علي", trainerId: null, schedule: "" },
    { id: 2, name: "سارة محمد", trainerId: null, schedule: "" },
    { id: 3, name: "خالد حسن", trainerId: null, schedule: "" },
  ]);

  const trainers = [
    { id: 1, name: "محمد يوسف" },
    { id: 2, name: "نور الدين صالح" },
    { id: 3, name: "منى عبد الله" },
  ];

  const schedules = [
    "السبت صباحًا",
    "السبت مساءً",
    "الأحد صباحًا",
    "الأحد مساءً",
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [newClient, setNewClient] = useState({
    name: "",
    trainerId: "",
    schedule: "",
  });

  // تحديث بيانات المدرب
  const assignTrainer = (clientId, trainerId) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === clientId ? { ...client, trainerId } : client
      )
    );
  };

  // فتح المودال لإضافة أو تعديل العميل
  const openModal = (client = null) => {
    if (client) {
      setEditingClient(client);
      setNewClient({ ...client });
    } else {
      setEditingClient(null);
      setNewClient({ name: "", trainerId: "", schedule: "" });
    }
    setModalOpen(true);
  };

  // حفظ البيانات سواء تعديل أو إضافة
  const handleSave = () => {
    if (editingClient) {
      setClients((prevClients) =>
        prevClients.map((client) =>
          client.id === editingClient.id ? newClient : client
        )
      );
    } else {
      setClients((prevClients) => [
        ...prevClients,
        { ...newClient, id: prevClients.length + 1 },
      ]);
    }
    setModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">
        إدارة تسكين المدربين
      </h2>
      <table className="w-full border border-gray-300 shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-800">
            <th className="p-3 border">اسم العميل</th>
            <th className="p-3 border">المدرب</th>
            <th className="p-3 border">الموعد</th>
            <th className="p-3 border">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="border">
              <td className="p-3 border text-center">{client.name}</td>
              <td className="p-3 border text-center">
                {client.trainerId
                  ? trainers.find((t) => t.id === Number(client.trainerId))
                      ?.name
                  : "لم يتم التسكين بعد"}
              </td>
              <td className="p-3 border text-center">
                {client.schedule || "لم يتم تحديد الموعد"}
              </td>
              <td className="p-3 border text-center">
                <button
                  className="px-3 py-2 bg-green-500 text-white rounded-md mx-1 hover:bg-green-400"
                  onClick={() => openModal(client)}
                >
                  تعديل
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="mt-4 px-4 py-2 bg-accent-900 text-black rounded-md hover:bg-accent-400"
        onClick={() => openModal()}
      >
        إضافة بيانات جديدة
      </button>

      {modalOpen && (
        <Modal>
        <div className="p-3 flex flex-col ">
          <h3 className="text-xl self-start font-semibold mb-4">
            {editingClient ? "تعديل العميل" : "إضافة عميل جديد"}
          </h3>
          <input
            type="text"
            placeholder="اسم العميل"
            value={newClient.name}
            onChange={(e) =>
              setNewClient({ ...newClient, name: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md mb-5"
          />
          <select
            className="w-full px-3 py-2 border rounded-md mb-5"
            value={newClient.trainerId}
            onChange={(e) =>
              setNewClient({ ...newClient, trainerId: e.target.value })
            }
          >
            <option value="">اختر مدربًا</option>
            {trainers.map((trainer) => (
              <option key={trainer.id} value={trainer.id}>
                {trainer.name}
              </option>
            ))}
          </select>
          <select
            className="w-full px-3 py-2 border rounded-md mb-4"
            value={newClient.schedule}
            onChange={(e) =>
              setNewClient({ ...newClient, schedule: e.target.value })
            }
          >
            <option value="">اختر موعدًا</option>
            {schedules.map((schedule, index) => (
              <option key={index} value={schedule}>
                {schedule}
              </option>
            ))}
          </select>
          <div className="flex  justify-between mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              onClick={handleSave}
            >
              حفظ
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              onClick={() => setModalOpen(false)}
            >
              إلغاء
            </button>
          </div></div>
        </Modal>
      )}
    </div>
  );
}

export default TrainerSelected;
