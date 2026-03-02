import Img from './img';
import { useNavigate } from 'react-router-dom';

export function ShoppingCart({ cart, setCart, removeFromCart }){
    const navigate = useNavigate();
    return(
        <>
          <h3>עגלת הקניות</h3>
            <table border="1">
            <thead>
              <tr>
              <th>מוצר</th>
              <th>תיאור</th>
              <th>עלות בש"ח</th>
              <th>כמות</th>
              <th></th>
              </tr>
            </thead>
            <tbody>
            {cart.map(item => (
              <tr key={item.rowId}>
                <td><Img fileName={item.image} /></td>
                <td>{item.description}</td>
                <td>{item.price} {"₪"}</td>
                <td><input type="number" min="1" value={item.qty}
                      onChange={(e) => setCart(prev => prev.map(row =>
                        row.rowId === item.rowId ? { ...row, qty: Number(e.target.value) } : row
                          )
                        )
                      }
                    />
                  </td>
                  <td><button onClick={() => removeFromCart(item.rowId)} style={{color:"red"}}>X</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <br></br>
          <p>סה"כ לתשלום: {cart.reduce((sum, item) => sum + item.price * item.qty, 0)} ₪</p>
          <button onClick={() => navigate("/checkout")}>מעבר לקופה</button>
        </>
    )
}