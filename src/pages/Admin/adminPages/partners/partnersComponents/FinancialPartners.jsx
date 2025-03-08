import { useState } from "react";

function FinancialPartners() {
  const [profits, setProfits] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);
  const [commissionRate, setCommissionRate] = useState(10); // نسبة العمولة 10%
  const [users, setUsers] = useState([
    { id: 1, name: "أحمد علي", balance: 500 },
    { id: 2, name: "محمد حسن", balance: 300 },
  ]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddProfit = () => {
    if (!selectedUser || profits <= 0) return;
    setUsers(users.map(user => user.id === selectedUser.id ? { ...user, balance: user.balance + profits } : user));
    setProfits(0);
  };

  const handleTransferProfit = () => {
    if (!selectedUser || transferAmount <= 0 || transferAmount > selectedUser.balance) return;
    const commission = (transferAmount * commissionRate) / 100;
    const finalAmount = transferAmount - commission;
    setUsers(users.map(user => user.id === selectedUser.id ? { ...user, balance: user.balance - transferAmount } : user));
    alert(`تم التحويل بعد خصم العمولة: ${finalAmount} `);
    setTransferAmount(0);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">💰 المعاملات المالية</h2>
      <div className="mb-4">
        <label className="block">اختر الشريك:</label>
        <select onChange={(e) => setSelectedUser(users.find(user => user.id === Number(e.target.value)))}
          className="border p-2 w-full">
          <option value="">اختر</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name} - رصيد: {user.balance} $</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block">📈 إضافة الأرباح:</label>
        <input type="number" className="border p-2 w-full" value={profits} onChange={(e) => setProfits(Number(e.target.value))} />
        <button onClick={handleAddProfit} className="bg-green-500 text-white p-2 rounded mt-2">إضافة</button>
      </div>

      <div className="mb-4">
        <label className="block">🔄 تحويل الأرباح:</label>
        <input type="number" className="border p-2 w-full" value={transferAmount} onChange={(e) => setTransferAmount(Number(e.target.value))} />
        <button onClick={handleTransferProfit} className="bg-blue-500 text-white p-2 rounded mt-2">تحويل</button>
      </div>
    </div>
  );
}

export default FinancialPartners;