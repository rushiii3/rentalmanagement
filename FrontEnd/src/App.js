import "./App.css";
import { useSelector } from "react-redux";
import DarkMode from "./Components/DarkMode/Darkmode";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar1 from "./Components/Layouts/Headers/Navbar";
import {
  LandingPage,
  SignUpPage,
  PageNotFound,
  LoginPage,
  ChatPage,
  Activation,
  ForgotPage,
  PropertyPage,
  ProfileUpdatePage,
  SinglePropertyViewPage,
  AddProperty,
  Bookings,
  BookingsLandlord,
  ReportPage,
  VideoConferencePage,
  AdminHomePage,
  AdminReportPage,
  TenantGroupChatPage
} from "./Routes";
import NavbarShow from "./Components/Layouts/Headers/NavBarShow";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { LoadUser } from "./Redux/action/user";
import Store from "./Redux/store";
import ProtectedTenant from "./Protected/ProtectedTenant";
import ProtectedLandlord from "./Protected/ProtectedLandlord";
import ProtectedAdmin from "./Protected/ProtectedAdmin";
import Protected from "./Protected/Protected";
import ChatLayout2 from "./Components/Chat/Chatlayout2";
function App() {
  const { mode } = useSelector((state) => state.mode);

  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Store.dispatch(LoadUser());
  }, []);

  return (
    <main className={mode}>
      <div className="App">
        <Toaster />
        <BrowserRouter>
          <NavbarShow>
            <Navbar1 />
          </NavbarShow>

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/chat2" element={<ChatLayout2 />} />
            <Route
              path="/activate/:activation_token"
              element={<Activation />}
            />

            <Route path="/forgot-password" element={<ForgotPage />} />
            <Route path="/properties" element={<PropertyPage />} />
            <Route path="/profile-update" element={<ProfileUpdatePage />} />
            <Route
              path="/properties/:id"
              element={<SinglePropertyViewPage />}
            />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/bookings" element={<ProtectedTenant><Bookings /></ProtectedTenant>} />
            <Route path="/property-bookings" element={<ProtectedLandlord><BookingsLandlord /></ProtectedLandlord>} />
            <Route path="/report" element={<Protected><ReportPage /></Protected>} />
            <Route path="/video-conference/:id" element={<Protected><VideoConferencePage /></Protected>} />

            <Route path="/dashboard" element={<ProtectedAdmin><AdminHomePage /></ProtectedAdmin>} />
            <Route path="/admin-reports" element={<ProtectedAdmin><AdminReportPage /></ProtectedAdmin>} />
            <Route path="/group-chat" element={<TenantGroupChatPage />} />
            
            
            
          </Routes>
        </BrowserRouter>
        <DarkMode />
      </div>
    </main>
  );
}

export default App;
