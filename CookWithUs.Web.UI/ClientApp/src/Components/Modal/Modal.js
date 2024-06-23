
import react, { useRef, useEffect, useState } from "react";
import "./Modal.css";
import { X, Circle, SquareDot, IndianRupee, CircleCheck } from 'lucide-react';
import axios from 'axios';
import { AddItemToCart } from "../../services/UserService";
function Modal({ onClose ,itemSelectedForVariant, restaurant, selectedItemVariantId, setSelectedItemVariantId, selectedItemVariants }) {
    const modalRef = useRef();
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();

        }
    }
    const [selectedVariantId, setSelectedVariantId] = useState(0);
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
        onClose();
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
    const handleSelectedVariantID = (id) => {
        setSelectedVariantId(id);
    };
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
        <div ref={modalRef} onClick={closeModal} className="sc-bXCLTC dtRKre visible" elevation="halfcards_And_Popups">
            <div width="600px" elevation="halfcards_And_Popups" className="sc-hmdomO cehVFM open">
                <div className="sc-gPDKlO hIVVcX">
                    <div className="_2bLF7">
                        <div className="jVBhu">
                            <div className="sc-dqJYEZ jSHOAm">
                                <div className="sc-xyOoZ hGyeQP">
                                    <p className="ScreenReaderOnly_screenReaderOnly___ww-V" role="heading" tabIndex="0" aria-label="Swipe right to choose customization for Veg Manchurian(dry). " id="customize-header" aria-level="1"></p>
                                    <div aria-hidden="true" className="sc-aXZVg gXaIUH">Veg Manchurian(dry)</div>
                                    <div className="sc-aXZVg gXaIUH sc-goaFza ga-dKzr">.</div>
                                    <span className="sc-kgbQpE gOMyKP">
                                        <div className="sc-aXZVg gXaIUH"><IndianRupee style={{ height: '12px', margin: '4px -5px 0 0', color: 'gray' }} />60</div>
                                    </span>
                                </div>
                                <div className="sc-aXZVg crvuvl sc-hMBXfw dXwaOZ">Customise as per your taste</div>
                            </div>
                            <div className="sc-kypfzD jDxRDo">
                                {allVariantOption.map((variant, index) => (
                                    <div className="sc-gkKZNe hwFboc">
                                        <div id="Quantity" aria-label="Quantity" className="sc-aXZVg gnOsqr sc-iBbrVh ldmbCi">{variant[0].variantName}</div>
                                        <div className="sc-hwdzOV cqeEBJ sc-bOTbmH fJMNTH">
                                            {variant.map((eachVariant, count) => (
                                                <div className="sc-grmefH ziKYZ">
                                                    {/* Half Option */}
                                                    <div className="sc-kNecGe fewQoG">
                                                        <div className="sc-gjQJPI hnjUPe">
                                                            <SquareDot style={{ color: eachVariant.vegType === 'Veg' ? 'green' : eachVariant.vegType === 'NonVeg' ? 'red' : 'yellow' }} />
                                                        </div>
                                                        <span className="sc-dJltXf eVBcAq">
                                                            <div className="sc-aXZVg hwpmTk">{eachVariant.optionName}</div>
                                                        </span>
                                                        <span className="sc-dgSOao dzoNVH">
                                                            <IndianRupee style={{ height: '12px', margin: '4px -5px 0 0', color: 'gray' }} />
                                                            <span className="sc-iEkSXm gIpVFw">
                                                                <div className="sc-aXZVg fSrSXg">{eachVariant.price}</div>
                                                            </span>
                                                        </span>
                                                    </div>
                                                    <div className="sc-ifdsxC iWAipi">
                                                        <div orientation="ltr" className="sc-ikkxIA kNZrsh">
                                                            <input
                                                                type="radio"
                                                                id={`97080053${index}${count}`}
                                                                aria-label="Half, Cost: 60 rupees"
                                                                value=""
                                                                checked
                                                            />

                                                            {selectedVariantId == eachVariant.variantID ? (
                                                                <span className="custom-checkbox" style={{ height: "18px", position: "unset" }}>
                                                                    <CircleCheck style={{ color: 'blue', height: '16px', width: "16px" }} />
                                                                </span>
                                                            ) : (
                                                                    <span className="custom-checkbox" style={{ height: "18px", position: "unset" }} onClick={() => { handleSelectedVariantID(eachVariant.variantID) }}>
                                                                    <Circle style={{ color: 'gray', height: '16px', width: "16px" }} />

                                                                </span>
                                                            )}

                                                            <label htmlFor={`97080053${index}${count}`} className="sc-aXZVg hwpmTk"></label>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}                                            
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="sc-bRimrq jKwhVe">
                                <div className="sc-bdlOLf bteTIX">
                                    <div>
                                        <div aria-hidden="true" className="sc-hWmCAe cCLHLr">
                                            <span className="sc-iEkSXm gIpVFw">
                                                <div className="sc-aXZVg fVyUCm">120.00</div>
                                            </span>
                                        </div>
                                        <button>
                                            <div className="sc-aXZVg cYKJrR">View Customized Item</div>
                                        </button>
                                    </div>
                                    <div className="sc-cZYOMl blXEkA">
                                        <div className="sc-dcJsrY kOMrTR">
                                            <button type="button" data-cy="customize-footer-add-button" aria-label="Total is [object Object] rupees. Double tap to add selected items to the Cart." className="sc-iGgWBj cEzNDB sc-bfUCjU jOgkDG">                                                
                                                {selectedVariantId != 0 ? (
                                                    <span onClick={handleAddToCartItem} className="sc-aXZVg dHuylL">Add Item to cart</span>
                                                ) : (
                                                        <span className="sc-aXZVg dHuylL">Add Item to cart</span>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={() => onClose()} aria-label="Close" className="sc-jsJBEP gEiytQ">
                    <X  />
                </button>
            </div>
        </div>
    );
}

export default Modal;