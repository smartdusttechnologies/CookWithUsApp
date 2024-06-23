import React, { useEffect,useState } from "react";
import { Search, ChevronDown } from 'lucide-react';
import "./PhoneRestaurantMenu.css";
import {  FetchMenuCategory, GetMenuByCategoryID} from "../../../services/restaurantServices";
export default function PhoneRestaurantMenu() {
    const [allMenuCategory, setAllMenuCategory] = useState([]);
    useEffect(() => {
        const elements = document.getElementsByClassName('_2PhoneTopBar');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
    }, []);
    useEffect(() => {
        getMenuCategory();
    }, []);
    const getMenuCategory = () => {
        const RestaurantId = 1;
        FetchMenuCategory(RestaurantId)
            .then(Response => {
                setAllMenuCategory(Response.data);
            });
    }
    return (
        <>
            <div className="_3mainMenuTopBar">
                <div className="_3allManuTab">
                    <div className="_3MenuTab _3PhoneMenuItems">
                        Items
                    </div>
                    <div className="_3MenuTab _3PhoneMenuAddOns">
                        Add-Ons
                    </div>
                    <div className="_3MenuTab _3PhoneMenuCategory">
                        Category
                    </div>
                    <div className="_3MenuTab _3PhoneMenuSubCategory">
                        Subcategory
                    </div>
                </div>
                <div className="_3MenuSearch">
                    <input type="text" placeholder="Search Items" class="_3menuSearchTextField" />
                    <div className="_3menuSearchIcon">
                        <Search />
                    </div>
                </div>
            </div>
            <div className="_3outOfStockSection">
                <div className="_3outOfStockSectiontext">
                    <div className="_3outOfStockSectionMaintext">
                    Out of stock items
                    </div>
                    <div className="_3outOfStockSectionInfo">
                    1 item
                    </div>
                </div>
                <div className="_3outOfStockSectionIcon">
                    <ChevronDown />
                </div>
            </div>
            {allMenuCategory.map((eachMenuCategory, index) => (
                <div className="_3categoryWithMenu">
                    <div className="_3CategoryName">
                        {eachMenuCategory.categoryName}
                    </div>
                    <div className="_3menuItem">
                        <div>
                            <div className="category-name">Masala Tea</div>
                            <div className="item-price">$10</div>
                        </div>
                        <div className="category-toggle-button">
                            <input
                                type="checkbox"
                                id={`toggle`}
                                className="_3toggle-input"
                            />
                            <label htmlFor={`toggle`} className="_3toggle-label"></label>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}