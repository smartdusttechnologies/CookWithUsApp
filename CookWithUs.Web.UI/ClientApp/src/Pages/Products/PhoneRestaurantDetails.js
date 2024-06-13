import React, { useEffect,useState } from "react";
import "./PhoneRestaurantDetails.css";
import { ArrowLeft } from 'lucide-react';
import { useParams } from "react-router-dom";
import { getRestaurantDetails } from "../../services/restaurantServices";
import { useSelector } from "react-redux";
import axios from 'axios';
import { AddItemToCart } from "../../services/UserService";
import { ToastContainer, toast } from "react-toastify";
import PhoneItemAddedPopUp from "../../Components/Modal/PhoneItemAddedPopUp";
import VariantsModal from "../../Components/Modal/VariantsModal";
export default function PhoneRestaurantDetails() {
    useEffect(() => {
        const elements = document.getElementsByClassName('_2456r');
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
        }
        const elements2 = document.getElementsByClassName('_3JaG6');
        for (let i = 0; i < elements2.length; i++) {
            elements2[i].style.display = 'none';
        }
    }, []);
    const [isOpenVariantModal, setIsOpenVariantModal] = useState(false);
    const [selectedItemVariantId, setSelectedItemVariantId] = useState(0);
    const [selectedItemVariants, setSelectedItemVariants] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState({});
    const [menu, setMenu] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const isSideNavOpen = useSelector((state) => state.app.isSideNavOpen);
    const darkMode = useSelector((state) => state.app.darkMode);
    const [itemCount, setItemCount] = useState(0);
    const [itemSelectedForVariant, setItemSelectedForVariant] = useState(0);
    const handleGetRestaurantDetails = () => {
        setLoading(true);
        getRestaurantDetails(id)
            .then((response) => {
                setRestaurant(response?.data);
                setMenu(response?.data?.restaurantMenus);
                setLoading(false);
                console.log(response.data);
            })
            .catch((error) => {
                setLoading(false);
            });
    };
    useEffect(() => {
        handleGetRestaurantDetails();
    }, []);


    useEffect(() => {
        handleGetRestaurantDetails();
    }, []);
    const handleAddClick = () => {
        setItemCount(prevCount => prevCount + 1);
    };
    const [addItems, setAddItems] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/user/CartDetails/1`);
            setAddItems(response.data);
        } catch (error) {
            // Handle errors if any
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        const cartItemCount = addItems.length;
        setItemCount(cartItemCount);
    }, [addItems]);
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        fetchData();
    }, [isOpenVariantModal]);
    const handleAddToCartItem = async (item) => {
        const Details = {
            Id: 0,
            UserId: 1,
            ItemId: item.id,
            Quantity: 1,
            time: new Date(),
            RestaurantName: restaurant.name,
            RestaurantLocation: restaurant.address,
            RestaurantId: restaurant.id,
            Price: item.price,
            Name: item.name,
            DiscountedPrice: 180,
            variantID:0
        };
        await AddItemToCart(Details);
        fetchData();
    }
    const handleAddToCart = (item) => {
        let cartData = JSON.parse(localStorage.getItem("cart")) || [];
        const itemInCart = cartData.find((cartItem) => cartItem.id === item.id);
        if (itemInCart) {
            toast.warn("Item is already in the cart.", {
                position: "bottom-center",
                theme: "dark",
            });
        } else {
            // If the item is not in the cart, add it with a quantity of 1
            cartData = [...cartData, { ...item, quantity: 1 }];
            toast.success("Item Added to cart", {
                position: "bottom-center",
                theme: "dark",
            });
        }
        localStorage.setItem("cart", JSON.stringify(cartData));
    };
    useEffect(() => {
        if (showModal) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        // Clean-up function to remove the class when component unmounts
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [showModal]);
    const IncreaseItem = async (id, quantity) => {
        try {
            // Make an Axios POST request to your endpoint
            const response = await axios.post('/user/CartUpdate', null, {
                params: {
                    Id: id,
                    Quantity: quantity
                }
            });
            // Handle the response data as needed
            console.log("Response:", response.data);
            fetchData();
        } catch (error) {
            // Handle errors if any
            console.error("Error fetching data:", error);
        }
    };
    const handleIncreaseQuantity = (id, quantity) => {
        quantity++;
        IncreaseItem(id, quantity);
    };
    const handleDecreaseQuantity = (id, quantity) => {
        quantity--;
        IncreaseItem(id, quantity);
    };
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };
    const handleOpenVariantModal = (id,item) => {
        setSelectedItemVariants(id);
        setItemSelectedForVariant(item);
        setIsOpenVariantModal(true);
    }
    return (
        <>
            <div style={{optice:0.5} }>
            <div className="MenuTopHeader_menuContainer__1xQaU">
                <button className="Back_back__1HVhh" data-cy="back-button" aria-label="Double tap to go back">
                    <a href="/">
                    <ArrowLeft />
                    </a>
                </button>
                <div className="MenuTopHeader_content__24MFC" aria-hidden="true">
                    <div className="MenuTopHeader_contentTitle__24ryq">
                        <div className="sc-gsnTZi fjJtzE">La Pino'z Pizza</div>
                    </div>
                    <div className="MenuTopHeader_contentDescription__23Hz9">
                        <div className="sc-gsnTZi fmutIM">25-30 MINS</div>
                    </div>
                </div>
                <div className="MenuTopHeader_rightNav__alWSF">
                    <button className="MenuTopHeader_rightNavItem__3dysE" data-cy="menu-search-button" aria-label="Search items">
                        <span className="icon-magnifier"></span>
                    </button>
                </div>
            </div>
            <div className="sc-DdwlG cVpHzg">
                <div>
                    <h1 className="sc-gsnTZi eKqnAB">La Pino'z Pizza</h1>
                </div>
            </div>
            <div className="sc-grVGCS jKwzP">
                <div className="sc-dkSuNL hkmkvq">
                    <div className="sc-kngDgl kAGbpf"></div>
                    <div className="sc-dSuTWQ kDagOl">
                        <div className="sc-cHPgQl hBzfNh">
                            <div style={{ lineHeight: 0 }}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-hidden="true" strokeColor="rgba(2, 6, 12, 0.92)" fillColor="rgba(2, 6, 12, 0.92)">
                                    <circle cx="10" cy="10" r="9" fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"></circle>
                                    <path d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z" fill="white"></path>
                                    <defs>
                                        <linearGradient id="StoreRating20_svg__paint0_linear_32982_71567" x1="10" y1="1" x2="10" y2="19" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#21973B"></stop>
                                            <stop offset="1" stop-color="#128540"></stop>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                        <div className="sc-gsnTZi fjJtzE">4.0 (5K+ ratings)</div>
                        <div className="sc-gsnTZi fOFiXd sc-hZFzCs iSnnyk">•</div>
                        <div className="sc-gsnTZi fjJtzE">₹200 for two</div>
                    </div>
                    <div className="sc-KfMfS eYMSYf">
                        <a href="/city/patna/pizzas-cuisine-restaurants">
                            <div className="sc-gsnTZi bsNTeZ sc-gHLcSH lktsNj">Pizzas,</div>
                        </a>&nbsp;
                        <a href="/city/patna/pastas-cuisine-restaurants">
                            <div className="sc-gsnTZi bsNTeZ sc-gHLcSH lktsNj">Pastas</div>
                        </a>&nbsp;
                    </div>
                    <div className="sc-djUGQo jSUyHm">
                        <div className="sc-jhzXDd brA-DvV">
                            <div className="sc-iXxrte gpMubx"></div>
                            <div className="sc-hZgfyJ iWEzpT"></div>
                            <div className="sc-iXxrte gpMubx"></div>
                        </div>
                        <div className="sc-hjQCSK fSFGXa">
                            <div className="sc-bSakgD gGZFdC">
                                <div className="sc-gsnTZi fCnUbn">Outlet</div>
                                <div className="sc-gsnTZi hjXtqt sc-jvLaUc buGcte">Kankarbagh</div>
                                <div className="RestaurantOutletSelector_wrapper__2D3LP">
                                    <button className="RestaurantOutletSelector_address__2Tz2x" aria-label="Selected outlet is Kankarbagh, 3.0 km away. Double tap to change outlet.">
                                        <span className="RestaurantOutletSelector_outletIcon__tqez7">▾</span>
                                    </button>
                                </div>
                            </div>
                            <div className="sc-jmnVvD eEhKgX">
                                <div className="sc-gsnTZi fCnUbn">25-30 mins</div>
                            </div>
                        </div>
                    </div>
                    <hr className="sc-fxvKuh gNAXuD" />
                    <ul>
                        <li className="sc-dvwKko bMiWEY">
                            <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/v1648635511/Delivery_fee_new_cjxumu" alt="DISTANCE_FEE_NON_FOOD_LM" aria-hidden="true" className="sc-jtcaXd nteoi" />
                            <div aria-hidden="true" className="sc-gsnTZi hjXtqt">Order above 149 for discounted delivery fee</div>
                            <span className="ScreenReaderOnly_screenReaderOnly___ww-V" tabIndex="0">Order above 149 for discounted delivery fee</span>
                        </li>
                    </ul>
                    <div className="sc-cwpsFg MIGBd"></div>
                </div>
            </div>
            <div className="sc-jmNpzm kbgmHf">
                <div>
                    <div className="sc-hNKHps Eybyd">
                        <div stroke="border_Secondary" className="sc-bUbCnL fvJDti sc-kIKDeO hDkqPx">
                            <div className="sc-dsQDmV bxjAMe">
                                <div className="sc-olbas oDEeC">
                                    <div className="sc-hiMGwR dsdWZe">
                                        <div className="row" style={{ transform: "translate3d(-942px, 0, 0)", transition: "transform 120ms ease-in-out" }}>
                                            <div className="sc-gFGZVQ eSembZ">
                                                <div data-testid="offer-card-container-2" className="sc-TRNrF gekBfC">
                                                    <div className="sc-jIAOiI hJhzNR">
                                                        <div className="sc-ZyCDH jQFnnG">
                                                            <img className="sc-evZas cwNlPY" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/MARKETING_BANNERS/IMAGES/OFFERS/2024/5/31/f71f1df1-bfba-4f4c-88a4-82cccf73fe9e_ici.jpg" width="48" height="48" alt="Flat ₹50 Off" />
                                                        </div>
                                                        <div className="sc-jOhDuK bXblIc">
                                                            <div className="sc-gsnTZi bFAIn">Flat ₹50 Off</div>
                                                            <div className="sc-gsnTZi fEOHXP">NO CODE REQUIRED</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Additional offer cards go here */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div aria-hidden="true" className="sc-ckMVTt bOVxCH">
                            <div data-testid="scroll-counter-indicator" className="sc-gsnTZi gBqzpc">3/3</div>
                            <div className="sc-fbPSWO egflSi">
                                <div className="sc-GVOUr dSwShs">
                                    <span className="sc-fXynhf SsrJn"></span>
                                    <div className="sc-dwLEzm iGWfaN"></div>
                                </div>
                                <div className="sc-GVOUr dSwShs">
                                    <span className="sc-fXynhf SsrJn"></span>
                                    <div className="sc-dwLEzm iGWfaN"></div>
                                </div>
                                <div className="sc-GVOUr dSwShs">
                                    <span className="sc-fXynhf jdBqf"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main_container__3QMrw">
                <button
                    className="styles_header__2bQR- styles_headerMain__aIDOE"
                    data-cy="recommended-open"
                    aria-label="Category: Recommended, 20 items available"
                    aria-expanded="true"
                    data-role="category-heading"
                >
                    <h3 className="sc-gsnTZi ghgDBN">Recommended (20)</h3>
                    <div className="sc-bBXxYQ iTmmrf">
                        <svg aria-hidden="true" height="16" width="16" className="sc-jqUVSM hDsUVF">
                            <use xlinkHref="/core/sprite-2e61ee4e.svg#chevronDown16"></use>
                        </svg>
                    </div>
                </button>
                <div>
                    <div>
                        {menu.map((item, index) => (
                            <>
                                <div data-testid="normal-dish-item" className="sc-dIouRR kMmNWa">
                                    <div className="sc-hHLeRK dyAuqV">
                                        <p className="ScreenReaderOnly_screenReaderOnly___ww-V" tabIndex="0">
                                            Non-veg item. Exotic Tikka Pizza. Costs: 207 rupees, Description: Classic Combination of Onions & Chicken Tikka. [Fat-10.1 per 100 g, Protein-13 per 100 g, Carbohydrate-30.4 per 100 g, Sugar-1.8 per 100 g, Calories-264.2 k.cal] Nutritional information per 100g This item is customizable. Swipe right to add item to cart.
                                        </p>
                                        <div>
                                            <div aria-hidden="true" className="sc-gicCDI jZeBfL">
                                                <svg aria-hidden="true" height="16" width="16" className="sc-papXJ fFxmlc">
                                                    <use xlinkHref="/food/sprite-1915a9c6.svg#nonvegNonVeg16"></use>
                                                </svg>
                                            </div>
                                            <div aria-hidden="true" className="sc-gsnTZi kbtbxt sc-dmRaPn NZETQ">{item.name}</div>
                                            <div className="sc-bBrHrO FOQaz">
                                                <div aria-hidden="true" className="sc-idiyUo ktAobU">
                                                    <span className="sc-bjUoiL ldeDAL">
                                                        <div className="sc-gsnTZi dPBPYJ">{item.price}</div>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="sc-himrzO ffgWyU">
                                                <div className="sc-cCsOjp HjARi">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" fillColor="#E6A408">
                                                        <rect width="14" height="14" fill="white"></rect>
                                                        <path d="M5.67163 3.99166C6.22068 2.34179 6.49521 1.51686 7 1.51686C7.50479 1.51686 7.77932 2.34179 8.32837 3.99166L8.65248 4.96556H9.60668C11.4122 4.96556 12.315 4.96556 12.4703 5.45302C12.6256 5.94049 11.8893 6.4628 10.4167 7.50744L9.67376 8.03444L9.97544 8.94095C10.5325 10.615 10.8111 11.452 10.4033 11.754C9.99553 12.056 9.27604 11.5457 7.83705 10.5249L7 9.93112L6.16295 10.5249C4.72396 11.5457 4.00447 12.056 3.5967 11.754C3.18893 11.452 3.46747 10.615 4.02456 8.94095L4.04557 8.87783C4.18081 8.47145 4.24843 8.26825 4.18684 8.08006C4.12525 7.89187 3.94958 7.76725 3.59824 7.51802C2.11566 6.46633 1.37437 5.94049 1.52971 5.45302C1.68504 4.96556 2.5878 4.96556 4.39332 4.96556H5.34752L5.67163 3.99166Z" fill="#E6A408"></path>
                                                    </svg>
                                                </div>
                                                <div className="sc-gsnTZi hHSWSZ sc-gXmSlM fhjEHL">2.3</div>
                                                <div className="sc-gsnTZi hwVdcu" style={{ marginLeft: "2px" }}>(49)</div>
                                            </div>
                                            <div className="sc-fLlhyt kZUMCm">
                                                <div aria-hidden="true" className="sc-gsnTZi hSSbQi sc-kgflAQ bqSrDs">
                                                    {item.info }
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div aria-hidden="true" className="sc-cxabCf eiKxCJ">
                                            <button aria-label={`See more information about ${item.name}`} className="sc-llJcti jdqbpQ" style={{ background: "rgb(251, 238, 215)" }}>
                                                <img alt="{item.name}" className="styles_itemImage__DHHqs" height="144" loading="lazy" width="156" src={item.imageUrl }></img>
                                            </button>
                                            <div className="sc-iIPllB beVdAn">
                                                <div className="sc-lgVVsH jXOmsR">
                                                    
                                                    {addItems.some(items => items.itemId === item.id) ? (
                                                        
                                                    <div className="sc-gPpHY jQkIBS">
                                                            <button aria-label="Decrease Quantity to 0" className="_1H238" onClick={() => handleDecreaseQuantity(addItems.find(itemm => itemm.itemId === item.id)?.id || 0,
                                                            addItems.find(itemm => itemm.itemId === item.id)?.quantity || 0)}>-</button>
                                                            <div className="_33Vfv" aria-hidden="true">{addItems.find(itemm => itemm.itemId === item.id)?.quantity || 0}</div>
                                                            <button aria-label="Increase Quantity to 2" className="QSzbj" onClick={() => handleIncreaseQuantity(addItems.find(itemm => itemm.itemId === item.id)?.id || 0,
                                                            addItems.find(itemm => itemm.itemId === item.id)?.quantity || 0)}>+</button>
                                                    </div>
                                                    
                                                    ) : (
                                                            <div>
                                                                <div className="sc-iIPllB beVdAn">
                                                                    <div className="sc-lgVVsH jXOmsR">
                                                                        <div className="sc-gPpHY jQkIBS">
                                                                            <div className="sc-jZiqTT jpoqCd">
                                                                                <button onClick={() => {
                                                                                    if (item.variants.length !=0) {
                                                                                        if (item.variants[0].variantName != null) {
                                                                                            handleOpenVariantModal(item.variants,item);
                                                                                        }
                                                                                    } else {
                                                                                        handleAddToCartItem(item);
                                                                                    }
                                                                                }} className="sc-geuGuN sc-ckCjom kMSngH fXxEuR add-button-center-container">
                                                                                    <div className="sc-gsnTZi hFwsQK">Add</div>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    )}
                                                    <div className="sc-dGHKFW eERRDv">
                                                        <div className="sc-gsnTZi hDbDGT">Customisable</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="styles_divider__2JelH"></div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
            <div className="RestaurantFooterAddress_wrapper__16xqp" aria-hidden="true">
                <p className="RestaurantFooterAddress_name__deVKZ">La Pino'z Pizza</p>
                <p>(Outlet:Kankarbagh)</p>
                <div className="RestaurantFooterAddress_address__37uUA">
                    <div className="icon-markerDark RestaurantFooterAddress_icon__2Kjdg"></div>
                    <p>S K 6, Sector-K, Malahi Pakadi Chowk, Kankarbagh, Patna Sadar, Patna, Bihar-800020</p>
                </div>
                <div>
                    <div className="sc-ikjQzJ evPquQ">
                        <div className="sc-hAsxaJ gtdiFE">
                            <div className="sc-gsnTZi fCnUbn">For better experience, download the Swiggy app now</div>
                        </div>
                        <div className="sc-tsFYE bpZxpP">
                            <a href="https://itunes.apple.com/in/app/id989540920?referrer:utm_source%3Dswiggy%26utm_medium%3Dhomepage" rel="nofollow noopener" target="_blank" className="sc-bhVIhj TFTTx">
                                <img className="sc-evZas kRqqFQ sc-eGAhfa KEjar" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/play_store.png" alt="Download Android App" />
                            </a>
                            <a href="https://play.google.com/store/apps/details?id=in.swiggy.android&amp;referrer=utm_source%3Dswiggy%26utm_medium%3Dheader" rel="nofollow noopener" target="_blank" className="sc-bhVIhj TFTTx">
                                <img className="sc-evZas kRqqFQ sc-eGAhfa KEjar" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/app_store.png" alt="Download iOS App" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            {itemCount > 0 && <PhoneItemAddedPopUp itemCount={itemCount} />}
            {console.log(isOpenVariantModal) }
            {isOpenVariantModal && <VariantsModal itemSelectedForVariant={itemSelectedForVariant} restaurant={restaurant} selectedItemVariantId={selectedItemVariantId} setSelectedItemVariantId={setSelectedItemVariantId} selectedItemVariants={selectedItemVariants} setIsOpenVariantModal={setIsOpenVariantModal} />}
            
        </>
    );
}