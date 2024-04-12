
import react, { useRef, useEffect, useState } from "react";
import "./Modal.css";
import { X, Circle, Salad, IndianRupee, CircleCheck } from 'lucide-react';
function Modal({onClose}) {
    const modalRef = useRef();
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();

        }
    }
    const [halfCheckBox, setHalfCheckBox] = useState(false);
    const [fullCheckBox, setFullCheckBox] = useState(true);
    console.log(halfCheckBox);
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
                                <div className="sc-gkKZNe hwFboc">
                                    <div id="Quantity" aria-label="Quantity" className="sc-aXZVg gnOsqr sc-iBbrVh ldmbCi">Quantity</div>
                                    <div className="sc-hwdzOV cqeEBJ sc-bOTbmH fJMNTH">
                                        <div className="sc-grmefH ziKYZ">
                                            {/* Half Option */}
                                            <div className="sc-kNecGe fewQoG">
                                                <div className="sc-gjQJPI hnjUPe">
                                                    <Salad style={{ color: "green", height: "20px" , widht:'auto' }} />
                                                </div>
                                                <span className="sc-dJltXf eVBcAq">
                                                    <div className="sc-aXZVg hwpmTk">Half</div>
                                                </span>
                                                <span className="sc-dgSOao dzoNVH">
                                                    <IndianRupee style={{height: '12px',margin: '4px -5px 0 0',color: 'gray'}} />
                                                    <span className="sc-iEkSXm gIpVFw">
                                                        <div className="sc-aXZVg fSrSXg">60</div>
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="sc-ifdsxC iWAipi">
                                                <div orientation="ltr" className="sc-ikkxIA kNZrsh">
                                                    <input
                                                        type="radio"
                                                        id="97080053"
                                                        aria-label="Half, Cost: 60 rupees"
                                                        value=""
                                                        checked
                                                    />
                                                    
                                                    {halfCheckBox ? (
                                                            <span className="custom-checkbox" style={{ height: "18px" ,position:"unset" }}>
                                                            <CircleCheck style={{ color: 'blue', height: '16px', width: "16px" }} />
                                                            </span>
                                                    ) : (
                                                            <span className="custom-checkbox" style={{ height: "18px" ,position:"unset" }} onClick={() => { setHalfCheckBox(true); setFullCheckBox(false); }}>
                                                                <Circle style={{ color: 'gray', height: '16px', width: "16px" }} />
                                                          
                                                            </span>
                                                        )}
                                                    
                                                    <label htmlFor="97080053" className="sc-aXZVg hwpmTk"></label>
                                                </div>
                                            </div>
                                        </div>
                                            {/* Full Option */}
                                            <div className="sc-grmefH ziKYZ">
                                            <div className="sc-kNecGe fewQoG">
                                                    <div className="sc-gjQJPI hnjUPe">
                                                    <Salad style={{color:"green",height:"20px",width:"auto"} } />
                                                    </div>
                                                    <span className="sc-dJltXf eVBcAq">
                                                        <div className="sc-aXZVg hwpmTk">Full</div>
                                                    </span>
                                                <span className="sc-dgSOao dzoNVH">
                                                    <IndianRupee style={{ height: '12px', margin: '4px -5px 0 0', color: 'gray' }} />
                                                        <span className="sc-iEkSXm gIpVFw">
                                                            <div className="sc-aXZVg fSrSXg">60</div>
                                                        </span>
                                                    </span>
                                            </div>
                                            <div className="sc-ifdsxC iWAipi">
                                                <div orientation="ltr" className="sc-ikkxIA kNZrsh">
                                                    <input
                                                        type="radio"
                                                        id="97080053"
                                                        aria-label="Half, Cost: 60 rupees"
                                                        value=""
                                                        checked
                                                    />
                                                    
                                                    {fullCheckBox ? (
                                                            <span className="custom-checkbox" style={{ height: "18px" ,position:"unset" }}>
                                                            <CircleCheck style={{ color: 'blue', height: '16px', width: "16px" }} />
                                                        </span>
                                                        ) : (
                                                            <span className="custom-checkbox" style={{ height: "18px" ,position:"unset" }} onClick={() => { setFullCheckBox(true); setHalfCheckBox(false); }} >
                                                                <Circle style={{ color: 'gray', height: '16px', width: "16px" }}  />
                                                            </span>
                                                        )}
                                                    
                                                    <label htmlFor="97080053" className="sc-aXZVg hwpmTk"></label>
                                                </div>
                                            </div>
                                            </div>
                                    </div>
                                </div>
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
                                                <span className="sc-aXZVg dHuylL">Add Item to cart</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={onClose} aria-label="Close" className="sc-jsJBEP gEiytQ">
                    <X  />
                </button>
            </div>
        </div>
    );
}

export default Modal;