import * as React from "react";
import "./PhoneNavBar.css";
import { User, Soup, NotepadText, Search, Home } from 'lucide-react';
export default function PhoneNavBar() {
   
    return (
        <>
            <div className="_2456r">
                <div className="_3nxa7" data-testid="listing-header-location">
                    <button
                        className="_1NdRR"
                        aria-label="Selected address is Chhoti Badalpura, Bihar 801105, India (Khagaul); Double tap to change address."
                        id="change-address-btn-id"
                    >
                        <span className="_3srdA">
                            <span className="_17tY_">
                                <svg
                                    width="14"
                                    height="20"
                                    viewBox="0 0 14 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M1.89429 18.3846H12.0643"
                                        stroke="#282C3F"
                                        strokeOpacity="0.9"
                                        strokeWidth="1.7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M6.98989 1C3.9613 1 1.5 3.45532 1.5 6.47656C1.5 10.584 6.98989 15.2057 6.98989 15.2057C6.98989 15.2057 12.4798 10.584 12.4798 6.47656C12.4798 3.45532 10.0185 1 6.98989 1Z"
                                        stroke="#282C3F"
                                        strokeOpacity="0.9"
                                        strokeWidth="1.7"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M6.98955 3.73492C8.36202 3.73492 9.48495 4.82084 9.48495 6.14807C9.48495 7.4753 8.3745 8.56121 6.98955 8.56121C5.61707 8.56121 4.49414 7.4753 4.49414 6.14807C4.49414 4.82084 5.61707 3.73492 6.98955 3.73492Z"
                                        fill="#E46D47"
                                    />
                                </svg>
                            </span>
                            <span className="HkRv6">other</span>
                        </span>
                        <p className="_9v2Jj">Chhoti Badalpura, Bihar 801105, India (Khagaul)</p>
                    </button>
                    <button
                        className="_11VKU"
                        data-testid="listing-header-account"
                        aria-label="Double tap to go to Account page."
                    >
                        <div
                            aria-hidden="true"
                            height="20"
                            width="20"
                            className="sc-papXJ iXoVnQ"
                            style={{color:"white"} }
                        >
                            <User style={{ color: "white" }} />
                        </div>
                    </button>
                </div>
            </div>
            <div className="_3JaG6">
                <div role="navigation" id="bottomNav" tabIndex="0" className="styles_container__2zNtT">
                    <button
                        className="styles_navItem__1wod5 styles_navItemSelected__1PNh3"
                        data-testid="bottom-nav-home"
                        aria-label="Double tap to go to Homepage."
                    >
                        <Home />
                        <span aria-hidden="true">Home</span>
                    </button>
                    <button
                        className="styles_navItem__1wod5"
                        data-testid="bottom-nav-food"
                        aria-label="Double tap to go to Restaurant's page."
                    >
                        <Soup  />
                        <span aria-hidden="true">Food</span>
                    </button>
                    <button
                        className="styles_navItem__1wod5"
                        data-testid="bottom-nav-genie"
                        aria-label="Double tap to go to Genie page."
                    >
                        <NotepadText />
                        <span aria-hidden="true">Genie</span>
                    </button>
                    <button
                        className="styles_navItem__1wod5"
                        data-testid="bottom-nav-search"
                        aria-label="Double tap to go to search page."
                    >
                        <Search />
                        <span aria-hidden="true">Search</span>
                    </button>
                </div>
            </div>
        </>
    );
}
