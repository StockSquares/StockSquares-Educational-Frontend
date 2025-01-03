import React, { useEffect, useState } from 'react';
import { 
    BookOpen, 
    Play, 
    Bot, 
    Award, 
    Beaker, 
    ClipboardCheck, 
    UserRound, 
    Search, 
    Menu, 
    Bell, 
    Wallet, 
    TrendingUp, 
    DollarSign,
    Timer // Added Timer for the pending amount card
} from 'lucide-react';

function PartnerApplication() {
    const [creditAmount, setCreditAmount] = useState(5420.50);
    const [recentTransactions] = useState([
        { id: 1, amount: 250, date: '2024-01-15', type: 'إيداع' },
        { id: 2, amount: -120, date: '2024-01-14', type: 'سحب' },
        { id: 3, amount: 340, date: '2024-01-13', type: 'إيداع' },
    ]);

    const menuItems = [
        { icon: BookOpen, text: ' لوحة المعلومات ' },
        { icon: ClipboardCheck, text: 'أدوات التسويق ' },
        { icon: Play, text: 'تقارير الأداء  ' },
        { icon: Bot, text: '  الشركاء الفرعيين' },
        { icon: Beaker, text: ' سحب العمولات' },
        { icon: Award, text: 'خطة العمولات  ' },
        { icon: UserRound, text: 'تواصل مع الخبير' }
    ];

    return (
        <div className="h-screen flex flex-col" dir="rtl">
            {/* Header */}
            <header className="bg-white border-b shadow-sm">
                {/* Upper header section */}
                <div className="h-16 flex items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <Menu className="h-6 w-6 text-gray-500 cursor-pointer" />
                        <div className="relative">
                            <Search className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="بحث..."
                                className="pr-10 pl-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative">
                            <Bell className="h-6 w-6 text-gray-500" />
                            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                                3
                            </span>
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                            <div className="flex flex-col items-end">
                                <span className="text-sm font-medium">أحمد طارق الليثي</span>
                                <span className="text-xs text-gray-500">مبنى المواهبة Stock 39</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Lower header section */}
                <div className="border-t px-4 py-2 bg-gray-50">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">الفترة المسائية 4-11</span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">متصل</span>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-l shadow-lg flex flex-col">
                    <nav className="flex-1 overflow-y-auto">
                        <div className="p-2 space-y-1">
                            {menuItems.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <button
                                        key={index}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-right rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <IconComponent className="h-5 w-5 text-gray-500" />
                                        <span className="text-gray-700">{item.text}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-6">لوحة التحكم</h1>
                        
                        {/* Credit Amount Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {/* Total Balance Card */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <Wallet className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <span className="text-sm text-gray-500">الرصيد الإجمالي</span>
                                </div>
                                <div className="text-2xl font-bold text-gray-800">
                                    {creditAmount.toLocaleString('ar-SA')} ريال
                                </div>
                                <div className="mt-2 text-sm text-green-600 flex items-center">
                                    <TrendingUp className="h-4 w-4 mr-1" />
                                    <span>+2.5% من الشهر الماضي</span>
                                </div>
                            </div>

                            {/* Available for Withdrawal */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <DollarSign className="h-6 w-6 text-green-600" />
                                    </div>
                                    <span className="text-sm text-gray-500">متاح للسحب</span>
                                </div>
                                <div className="text-2xl font-bold text-gray-800">
                                    {(creditAmount * 0.8).toLocaleString('ar-SA')} ريال
                                </div>
                                <button className="mt-2 text-sm text-white bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                                    سحب الرصيد
                                </button>
                            </div>

                            {/* Pending Amount */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="bg-yellow-100 p-3 rounded-full">
                                        <Timer className="h-6 w-6 text-yellow-600" />
                                    </div>
                                    <span className="text-sm text-gray-500">معلق</span>
                                </div>
                                <div className="text-2xl font-bold text-gray-800">
                                    {(creditAmount * 0.2).toLocaleString('ar-SA')} ريال
                                </div>
                                <div className="mt-2 text-sm text-gray-500">
                                    يتم التحويل خلال 24 ساعة
                                </div>
                            </div>
                        </div>

                        {/* Recent Transactions */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">آخر المعاملات</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-right text-sm text-gray-500 border-b">
                                            <th className="pb-3">التاريخ</th>
                                            <th className="pb-3">النوع</th>
                                            <th className="pb-3">المبلغ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentTransactions.map((transaction) => (
                                            <tr key={transaction.id} className="border-b last:border-0">
                                                <td className="py-3 text-sm">{transaction.date}</td>
                                                <td className="py-3 text-sm">{transaction.type}</td>
                                                <td className={`py-3 text-sm font-medium ${
                                                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                    {transaction.amount > 0 ? '+' : ''}{transaction.amount} ريال
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default PartnerApplication;