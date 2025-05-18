import React from "react";
import ProfileCard from "./ProfileCard";
import profile from './assets/pp.jpg'

const App = () => {
  return (
    <div className="bg-gray-500 h-screen flex justify-center items-center">
      <ProfileCard
        name="ADITYA"
        bio="I AM A STUDENT"
        profilepic={profile}
      />
    </div>
  );
};

export default App;
