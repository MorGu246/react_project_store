import Img from './img';
import './myCss.css'

export function Front_Page({ products, addToCart }) {
  return (
    <div className="present">
      {products.map(obj1 => (
        <nav key={obj1.code} className="imageDesc">
          <Img fileName={obj1.image} /><br></br>
          {obj1.description}<br />
          {obj1.price} {"₪"}<br />
          <button onClick={() => addToCart(obj1)}>
            הוסף לעגלת הקניות
          </button>
        </nav>
      ))}
    </div>
  );
}