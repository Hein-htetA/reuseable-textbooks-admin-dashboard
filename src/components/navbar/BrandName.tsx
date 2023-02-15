import React from "react";
import { useNavigate } from "react-router-dom";

const BrandName = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/")} className="hover:cursor-pointer">
      <span className="font-[Libre-Baskerville,serif] text-3xl text-slate-700">
        YTU
      </span>
      <span className="font-[Marck-Script,cursive] text-lg text-slate-700 tracking-wide">
        Bookshelf
      </span>
    </div>
  );
};

export default BrandName;
