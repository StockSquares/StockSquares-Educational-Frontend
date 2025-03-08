import { useState } from "react";

function PartnersOperations() {
  const [partners, setPartners] = useState([
    { id: 1, name: "شركة ABC" },
    { id: 2, name: "شركة XYZ" }
  ]);
  const [newPartner, setNewPartner] = useState("");
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [inviteCode, setInviteCode] = useState("");
  
  const addPartner = () => {
    if (newPartner.trim() === "") return;
    setPartners([...partners, { id: partners.length + 1, name: newPartner }]);
    setNewPartner("");
  };
  
  const deletePartner = (id) => {
    setPartners(partners.filter(partner => partner.id !== id));
  };
  
  const transferPartner = (id) => {
    alert(`تم نقل الشريك ${id} بنجاح`);
  };
  
  const generateInviteCode = () => {
    setInviteCode(`INV-${Math.floor(1000 + Math.random() * 9000)}`);
  };
  
  return (
    <div className="p-4 mb-3">
      <h2 className="text-xl font-bold mb-4">-: اضافه شريك :-</h2>
      
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="اسم الشريك" 
          className="border p-2 mr-2" 
          value={newPartner} 
          onChange={(e) => setNewPartner(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4 py-2 mt-2 rounded-lg" onClick={addPartner}>إضافة شريك</button>
      </div>
      
      <ul>
        {partners.map(partner => (
          <li key={partner.id} className="flex justify-between border p-2 mb-2">
            {partner.name}
            <button className="bg-red-500 text-white px-2" onClick={() => deletePartner(partner.id)}>❌</button>
          </li>
        ))}
      </ul>
      
      <div className="mb-4">
      <h2 className="text-xl font-bold mb-4 mt-5">-: نقل الشريك :-</h2>

        <select className="border p-2" onChange={(e) => setSelectedPartner(e.target.value)}>
          <option value="">اختر شريك</option>
          {partners.map(partner => (
            <option key={partner.id} value={partner.id}>{partner.name}</option>
          ))}
        </select>
        <button className=" bg-accent-900 px-4 py-2 ml-2 " onClick={() => transferPartner(selectedPartner)}>نقل الشريك</button>
      </div>
      
      <div>
      <h2 className="text-xl font-bold mb-4 mt-5">-: انشاء كود دعوة/ خصم  :-</h2>

        <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={generateInviteCode}>إنشاء كود دعوة</button>
        {inviteCode && <p className="mt-2">كود الدعوة: <strong>{inviteCode}</strong></p>}
      </div>
    </div>
  );
}

export default PartnersOperations;