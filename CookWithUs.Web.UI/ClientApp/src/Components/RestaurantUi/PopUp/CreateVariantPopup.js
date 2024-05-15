import React, { useState} from "react";
import { ArrowLeft, ChevronDown } from 'lucide-react';
import "./CreateVariantPopup.css";
const CreateVariantPopup = ({ setOpenAddVariantPopup, allVariantOption,setOpenCreateVariantPopup ,VariantName }) => {

    const [showOptionsCount, setShowOptionsCount] = useState(1);
    const [selectedValues, setSelectedValues] = useState(['Veg']);
    const [variantDetails, setVariantDetails] = useState([]);
    const [currentVariants, setCurrentVariants] = useState([{
        currentOptionName: '',
        currentOptionPrice: 0
    }]);
    const addVariant = () => {
        setCurrentVariants(prevVariants => [
            ...prevVariants,
            {
                currentOptionName: '',
                currentOptionPrice: 0
            }
        ]);
    };
    const handleAddMoreClick = () => {
        setShowOptionsCount(showOptionsCount + 1);
        setSelectedValues([...selectedValues, '']);
    };
    const handleAddMoreAndAddVariant = () => {
        handleAddMoreClick();
        addVariant();
    };

    const handleRemoveClick = (indexToRemove) => {
        setShowOptionsCount(showOptionsCount - 1);
        setSelectedValues(selectedValues.filter((_, index) => index !== indexToRemove));
    };

    // Function to handle changes in the select box
    const handleSelectChange = (event, index) => {
        const { value } = event.target;
        const updatedValues = [...selectedValues];
        updatedValues[index] = value;
        setSelectedValues(updatedValues);
    };
    const handleCreateVariantGroup = () => {
        const newVariantDetails = [];
        // Iterate over each selected option
        selectedValues.forEach((selectedValue, index) => {
            // Get the option name, veg type, and price from the corresponding elements
            const variantNamee = document.getElementById('thisVariantName').value;
            const optionName = currentVariants[index].currentOptionName;
            const vegType = selectedValue;
            const price = currentVariants[index].currentOptionPrice;
            // Create an object with the extracted values
            const variantDetail = {
                variantName: variantNamee,
                optionName: optionName,
                vegType: vegType,
                price: price
            };
            // Push the object into the array
            newVariantDetails.push(variantDetail);
        });

        // Update the variantDetails state with the new array of objects
        setVariantDetails(newVariantDetails);
        allVariantOption.push(newVariantDetails);
        setOpenAddVariantPopup(false);
        setOpenCreateVariantPopup(false);
    };
    const handleOptionNameChange = (e, index) => {
        const newValue = e.target.value;
        setCurrentVariants(prevVariants => {
            const updatedVariants = [...prevVariants];
            updatedVariants[index] = { ...updatedVariants[index], currentOptionName: newValue };
            return updatedVariants;
        });
    };
    const handleOptionPriceChange = (e, index) => {
        const newValue = e.target.value;
        setCurrentVariants(prevVariants => {
            const updatedVariants = [...prevVariants];
            updatedVariants[index] = { ...updatedVariants[index], currentOptionPrice: newValue };
            return updatedVariants;
        });
    };

    return (
        <div className="variantSidebar modalOpen">
            <div className="topHeading"><ArrowLeft onClick={() => setOpenCreateVariantPopup(false)} /><div style={{ fontWeight: '500', fontSize: '20px', margin: '0 5px' }}>Add Preparation type </div></div>
            <div style={{ margin: '30px 0px 5px 30px', fontWeight: 500 }}>Title of the variant group</div>
            <div style={{ margin: '0 30px', fontSize: '20px', fontWeight: 600 }}><input id="thisVariantName" style={{ margin: '0 30px', fontSize: '20px', fontWeight: 600, border:'none' }} placeholder='Enter Variant Name Here' name='variantName' type='text' value={VariantName } /></div>
            <div style={{ margin: '50px 30px'  ,overflowY:'scroll' , height:'55%'}}>
                <div style={{ margin: '5px 0', fontWeight: 600 }}>Add variant options</div>
                <hr />
                
                {[...Array(showOptionsCount)].map((_, index) => (
                    <>
                        <div className="variantOption">
                            <div className="variantOptionCheckbox">
                                <div className="itemTimingCheckbox">
                                    <div class="circle-radio">
                                        <input type="radio" id={`Variantoptions${index}`} name="Variantoptions[]" value="option1" />
                                        <div style={{ height: '15px', width: '15px', border: '2px solid blue', justifyContent: 'center', display: 'flex', alignItems: 'center', borderRadius: '50%' }}>
                                            <label htmlFor={`Variantoptions${index}`}></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="VariantOptionName"><input value={currentVariants[index].currentOptionName} onChange={(e) => handleOptionNameChange(e, index)} id={`optionName${index}`} type="text" placeholder="Option name" style={{ border: 'none', height: '100%', fontWeight: 600, margin: '5px' }} /></div>
                            <div className="VariantOptionVegType">
                                <div className="select-box-wrapper">
                                    <select value={selectedValues[index]} onChange={(e) => handleSelectChange(e, index)} style={{ height: '35px', width: '91px', fontSize: '11px', fontWeight: '500', borderRadius: '5px', padding: '5px' }}>
                                        <option disabled >Select Veg Type</option>
                                        <option value="Veg">VEG</option>
                                        <option value="NonVeg">NON VEG</option>
                                        <option value="EggVeg">EGG VEG</option>
                                    </select>
                                    <div className="arrow-down-icon"><ChevronDown /></div> 
                                </div>
                            </div>
                            <div className="VariantOptionItemPrice">
                                <div className="VariantOptionItemPriceLabel">Item Price</div>
                                <div className="VariantOptionItemPriceAmount">₹ 66.67</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: '10px', fontWeight: '800' }}>+</div>
                            <div className="VariantOptionAdditionalPrice">
                                <div className="VariantOptionItemPriceLabel">Additional Price</div>
                                <div className="VariantOptionItemPriceAmount" style={{ border: '1px solid', borderRadius: '5px', width: '80px' }}>
                                    ₹<input type="number" name='price[]' onChange={(e) => handleOptionPriceChange(e, index)} value={currentVariants[index].currentOptionPrice} id={`price${index}`} style={{ border: 'none', height: '100%', fontWeight: '600', margin: '0px 5px', width: '50px' }} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: '10px', fontWeight: '800' }}>=</div>
                            <div className="VariantOptionFinalPrice">
                                <div className="VariantOptionItemPriceLabel">Final Price</div>
                                <div className="VariantOptionItemPriceAmount">₹ 66.67</div>
                            </div>
                        </div>
                        {index == 0 ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', fontWeight: '700', margin: '2px' }}>( Default Option )</div>
                                <hr style={{ border: "1px dashed" }} />
                            </>
                        ) : (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', fontWeight: '500', margin: '2px', color: '#87c2f5', cursor: 'pointer' }} onClick={() => handleRemoveClick(index)}>REMOVE</div>
                                    <hr style={{ border: "1px dashed" }} />
                                </>
                        )} 
                        
                    </>
                ))}
                <div style={{ fontWeight: '600', margin: '2px', color: 'rgb(0 95 177)', cursor: 'pointer' }} onClick={handleAddMoreAndAddVariant}>ADD MORE OPTION</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px', backgroundColor: 'white', borderTop: '1px solid lightgrey' }}>
                <div onClick={() => setOpenCreateVariantPopup(false)} style={{ margin: '0 10px', border: '2px solid', fontWeight: '500', padding: '5px 10px',cursor:'pointer' }}>CANCEL</div>
                <div onClick={handleCreateVariantGroup}  style={{ margin: '0 10px', backgroundColor: 'rgb(253 164 0)', padding: '5px 10px', color: 'white', fontWeight: '500', cursor: 'pointer' }}>CREATE VARIANT GROUP</div>
            </div>
        </div>
    );
}
export default CreateVariantPopup;