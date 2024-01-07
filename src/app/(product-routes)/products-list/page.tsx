'use client'
import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { ProductData } from '../products/productTypes';
import CartModal from '@/components/CartModal';

export default function ProductList() {
    const [productList, setProductList] = useState<ProductData[]>([]);
    const [cart, setCart] = useState<ProductData[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const loadProductList = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProductList(data);
        } catch (error) {
            console.error('Erro ao carregar a lista de produtos:', error);
        }
    };

    useEffect(() => {
        const storedProductList = localStorage.getItem('productList');
        if (storedProductList) {
            setProductList(JSON.parse(storedProductList));
        } else {
            loadProductList();
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('productList', JSON.stringify(productList));
    }, [productList]);

    const addToCart = async (productId: number) => {
        const selectedProduct = productList.find((product) => product.id === productId);

        if (selectedProduct) {
            setCart((prevCart) => [...prevCart, selectedProduct]);

            localStorage.setItem('cart', JSON.stringify([...cart, selectedProduct]));
        }
    };

    const removeFromCart = (productId: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

        localStorage.setItem('cart', JSON.stringify(cart.filter((item) => item.id !== productId)));
    };


    const openCart = () => {
        setIsCartOpen(true);
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    const reloadProductList = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProductList(data);
        } catch (error) {
            console.error('Erro ao recarregar a lista de produtos:', error);
        }
    };

    return (
        <div className="product-list">
            <h1 className="flex justify-between items-center text-2xl py-2 px-2">
                Lista de Produtos
                <button className="text-blue-500 flex justify-center items-center mr-2" onClick={openCart}>
                    <FaShoppingCart className="mr-2" />
                    ({cart.length})
                </button>
            </h1>

            <div className="grid grid-cols-3 gap-4">
                {productList.map((product) => (
                    <div key={product.id} className="border p-4">
                        <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                        <p className="text-gray-600">{product.description}</p>
                        <p className="text-blue-500 font-bold mt-2">${product.price}</p>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 mt-2"
                            onClick={async () => {
                                await addToCart(product.id);
                                reloadProductList();
                            }}
                        >
                            Adicionar ao Carrinho
                        </button>
                    </div>
                ))}
            </div>

            <CartModal
                isOpen={isCartOpen}
                cartItems={cart}
                closeModal={closeCart}
                removeFromCart={removeFromCart}
            />
        </div>
    );
}
