"use client";
import useAuth from "@/app/hooks/useAuth";
import useProduct from "@/app/hooks/useProduct";
import CardItem from "@/components/CardItem";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { db } from "@/firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Product = () => {
  const { user, userProfile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && userProfile.role === "admin") {
      router.push("/admin");
    }
  }, [user, userProfile, router]);

  useEffect(() => {
    const unsubProduct = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsubProduct();
    };
  }, []);

  const { isInCart, removeFromCart, addToCart, data, setData } = useProduct();
  return (
    <div>
      <Navbar />
      <div className="p-8 md:p-24 mt-10">
        <div className="flex justify-between mb-10">
          <h2 className="text-3xl mb-3">All Products</h2>
          <input type="text" className="input input-bordered" />
          <select className="select select-bordered w-full max-w-xs">
            <option value={"fikom"}>Fikom</option>
            <option value={"dkv"}>DKV</option>
            <option value={"Fasilkom"}>Fasilkom</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6">
          {data.map((product) => (
            <CardItem
              key={product.id}
              imageUrl={product.image}
              fakultas={product.category}
              judul={product.title}
              deskripsi={product.description}
              harga={product.price}
              addToCart={() => addToCart(product)}
              removeFromCart={() => removeFromCart(product)}
              isInCart={isInCart(product.id)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
