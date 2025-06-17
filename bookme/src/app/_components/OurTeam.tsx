import React from "react";
import ProfileCard from "./ProfileCard";

const team = [
  {
    name: "Munkhbayar",
    avatarUrl:
      "https://res.cloudinary.com/dpbmpprw5/image/upload/v1750147157/Adobe_Express_-_file_x0zc7e.png",
    title: "Software Engineer",
    handle: "javicodes",
  },
  {
    name: "Bayrgun",
    avatarUrl:
      "https://res.cloudinary.com/dpbmpprw5/image/upload/v1750148651/Adobe_Express_-_file_1_qwwa2s.png",
    title: "Software Engineer",
    handle: "javicodes",
  },
  {
    name: "Ulziinaran",
    avatarUrl:
      "https://res.cloudinary.com/dpbmpprw5/image/upload/v1750148717/Adobe_Express_-_file_3_lkpdwc.png",
    title: "Software Engineer",
    handle: "javicodes",
  },
  {
    name: "Namuunaa",
    avatarUrl:
      "https://res.cloudinary.com/dpbmpprw5/image/upload/v1750148882/Adobe_Express_-_file_5_wpyhch.png",
    title: "Software Engineer",
    handle: "javicodes",
  },
  {
    name: "Battsengel",
    avatarUrl:
      "https://res.cloudinary.com/dpbmpprw5/image/upload/v1750148776/Adobe_Express_-_file_4_mxv1ev.png",
  },
  {
    name: "Tsogbayar",
    avatarUrl:
      "https://res.cloudinary.com/dpbmpprw5/image/upload/v1750148882/Adobe_Express_-_file_6_l0esuh.png",
    title: "Software Engineer",
    handle: "javicodes",
  },
];

const OurTeam = ({ id }: { id: string }) => {
  return (
    <section
      className="flex flex-col gap-20 items-center lg:px-20 pb-40"
      id={id}
    >
      <h4
        className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text"
        style={{
          backgroundImage: "linear-gradient(to bottom, #fff, #007fff)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        Манай баг
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 md:px-8 lg:px-20 max-w-7xl mx-auto w-full">
        {team.map((member, index) => (
          <div key={index} className="flex justify-center w-full">
            <ProfileCard
              name={member.name}
              title={member.title}
              handle={member.handle}
              avatarUrl={member.avatarUrl}
              showUserInfo={false}
              enableTilt={true}
              className="w-full max-w-xs"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
