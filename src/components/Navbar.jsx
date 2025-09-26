import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faGear } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  return (
    <>
      <nav className="bg-blue-100 absolute shadow-md w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-3xl font-bold text-gray-600"><FontAwesomeIcon icon={faCircleUser} /></h1>
            </div>
            

            {/* Mobile Menu Button */}
            <div className="flex-shrink-0 flex items-center text-xl font-bold ">
                <FontAwesomeIcon icon={faGear} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
