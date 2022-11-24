import React from "react";
import "./Header.scss";

const Header: React.FC = () => {
  let today: any = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;

  return (
    <>
      <header className="header">
        <div className="header__info">
          <a href="/" className="header__logo">
            LENTA.RU
          </a>
          <div>
          <div className="header__date">{today}</div>
        </div>
        <div className="header__login">Войти</div>
        </div>
      
      </header>
    </>
  );
};

export default Header;
