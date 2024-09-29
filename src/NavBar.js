import logo from "./images/Mobile2Logo.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const navigator = useNavigate();
    return (
        <nav className="navbar bg-base-100  rounded-xl mx-auto max-w-[1300px] shadow-sm px-10 mt-5 z-10">
          <div className="flex-1">
            <img
              src={logo}
              alt=""
              className="cursor-pointer"
              onClick={() => {
                navigator("/");
              }}
              width="180"
            />
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a
                  onClick={() => {
                    navigator("/search");
                  }}
                >
                  Search Ticket
                </a>
              </li>
              {/* <li>
                <details>
                  <summary>Parent</summary>
                  <ul className="bg-base-100 rounded-t-none p-2">
                    <li>
                      <a>Link 1</a>
                    </li>
                    <li>
                      <a>Link 2</a>
                    </li>
                  </ul>
                </details>
              </li> */}
            </ul>
          </div>
        </nav>
    )
}


export default NavBar;