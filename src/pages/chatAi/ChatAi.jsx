import { useAuth } from "../../Context/AuthContext";
import ChatAiUi from "./ChatAiUi";

function ChatAi() {
  const data = [
    {
      id:1,
      logo: "S",
      title: "السويدي للكابلات",
      name: "SWDY",
      state: "مغلق بربح",
    },
    {
      id:2,
      logo: "N",
      title: " النساجون الشرقيون",
      name: "ORWE",
      state: "فعاله",
    },
  ];

  const { userData } = useAuth();
  console.log(userData);

  const username = userData
    ? userData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
    : "سيدي";

  return (
   <ChatAiUi list={data} username={username} />
  );
}
export default ChatAi;
