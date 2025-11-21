import { useMutation } from "@tanstack/react-query";

export function usePostApi() {
  return useMutation({
    mutationFn: async ({url, updatedData}) => {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) {
        throw new Error("حدث خطأ أثناء الإرسال");
      }
      return res.json();
    },
    onSuccess: (data) => {
      console.log("تم الإرسال بنجاح:", data);
    },
    onError: (error) => {
      console.error("حصل خطأ:", error);
    },
  });
}
