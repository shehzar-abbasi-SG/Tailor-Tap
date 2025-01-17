import "@/global.css";
import "react-native-gesture-handler";
import { AppProvider } from "./context/AppProvider";
import Main from "@/app/screens/Main";


export default function App() {

  return (
      <AppProvider>
          <Main/>
      </AppProvider>
  )
}



