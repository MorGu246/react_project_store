import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Admin({ products, setProducts }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    code: "",
    image: "",
    description: "",
    price: ""
  });
  const handleCodeChange = (e) => {
    const code = e.target.value;
    const existing = products.find(p => p.code === code);
    if (existing) {
      setForm({
        code: existing.code,
        image: existing.image || "",
        description: existing.description || "",
        price: existing.price.toString()
      });
    } else {
      setForm(prev => ({
        ...prev,
        code,
        image: "",
        description: "",
        price: ""
      }));
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts(prev => {
      const exists = prev.find(p => p.code === form.code);
      if (exists) {
        return prev.map(p =>
          p.code === form.code ? { ...form, price: Number(form.price) } : p
        );
      }
      return [...prev, { ...form, price: Number(form.price) }];
    });
    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>ניהול מוצרים</h3>
      <label>קוד:</label>
      <input name="code" value={form.code} onChange={handleCodeChange} /><br />
      <label>תמונה (שם קובץ):</label>
      <input name="image" value={form.image} onChange={handleChange} /><br />
      <label>תיאור:</label>
      <input name="description" value={form.description} onChange={handleChange} /><br />
      <label>מחיר:</label>
      <input name="price" type="number" value={form.price} onChange={handleChange}/><br />
      <button type="submit">שמור</button>
    </form>
  );
}