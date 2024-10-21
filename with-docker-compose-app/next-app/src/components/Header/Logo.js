import React from "react";
import Link from "next/link";
import styles from "./css/Logo.module.css";
import Image from "next/image";

function Logo() {
  return (
    <Link href="/">
      <h2 className="fw-bold text-white">NSK Site</h2>
    </Link>
  );
}

export default Logo;
