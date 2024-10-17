import React from "react";


export default function UserSideBar() {
    return (
        <>
            <div className="_2yoTv">
            <div className="_3AFC5">
                <div className="_1bhn9">
                    <div>
                        <div className="_2czoF" data-testid="account-user-details-header">
                            <div data-testid="account-user-details">
                                <div className="_2_-Em">Mohit Kumar</div>
                                <div className="_1KevM">8540873186 . mohittiwary05@gmail.com</div>
                            </div>
                            <div>
                                <button className="_3uqSl" data-testid="account-user-details-edit-button">Edit</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="NeDfT">
                            <div className="_3tVyU">
                                <div
                                    className="_2DP9e _1ra1j"
                                    data-testid="My_Account-container"
                                    role="button"
                                    tabIndex="0"
                                    aria-expanded="false"
                                    aria-controls="section-undefined"
                                >
                                    <span data-testid="My_Account-header">
                                        <div>
                                            <div className="_1ZxGJ">My Account</div>
                                            <div className="_2ovU_">Address, Favourites &amp; Settings</div>
                                        </div>
                                    </span>
                                    <span className="icon-downArrow J0y6m" data-testid="My_Account-dropdown-icon" aria-hidden="true"></span>
                                </div>

                                <div
                                    className="_39p-f"
                                    id="section-undefined"
                                    role="region"
                                    data-testid="My_Account-content"
                                    tabIndex="0"
                                    aria-label=""
                                >
                                    <div className="_1Xqx7">
                                        <div className="_32sRE" data-testid="Manage_Address-collapsible-submenuitem">
                                            <a className="Ripple_container__17nxL _2AdD- styles_container__1KzFz" href="/my-account/addresses">
                                                <div className="styles_content__2JtQA">
                                                    <div className="Zo88I">
                                                        <span className="_33X77 icon-home"></span>
                                                        <div>Manage Address</div>
                                                    </div>
                                                </div>
                                                <span className="icon-downArrow styles_icon__1L0c1"></span>
                                            </a>
                                        </div>

                                        <div className="_32sRE" data-testid="Favourites-collapsible-submenuitem">
                                            <a className="Ripple_container__17nxL _2AdD- styles_container__1KzFz" href="/collections/83951?type=rcv2">
                                                <div className="styles_content__2JtQA">
                                                    <div className="Zo88I">
                                                        <span className="_33X77 icon-heartInverse"></span>
                                                        <div>Favourites</div>
                                                    </div>
                                                </div>
                                                <span className="icon-downArrow styles_icon__1L0c1"></span>
                                            </a>
                                        </div>

                                        <div className="_32sRE" data-testid="Settings-collapsible-submenuitem">
                                            <a className="Ripple_container__17nxL _2AdD- styles_container__1KzFz" href="/my-account/settings">
                                                <div className="styles_content__2JtQA">
                                                    <div className="Zo88I">
                                                        <span className="_33X77 icon-settings"></span>
                                                        <div>Settings</div>
                                                    </div>
                                                </div>
                                                <span className="icon-downArrow styles_icon__1L0c1"></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payments & Refunds Section */}
                        <div className="NeDfT">
                            <div className="_3tVyU">
                                <div
                                    className="_2DP9e _1ra1j"
                                    data-testid="Payments___Refunds-container"
                                    role="button"
                                    tabIndex="0"
                                    aria-expanded="false"
                                    aria-controls="section-undefined"
                                >
                                    <span data-testid="Payments___Refunds-header">
                                        <div>
                                            <div className="_1ZxGJ">Payments &amp; Refunds</div>
                                            <div className="_2ovU_">Manage your Refunds, Payment Modes</div>
                                        </div>
                                    </span>
                                    <span className="icon-downArrow J0y6m" data-testid="Payments___Refunds-dropdown-icon" aria-hidden="true"></span>
                                </div>

                                <div
                                    className="_39p-f"
                                    id="section-undefined"
                                    role="region"
                                    data-testid="Payments___Refunds-content"
                                    tabIndex="0"
                                    aria-label=""
                                >
                                    <div className="_1Xqx7">
                                        <div className="_32sRE" data-testid="Refund_Status-collapsible-submenuitem">
                                            <a className="Ripple_container__17nxL _2AdD- styles_container__1KzFz" href="/my-account/refunds">
                                                <div className="styles_content__2JtQA">
                                                    <div className="Zo88I">
                                                        <span className="_33X77 icon-transactions _3hQbN"></span>
                                                        <div>Refund Status</div>
                                                        <span className="dL3fn">0 active refund</span>
                                                    </div>
                                                </div>
                                                <span className="icon-downArrow styles_icon__1L0c1"></span>
                                            </a>
                                        </div>

                                        <div className="_32sRE" data-testid="Payment_Modes-collapsible-submenuitem">
                                            <a className="Ripple_container__17nxL _2AdD- styles_container__1KzFz" href="/my-account/payments">
                                                <div className="styles_content__2JtQA">
                                                    <div className="Zo88I">
                                                        <span className="_33X77 icon-payment _3hQbN"></span>
                                                        <div>Payment Modes</div>
                                                    </div>
                                                </div>
                                                <span className="icon-downArrow styles_icon__1L0c1"></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Sections */}
                        <div className="NeDfT" data-testid="swiggy-super-menu-item">
                            <a href="/" className="Ripple_container__17nxL _1ra1j styles_container__1KzFz">
                                <div className="styles_content__2JtQA">
                                    <div className="_2Jnkx">
                                        <div>
                                            <div className="_1ZxGJ">
                                                <div className="VZbKR">
                                                    <img
                                                        alt=""
                                                        className="_2SVgO"
                                                        height="30"
                                                        width="88"
                                                        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_88,h_30/swiggy_one/OneLogo_3x"
                                                    />
                                                    <span className="xnEFC">membership</span>
                                                </div>
                                                <span className="z_OXN _26nw5">Buy Now</span>
                                            </div>
                                            <div className="_2ovU_">Unlock UNLIMITED Free Deliveries on Food &amp; Instamart. Buy Swiggy One</div>
                                        </div>
                                    </div>
                                </div>
                                <span className="icon-downArrow styles_icon__1L0c1"></span>
                            </a>
                        </div>

                        <div className="NeDfT" data-testid="help-my-account-tab">
                            <a href="/" className="Ripple_container__17nxL _1ra1j styles_container__1KzFz">
                                <div className="styles_content__2JtQA">
                                    <div className="_2Jnkx">
                                        <div>
                                            <div className="_1ZxGJ">Help</div>
                                            <div className="_2ovU_">FAQs &amp; Links</div>
                                        </div>
                                    </div>
                                </div>
                                <span className="icon-downArrow styles_icon__1L0c1"></span>
                            </a>
                        </div>
                    </div>

                    {/* Logout and App Version */}
                    <section data-testid="account-logout-options-tab" className="_2N4la">
                        <div>
                            <a href="/" className="Ripple_container__17nxL _1q4Zi styles_container__1KzFz">
                                <div className="styles_content__2JtQA">Logout Options</div>
                                <span className="icon-downArrow styles_icon__1L0c1"></span>
                            </a>
                        </div>
                    </section>
                    <section className="_2N4la">
                        <div className="_1ufNE">
                            <button className="_1ufNE" data-testid="account-app-version">App version v5.3.8-mweb</button>
                        </div>
                    </section>
                </div>
            </div>
                <div className="_1r-M3 _3JaG6"></div>
            </div>
        </>
    );
}