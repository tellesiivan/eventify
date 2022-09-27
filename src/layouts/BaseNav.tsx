import React from "react";
type Props = {};

const BaseNav = (props: Props) => {
  return (
    <header className="fixed top-0 w-full border-b border-primary-400 bg-primary-600 h-14">
      <nav
        className="h-full px-2 mx-auto max-w-7xl sm:px-4 lg:px-6"
        aria-label="Top"
      >
        <div className="flex items-center justify-between w-full h-full">
          <div>logo</div>
          <div className="ml-10 space-x-2">
            <button>Sign in</button>
            <button>Sign up</button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default BaseNav;
