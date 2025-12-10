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
      className="bg-white text-black shadow-sm hover:bg-green-600  px-20 py-2 sm:py-[10px] sm:px-[20px]  hover:bg-gray-50 dark:bg-dark-background dark:text-dark-text dark:border-primary-700"
      style={{
        // backgroundColor: "#fff",
        // color: "#000000",
        fontFamily: "Cairo",
        fontSize: "15px",
        // padding: "10px 20px",
        // border: "1px solid black",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
        
      }}
    >
      <img
        src={googleIcon}
        alt="Google"
        style={{ width: "20px", height: "20px" }}
      />
      تسجيل الدخول بـ Google
    </button>
  );
}
