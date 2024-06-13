import React, { useState, useEffect } from "react";
import "./AddVariantPopup.css";
import CreateVariantPopup from "../../../Components/RestaurantUi/PopUp/CreateVariantPopup";
import { ArrowLeft, CookingPot, Soup, Cookie, Pizza, Plus, Cherry, Salad } from 'lucide-react';
const AddVariantPopup = ({ setOpenCreateVariantPopup, openCreateVariantPopup, setOpenAddVariantPopup, allVariantOption, VariantName, setVariantName }) => {
    
    
    const handleButtonClick = (name) => {
        setOpenCreateVariantPopup(true);
        setVariantName(name);
    };
    return (
        <>
        <div className="variantSidebar modalOpen">
            <div className="topHeading"><ArrowLeft onClick={() => setOpenAddVariantPopup(false)} /><div style={{ fontWeight: '500', fontSize: '20px', margin: '0 5px' }}>Add a variant group </div></div>
            <div className="allVariantType" style={{margin:"25px"} }>
                <div className="AllitemVariants">
                        <div onClick={() => handleButtonClick('Quantity')} className="perItemVariant" style={{ backgroundColor: "#b8ffeb" }}>
                        <div className="variantIcon"><CookingPot className="perVariantIcon" /></div>
                        <div className="variantDetais">
                            <div className="variantName">Quantity</div>
                            <div className="variantInfo">Quantity variations like-Small, medium.large.etc</div>
                        </div>
                    </div>
                        <div onClick={() => handleButtonClick('Preparation type')} className="perItemVariant" style={{ backgroundColor: "rgb(184 255 254)" }}>
                        <div className="variantIcon"><Soup className="perVariantIcon" /></div>
                        <div className="variantDetais">
                            <div className="variantName">Preparation type</div>
                            <div className="variantInfo">item preparation style, eg-Halal, non-Halal, etc</div>
                        </div>
                    </div>
                </div>
                <div className="AllitemVariants">
                        <div onClick={() => handleButtonClick('Size')} className="perItemVariant" style={{ backgroundColor: "rgb(184 220 255)" }}>
                        <div className="variantIcon"><Cookie className="perVariantIcon" /></div>
                        <div className="variantDetais">
                            <div className="variantName">Size</div>
                            <div className="variantInfo">Different sizes of an item, eg-bread size, pizza size= 6,12,etc</div>
                        </div>
                    </div>
                        <div onClick={() => handleButtonClick('Base')} className="perItemVariant" style={{ backgroundColor: "rgb(255 213 213)" }}>
                        <div className="variantIcon"><Pizza className="perVariantIcon" /></div>
                        <div className="variantDetais">
                            <div className="variantName">Base</div>
                            <div className="variantInfo">Item Base types , eg-wheat bread,multi-grain bread,etc</div>
                        </div>
                    </div>
                </div>
                <div className="AllitemVariants">
                        <div onClick={() => handleButtonClick('Rice')} className="perItemVariant" style={{ backgroundColor: "rgb(255 250 221)" }}>
                        <div className="variantIcon"><Salad className="perVariantIcon" /></div>
                        <div className="variantDetais">
                            <div className="variantName">Rice</div>
                            <div className="variantInfo">Choice of item's rice selection</div>
                        </div>
                    </div>
                        <div onClick={() => handleButtonClick()} className="perItemVariant" style={{ border: "2px dotted" }}>
                        <div className="variantIcon"><Plus className="perVariantIcon" /></div>
                        <div className="variantDetais">
                            <div className="variantName">Make your own</div>
                            <div className="variantInfo">Define your own variation if you can't find a template above</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {
        openCreateVariantPopup && (
                    <CreateVariantPopup setOpenAddVariantPopup={setOpenAddVariantPopup} allVariantOption={allVariantOption} VariantName={VariantName} setOpenCreateVariantPopup={setOpenCreateVariantPopup} />
        )
    }
        </>
    );
}
export default AddVariantPopup;