"use server";
import React from "react";
import Doctorlist from "../components/patient/Doctorlist";
import prisma from "../lib/prisma";

const page = async () => {
  const doctors = await prisma.user.findMany({
    where: {
      role: "DOCTOR",
    },
   
  });
  console.log(doctors);

  return (
    <div>
      {/* this is patient page */}
      <Doctorlist doctors={doctors} />
    </div>
  );
};

export default page;
