
import react, { useRef, useEffect, useState } from "react";
import "./ItemAddedPopUp.css";
import { X, Circle, Salad, IndianRupee, CircleCheck } from 'lucide-react';
function ItemAddedPopUp({ itemCount }) {
    
    return (
        <button className="styles_container__3hEcN" data-testid="menu-view-cart-footer" id="view-cart-btn" style={{position:"fixed"} }>
            <span className="styles_content__ImcAX" aria-hidden="true">
                <span className="styles_main__3AbDx">
                    <span className="styles_mainTitle__2eRLR">{itemCount} item{itemCount !== 1 ? 's' : ''} added</span>
                    <span className="styles_mainSubTitle__ZF_NC"></span>
                </span>
                <span className="styles_viewCart__32FxP">
                    <span>View Cart</span>
                    <img alt="" className="styles_viewCartIcon__2AoqF" height="14" loading="lazy" width="14" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/ChatbotAssets/Checkout_Cart" />
                </span>
            </span>
        </button>
    );
}

export default ItemAddedPopUp;