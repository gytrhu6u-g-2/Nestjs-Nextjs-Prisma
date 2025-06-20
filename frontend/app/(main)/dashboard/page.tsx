"use client";
import React from "react";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  return (
    <div>
      <div>Dashboard</div>
      <div>
        <button
          onClick={() =>
            signOut({ callbackUrl: "http://localhost:3000/login" })
          }
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
