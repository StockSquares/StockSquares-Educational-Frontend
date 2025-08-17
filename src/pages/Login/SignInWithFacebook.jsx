import FacebookLogin from "@greatsumini/react-facebook-login";
import FacebookIcon from "../../assets/icons/social-contacts/facebookIcon.png"

function SignInWithFacebook() {
  return (
    <FacebookLogin
      appId="973674604819820"
      onSuccess={(response) => {
        console.log("Login Success!", response);
      }}
      onFail={(error) => {
        console.log("Login Failed!", error);
      }}
      onProfileSuccess={(response) => {
        console.log("Get Profile Success!", response);
      }}
      className=" bg-white text-black shadow-sm border-2 border-solid border-black  px-20 py-2 sm:py-[10px] sm:px-[20px]  hover:bg-gray-100 dark:bg-dark-background dark:text-dark-text dark:border-primary-700"
      style={{
        
        fontSize: "15px",
        padding: "10px 20px",
        
        borderRadius: "8px",
      }}
    >
<div className="flex gap-2 items-center justify-center">
    <img src={FacebookIcon} className="w-[20px] h-[20px]" />
تسجيل الدخول بـ facebook
</div>
    </FacebookLogin>
  );
}

export default SignInWithFacebook;
