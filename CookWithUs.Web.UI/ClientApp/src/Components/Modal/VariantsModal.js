import React, { useEffect, useState } from 'react';
import "./VariantsModal.css";
import { X, SquareDot } from 'lucide-react';
import axios from 'axios';
import { AddItemToCart } from "../../services/UserService";
const VariantsModal = ({ itemSelectedForVariant, restaurant, selectedItemVariantId, setSelectedItemVariantId, selectedItemVariants, setIsOpenVariantModal }) => {
    const [allVariantOption, setAllVariantOption] = useState([]);
    const handleAddToCartItem = async () => {
        const Details = {
            Id: 0,
            UserId: 1,
            ItemId: itemSelectedForVariant.id,
            Quantity: 1,
            time: new Date(),
            RestaurantName: restaurant.name,
            RestaurantLocation: restaurant.address,
            RestaurantId: restaurant.id,
            Price: itemSelectedForVariant.price,
            Name: itemSelectedForVariant.name,
            DiscountedPrice: 180,
            variantID: selectedItemVariantId
        };
        await AddItemToCart(Details);
        setSelectedItemVariantId(0);
        setIsOpenVariantModal(false);
    }
    const newVariantDetails = [];
    useEffect(() => {
        if (selectedItemVariants && selectedItemVariants.length > 0) {
            const groupedVariants = {};

            selectedItemVariants.forEach(item => {
                const { variantID, variantName, optionName, optionType, optionPrice } = item;
                const key = variantName.toLowerCase();

                if (!groupedVariants[key]) {
                    groupedVariants[key] = [];
                }

                groupedVariants[key].push({
                    variantID: variantID,
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
    }, []);

    const [quantity, setQuantity] = useState('Half');
    const [price, setPrice] = useState(120);

    const handleQuantityChange = (e) => {
        const { id } = e.target;
        if (id === '97411621') {
            setQuantity('Half');
            setPrice(120);
        } else {
            setQuantity('Full');
            setPrice(90);
        }
    };

    const addItemToCart = () => {
        // Logic to add item to cart
        alert(`Added ${quantity} Egg Fried Rice to cart for ${price} rupees.`);
    };
    const [selectedOption, setSelectedOption] = useState('Half');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return (
        <>
        <div className="sc-kDDrLX dORRbt open" elevation="halfcards_And_Popups" style={{backgroundColor:"white"} }>
            <div className="_3rmJh">
                <div className="_8wkaD">
                    <div className="sc-isuzjp jRcHex">
                        <div className="sc-eCOUaW eabNoT">
                            <p
                                className="ScreenReaderOnly_screenReaderOnly___ww-V"
                                role="heading"
                                tabIndex="0"
                                aria-label="Swipe right to choose customization for Egg fried rice."
                                id="customize-header"
                                aria-level="1"
                            ></p>
                            <div aria-hidden="true" className="sc-gsnTZi cForLi">
                                Egg fried rice
                            </div>
                            <div className="sc-gsnTZi cForLi sc-jclSIp gqXLxV">•</div>
                            <span className="sc-ivmvlL hOFTjE">
                                <div className="sc-gsnTZi cForLi">120</div>
                            </span>
                        </div>
                        <div className="sc-gsnTZi bPScto sc-ezWXYA gkIBhe">
                            Customise as per your taste
                        </div>
                    </div>
                        <div className="sc-gILORG cZxOIm">
                            {allVariantOption.map((variant, index) => (
                                <div className="sc-hbyLVd iVEVDq">
                                    <div
                                        id="Quantity"
                                        aria-label="Quantity"
                                        className="sc-gsnTZi fRaNZO sc-oclUV invcgd"
                                    >
                                        {variant[0].variantName}
                                    </div>
                                    <div className="sc-bUbCnL bCFMBQ sc-gfbRpc gZmolG">
                                        {variant.map((eachVariant, count) => (
                                            <div className="sc-cQwIYT KEXWg" key={count}>
                                            <div className="sc-knuRna kMEhOX">
                                                <div className="sc-hbjaKc bSKOEt">
                                                        <SquareDot style={{ color: eachVariant.vegType === 'Veg' ? 'green' : eachVariant.vegType === 'NonVeg' ? 'red' : 'yellow' }} />
                                                </div>
                                                <span className="sc-cgFpzT biCOcX">
                                                        <div className="sc-gsnTZi frGwOR">{eachVariant.optionName}</div>
                                                    </span>
                                                    <span className="sc-bKhNmF eNWqen">
                                                        <span className="sc-kBjqcv ljDTbD">
                                                            <div className="sc-gsnTZi lnsiHl">{eachVariant.price}</div>
                                                        </span>
                                                    </span>
                                            </div>
                                            <div className="sc-jDDxOa dALXMw">
                                                    <div className="variantOptionCheckbox">
                                                        <div className="itemTimingCheckbox">
                                                            <div class="circle-radio">
                                                                <input type="radio" id={`Variantoptions${count}${index}`} name="Variantoptions[]" value="option1" />
                                                                <div style={{ height: '15px', width: '15px', border: '2px solid blue', justifyContent: 'center', display: 'flex', alignItems: 'center', borderRadius: '50%' }}>
                                                                    <label onClick={() => setSelectedItemVariantId(eachVariant.variantID)} htmlFor={`Variantoptions${count}${index}`}></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                     ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    <div className="sc-hlqNbq dBOqjE">
                        <div className="sc-hxWoir ljxoky">
                            <div>
                                <div aria-hidden="true" className="sc-ftvSup cHENUp">
                                    <span className="sc-iBkjds bUhllV">
                                        <div className="sc-gsnTZi lddsti">120</div>
                                    </span>
                                </div>
                                <button>
                                    <div className="sc-gsnTZi gIFucI">View Customized Item</div>
                                </button>
                            </div>
                            <div className="sc-fFtkDt jXTxYE">
                                <div className="sc-WCkqM btNDYe">
                                    <button
                                        type="button"
                                        data-cy="customize-footer-add-button"                                        
                                        className="sc-ikjQzJ gxZSQD sc-eIWpXs dWHkMe"                                        
                                    >
                                            {selectedItemVariantId !== 0 ? (                                               
                                                <span onClick={ handleAddToCartItem} className="sc-gsnTZi kkWSdi">Add Item to cart</span>                                              
                                            ) : (
                                                <span className="sc-gsnTZi kkWSdi">Add Item to cart</span>
                                            )}

                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button aria-label="Close" className="sc-crXcEl MvApi">
                        <X onClick={()=>setIsOpenVariantModal(false)} />
                </button>
            </div>
            </div>
            <div elevation="halfcards_And_Popups" className="sc-iqcoie gIiRjj visible" data-testid="half-card-overlay"></div>
</>
    );
};

export default VariantsModal;
