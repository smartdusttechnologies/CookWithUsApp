import React from "react";
import "./ItemAddedPopUp.css";

export default function PhoneItemAddedPopUp({ itemCount }) {

    return (
        <div className="">
        <div className="MenuStickyBottom_viewCart__2nNZr MenuStickyBottom_viewCartVisible__37lWa">
            <button
                className="styles_container__3hEcN"
                data-testid="menu-view-cart-footer"
                aria-label="Cart details: 1 item added present, total: undefined. Double tap to go to Cart Page."
                id="view-cart-btn"
                
            >
                <span className="styles_content__ImcAX" aria-hidden="true">
                    <span className="styles_main__3AbDx">
                            <span className="styles_mainTitle__2eRLR">{itemCount} item added</span>
                        <span className="styles_mainSubTitle__ZF_NC"></span>
                    </span>
                        <a href="/cart" style={{textDecoration:'none'}} className="styles_viewCart__32FxP">
                        <span>View Cart</span>
                        <img
                            alt=""
                            className="styles_viewCartIcon__2AoqF"
                            height="14"
                            loading="lazy"
                            width="14"
                            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/ChatbotAssets/Checkout_Cart"
                        />
                    </a>
                </span>
            </button>
            </div>
        </div>
    );
}