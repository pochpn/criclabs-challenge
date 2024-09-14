import React from "react";

function Navbar() {
  return (
    <React.Fragment>
      <nav className="bg-white p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center font-bold sm:text-m md:text-l lg:text-xl">
            <img
              src="/icons/logo-vector.svg"
              alt="Vector Icon"
              className="w-6 h-6 mr-2"
            />
            PDPA/International School
            <i className="material-icons w-6 h-6 mr-2  ml-2">
              keyboard_arrow_down
            </i>
          </div>
          <div tabIndex={0} className="avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
