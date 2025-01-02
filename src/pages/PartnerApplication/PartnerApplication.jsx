import React, { useEffect, useState } from 'react';

import Style from './PartnerApplication.module.css'
import {  BookOpen, Play,Bot, Award, Beaker, ClipboardCheck, Heart, Bell, Search, Menu } from 'lucide-react';



function PartnerApplication() {
    const [counter, setCounter] = useState(0);
    const menuItems = [
      { icon: BookOpen, text: 'رحلة التأهيل والتعلم' },
      { icon: ClipboardCheck, text: 'التدريب الشخصي ' },
      { icon: Play, text: 'الدورات المسجلة ' },
      { icon:Bot , text: ' AI توصيات بصير ' },
      { icon: Beaker, text: 'التداول التجريبي' },
      { icon: Award, text: 'شهادات التقدير ' },
      { icon: Heart, text: 'تواصل مع الخبير' }
    ];
  


    useEffect(() => {
        
    }, []);

  
      

  return (
    <div className="h-screen flex flex-col" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        {/* Upper header section */}
        <div className="h-16 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Menu className="h-6 w-6 text-gray-500" />
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
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 px-3 py-2 text-right rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <item.icon className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">{item.text}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">لوحة التحكم</h1>
            {/* Add your main content here */}
          </div>
        </main>
      </div>
    </div>
  );}

export default PartnerApplication