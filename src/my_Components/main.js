import React,{useState,useRef,useEffect} from 'react';
import {createBrowserRouter,RouterProvider,Link,Outlet,useRouteError} from "react-router-dom";
import { productsArr } from './ProductsArr';
import { Admin } from './admin';
import { Front_Page } from './front_page';
import { ShoppingCart } from './shopping_cart';
import { Checkout } from './checkout';

export default function Store_Pages(){
  //localStorage.clear();
  const [products, setProducts] = useState(() => {
  const saved = localStorage.getItem("products");
  return saved ? JSON.parse(saved) : productsArr;
  });
  const [cart, setCart] = useState([]);
  const rowIdRef = useRef(0);
  useEffect(() => {
  localStorage.setItem("products", JSON.stringify(products));
  }, [products]);
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingRow = prevCart.find(
        item => item.code === product.code
      );
      if (existingRow) {
        return prevCart.map(item =>
          item.code === product.code ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prevCart,
        {
          ...product,
          rowId: rowIdRef.current++,
          qty: 1
        }
      ];
    });
  };
    const removeFromCart = (rowId) => {
    setCart(prevCart =>
      prevCart.filter(item => item.rowId !== rowId)
    );
  };
  let router= createBrowserRouter(
    [
      {
        path:'/', element:<>
        <h1>החנות של מור</h1>
      <nav><Link to="/"><button>אינדקס</button></Link> &nbsp;
           <Link to="/shoppingCart"><button>עגלת הקניות</button></Link> &nbsp;
           <Link to="/checkout"><button>קופה</button></Link> &nbsp; </nav>
           <Outlet></Outlet>
        </>, children:[{
            index:true, element:<>
            <Front_Page products={products} addToCart={addToCart}/>
            </>
        },
        {
        path:'/admin', element:<>
        <Admin products={products} setProducts={setProducts} /></>
        },
        {
          path:'/shoppingCart', element:<>
          <ShoppingCart cart={cart} 
                        setCart={setCart} 
                        removeFromCart={removeFromCart}></ShoppingCart>
        </>
        },
        {
        path:'/checkout', element:<>
        <Checkout cart={cart} setCart={setCart} />
        </>
        },
      ],
        errorElement:<ErrorPage></ErrorPage>,
      },
    ]
  );
  return(
    <>
    <div dir="rtl" style={{backgroundColor:"lightblue"}}>
          <RouterProvider router={router}></RouterProvider>
    </div>
    </>
  )
}
export function ErrorPage(){
  let error=useRouteError();
  return(
    <>
    <h1>oops</h1>
    <h3>the page does not exist</h3>
    <h5>{error.statusText}</h5>
    </>
  )
}