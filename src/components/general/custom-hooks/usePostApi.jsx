import { useMutation } from "@tanstack/react-query";

export function usePostApi() {
  return useMutation({
    mutationFn: async ({ url, updatedData }) => {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Server Error Details:", errorData);
        throw new Error(errorData.title || JSON.stringify(errorData.errors) || "حدث خطأ أثناء الإرسال");
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
