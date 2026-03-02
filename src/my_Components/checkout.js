import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Checkout({ cart, setCart }) {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [buyerId, setBuyerId] = useState("");
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty, 0 );
    const handleSubmit = (e) => {
    e.preventDefault();
    if (!address || !buyerId) {
      alert("יש למלא את כל הפרטים");
      return;
    }
    const order = {
      buyerId,
      address,
      total,
      items: cart.map(item => ({
      code: item.code,
      qty: item.qty
      }))
    };
    localStorage.setItem("lastOrder", JSON.stringify(order));
    alert(
      `ההזמנה נשמרה בהצלחה ✅
      ת"ז קונה: ${order.buyerId}
      כתובת: ${order.address}
      מוצרים: 
      ${order.items.map(i => `קוד ${i.code} - כמות ${i.qty}`).join("\n")}
      סה"כ לתשלום: ${order.total} ₪`
    );
    setCart([]);
    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>קופה</h2>
      <p><strong>סה״כ לתשלום:</strong> {total} ₪</p>
      <label>כתובת למשלוח:</label><br />
      <input value={address} onChange={e => setAddress(e.target.value)} /><br /><br />
      <label>תעודת זהות:</label><br />
      <input value={buyerId} onChange={e => setBuyerId(e.target.value)} pattern="\d{9}" title="תעודת זהות חייבת להכיל 9 ספרות" /><br /><br />
      <button type="submit">ביצוע הקנייה</button>
    </form>
  );
}