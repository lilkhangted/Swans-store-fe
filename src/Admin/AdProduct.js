import React, { useEffect, useState } from "react";

const AdProduct = () => {
  const [products, setProducts] = useState([]);
  const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://swans-store-be.onrender.com";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        if (res.ok) {
          setProducts(data);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      <h2>Danh sách sản phẩm</h2>
      <table width={1600} cellPadding="8" cellSpacing="0">
        <thead border-bottom="2px solid black">
          <tr style={{ fontSize: "25px"}}>
            <th>Image</th>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Categories</th>
            <th>Color / Stock</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p.id}>
                <td>
                  <img
                    src={p.images?.[0]}
                    alt={p.name}
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  />
                </td>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.price.toLocaleString()} đ</td>
                <td>{p.categoryId}</td>
                <td>
                  {p.variants?.map((v, i) => (
                    <div key={i}>
                      <strong>{v.color}</strong>: {v.stock} sp
                    </div>
                  ))}
                </td>
                <td>
                  <button>Sửa</button>
                  <button style={{ marginLeft: "5px" }}>Xóa</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                Không có sản phẩm nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdProduct;
