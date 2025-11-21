import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdsManagement = () => {
  const [ads, setAds] = useState([]);
  const [update, setUpdate] = useState(false);
  const [newAd, setNewAd] = useState({
    Id: "",
    Title: "",
    LocationId: "",
    Image: "",
    Link: "",
  });
  const [locations, setLocations] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAd({ ...newAd, [name]: value });
  };

  const fetchAds = () => {
    //?ts=${Date.now()
    fetch(
      `https://stocksquare1.runasp.net/api/Advertisement/GetAll`
    )
      .then((response) => response.json())
      .then((data) => setAds(data))
      .catch((e) => console.log(e.message));
  };

  const addOrUpdateAd = async () => {
    if (newAd.Title && newAd.LocationId && newAd.Image && newAd.Link) {
      const formData = new FormData();
      formData.append("Title", newAd.Title);
      formData.append("Link", newAd.Link);
      formData.append("Image", newAd.Image);
      formData.append("LocationId", newAd.LocationId);

      if (update) {
        formData.append("Id", newAd.Id);
        try {
          let response = await fetch(
            "https://stocksquare1.runasp.net/api/Advertisement/Update",
            {
              method: "PUT",
              body: formData,
            }
          );
          if (response.ok) {
            toast.success("تم التعديل بنجاح!");
            setUpdate(false);
            setNewAd({
              Id: "",
              Title: "",
              LocationId: "",
              Image: "",
              Link: "",
            });
            fetchAds();
            return;
          } else {
            let errorText = await response.text();
            console.log("Error from server:", errorText);
          }
        } catch (e) {
          console.log(e.message);
        }
      } else {
        try {
          let response = await fetch(
            "https://stocksquare1.runasp.net/api/Advertisement/create",
            {
              method: "POST",
              body: formData,
            }
          );
          if (response.ok) {
            toast.success("تمت إضافة الإعلان بنجاح!");
            setNewAd({
              Id: "",
              Title: "",
              LocationId: "",
              Image: "",
              Link: "",
            });
            fetchAds();
          }
        } catch (e) {
          console.log(e.message);
        }
      }
    } else {
      toast.error("يرجى ملء جميع الحقول قبل إضافة أو تحديث الإعلان.!");
    }
  };

  const handleUpdate = (ad) => {
    setNewAd({
      Id: ad.id,
      Title: ad.title,
      LocationId: ad.locationId,
      Image: ad.image,
      Link: ad.link,
    });
    setUpdate(true);
  };

  const deleteAds = async (adId) => {
    try {
      const response = await fetch(
        `https://stocksquare1.runasp.net/api/Advertisement/Delete?id=${adId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "text/plain",
          },
        }
      );
      if (response.ok) {
        toast.success("تم حذف الإعلان بنجاح!");
        fetchAds();
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetch(
      "https://stocksquare1.runasp.net/api/SystemCode/GetByType?type=Location"
    )
      .then((response) => response.json())
      .then((data) => setLocations(data))
      .catch((e) => console.log(e.message));
  }, []);

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <div className="p-6 min-h-screen">
      <div className="bg-white dark:bg-dark-background dark:shadow-gray-800 dark:border-primary-800 dark:border-2 p-4 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">➕ إضافة إعلان جديد</h2>

        <input
          type="text"
          name="Title"
          placeholder="🏷️ عنوان الإعلان"
          className="border p-2 rounded w-full mb-2 dark:bg-dark-background dark:placeholder-gray-300"
          value={newAd.Title}
          onChange={handleInputChange}
        />

        <select
          className="border p-2 rounded w-full mb-2 dark:bg-dark-background "
          name="LocationId"
          value={newAd.LocationId}
          onChange={handleInputChange}
        >
          <option>اختر موقع الإعلان</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.value}
            </option>
          ))}
        </select>

        <label
          htmlFor="inputFile"
          className="text-black font-semibold text-lg mt-2"
        >
          اضافه صوره:
        </label>
        <input
          type="file"
          name="Image"
          accept="image/*"
          id="inputFile"
          className="p-2 rounded w-full mb-2"
          onChange={(e) =>
            setNewAd((prev) => ({
              ...prev,
              Image: e.target.files[0],
            }))
          }
        />

        <input
          type="url"
          name="Link"
          placeholder="🔗 رابط الإعلان"
          className="border p-2 rounded w-full mb-2 dark:bg-dark-background dark:placeholder-gray-300"
          value={newAd.Link}
          onChange={handleInputChange}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700"
          onClick={addOrUpdateAd}
        >
          {update ? "حفظ التعديلات" : "✅ إضافة الإعلان"}
        </button>
      </div>

      <div className="bg-white dark:bg-dark-background dark:shadow-gray-800 dark:border-primary-800 dark:border-2 p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-2">📃 قائمة الإعلانات</h2>
        {ads.length === 0 ? (
          <p className="text-gray-500">لا توجد إعلانات مضافة حتى الآن.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ads.map((ad) => (
              <div
                key={ad.id}
                className="border p-4 rounded-lg shadow-sm cursor-pointer"
              >
                <h3 className="font-semibold">{ad.title}</h3>
                <img
                  src={`data:image/*;base64,${ad.image}`}
                  alt={ad.title}
                  className="w-full h-32 object-contain rounded my-2"
                />
                <a
                  href={ad.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  🔗 رابط الإعلان
                </a>

                <div className="flex gap-3 text-white font-normal mt-2">
                  <button
                    className="bg-blue-500 rounded-lg px-2 py-1"
                    onClick={() => handleUpdate(ad)}
                  >
                    تعديل
                  </button>
                  <button
                    className="bg-red-600 rounded-lg px-2 py-1"
                    onClick={() => deleteAds(ad.id)}
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default AdsManagement;
