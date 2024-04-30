import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getRestaurantDetails } from "../../services/restaurantServices";
import CircularLoading from "../../Components/LoadingComponent/CircularLoading";
import Modal from "../../Components/Modal/Modal";
import "./RestaurantDetails.css";
import {  IndianRupee } from 'lucide-react';
import ItemAddedPopUp from "../../Components/Modal/ItemAddedPopUp";
import { AddItemToCart } from "../../services/UserService";
import axios from 'axios';
const RestaurantDetails = () => {
  const [loading, setLoading] = useState(false);
  const [restaurant, setRestaurant] = useState({});
  const [menu, setMenu] = useState([]);
    const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const isSideNavOpen = useSelector((state) => state.app.isSideNavOpen);
    const darkMode = useSelector((state) => state.app.darkMode);
    const [itemCount, setItemCount] = useState(0);
    const Foods = [
        {
            "id": 1,
            "name": "Veg Manchurian(dry)",
            "price": 50,
            "ratiing": 3.9,
            "custumer": 181,
            "imageUrl": "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/4/5/5568cd9a-7277-486e-968e-614d6f42b2c0_9a2741e7-1e29-4f4c-b9a0-0ffe9b5cf81d.JPG",
            "info":"Pizza topped with our herb-infused signature pan sauce and 100% mozzarella cheese. A classic treat for all cheese lovers out there!",
        },
        {
            "id": 2,
            "name": "Panner Chilli(dry)",
            "price": 250,
            "ratiing": 2.9,
            "custumer": 11,
            "imageUrl" : "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/4/5/5568cd9a-7277-486e-968e-614d6f42b2c0_9a2741e7-1e29-4f4c-b9a0-0ffe9b5cf81d.JPG" ,
        },
        {
            "id": 3,
            "name": "Mushroom Chilli(dry)",
            "price": 90,
            "ratiing": 239,
            "custumer": 11,
            "imageUrl" : "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/4/5/5568cd9a-7277-486e-968e-614d6f42b2c0_9a2741e7-1e29-4f4c-b9a0-0ffe9b5cf81d.JPG" ,
        },       
    ]

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
    const handleAddToCartItem = async  (item) => {
        const Details = {
            Id:0,
            UserId: 1,
            ItemId: item.id,
            Quantity: 1,
            time: new Date(),
            RestaurantName: restaurant.name,
            RestaurantLocation: restaurant.address,
            RestaurantId: restaurant.id,
            Price: item.price,
            Name: item.name,
            DiscountedPrice:180
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
    const handleDecreaseQuantity = (id,quantity) => {
        quantity--;
        IncreaseItem(id,quantity);
    };
  return (
    <div
    className="OF_5P"
      >
          <div className="_2p-Tc _3jpiZ" itemScope itemType="http://schema.org/BreadcrumbList">
              <span itemScope itemType="http://schema.org/ListItem" itemProp="itemListElement">
                  <a href="/" itemProp="item" data-url="/" className="kpkwa">
                      <span itemProp="name" className="_3duMr">Home</span>
                  </a>
                  <meta itemProp="position" content="1" />
              </span>
              <span className="_1yRfx"></span>
              <span itemScope itemType="/" itemProp="itemListElement">
                  <a href="/" itemProp="item" data-url="/city/bihta" className="kpkwa">
                      <span itemProp="name" className="_3duMr">{restaurant.address }</span>
                  </a>
                  <meta itemProp="position" content="2" />
              </span>
              <span className="_1yRfx"></span>
              <span className="kpkwa">{restaurant.name }</span>
          </div>
          <div className="sc-fKWMtX MwPJB">
              <div>
                  <h1 className="sc-aXZVg flIqEr">{restaurant.name}</h1>
              </div>
          </div>
          <div className="sc-eulNck jaeZcU">
              <div className="sc-dxcDKg sKbiT">
                  <div className="sc-iapWAC iziwvq"></div>
                  <div className="sc-kMribo jVVzww">
                      <div className="sc-empnci jWQiwZ">
                          <div style={{ lineHeight: '0' }}>
                              <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  role="img"
                                  aria-hidden="true"
                                  strokeColor="rgba(2, 6, 12, 0.92)"
                                  fillColor="rgba(2, 6, 12, 0.92)"
                              >
                                  <circle cx="10" cy="10" r="9" fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"></circle>
                                  <path
                                      d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z"
                                      fill="white"
                                  ></path>
                                  <defs>
                                      <linearGradient id="StoreRating20_svg__paint0_linear_32982_71567" x1="10" y1="1" x2="10" y2="19" gradientUnits="userSpaceOnUse">
                                          <stop stopColor="#21973B"></stop>
                                          <stop offset="1" stopColor="#128540"></stop>
                                      </linearGradient>
                                  </defs>
                              </svg>
                          </div>
                      </div>
                      <div className="sc-aXZVg kauPDe">{restaurant.name} (100+ ratings)</div>
                      <div className="sc-aXZVg foGBhr sc-bdOgaJ jcVcue">•</div>
                      <div className="sc-aXZVg kauPDe">₹300 for two</div>
                  </div>
                  <div className="sc-fThUAz gUkBij">
                      <a href="/city/bihta/north-indian-cuisine-restaurants">
                          <div className="sc-aXZVg gEwzDv sc-SrznA gxzksh">{restaurant.service}</div>
                      </a>
                      &nbsp;
                  </div>
                  <div className="sc-czkgLR gOuNSC">
                      <div className="sc-dycYrt kOgocp">
                          <div className="sc-satoz gllaAF"></div>
                          <div className="sc-eNSrOW cYVfXk"></div>
                          <div className="sc-satoz gllaAF"></div>
                      </div>
                      <div className="sc-hTUWRQ eWiyYm">
                          <div className="sc-lizKOf hQYlyi">
                              <div className="sc-aXZVg fAgagd">Outlet</div>
                              <div className="sc-aXZVg gXaIUH sc-eoVZPG fvtRmJ">{restaurant.address}</div>
                          </div>
                          <div className="sc-isRoRg ggfmeZ">
                              <div className="sc-aXZVg fAgagd">{restaurant.cookingTime}</div>
                          </div>
                      </div>
                  </div>
                  <hr className="sc-kRRyDe eaALvr" />
                  <ul>
                      <li className="sc-ePDLzJ IgUZC">
                          <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/v1648635511/Delivery_fee_new_cjxumu" alt="DISTANCE_FEE_NON_FOOD_LM" aria-hidden="true" className="sc-bVVIoq aHtNe" />
                          <div aria-hidden="true" className="sc-aXZVg gXaIUH">Order above 149 for discounted delivery fee</div>
                          <span className="ScreenReaderOnly_screenReaderOnly___ww-V" tabIndex="0">Order above 149 for discounted delivery fee</span>
                      </li>
                  </ul>
                  <div className="sc-kqGoIF dpAqpv"></div>
              </div>
          </div>
          <div className="sc-Nxspf eQUKJD">
              <div className="sc-gFAWRd cqlWAR">
                  <div className="sc-gmPhUn gFsWEE">
                      <h2 className="sc-aXZVg kltvPi title">Deals for you</h2>
                      <div className="sc-aXZVg kdMXvo"></div>
                  </div>
              </div>
              <div className="sc-cfxfcM bRcdIP">
                  <div className="row">
                      <div className="sc-hRJfrW haGAcs">
                          <div style={{ position: 'relative' }}>
                              <div stroke="border_Secondary" className="sc-cmaqmh jUqYMw sc-ejfMa-d glQQGJ">
                                  <div data-testid="offer-card-container-0" className="sc-fxwrCY gfTSOy">
                                      <div className="sc-hIUJlX kuaauf">
                                          <div className="sc-jnOGJG zjLHO">
                                              <img className="sc-jXbUNg kNySLq" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/MARKETING_BANNERS/IMAGES/OFFERS/2024/4/4/70d024a8-e016-4ff2-b124-6a5655fc2711_RuPay.png" width="48" height="48" alt="20% Off Upto ₹100" />
                                          </div>
                                          <div className="sc-dZoequ diYSKy">
                                              <div className="sc-aXZVg cdoqNJ">20% Off Upto ₹100</div>
                                              <div className="sc-aXZVg iNEoeh">USE RUPAY100</div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="sc-hRJfrW haGAcs">
                          <div style={{ position: 'relative' }}>
                              <div stroke="border_Secondary" className="sc-cmaqmh jUqYMw sc-ejfMa-d glQQGJ">
                                  <div data-testid="offer-card-container-1" className="sc-fxwrCY gfTSOy">
                                      <div className="sc-hIUJlX kuaauf">
                                          <div className="sc-jnOGJG zjLHO">
                                              <img className="sc-jXbUNg kNySLq" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/MARKETING_BANNERS/IMAGES/OFFERS/2024/4/4/ea942094-65ec-4248-9c59-778823fffddb_HSBC.png" width="48" height="48" alt="15% Off Upto ₹150" />
                                          </div>
                                          <div className="sc-dZoequ diYSKy">
                                              <div className="sc-aXZVg cdoqNJ">15% Off Upto ₹150</div>
                                              <div className="sc-aXZVg iNEoeh">USE HSBCFEST</div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="sc-hRJfrW haGAcs">
                          <div style={{ position: 'relative' }}>
                              <div stroke="border_Secondary" className="sc-cmaqmh jUqYMw sc-ejfMa-d glQQGJ">
                                  <div data-testid="offer-card-container-2" className="sc-fxwrCY gfTSOy">
                                      <div className="sc-hIUJlX kuaauf">
                                          <div className="sc-jnOGJG zjLHO">
                                              <img className="sc-jXbUNg kNySLq" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/MARKETING_BANNERS/IMAGES/OFFERS/2024/4/4/7806e2f2-5e05-49de-a59f-8b27212b816f_Citi.png" width="48" height="48" alt="15% Off Upto ₹300" />
                                          </div>
                                          <div className="sc-dZoequ diYSKy">
                                              <div className="sc-aXZVg cdoqNJ">15% Off Upto ₹300</div>
                                              <div className="sc-aXZVg iNEoeh">USE CITIFOODIE</div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="sc-kWtpeL KLLaA">
              <svg aria-hidden="true" height="24" width="24" className="sc-iGgWBj kDDZoM">
                  <use xlinkHref="/core/sprite-2e61ee4e.svg#artDecoLeft24"></use>
              </svg>
              <div className="sc-aXZVg kYNiKM sc-ecPEgm KdZdF">MENU</div>
              <svg aria-hidden="true" height="24" width="24" className="sc-iGgWBj kDDZoM">
                  <use xlinkHref="/core/sprite-2e61ee4e.svg#artDecoRight24"></use>
              </svg>
          </div>
          <div className="sc-cVzyXs kReQut">
              <svg aria-hidden="true" height="20" width="20" className="sc-iGgWBj AgQQR" style={{ position: 'absolute', right: '28px', marginTop: '12px' }}>
                  <use xlinkHref="/core/sprite-2e61ee4e.svg#search20"></use>
              </svg>
              <button data-cy="menu-search-button" aria-label="Search items" className="sc-YysOf jfBXcz">
                  <div className="sc-aXZVg jaAaMe">Search for dishes</div>
              </button>
          </div>
          <div>
              <div className="sc-gdyeKB oCBvJ">
                  <div className="sc-kzqdkY eGbulo">
                      <div className="sc-jaXxmE gBxzDP">
                          <label className="sc-ibQAlb fgBJze">
                              <input type="checkbox" aria-checked="false" aria-label="Enable veg option" id="VEG" className="sc-jGKxIK bBAYhh" />
                              <span type="VEG" className="sc-guJBdh eBZZgQ">
                                  <div className="sc-hZDyAQ epNteM">
                                      <svg aria-hidden="true" height="20" width="20" className="sc-dcJsrY bExgxb">
                                          <use xlinkHref="/food/sprite-1915a9c6.svg#vegVeg20"></use>
                                      </svg>
                                  </div>
                              </span>
                          </label>
                      </div>
                  </div>
                  <div className="sc-kzqdkY eGbulo">
                      <div className="sc-jaXxmE gBxzDP">
                          <label className="sc-ibQAlb fgBJze">
                              <input type="checkbox" aria-checked="false" aria-label="Enable non veg option" id="NON_VEG" className="sc-jGKxIK bBAYhh" />
                              <span type="NON_VEG" className="sc-guJBdh eBZZgQ">
                                  <div className="sc-hZDyAQ epNteM">
                                      <svg aria-hidden="true" height="20" width="20" className="sc-dcJsrY bExgxb">
                                          <use xlinkHref="/food/sprite-1915a9c6.svg#nonvegNonVeg20"></use>
                                      </svg>
                                  </div>
                              </span>
                          </label>
                      </div>
                  </div>
                  <div className="sc-kzqdkY eGbulo">
                      <div className="sc-iMWBiJ gxukUe">
                          <div className="contents">
                              <div className="sc-aXZVg uxlfx">Bestseller</div>
                          </div>
                      </div>
                  </div>
              </div>
              <div></div>
          </div>
          <div class="sc-bVHCgj edNbXq"></div>
          <div className="main_container__3QMrw">
              <button
                  className="styles_header__2bQR- styles_headerMain__aIDOE"
                  data-cy="veg_strarters-open"
                  aria-label="Category: Veg Starters, 6 items available"
                  aria-expanded="true"
                  data-role="category-heading"
              >
                  <h3 className="sc-aXZVg cTUnVn">Veg Starters (6)</h3>
                  <div className="sc-kdBSHD bbyuxQ">
                      <svg aria-hidden="true" height="16" width="16" className="sc-iGgWBj kDDZoM">
                          <use xlinkHref="/core/sprite-2e61ee4e.svg#chevronDown16"></use>
                      </svg>
                  </div>
              </button>
              <div>
                  {menu.map((item, index) => (
                  <div>
                      <div data-testid="normal-dish-item" className="sc-dLMFU dBkuDa">
                          <div className="sc-eDPEul fgGbcp">
                              <div>
                                  <div aria-hidden="true" className="sc-fHjqPf UObbO">
                                      <svg aria-hidden="true" height="16" width="16" className="sc-dcJsrY bExgxb">
                                          <use xlinkHref="/food/sprite-1915a9c6.svg#vegVeg16"></use>
                                      </svg>
                                      <div className="sc-bXCLTC dMoxiK">
                                          <svg aria-hidden="true" height="16" width="74" className="sc-dcJsrY bExgxb">
                                              <use xlinkHref="/food/sprite-1915a9c6.svg#bestseller16"></use>
                                          </svg>
                                      </div>
                                  </div>
                                      <div aria-hidden="true" className="sc-aXZVg kDrzID sc-eldPxv gKfzLy">{item.name}</div>
                                  <div className="sc-ikkxIA iDlNXU">
                                      <div aria-hidden="true" className="sc-cPiKLX eDKUvX">
                                          <span className="sc-jEACwC dPHgzY">
                                                  <div className="sc-aXZVg iGZTFL"><IndianRupee style={{ height: '12px', margin: '4px -5px 0 0', color: '#171515' }} />{item.price}</div>
                                          </span>
                                      </div>
                                  </div>
                                  <div className="sc-bmzYkS heVECu">
                                      <div className="sc-dtBdUo fSFDgt">
                                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" fillColor="#E6A408">
                                              <rect width="14" height="14" fill="white"></rect>
                                              <path d="M5.67163 3.99166C6.22068 2.34179 6.49521 1.51686 7 1.51686C7.50479 1.51686 7.77932 2.34179 8.32837 3.99166L8.65248 4.96556H9.60668C11.4122 4.96556 12.315 4.96556 12.4703 5.45302C12.6256 5.94049 11.8893 6.4628 10.4167 7.50744L9.67376 8.03444L9.97544 8.94095C10.5325 10.615 10.8111 11.452 10.4033 11.754C9.99553 12.056 9.27604 11.5457 7.83705 10.5249L7 9.93112L6.16295 10.5249C4.72396 11.5457 4.00447 12.056 3.5967 11.754C3.18893 11.452 3.46747 10.615 4.02456 8.94095L4.04557 8.87783C4.18081 8.47145 4.24843 8.26825 4.18684 8.08006C4.12525 7.89187 3.94958 7.76725 3.59824 7.51802C2.11566 6.46633 1.37437 5.94049 1.52971 5.45302C1.68504 4.96556 2.5878 4.96556 4.39332 4.96556H5.34752L5.67163 3.99166Z" fill="#E6A408"></path>
                                          </svg>
                                      </div>
                                          <div className="sc-aXZVg cKubDf sc-iHGNWf kqSMnX">{item.rating}</div>
                                          <div className="sc-aXZVg kYNiKM" style={{ marginLeft: '2px' }}>({item.customer})</div>
                                      </div>
                                      <div className="sc-ksCcjW kpVuTB">
                                          <div aria-hidden="true" className="sc-aXZVg fSrSXg sc-cGNDeh cSVsyE">
                                              {item.info }
                                          </div>
                                      </div>
                              </div>
                                  <div aria-hidden="true" className="sc-feUZmu gKnMlt">
                                      <button aria-label={`See more information about ${item.name}`} className="sc-frWhYi bHMxry" style={{ background: 'rgb(251, 238, 215)' }}>
                                          {item.imageUrl && ( 
                                              <img
                                                  alt={item.name}
                                                  className="styles_itemImage__DHHqs"
                                                  height="144"
                                                  loading="lazy"
                                                  width="156"
                                                  src={item.imageUrl}
                                              />
                                          )}
                                          </button>
                              <div className="sc-hzhJZQ fzObEb">
                                  <div style={{ position: 'relative' }}>
                                      <div className="sc-camqpD gOsNOm">
                                                  <div className="sc-gweoQa cYHmtf">
                                                      {addItems.some(items => items.itemId === item.id) ? (
                                                          <div className="sc-cvBxsj wFLSu">
                                                              <div style={{ position: 'relative' }}>
                                                                  <div className="sc-kdBSHD gRYJIS">
                                                                      <div className="sc-tagGq hDCEPB">
                                                                          <button onClick={() => handleDecreaseQuantity(addItems.find(itemm => itemm.itemId === item.id)?.id || 0,
                                                                              addItems.find(itemm => itemm.itemId === item.id)?.quantity || 0)} className="sc-esYiGF sc-fjvvzt hwdnJe jeDUxN add-button-left-container">
                                                                              <div className="sc-aXZVg jGPvlk">−</div>
                                                                          </button>
                                                                          <div className="sc-hknOHE eGQXFL">
                                                                              <button direction="stable" className="sc-esYiGF sc-uVWWZ hwdnJe dhVOKc">
                                                                                  <div className="sc-aXZVg jGPvlk">{addItems.find(itemm => itemm.itemId === item.id)?.quantity || 0}</div>
                                                                              </button>
                                                                          </div>
                                                                          <button onClick={() => handleIncreaseQuantity(addItems.find(itemm => itemm.itemId === item.id)?.id || 0,
                                                                              addItems.find(itemm => itemm.itemId === item.id)?.quantity || 0)} className="sc-esYiGF sc-bbSZdi hwdnJe gxAXcu add-button-right-container">
                                                                              <div className="sc-aXZVg jGPvlk">+</div>
                                                                          </button>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      ) : (
                                                          <button
                                                              onClick={() => handleAddToCartItem(item)}
                                                              className="sc-eIcdZJ sc-jdUcAg ksrzPO gbqFid add-button-center-container"
                                                          >
                                                              <div className="sc-aXZVg jGPvlk">Add</div>
                                                          </button>
                                                      )}
                                          </div>
                                          <div className="sc-BQMaI eMhXA-d">
                                              <div className="sc-aXZVg ifAlvZ">Customisable</div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              </div>
                          </div>
                      </div>
                      {/* Divider */}
                      <div className="styles_divider__2JelH"></div>
                      {/* Second dish */}
                      {/* Repeat similar structure for other dishes */}
                  </div>
                  ))}
              </div>
          </div>
           {itemCount > 0 && <ItemAddedPopUp itemCount={itemCount} />}
          {showModal && <Modal onClose={() => setShowModal(false)} />}
         
      {/*{!loading ? (*/}
      {/*  <Box*/}
      {/*    sx={{*/}
      {/*      width: "75%",*/}
      {/*      margin: "auto",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Box*/}
      {/*      sx={{*/}
      {/*        mt: "50px",*/}
      {/*        display: "flex",*/}
      {/*        justifyContent: "space-between",*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <Box>*/}
      {/*        <Typography>{restaurant.name}</Typography>*/}
      {/*        */}{/* <Typography>Pizzas</Typography> */}
      {/*        <Typography>{restaurant.address}</Typography>*/}
      {/*      </Box>*/}
      {/*      <Box>*/}
      {/*        <Typography>{restaurant.openingTime}</Typography>*/}
      {/*        */}{/* <Typography>Closes at 9 P.M</Typography> */}
      {/*      </Box>*/}
      {/*    </Box>*/}
      {/*    <Grid*/}
      {/*      container*/}
      {/*      sx={{*/}
      {/*        display: "grid",*/}
      {/*        gridTemplateColumns: isSideNavOpen*/}
      {/*          ? "repeat(4, 1fr)"*/}
      {/*          : "repeat(5, 1fr)",*/}
      {/*        gap: "20px",*/}
      {/*        "@media (max-width: 1200px)": {*/}
      {/*          gridTemplateColumns: isSideNavOpen*/}
      {/*            ? "repeat(2, 1fr)"*/}
      {/*            : "repeat(3, 1fr)",*/}
      {/*        },*/}
      {/*        "@media (max-width: 800px)": {*/}
      {/*          gridTemplateColumns: isSideNavOpen*/}
      {/*            ? "repeat(1, 1fr)"*/}
      {/*            : "repeat(2, 1fr)",*/}
      {/*        },*/}
      {/*        "@media (max-width: 600px)": {*/}
      {/*          gridTemplateColumns: "repeat(1, 1fr)",*/}
      {/*        },*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      {menu.length > 0 &&*/}
      {/*        menu.map((item, index) => (*/}
      {/*          <Box*/}
      {/*            key={index}*/}
      {/*            sx={{*/}
      {/*              width: 210,*/}
      {/*              marginRight: 0.5,*/}
      {/*              my: 5,*/}
      {/*              cursor: "pointer",*/}
      {/*              transition: "transform 0.3s",*/}
      {/*              "&:hover": {*/}
      {/*                transform: "scale(1.1)",*/}
      {/*              },*/}
      {/*              "@media (max-width: 500px)": {*/}
      {/*                margin: "auto",*/}
      {/*                my: 5,*/}
      {/*              },*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            {item.imageUrl ? (*/}
      {/*              <img*/}
      {/*                style={{ width: 160, height: 110, borderRadius: "10px" }}*/}
      {/*                alt={item.name}*/}
      {/*                src={item.imageUrl}*/}
      {/*              />*/}
      {/*            ) : (*/}
      {/*              <Box style={{ width: 160, height: 110 }}>No Images Found</Box>*/}
      {/*            )}*/}

      {/*            <Box sx={{ pr: 2, ml: 1 }}>*/}
      {/*              <Typography gutterBottom variant="body2" noWrap>*/}
      {/*                {item.name}*/}
      {/*              </Typography>*/}
      {/*              <Typography display="block" variant="caption">*/}
      {/*                {`₹ ${item.price}`}*/}
      {/*              </Typography>*/}
      {/*              <Typography display="block" variant="caption">*/}
      {/*                {`Quantity: ${item.quantity} Plates`}*/}
      {/*              </Typography>*/}
      {/*            </Box>*/}

      {/*            <Box sx={{ pr: 2, ml: 1 }}>*/}
      {/*              <Button*/}
      {/*                variant="outlined"*/}
      {/*                size="small"*/}
      {/*                onClick={() => handleAddToCart(item)}*/}
      {/*              >*/}
      {/*                Add to Cart*/}
      {/*              </Button>*/}
      {/*            </Box>*/}
      {/*          </Box>*/}
      {/*        ))}*/}
      {/*    </Grid>*/}
      {/*  </Box>*/}
      {/*) : (*/}
      {/*  <Box sx={{ mt: 3 }}>*/}
      {/*    <CircularLoading />*/}
      {/*  </Box>*/}
      {/*)}*/}
      <ToastContainer />
    </div>
  );
};

export default RestaurantDetails;
