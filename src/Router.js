import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import KaKaoRedirectHandler from "./components/loginSignupPage/KaKaoRedirectHandler";
import ChatRoom from "./pages/ChatRoom";
import Friends from "./pages/Friends";
import LogIn from "./pages/LogIn";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import ChatPage from "./components/chatingPage/ChatPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <LogIn/>
      },
      {
        path: "signUp",
        element: <SignUp />
      },
      {
        path: "main",
        element: <Main />,
        errorElement: <LogIn />
      },
      {
        path: "myFriends",
        element: <Friends />,
        errorElement: <LogIn />
      },
      {
        path: "chatroom",
        element: <ChatRoom />,
        errorElement: <LogIn />,
        children: [
          {
            path: ":groupId",
            element: <ChatPage />
          }
        ]
      },
      {
        path: "kakao",
        element: <KaKaoRedirectHandler />
      },
    ]
  }
]);

export default router;

// 이파일은 수정 ㄴㄴ 해주세요!