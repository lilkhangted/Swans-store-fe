import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/authContext";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../App.css";

const CartPage = () => {
  const { user } = useAuth();
  const userId = user?.userId;
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/cart/${userId}`);
        const cartData = res.data;
        const detailedItems = await Promise.all(
          cartData.items.map(async (item) => {
            const productRes = await axios.get(
              `${API_URL}/api/products/${item.productId}`
            );
            return {
              ...item,
              product: productRes.data,
            };
          })
        );

        setCart({ ...cartData, items: detailedItems });
      } catch (err) {
        console.error("Lỗi lấy giỏ hàng:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);
  const updateQuantity = async (productId, color, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.put(`${API_URL}/api/cart/update`, {
        userId,
        productId,
        color,
        quantity,
      });
      const res = await axios.get(`${API_URL}/api/cart/${userId}`);
      const cartData = res.data;

      const detailedItems = await Promise.all(
        cartData.items.map(async (item) => {
          const productRes = await axios.get(
            `${API_URL}/api/products/${item.productId}`
          );
          return { ...item, product: productRes.data };
        })
      );

      setCart({ ...cartData, items: detailedItems });
    } catch (err) {
      console.error("Lỗi cập nhật số lượng:", err);
    }
  };
  
  const removeItem = async (productId, color) => {
    try {
      await axios.delete(`${API_URL}/api/cart/remove`, {
        data: { userId, productId, color },
      });
      const res = await axios.get(`${API_URL}/api/cart/${userId}`);
      const cartData = res.data;

      const detailedItems = await Promise.all(
        cartData.items.map(async (item) => {
          const productRes = await axios.get(
            `${API_URL}/api/products/${item.productId}`
          );
          return { ...item, product: productRes.data };
        })
      );

      setCart({ ...cartData, items: detailedItems });
    } catch (err) {
      console.error("Lỗi xóa sản phẩm:", err);
    }
  };

  if (!userId) return <p>Vui lòng đăng nhập để xem giỏ hàng.</p>;
  if (loading) return <p>Đang tải giỏ hàng...</p>;

  return (
    <div className="cart-container">
      <Header />

      {cart && cart.items.length > 0 ? (
        <>
          <div className="cart-header">
            <div>Sản phẩm</div>
            <div>Tên sản phẩm</div>
            <div>Phân loại</div>
            <div>Đơn giá</div>
            <div>Số lượng</div>
            <div>Thành tiền</div>
          </div>

          {cart.items.map((item, index) => (
            <div key={index} className="cart-item">
              <div>
                <img
                  src={item.product?.images?.[0]}
                  alt={item.product?.name}
                  className="cart-img"
                />
              </div>
              <div className="cart-name">{item.product?.name}</div>
              <div>{item.color}</div>
              <div>₫{item.product?.price.toLocaleString()}</div>
              <div className="quantity-controls">
                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.color, item.quantity - 1)
                  }
                >
                  -
                </button>
                <input type="text" value={item.quantity} readOnly />
                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.color, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <div>
                <p className="cart-total">
                  ₫{(item.product?.price * item.quantity).toLocaleString()}
                </p>
                <button
                  onClick={() => removeItem(item.product.id, item.color)}
                  className="remove-btn"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}

          <div className="cart-footer">
            <div className="cart-sum">
              Tổng cộng:{" "}
              <strong>
                ₫
                {cart.items
                  .reduce(
                    (sum, i) => sum + i.product?.price * i.quantity,
                    0
                  )
                  .toLocaleString()}
              </strong>
            </div>
            <button className="checkout-btn">Mua hàng</button>
          </div>
        </>
      ) : (
        <p className="empty-cart">Giỏ hàng trống</p>
      )}
      <Footer />
    </div>
  );
};

export default CartPage;
