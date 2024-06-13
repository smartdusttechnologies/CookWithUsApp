import React, { useEffect, useState } from "react";
import "./Home.css";
import { getRestaurants } from "../../services/restaurantServices";
export default function PhoneHome() {
    const [isLoading, setLoading] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const handleGetRestaurants = (latitude, longitude) => {
        setLoading(true);
        getRestaurants(latitude, longitude)
            .then((response) => {
                console.log(response.data);
                setRestaurants(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            handleGetRestaurants(
                position?.coords?.latitude,
                position?.coords?.longitude
            );
        });
    }, []);
    const restaurantUrl = "/restaurant/";
    const images = [
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/ak4f9kufbxgb8fprancy",
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/9887a65f6a7e11c18965c02bbf255e79"
    ];
    const restaurantts = [
        {
            name: "Kwality Walls Frozen Dessert and Ice Cream Shop",
            time: "30-35 mins",
            discount: "50% OFF",
            discountDetails: "UPTO ₹100",
            imgSrc: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/ajfqjytbxd6dajl7vxzl",
            ad: true,
        },
        {
            name: "Biryani Break",
            time: "35-40 mins",
            discount: "10% OFF",
            discountDetails: "UPTO ₹40",
            imgSrc: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/f594f4f63d3e00e93203f02d40e38d24",
            ad: false,
        },
        {
            name: "Kathi Nation",
            time: "20-25 mins",
            discount: "10% OFF",
            discountDetails: "UPTO ₹40",
            imgSrc: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/a81fe3b2f8a87986567a54594f682504",
            ad: false,
        },
        {
            name: "Kwality Walls Frozen Dessert and Ice Cream Shop",
            time: "30-35 mins",
            discount: "50% OFF",
            discountDetails: "UPTO ₹100",
            imgSrc: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/ajfqjytbxd6dajl7vxzl",
            ad: true,
        },
        {
            name: "Biryani Break",
            time: "35-40 mins",
            discount: "10% OFF",
            discountDetails: "UPTO ₹40",
            imgSrc: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/f594f4f63d3e00e93203f02d40e38d24",
            ad: false,
        },
        {
            name: "Kathi Nation",
            time: "20-25 mins",
            discount: "10% OFF",
            discountDetails: "UPTO ₹40",
            imgSrc: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/a81fe3b2f8a87986567a54594f682504",
            ad: false,
        },
        {
            name: "Kwality Walls Frozen Dessert and Ice Cream Shop",
            time: "30-35 mins",
            discount: "50% OFF",
            discountDetails: "UPTO ₹100",
            imgSrc: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/ajfqjytbxd6dajl7vxzl",
            ad: true,
        },
        {
            name: "Biryani Break",
            time: "35-40 mins",
            discount: "10% OFF",
            discountDetails: "UPTO ₹40",
            imgSrc: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/f594f4f63d3e00e93203f02d40e38d24",
            ad: false,
        },
        {
            name: "Kathi Nation",
            time: "20-25 mins",
            discount: "10% OFF",
            discountDetails: "UPTO ₹40",
            imgSrc: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/a81fe3b2f8a87986567a54594f682504",
            ad: false,
        },
    ];
    const offerImages = [
        {
            src: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/686d86288557d0a78fbea2212f2195e0',
            alt: 'Image 1',
            ariaLabel: 'ORDER NOW',
        },
        {
            src: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/34dae89ad01e2fa8c73063b1ca449173',
            alt: 'Image 2',
            ariaLabel: 'Order Now',
        },
    ];
    const offers = [
        {
            src: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/ngjatt8hwriaytmugmqz',
            alt: 'Tap to grab best deals from best restaurant',
            ariaLabel: 'Tap to grab best deals from best restaurant',
        },
        {
            src: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/dzm1eo2punmiqd1idyzn',
            alt: 'explore Unique tastes from new eateries',
            ariaLabel: 'explore Unique tastes from new eateries',
        },
        {
            src: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/skp6dyt64rxasxs3bqse',
            alt: 'Offers for 1 Upto 50% off',
            ariaLabel: 'Offers for 1 Upto 50% off',
        },
        {
            src: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/mbcjw5tiuemimw1pfjli',
            alt: 'DEALS FOR TWO - UPTO Rs.200 OFF',
            ariaLabel: 'DEALS FOR TWO - UPTO Rs.200 OFF',
        },
        {
            src: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/glitfsp43tqn8rsfq23a',
            alt: 'Party Steals upto 300/- off',
            ariaLabel: 'Party Steals upto 300/- off',
        },
    ];
    const allRestaurants = [
        {
            name: 'Nisha Family Restaurant',
            cuisines: 'Chinese',
            area: 'Anisabad',
            distance: '5.9 km away',
            rating: '3.8',
            deliveryTime: '35-40 mins',
            cost: '₹200 for two',
            offer: '10% OFF',
            offerDetails: 'UPTO ₹40',
            imageSrc: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/yed8zoqfq2ww0nrle8kf',
            ariaLabel: `Restaurant name: Nisha Family Restaurant, Cuisines: Chinese, Area: Anisabad, 5.9 km away, Rating: 3.8, Delivers in: 35-40 mins, Cost is: RUPEES 200 for two, Offer Available: Get 10% OFF, Double tap to open restaurant menu.`,
        },
        {
            name: 'The Red Velvet',
            cuisines: 'Indian, Chinese, Tandoor',
            area: 'Khajpura',
            distance: '5.9 km away',
            rating: '4.0',
            deliveryTime: '45-50 mins',
            cost: '₹350 for two',
            offer: '₹125 OFF',
            offerDetails: 'ABOVE ₹249',
            imageSrc: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/kkfduxeoyq13skpoq38p',
            ariaLabel: `Restaurant name: The Red Velvet, Cuisines: Indian, Chinese, Tandoor, Area: Khajpura, 5.9 km away, Rating: 4.0, Delivers in: 45-50 mins, Cost is: RUPEES 350 for two, Offer Available: Get ₹125 OFF, Double tap to open restaurant menu.`,
        },
        {
            name: 'Dum Biryani',
            cuisines: 'Indian',
            area: 'Khajpura',
            distance: '5.9 km away',
            rating: '3.0',
            deliveryTime: '35-40 mins',
            cost: '₹200 for two',
            offer: '10% OFF',
            offerDetails: 'UPTO ₹40',
            imageSrc: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/cab92a27974eb78a5e917de85827ab22',
            ariaLabel: `Restaurant name: Dum Biryani, Cuisines: Indian, Area: Khajpura, 5.9 km away, Rating: 3.0, Delivers in: 35-40 mins, Cost is: RUPEES 200 for two, Offer Available: Get 10% OFF, Double tap to open restaurant menu.`,
        },
    ];
    return (
        <>
            <div style={{ padding: '0px',marginTop: "60px" }}>
                <div>
                    <div data-testid="grid-container" aria-hidden="false" style={{ padding: '16px 16px 12px' }}>
                        <div className="styles_slider__podEu" data-testid="grid-slider">
                            <div className="styles_row__1ivP1" data-testid="grid-row" style={{ marginBottom: '0px' }}>
                                {images.map((src, index) => (
                                    <div key={index} className="styles_slide__2c207" style={{ marginRight: '12px' }}>
                                        <div className="Carousel_slide__klR8u">
                                            <div>
                                                <div
                                                    data-testid="image-info-container"
                                                    className="styles_container__1Nshr"
                                                    style={{
                                                        width: 'calc(-22px + 50vw)',
                                                        height: 'calc(-17.494px + 39.759vw)',
                                                        minWidth: 'calc(-22px + 50vw)',
                                                        minHeight: 'calc(-17.494px + 39.759vw)'
                                                    }}
                                                >
                                                    <button
                                                        data-testid="image-info-ripple"
                                                        aria-label="Click to know more about Restaurants."
                                                        className="Ripple_container__17nxL styles_containerImg__3AXGh"
                                                    >
                                                        <img
                                                            alt=""
                                                            className="styles_img__3HNZ4"
                                                            loading="lazy"
                                                            src={src}
                                                        />
                                                    </button>
                                                </div>
                                                <div></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div style={{ padding: "15px 0px 24px 16px" }}>
                    <h2 style={{ display: "flex", alignItems: "center" }}>
                        <img
                            alt=""
                            style={{ width: 40, height: 40 }}
                            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/sl9oogwe7n5dusolt5xe"
                        />
                        <span>Top Picks For You</span>
                    </h2>
                    <span aria-hidden="true"></span>
                </div>
                <div data-testid="grid-container" aria-hidden="false" style={{ paddingBottom: "12px", paddingRight: "16px", paddingLeft: "16px" }}>
                    <div className="styles_slider__podEu" data-testid="grid-slider">
                        <div className="styles_row__1ivP1" data-testid="grid-row" style={{ marginBottom: "0px" }}>
                            {restaurantts.map((restaurant, index) => (
                                <div className="styles_slide__2c207" style={{ marginRight: "12px" }} key={index}>
                                    <div data-testid="favourite-restaurant-item">
                                        <button
                                            aria-label={`Restaurant name: ${restaurant.name}, ${restaurant.time} ${restaurant.discount} ${restaurant.discountDetails} Double tap to open restaurant menu.`}
                                            className="FavouriteRestaurant_favouriteContainer__3Ykhl"
                                        >
                                            <div className="FavouriteRestaurant_favouriteContainerImageCon__tMvMP">
                                                <img
                                                    alt=""
                                                    className="FavouriteRestaurant_favouriteContainerImageConImagesContainer__1J6kD"
                                                    height="80"
                                                    loading="lazy"
                                                    width="80"
                                                    src={restaurant.imgSrc}
                                                />
                                                {restaurant.ad && <div className="FavouriteRestaurant_favouriteContainerAds__230ip">Ad</div>}
                                                <div className="FavouriteRestaurant_favouriteContainerOverlayOffer__eIxn0">
                                                    <div className="FavouriteRestaurant_favouriteContainerOverlayOfferHeading__3J-E1">{restaurant.discount}</div>
                                                    <div className="FavouriteRestaurant_favouriteContainerOverlayOfferSubheading__3MMlR">{restaurant.discountDetails}</div>
                                                </div>
                                            </div>
                                            <div className="FavouriteRestaurant_favouriteContainerTitle__2Q9Nl">{restaurant.name}</div>
                                            <div className="FavouriteRestaurant_favouriteContainerSlaString__1iAGU">{restaurant.time}</div>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ padding: '12px 20px 8px' }}>
                <div className="styles_slider__podEu" data-testid="grid-slider">
                    <div className="styles_row__1ivP1" data-testid="grid-row" style={{ marginBottom: '0px' }}>
                        {offerImages.map((image, index) => (
                            <div className="styles_slide__2c207" style={{ marginRight: '20px' }} key={index}>
                                <div className="Carousel_slide__klR8u">
                                    <div>
                                        <div
                                            data-testid="image-info-container"
                                            className="styles_container__1Nshr"
                                            style={{
                                                width: 'calc(-32px + 80vw)',
                                                height: 'calc(-26.3782px + 65.9456vw)',
                                                minWidth: 'calc(-32px + 80vw)',
                                                minHeight: 'calc(-26.3782px + 65.9456vw)',
                                            }}
                                        >
                                            <button
                                                data-testid="image-info-ripple"
                                                aria-label={image.ariaLabel}
                                                className="Ripple_container__17nxL styles_containerImg__3AXGh"
                                            >
                                                <img
                                                    alt={image.alt}
                                                    className="styles_img__3HNZ4"
                                                    loading="lazy"
                                                    src={image.src}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div data-testid="grid-scroll" className="styles_scrollContainer__3x6cO">
                        <div
                            className="styles_outerScroll__1FczW"
                            style={{
                                width: '54px',
                                backgroundColor: 'rgb(228, 228, 228)',
                                marginTop: '6px',
                                marginBottom: '12px',
                                height: '4px',
                            }}
                        >
                            <div
                                className="styles_innerScroll__3h73E"
                                style={{
                                    height: '4px',
                                    left: '0px',
                                    backgroundColor: 'rgb(228, 109, 71)',
                                    width: '32.4812px',
                                    willChange: 'left',
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ padding: '8px 0px 0px' }}>
                <div>
                    <div data-testid="grid-header" className="styles_headerContainer__2UgeD">
                        <div style={{ padding: '24px 0px 24px 16px' }}>
                            <h2 className="styles_headerContainerTitle__27_ET">
                                <span>Offers For You</span>
                            </h2>
                            <span className="styles_headerContainerSubtitle__1WRg5" aria-hidden="true"></span>
                        </div>
                    </div>
                    <div
                        data-testid="grid-container"
                        aria-hidden="false"
                        style={{ paddingBottom: '24px', paddingLeft: '16px', marginTop: '8px' }}
                    >
                        <div className="styles_slider__podEu" data-testid="grid-slider">
                            <div className="styles_row__1ivP1" data-testid="grid-row" style={{ marginBottom: '0px' }}>
                                {offers.map((offer, index) => (
                                    <div className="styles_slide__2c207" style={{ marginRight: '4px' }} key={index}>
                                        <div className="Carousel_slide__klR8u">
                                            <div>
                                                <div
                                                    data-testid="image-info-container"
                                                    className="styles_container__1Nshr"
                                                    style={{
                                                        width: 'calc(-8.57143px + 35.7143vw)',
                                                        height: 'calc(-10.2143px + 42.5595vw)',
                                                        minWidth: 'calc(-8.57143px + 35.7143vw)',
                                                        minHeight: 'calc(-10.2143px + 42.5595vw)',
                                                    }}
                                                >
                                                    <button
                                                        data-testid="image-info-ripple"
                                                        aria-label={offer.ariaLabel}
                                                        className="Ripple_container__17nxL styles_containerImg__3AXGh"
                                                    >
                                                        <img
                                                            alt={offer.alt}
                                                            className="styles_img__3HNZ4"
                                                            loading="lazy"
                                                            src={offer.src}
                                                        />
                                                    </button>
                                                </div>
                                                <div></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ padding: '0px' }}>
                <div>
                    <div></div>
                    <div data-testid="grid-header" className="styles_headerContainer__2UgeD">
                        <div style={{ padding: '24px 0px 24px 16px' }}>
                            <h2 className="styles_headerContainerTitle__27_ET">
                                <img
                                    alt=""
                                    className="styles_headerContainerImage__2ZqQD"
                                    loading="lazy"
                                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/rng/md/production/ipai4xhkoy9ovshdnyn6"
                                />
                                <span>All Restaurants Nearby</span>
                            </h2>
                            <span className="styles_headerContainerSubtitle__1WRg5" aria-hidden="true">
                                Discover unique tastes near you
                            </span>
                        </div>
                    </div>
                    <div data-testid="grid-container" aria-hidden="false" style={{ paddingBottom: '8px', paddingRight: '12px' }}>
                        <div className="styles_slider__podEu" data-testid="grid-slider">
                            {restaurants.map((restaurant, index) => (
                                <a href={`${restaurantUrl}${restaurant.id}`} className="styles_row__1ivP1" data-testid="grid-row" style={{ marginBottom: '24px' }} key={index}>
                                    <div className="styles_slide__2c207" style={{ marginRight: '0px' }}>
                                        <div>
                                            <div
                                                className="styles_cardWithPadding__JE1QE"
                                                data-testid="home-restaurant-card-wrapper"
                                                style={{ width: 'calc(-12px + 100vw)' }}
                                            >
                                                <a href={`${restaurantUrl}${restaurant.id}`}
                                                    data-testid="resturant-card-anchor-container"
                                                    className="styles_container__fLC0R"
                                                    aria-label={restaurant.ariaLabel}
                                                    tabIndex="0"
                                                    role="button"
                                                >
                                                    <div className="styles_imgContainer__1uHo5" aria-hidden="true">
                                                        <div
                                                            className="styles_ImageContainer__2rk9a"
                                                            data-testid="resturant-card-image-container"
                                                            style={{ background: 'rgb(251, 238, 215)' }}
                                                        >
                                                            <img
                                                                src={restaurant.imageUrl}
                                                                alt={restaurant.name}
                                                                className="styles_Image__1fplJ"
                                                                loading="lazy"
                                                                data-testid="resturant-card-image"                                                            />
                                                        </div>
                                                        <div className="OfferHeading_container__1-mOm">
                                                            <div className="OfferHeading_wrapper__2NaIu OfferHeading_wrapperTypeOne__26S_t">
                                                                <div className="OfferHeading_Header__3b4k3">{restaurant.offer}</div>
                                                                <div className="OfferHeading_SubHeader__3nmoQ">• {restaurant.offerDetails} •</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div aria-hidden="true" className="styles_containerRestaurant__3vhx3">
                                                        <div className="styles_containerImageBadge__14fk3">
                                                            <div data-testid="resturant-card-name" className="styles_restaurantName__29jAP">
                                                                {restaurant.name}
                                                            </div>
                                                        </div>
                                                        <div className="styles_restaurantMeta__2QtMf" data-testid="restaurant-card-meta-block">
                                                            <div data-testid="restaurant-card-rating">
                                                                <span className="styles_restaurantMetaRatingStar__7G4dD icon-star" data-testid="restaurant-meta-rating-icon"></span>
                                                                <span className="styles_restaurantMetaRating__4H1gt" data-testid="restaurant-meta-rating">
                                                                    {restaurant.rating}
                                                                </span>
                                                            </div>
                                                            <span className="styles_restaurantMetaDot__1AKA9" data-testid="restaurant-meta-dot-one"></span>
                                                            <div data-testid="restaurant-card-time">{restaurant.deliveryTime}</div>
                                                            <span className="styles_restaurantMetaDot__1AKA9" data-testid="restaurant-meta-dot-two"></span>
                                                            <div data-testid="restaurant-card-cost">{restaurant.cost}</div>
                                                        </div>
                                                        <div className="styles_restaurantCuisines__3lBL4">
                                                            <span data-testid="restaurant-card-cuisines">{restaurant.cuisines}</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div></div>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                    <img alt="" className="_3wU45" loading="lazy" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/footer_graphic_vxojqs" />
                </div>
            </div>
        </>
    );
} 