﻿import React, { useState,useEffect } from "react";
import { X, ChevronUp, ChevronDown, SquareDot, ShieldQuestion, Pencil, Cookie, Pizza, Plus, Cherry, Salad, Citrus, CloudUpload, Info, CookingPot, Soup } from 'lucide-react';
import "./RestaurantMenu.css";
import { AddMenuCategory, FetchMenuCategory, CreateMenu, GetMenuByCategoryID, UpdateMenu, DeleteMenu, UpdateMenuCategory } from "../../../services/restaurantServices";
import AddVariantPopup from "../../../Components/RestaurantUi/PopUp/AddVariantPopup";
import CreateVariantPopup from "../../../Components/RestaurantUi/PopUp/CreateVariantPopup";
const RestaurantMenu = ({setActiveTab, activeTab}) => {
    const [allVariantOption, setAllVariantOption] = useState([]);
    const [VariantName, setVariantName] = useState(null);
    const [activeMenuCategoryTab, setActiveMenuCategoryTab] = useState();
    const [activeMenuItemTab, setActiveMenuItemTab] = useState();
    const [activeMenuItemTabStatic, setActiveMenuItemTabStatic] = useState();
    const [menuTab, setMenuTab] = useState(1);
    const [allMenuCategory, setAllMenuCategory] = useState([]);
    const [itemGetByCategory, setItemGetByCategory] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [openAddVariantPopup, setOpenAddVariantPopup] = useState(false);
    const [openCreateVariantPopup, setOpenCreateVariantPopup] = useState(false);
    const [eachItemDetails, setEachItemDetails] = useState([]);
    const [activeAddItem, setActiveAddItem] = useState(false);
    const [isCategoryHovered, setIsCategoryHovered] = useState(Array(allMenuCategory.length).fill(false));
    const [editCategoryDetails, setEditCategoryDetails] = useState([]);
    const [categoryNameValue, setCategoryNameValue] = useState();
    const handleAddItemsButton = () => {
        const details = {
            Id: 0,
            RestaurantID: 1,
            Name: document.getElementById("addItemName").value,
            Type: eachItemDetails.type,
            Price: parseInt(document.getElementById("item_price").value),
            Quantity: 20,
            ImageUrl: '1',
            Info: document.getElementById("addItemInfo").value,
            CategoryID: activeMenuCategoryTab,
            InStock: 1,
            PackingPrice: parseInt(document.getElementById("packiging_price").value),
            GstPrice: parseInt(document.getElementById("gst_price").value),
             variants : allVariantOption.flatMap(variant =>
                variant.map(eachVariantDetails => ({
                    VariantID: 0,
                    MenuId:0,
                    VariantName: eachVariantDetails.variantName,
                    OptionName: eachVariantDetails.optionName,
                    OptionType: eachVariantDetails.vegType,
                    OptionPrice: eachVariantDetails.price
                }))
            )
        };
       
        CreateMenu(details)
            .then(response => {

                itemDetailsGetByCategoryId();
            })
            .catch(error => {

                console.error("An error occurred while adding address:", error);
            });
    }
    const handleUpdateItemsButton = () => {
        const details = {
            Id: activeMenuItemTab,
            RestaurantID: 1,
            Name: document.getElementById("addItemName").value,
            Type: eachItemDetails.type,
            Price: parseInt(document.getElementById("item_price").value),
            Quantity: 20,
            ImageUrl: '1',
            Info: document.getElementById("addItemInfo").value,
            CategoryID: activeMenuCategoryTab,
            InStock: 1,
            PackingPrice: parseInt(document.getElementById("packiging_price").value),
            GstPrice: parseInt(document.getElementById("gst_price").value),
            variants: allVariantOption.flatMap(variant =>
                variant.map(eachVariantDetails => ({
                    VariantID: 0,
                    MenuId: 0,
                    VariantName: eachVariantDetails.variantName,
                    OptionName: eachVariantDetails.optionName,
                    OptionType: eachVariantDetails.vegType,
                    OptionPrice: eachVariantDetails.price
                }))
            )
        };
        UpdateMenu(details)
            .then(response => {

                itemDetailsGetByCategoryId();
            })
            .catch(error => {

                console.error("An error occurred while adding address:", error);
            });
    }
    const handleDeleteItemButton = () => {
        DeleteMenu(activeMenuItemTab)
            .then(response => {

                itemDetailsGetByCategoryId();
            })
            .catch(error => {

                console.error("An error occurred while adding address:", error);
            });
    }
    useEffect(() => {
        if (editCategoryDetails.length !== 0) { setCategoryNameValue(editCategoryDetails.categoryName); }
        else {
            setCategoryNameValue();
        }
    }, [editCategoryDetails]);
    useEffect(() => {
        getMenuCategory();
    }, []);
    useEffect(() => {
        itemDetailsGetByCategoryId();
    }, [activeMenuCategoryTab]);
    const itemDetailsGetByCategoryId = () => {
        GetMenuByCategoryID(activeMenuCategoryTab)
            .then(response => {
                setItemGetByCategory(response.data);
                setActiveMenuItemTab(response.data[0].id);
                setActiveMenuItemTabStatic(response.data[0].id);
            })
            .catch(error => {

                console.error("An error occurred while adding address:", error);
            });
    }
    const getMenuCategory = () => {
        const RestaurantId = 1;
        FetchMenuCategory(RestaurantId)
            .then(Response => {
                setAllMenuCategory(Response.data);
                setActiveMenuCategoryTab(Response.data[0].id);
            });
    }
    const handleAllitemVariantsButton = (name) => {
        setOpenCreateVariantPopup(true);
        setVariantName(name);
    };
    const handleSubmit = () => {
        const Details = {
            restaurantId:1,
            categoryName: document.getElementById("category_name").value,
            InStock: 1,
            NextStockTime:"now",
        };
        AddMenuCategory(Details)
            .then(response => {
                getMenuCategory();
            })
            .catch(error => {
                console.error("An error occurred while adding address:", error);
            });
    };
    const handleUpdate = () => {
        const Details = {
            ID: editCategoryDetails.id,
            restaurantId: 1,
            categoryName: document.getElementById("category_name").value,
            InStock: 1,
            NextStockTime: "now",
        };
        UpdateMenuCategory(Details)
            .then(response => {
                getMenuCategory();
            })
            .catch(error => {
                console.error("An error occurred while adding address:", error);
            });
    }
    const [createCategoryPopup, setCreateCategoryPopup] = useState(false);
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedFile({
                    preview: reader.result,
                    name: file.name
                });
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedFile(null);
        }
    };
    useEffect(() => {
        if (createCategoryPopup) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        // Clean-up function to remove the class when component unmounts
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [createCategoryPopup]);
    useEffect(() => {
        if (openAddVariantPopup) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        // Clean-up function to remove the class when component unmounts
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [openAddVariantPopup]);
    const getItemDetails = () => {
        const perItemDetails = itemGetByCategory.find(item => item.id === activeMenuItemTab);
        const perItemVariant = (perItemDetails?.variants || []).filter(item => item !== null);
        const newVariantDetails = [];
        if (perItemVariant && perItemVariant.length > 0) {
            const groupedVariants = {};

            perItemVariant.forEach(item => {
                const { variantName, optionName, optionType, optionPrice } = item;
                const key = variantName.toLowerCase();

                if (!groupedVariants[key]) {
                    groupedVariants[key] = [];
                }

                groupedVariants[key].push({
                    variantName: variantName,
                    optionName: optionName,
                    vegType: optionType,
                    price: optionPrice
                });
            });

            // Push the grouped variants into allVariantOption
            Object.values(groupedVariants).forEach(variantGroup => {
                newVariantDetails.push(variantGroup);
            });


            setAllVariantOption(newVariantDetails);
        }
        else {
            setAllVariantOption(newVariantDetails);
        }

        setEachItemDetails(perItemDetails);
    }
    useEffect(() => {
        getItemDetails();
    }, [activeMenuItemTab]);
    const removeVariant = (indexToRemove) => {
        setAllVariantOption(prevVariants => {
            return prevVariants.filter((_, index) => index !== indexToRemove);
        });
    };
    const handleMouseEnterCategory = (index) => {
        const updatedHoveredState = [...isCategoryHovered];
        updatedHoveredState[index] = true;
        setIsCategoryHovered(updatedHoveredState);
    };
    const handleMouseLeaveCategory = (index) => {
        const updatedHoveredState = [...isCategoryHovered];
        updatedHoveredState[index] = false;
        setIsCategoryHovered(updatedHoveredState);
    };
    setActiveTab("MENU");

    return (
        <div
            style={{
                margin: " 140px 0 0 100px"
            }}>
            <div className="topbar2" style={{ height: '50px' }}>
                <div style={{ color: 'white', fontWeight: 500, marginTop: '10px' }}>
                    You are Viewing the details of Datiyana,Bikram,Patna,Bihar
                </div>
            </div>
            <div className="topbar2" style={{ height: '50px' }}>
                <div style={{ color: 'white', fontWeight: 500, marginTop: '10px' }}>
                    You are Viewing the details of Datiyana,Bikram,Patna,Bihar
                </div>
            </div>
            <div className="topbar2" style={{ height: '50px', top: '130px', backgroundColor: 'rgb(51, 56, 71)' }}>
                <div style={{ color: 'white', fontWeight: 500, marginTop: '10px' }}>
                    <div style={{ display: 'flex' }}>
                        <div className={`menuTabs ${menuTab === 1 ? 'activeButtonBorder' : ''}`} style={{ margin: '0 40px 0 0' }} onClick={() => setMenuTab(1)}>ITEM AVAILABILITY</div>
                        <div className={`menuTabs ${menuTab === 2 ? 'activeButtonBorder' : ''}`} style={{ margin: '0 40px' }} onClick={() => setMenuTab(2)}>MENU EDITOR</div>
                        <div className={`menuTabs ${menuTab === 3 ? 'activeButtonBorder' : ''}`} onClick={() => setMenuTab(3)}>HISTORY OF MENU CHANGES</div>
                    </div>
                </div>
            </div>
            {menuTab === 1 && (
                <div>
                    <div className="topbar2" style={{ minHeight: '50px', top: '180px', height: 'unset', backgroundColor: 'white', justifyContent: 'space-between', width: '95vw', padding: '20px' }}>
                        <div>
                            <input
                                className="form-control"
                                placeholder="Search for an item or category"
                                style={{ width: '250px', padding: '10px', fontWeight: 600 }}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '210px', margin: '0px 80px', alignItems: 'center' }}>
                            <div>NEED HELP</div>
                            <div style={{ backgroundColor: 'orange', padding: '10px 20px', color: 'wheat' }}>
                                OUT OF STOCK<span>0</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ top: '250px', position: 'fixed', margin: '20px', left: '100px' }}>
                        <div className="menuSection">
                            <div className="categorySection">
                                <h3>CATEGORY | {allMenuCategory.length }</h3>
                                <div className="allCategory">
                                    {allMenuCategory.map((eachMenuCategory, index) => (
                                        <div className="menuCategory" key={index}>
                                            <div className="category-name">{eachMenuCategory.categoryName}</div>
                                            <div className="category-toggle-button">
                                                <input
                                                    type="checkbox"
                                                    id={`toggle${index}`}
                                                    className="toggle-input"
                                                    checked={eachMenuCategory.inStock === 1}
                                                />
                                                <label htmlFor={`toggle${index}`} className="toggle-label"></label>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                            <div className="itemSection">
                                <h3>ITEMS | {itemGetByCategory.length}</h3>
                                <div className="allItem">
                                    <div className="menuItem">
                                        <div className="itemDetails">
                                            <div className="itemName">Plain Fries</div>
                                            <div className="itemPrice">₹66.67</div>
                                            <div className="itemVariant">+2 Variants</div>
                                        </div>
                                        <div className="category-toogle-button">
                                            <input type="checkbox" id="toggleItem1" className="toggle-input" />
                                            <label for="toggleItem1" className="toggle-label"></label>
                                        </div>
                                    </div>
                                    <div className="menuItem">
                                        <div className="itemDetails">
                                            <div className="itemName">Masala Fries</div>
                                            <div className="itemPrice">₹80</div>
                                            <div className="itemVariant">+2 Variants</div>
                                        </div>
                                        <div className="category-toogle-button">
                                            <input type="checkbox" id="toggleItem2" className="toggle-input" />
                                            <label for="toggleItem2" className="toggle-label"></label>
                                        </div>
                                    </div>
                                    <div className="menuItem">
                                        <div className="itemDetails">
                                            <div className="itemName">Cheesy Fries</div>
                                            <div className="itemPrice">₹104.76</div>
                                            <div className="itemVariant">+2 Variants</div>
                                        </div>
                                        <div className="category-toogle-button">
                                            <input type="checkbox" id="toggleItem3" className="toggle-input" />
                                            <label for="toggleItem3" className="toggle-label"></label>
                                        </div>
                                    </div>
                                    <div className="menuItem">
                                        <div className="itemDetails">
                                            <div className="itemName">Cheesy Fries</div>
                                            <div className="itemPrice">₹104.76</div>
                                            <div className="itemVariant">+2 Variants</div>
                                        </div>
                                        <div className="category-toogle-button">
                                            <input type="checkbox" id="toggleItem4" className="toggle-input" />
                                            <label for="toggleItem4" className="toggle-label"></label>
                                        </div>
                                    </div>
                                    <div className="menuItem">
                                        <div className="itemDetails">
                                            <div className="itemName">Cheesy Fries</div>
                                            <div className="itemPrice">₹104.76</div>
                                            <div className="itemVariant">+2 Variants</div>
                                        </div>
                                        <div className="category-toogle-button">
                                            <input type="checkbox" id="toggleItem5" className="toggle-input" />
                                            <label for="toggleItem5" className="toggle-label"></label>
                                        </div>
                                    </div>
                                    <div className="menuItem">
                                        <div className="itemDetails">
                                            <div className="itemName">Cheesy Fries</div>
                                            <div className="itemPrice">₹104.76</div>
                                            <div className="itemVariant">+2 Variants</div>
                                        </div>
                                        <div className="category-toogle-button">
                                            <input type="checkbox" id="toggleItem6" className="toggle-input" />
                                            <label for="toggleItem6" className="toggle-label"></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {menuTab === 2 && (
                <div>
                    <div className="topbar2" style={{ minHeight: '50px', top: '180px', height: 'unset', backgroundColor: 'white', justifyContent: 'space-between', width: '95vw', padding: '20px' }}>
                        <div>
                            <input
                                className="form-control"
                                placeholder="Search for an item or category"
                                style={{ width: '250px', padding: '10px', fontWeight: 600 }}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '210px', margin: '0px 80px', alignItems: 'center' }}>
                            <div>NEED HELP</div>
                            <div style={{ backgroundColor: 'orange', padding: '10px 20px', color: 'wheat' }}>
                                OUT OF STOCK<span>0</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ top: '250px', position: 'fixed', margin: '20px' ,left: '100px'}}>
                        <div className="menuSection">
                            <div className={`categorySection ${activeAddItem ? 'unhideElement' : ''}`}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h3>CATEGORY | {allMenuCategory.length}</h3>
                                    <div onClick={() => setCreateCategoryPopup(true)} style={{ margin: '0 20px', fontSize: 'small', fontWeight: 500, color: '#0000bc', cursor: "pointer" }}>+ ADD NEW</div>
                                </div>
                                <div className="allCategory">
                                    {allMenuCategory.map((eachMenuCategory,index )=> (
                                        <div onMouseEnter={() => handleMouseEnterCategory(index)} onMouseLeave={() => handleMouseLeaveCategory(index)} className={`menuCategory ${activeMenuCategoryTab === eachMenuCategory.id ? 'menuCategoryActive' : ''}`} onClick={() => setActiveMenuCategoryTab(eachMenuCategory.id)}>
                                            <div className="category-name"> {eachMenuCategory.categoryName} </div>
                                            {activeMenuCategoryTab === eachMenuCategory.id && isCategoryHovered[index] && (
                                                <div onClick={() => { setCreateCategoryPopup(true); setEditCategoryDetails(eachMenuCategory)}} className="category-edit-icon"><Pencil style={{ height: '15px' }} /></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={`itemSection ${activeAddItem ? 'unhideElement' : ''}`} style={{width:"20vw"} }>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h3>ITEMS | {itemGetByCategory.length}</h3>
                                <div onClick={() => { setActiveMenuItemTab(); setActiveAddItem(true); }} style={{ margin: '0 20px', fontSize: 'small', fontWeight: 500, color: '#0000bc', cursor: "pointer" }}>+ ADD NEW</div>
                                </div>
                                <div className="allItem">
                                    {itemGetByCategory.map(item => (
                                        <div className={`menuItem ${activeMenuItemTab === item.id ? 'menuCategoryActive' : ''}`} onClick={() => setActiveMenuItemTab(item.id)}>
                                            <div className="itemDetails">
                                                <div className="itemName">{ item.name}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="itemSection" style={{ width: "45vw" }}>
                                <h3>ITEMS DETAILS</h3>
                                <div className="all_item_details">
                                    <div style={{margin:'20px'} }>
                                        <div className="basic-details">
                                            <div className="basic-details-heading"><span style={{ fontSize: "20px", fontWeight: "500" }}>Basic Details<span style={{ color: "#e0a02d", margin: "5px" }}>*</span></span> <span><ChevronUp style={{ color: "orange" }} /></span></div>
                                            <div className="basic-details-textarea">
                                                <div className="text-area-header">
                                                    <div className="basic-details-itemName" >
                                                        <input type="text" id="addItemName" value={eachItemDetails ? eachItemDetails.name : ''} onChange={(e) => setEachItemDetails({ ...eachItemDetails, name: e.target.value })}  style={{width: '100%',height: '100%',border: '1px '}}/>
                                                        <span style={{ fontSize: '12px', margin: '1px 7px', color: 'gray', fontWeight: 300 }}>80/100</span>
                                                    </div>
                                                    <div className="basic-details-itemType">
                                                        <div className="select-box-wrapper" style={{width:'100%'} }>
                                                            <select id="selectVegType" style={{ border: 'none', width: '100%' }} onChange={(e) => setEachItemDetails({ ...eachItemDetails, type: e.target.value })}>
                                                                <option value="Veg" selected={eachItemDetails && eachItemDetails.type === 'Veg'}>VEG</option>
                                                                <option value="NonVeg" selected={eachItemDetails && eachItemDetails.type === 'NonVeg'}>NON VEG</option>
                                                                <option value="EggVeg" selected={eachItemDetails && eachItemDetails.type === 'EggVeg'}>EGG VEG</option>

                                                            </select>

                                                            <label htmlFor="selectVegType"  className="arrow-down-icon"><ChevronDown /></label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <textarea name="basic_details_input" id="addItemInfo" rows="10" className="basic_details_input" >{eachItemDetails ?eachItemDetails.info:''}</textarea>
                                            </div>
                                        </div>
                                        <hr style={{ margin: "40px 0 20px 0" }} />
                                        <div className="item-pricing">
                                            <div className="basic-details-heading"><span style={{ fontSize: "20px", fontWeight: "500" }}>Item Pricing<span style={{ color: "#e0a02d", margin: "5px" }}>*</span></span> <span><ChevronUp style={{ color: "orange" }} /></span></div>
                                            <div className="total-pricing">
                                                <div className="price"><label className="pricing_input_label" htmlFor="item_price">PRICE</label><input type="number" id="item_price" className="pricing_Input" value={eachItemDetails ? eachItemDetails.price : 0} onChange={(e) => setEachItemDetails({ ...eachItemDetails, price: e.target.value })} /></div>
                                                <div className="packaging"><label className="pricing_input_label" htmlFor="packiging_price">PACKAGING</label><input type="number" id="packiging_price" className="pricing_Input" value={eachItemDetails ? eachItemDetails.packingPrice : 0} onChange={(e) => setEachItemDetails({ ...eachItemDetails, packingPrice: e.target.value })} /></div>
                                                <div className="gst"><label className="pricing_input_label" htmlFor="gst_price">GST</label><input type="number" id="gst_price" className="pricing_Input" value={eachItemDetails ? eachItemDetails.gstPrice : 0} onChange={(e) => setEachItemDetails({ ...eachItemDetails, gstPrice: e.target.value })} /></div>
                                            </div>
                                            <div  style={{ fontWeight: 400 }}>
                                                Final Price
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <div style={{ width: '30%' }}>
                                                        <div style={{ fontWeight: 400, fontSize: '25px' }}>₹ 0.00</div>
                                                        <div style={{ fontWeight: 400 }}>Price+Packaging+GST</div>
                                                    </div>
                                                    <div style={{ width: '70%', justifyContent: 'center', display: 'flex' }}>
                                                        <span style={{ backgroundColor: '#edd998', width: '75%', padding: '5px', display: 'flex', fontWeight: 400, borderRadius: '5px', fontSize: '14px' }}>
                                                            Please ensure the item price matches the price in your menu to avoid rejection of changes
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr style={{ margin: "40px 0 20px 0" }} />
                                        <div className="item-variant">
                                            <div className="basic-details-heading"><span style={{ fontSize: "20px", fontWeight: "500" }}>Variants of this item</span> <span><ChevronUp style={{ color: "orange" }} /></span></div>
                                            <div style={{ width: "70%" }}>You can create diffrent variations of this item. like quantity,size,base/crust, etc.While placing order. Customer will select exactly one of your defined variants </div>
                                            <div style={{ fontSize: '15px', color: '#00619e', fontWeight: 400, marginTop: "20px" }}>What's this <ShieldQuestion style={{ height: '15px' }} /></div>
                                            <div style={{display:'ruby'} }>
                                            {allVariantOption.length === 0 ? (
                                                <>
                                                    <div className="AllitemVariants">
                                                            <div className="perItemVariant" onClick={() => handleAllitemVariantsButton('Quantity')} style={{ backgroundColor: "#b8ffeb" }}>
                                                            <div className="variantIcon"><CookingPot className="perVariantIcon" /></div>
                                                            <div className="variantDetais">
                                                                <div className="variantName">Quantity</div>
                                                                <div className="variantInfo">Quantity variations like-Small, medium.large.etc</div>
                                                            </div>
                                                        </div>
                                                            <div className="perItemVariant" onClick={() => handleAllitemVariantsButton('Preparation type')} style={{ backgroundColor: "rgb(184 255 254)" }}>
                                                            <div className="variantIcon"><Soup className="perVariantIcon" /></div>
                                                            <div className="variantDetais">
                                                                <div className="variantName">Preparation type</div>
                                                                <div className="variantInfo">item preparation style, eg-Halal, non-Halal, etc</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="AllitemVariants">
                                                            <div className="perItemVariant" onClick={() => handleAllitemVariantsButton('Size')} style={{ backgroundColor: "rgb(184 220 255)" }}>
                                                            <div className="variantIcon"><Cookie className="perVariantIcon" /></div>
                                                            <div className="variantDetais">
                                                                <div className="variantName">Size</div>
                                                                <div className="variantInfo">Different sizes of an item, eg-bread size, pizza size= 6,12,etc</div>
                                                            </div>
                                                        </div>
                                                            <div className="perItemVariant" onClick={() => handleAllitemVariantsButton('Base')} style={{ backgroundColor: "rgb(255 213 213)" }}>
                                                            <div className="variantIcon"><Pizza className="perVariantIcon" /></div>
                                                            <div className="variantDetais">
                                                                <div className="variantName">Base</div>
                                                                <div className="variantInfo">Item Base types , eg-wheat bread,multi-grain bread,etc</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                allVariantOption.map((variant, index) => (
                                                    <div className="selectedVariant" key={index}>
                                                        <div className="selectedVariantTitle">
                                                            <div className="selectedVariantName">{variant[0].variantName}</div>
                                                            <Pencil style={{ height: '15px', margin: '10px', cursor: 'pointer' }} />
                                                        </div>
                                                        <div className="variantCompulsory">Compulsory</div>
                                                        <div className="selectedVariantTypes">
                                                            {variant.map((eachVariant, count) => (
                                                                <div className="selectedVariantType" key={count}>
                                                                    <div className="vegIcon"><SquareDot style={{ color: eachVariant.vegType === 'Veg' ? 'green' : eachVariant.vegType === 'NonVeg' ? 'red' : 'yellow' }} /></div>
                                                                    <div className="selectedVariantTypeName">{eachVariant.optionName}</div>
                                                                    <div className="selecteVariantPrice">₹{eachVariant.price}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div onClick={() => removeVariant(index)} style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px', fontWeight: '500', color: '#0336a2', cursor: 'pointer', height: '100%', alignItems: 'end' }}>
                                                            REMOVE
                                                        </div>
                                                    </div>
                                                ))
                                                
                                            )}
                                            </div>
                                            <div onClick={() => setOpenAddVariantPopup(true)} style={{border: '2px solid #b87700',width: 'fit-content',padding: '7px 10px',color: '#b87700',fontWeight: 500,marginTop: '20px',cursor:'pointer'}}>ADD VARIANT S GROUPS</div>
                                        </div>
                                        <hr style={{ margin: "40px 0 20px 0" }} />
                                        <div className="item-add-on">
                                            <div className="basic-details-heading"><span style={{ fontSize: "20px", fontWeight: "500" }}>Add-on groups for this items</span> <span><ChevronUp style={{ color: "orange" }} /></span></div>
                                            <div style={{ width: "70%" }}>You can offer customisation options like looping.extras,addons for customer.You can also define it customer selection of these options is optional or mandatory</div>
                                            <div style={{ fontSize: '15px', color: '#00619e', fontWeight: 400, marginTop: "20px" }}>What's this <ShieldQuestion style={{ height: '15px' }} /></div>
                                            <div className="AllitemVariants">
                                                <div className="perItemVariant" style={{ backgroundColor: "rgb(218 255 245)" }}>
                                                    <div className="variantIcon"><Cherry className="perVariantIcon" /></div>
                                                    <div className="variantDetais">
                                                        <div className="variantName">Add-ons</div>
                                                        <div className="variantInfo">Add-ons like Curd,Coke,Raita,etc.</div>
                                                    </div>
                                                </div>
                                                <div className="perItemVariant" style={{ backgroundColor: "rgb(220 255 255)" }}>
                                                    <div className="variantIcon"><Salad className="perVariantIcon" /></div>
                                                    <div className="variantDetais">
                                                        <div className="variantName">Extras</div>
                                                        <div className="variantInfo">Extra Ingredients like cheese,tomato,mushroom,etc</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="AllitemVariants">
                                                <div className="perItemVariant" style={{ backgroundColor: "rgb(219 237 255)" }}>
                                                    <div className="variantIcon"><Citrus className="perVariantIcon" /></div>
                                                    <div className="variantDetais">
                                                        <div className="variantName">Toppings</div>
                                                        <div className="variantInfo">Sauces like Pesto,Mint Mayonnaise,Honey Mustard</div>
                                                    </div>
                                                </div>
                                                <div className="perItemVariant" style={{ border:"2px dotted" }}>
                                                    <div className="variantIcon"><Plus className="perVariantIcon" /></div>
                                                    <div className="variantDetais">
                                                        <div className="variantName">Make your own</div>
                                                        <div className="variantInfo">Build your own addon group if you didn't find one above</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr style={{ margin: "40px 0 20px 0" }} />
                                        <div className="item-image">
                                            <div className="basic-details-heading"><span style={{ fontSize: "20px", fontWeight: "500" }}>Item Image</span> <span><ChevronUp style={{ color: "orange" }} /></span></div>
                                            <div style={{ width: "70%" }}>Select a good quality of image of this item</div>
                                            <input type="file" id="itemImage" name="itemImage" style={{ display: "none" }} onChange={handleFileChange} />
                                            <label for="itemImage" style={{ height: '250px', display: 'flex', width: '100%', border: '1px solid', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',marginTop :'10px' }}>
                                            {selectedFile ? (
                                                <div>
                                                    <img src={selectedFile.preview} alt="Preview" style={{ width: 'auto', height: '250px', border: '1px solid #ddd'}} />
                                                </div>
                                                ) : (
                                                <>
                                                        <CloudUpload style={{ height: '100px', width: '100px', color: '#000073', }} />
                                                        <div style={{ border: '1px solid', padding: '10px', fontWeight: 500, }}>
                                                            Upload Image
                                                        </div>
                                                </>
                                                )}
                                            </label>
                                            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 100px' }}> 
                                                <div className="imageRequirements">
                                                    <div className="requirement-type">FORMATS</div>
                                                    <div className="requirement-info">JPG,PNG</div>
                                                </div>
                                                <div className="imageRequirements">
                                                    <div className="requirement-type">DIMENSION</div>
                                                    <div className="requirement-info">133px X 133px</div>
                                                </div>
                                                <div className="imageRequirements">
                                                    <div className="requirement-type">MAX SIZE</div>
                                                    <div className="requirement-info">20 MB</div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', fontWeight: 400 }}>
                                                Quantity should be same as you serve for dine-in customers
                                            </div>
                                        </div>
                                        <hr style={{ margin: "40px 0 20px 0" }} />
                                        <div className="itemTiming">
                                            <div className="basic-details-heading"><span style={{ fontSize: "20px", fontWeight: "500" }}>Item timings</span> <span><ChevronUp style={{ color: "orange" }} /></span></div>
                                            <div style={{ width: "70%" }}>Please specify the timing when this item will be available on Cook With Us</div>
                                            <div style={{ fontSize: '15px', color: 'rgb(255 120 0)', fontWeight: 400, marginTop: "20px" }}><Info style={{ height: '15px' }} />Each day can have only maximum of 3 timeslots</div>
                                            <div className="itemTimingInputs">
                                                <div className="itemTimingOption">
                                                    <div className="itemTimingCheckbox">
                                                        <div class="circle-radio">
                                                            <input type="radio" id="option1" name="options" value="option1" />
                                                            <div style={{ height: '15px', width: '15px', border: '2px solid blue', justifyContent: 'center', display: 'flex', alignItems: 'center', borderRadius: '50%' }}>
                                                                <label for="option1"></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="itemTimingOptionName">
                                                        Item is available at <b>all times when kitchen / restaurant is open on Cook With Us</b>
                                                    </div>
                                                </div>
                                                <div className="itemTimingOption">
                                                    <div className="itemTimingCheckbox">
                                                        <div class="circle-radio">
                                                            <input type="radio" id="option2" name="options" value="option2" />
                                                            <div style={{ height: '15px', width: '15px', border: '2px solid blue', justifyContent: 'center', display: 'flex', alignItems: 'center', borderRadius: '50%' }}>
                                                                <label for="option2"></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="itemTimingOptionName">
                                                        Item is available at <b>same time for all days of the week</b>
                                                    </div>
                                                </div>
                                                <div className="itemTimingOption">
                                                    <div className="itemTimingCheckbox">
                                                        <div class="circle-radio">
                                                            <input type="radio" id="option3" name="options" value="option3" />
                                                            <div style={{ height: '15px', width: '15px', border: '2px solid blue', justifyContent: 'center', display: 'flex', alignItems: 'center', borderRadius: '50%' }}>
                                                                <label for="option3"></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="itemTimingOptionName">
                                                        Item is available at <b>diffrent times during diffrent days of the week</b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px', backgroundColor: 'white', borderTop: '1px solid lightgrey' }}>
                                        {activeAddItem ? (
                                            <div onClick={() => { setActiveMenuItemTab(activeMenuItemTabStatic); setActiveAddItem(false); }} style={{ margin: '0 10px', border: '2px solid', fontWeight: '500', padding: '5px 10px', cursor: 'pointer' }}>CANCEL</div>
                                        ) : (
                                                <div onClick={handleDeleteItemButton} style={{ margin: '0 10px', fontWeight: '500', padding: '5px 10px', cursor: 'pointer' }}>DELETE ITEM</div>
                                        )}
                                        {activeAddItem ? (
                                            <div onClick={handleAddItemsButton} style={{ margin: '0 10px', backgroundColor: 'rgb(253 164 0)', padding: '5px 10px', color: 'white', fontWeight: '500', cursor: 'pointer' }}>CREATE</div>
                                        ) : (
                                            <div onClick={handleUpdateItemsButton} style={{ margin: '0 10px', backgroundColor: 'rgb(253 164 0)', padding: '5px 10px', color: 'white', fontWeight: '500', cursor: 'pointer' }}>UPDATE</div>
                                        )}

                                        
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {openAddVariantPopup && (<AddVariantPopup setVariantName={setVariantName} VariantName={VariantName} openCreateVariantPopup={openCreateVariantPopup} setOpenCreateVariantPopup={setOpenCreateVariantPopup} allVariantOption={allVariantOption } setOpenAddVariantPopup={setOpenAddVariantPopup } />)}
                    {
                        openCreateVariantPopup && (
                            <CreateVariantPopup setOpenAddVariantPopup={setOpenAddVariantPopup} allVariantOption={allVariantOption} VariantName={VariantName} setOpenCreateVariantPopup={setOpenCreateVariantPopup} />
                        )
                    }
                </div>
                
            )}
            {menuTab === 3 && (
                <div>
                    {/* Your code for menuTab 3 */}
                    <div>
                        {/* Add your code for menuTab 3 here */}
                        <h1>HISTORY OF MENU CHANGES CONTENT</h1>
                    </div>
                </div>
            )}
            {createCategoryPopup && (
                <div className="mainContent modalOpen" style={{
                    zIndex: "99999", padding: "10px 30px", height: "220px", width: "400px"
                }}>
                    <form onSubmit={editCategoryDetails.length === 0 ? handleSubmit : handleUpdate}>
                        <div style={{ display: "flex", justifyContent: "end" }}><X onClick={() => { setCreateCategoryPopup(false); setEditCategoryDetails([]); }} /></div>
                    <h3 style={{margin:"20px 0"} }>Category Name</h3>
                        <input style={{ padding: "8px", fontWeight: "500", width: "300px" }} type="text" name="category_name" id="category_name" value={categoryNameValue} onChange={(e) => setCategoryNameValue(e.target.value)} />
                        <div class="cnf-button" style={{ justifyContent: "end", marginTop: "40px"} }>
                            <button onClick={() => { setCreateCategoryPopup(false); setEditCategoryDetails([]); }} className="cnf-cancel" style={{ margin: "0 10px"}} >
                            CANCEL
                            </button>
                            {editCategoryDetails.length === 0 ? (
                                <button type="submit" className="cnf-yes" style={{ margin: "0 10px" }}>SAVE</button>
                            ) : (
                                <button type="submit" className="cnf-yes" style={{ margin: "0 10px" }}>UPDATE</button>
                            )}


                        </div>
                            </form>
                </div>
            )}
            
        </div>
    );
}
export default RestaurantMenu;
