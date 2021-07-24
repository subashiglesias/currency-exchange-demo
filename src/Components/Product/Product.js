import './Product.css'

const Product = ({imgSource, caption, rate}) => {
    return (
        <div className="product">
            <div className="product__image">
                <img height={100} width={100} src={imgSource} alt="Loading..."/>
            </div>
            <p>{caption}</p>
            <p>{rate}</p>
        </div>
    )
}

export default Product