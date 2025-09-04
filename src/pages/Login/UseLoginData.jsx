import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { ROUTES } from "../../routes";
export function useLoginData() {
  const queryClient = useQueryClient();
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
        throw new Error("حدث خطأ أثناء الإرسال");
      }
      return res.json();
    },
    onSuccess: (Data) => {
      console.log("تم الإرسال بنجاح:", Data);
      Cookies.set("token", Data.data["token"], {
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("refreshToken", Data.data["refreshToken"], {
        secure: true,
        sameSite: "strict",
      });
      localStorage.setItem("role", Data.data["role"]);
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error("حصل خطأ:", error);
    },
  });
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(
        "https://stocksquare1.runasp.net/api/Account/RefreshToken",
        {
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw new Error("حدث خطأ أثناء الإرسال");
      }
      return res.json();
    },
    onSuccess: (Data) => {
      Cookies.set("token", Data.data["token"], {
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("refreshToken", Data.data["refreshToken"], {
        secure: true,
        sameSite: "strict",
      });
    },
  });
}

export function useRevokeToken() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `https://stocksquare1.runasp.net/api/Account/RevokeToken?refreshToken=${Cookies.get(
          "refreshToken"
        )}`,
        {
          method: "POST",
          credentials: "same-origin",
        }
      );
      if (!res.ok) {
        throw new Error("حدث خطأ أثناء الإرسال");
      }
    },
    onSuccess: () => {
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      queryClient.clear();
    },
    onError: () => {
      console.log("error in revoke");
    },
  });
}
