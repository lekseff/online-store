import React from "react"
import ContentLoader from "react-content-loader"

const ProductLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={930}
    height={610}
    viewBox="0 0 930 610"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="215" y="40" rx="8" ry="8" width="500" height="40" /> 
    <rect x="3" y="108" rx="8" ry="8" width="370" height="460" /> 
    <rect x="400" y="108" rx="8" ry="8" width="530" height="295" /> 
    <rect x="600" y="431" rx="8" ry="8" width="120" height="26" /> 
    <rect x="610" y="473" rx="8" ry="8" width="100" height="31" /> 
    <rect x="400" y="520" rx="8" ry="8" width="530" height="48" /> 
  </ContentLoader>
)

export default ProductLoader;
