import { useGoogleLogin } from "@react-oauth/google";
import googleIcon from "../../assets/icons/social-contacts/googleIcon.png"
export default function SignInWithGoogle() {
  const login = useGoogleLogin({
    onSuccess: (res) => console.log("Success!", res),
    onError: () => console.log("Login Failed"),
  });

  return (
    <button
      onClick={() => login()}
      className="bg-white text-black shadow-sm hover:bg-gray-50 border border-gray-200 w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl dark:bg-dark-background dark:text-dark-text dark:border-primary-700 transition-colors whitespace-nowrap"
      style={{
        fontFamily: "Cairo",
        fontSize: "15px",
        cursor: "pointer",
      }}
    >
      تسجيل الدخول بـ Google
      <img
        src={googleIcon}
        alt="Google"
        style={{ width: "22px", height: "22px" }}
      />
    </button>
  );
}
