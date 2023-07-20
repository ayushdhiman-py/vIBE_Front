import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";

export const Banner = () => {
  return (
    <>
      {/* For mobile*/}
      <CCarousel controls indicators>
        <CCarouselItem>
          <CImage
            className="d-block w-100"
            style={{ height: "500px" }}
            src={
              "https://cdn.euromart.com/media/images/winter-sale-5-1-3674035.jpg"
            }
            alt="slide 1"
            />
        </CCarouselItem>
        <CCarouselItem>
          <CImage
            className="d-block w-100"
            style={{ height: "500px" }}
            src={
              "https://img.freepik.com/free-vector/flat-design-fashion-stylist-sale-banner_23-2150007862.jpg"
            }
            alt="slide 2"
            />
        </CCarouselItem>
        <CCarouselItem>
          <CImage
            className="d-block w-100"
            style={{ height: "500px" }}
            src={
              "https://cdn.euromart.com/media/images/winter-sale-5-1-3674035.jpg"
            }
            alt="slide 3"
          />
        </CCarouselItem>
      </CCarousel>
    </>
  );
};
