import React from 'react';
import { useEffect } from "react";


const Github = () => {

  useEffect(() => {
    window.location.href = "https://github.com/oslabs-beta/ASTRO";
  }, []);

  return (
    <h1>Github page</h1>
  )
}

export default Github;