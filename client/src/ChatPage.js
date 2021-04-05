import React from "react";
import MapContainer from "./components/Map/MapContainer";
import MyButtons from "./components/ThreeButton/MyButtons";
import { appContext } from "./components/appContext";
import useApplicationData from "./hooks/useApplicationData";
import Chat from "./components/Chat/Chat";

function ChatPage() {
  const { coord, setCoord, state, setState } = useApplicationData();
  return (
    <appContext.Provider
      value={{ coord, setCoord, state, setState, loginStatus, setLoginStatus }}
    >
      <div className="container">
        <MapContainer className="map" />
        <MyButtons />
        <Chat />
      </div>
    </appContext.Provider>
  );
}

export default ChatPage;
