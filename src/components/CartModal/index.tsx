'use client'
import React from 'react';
import { ProductData } from '@/app/(product-routes)/products/productTypes';

interface CartModalProps {
    isOpen: boolean;
    cartItems: ProductData[];
    closeModal: () => void;
    removeFromCart: (productId: number) => void; 
}

export default function CartModal({ isOpen, cartItems, closeModal, removeFromCart }: CartModalProps) {
    const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <div className={`cart fixed top-0 right-0 h-full w-1/4 bg-white transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="cart-content p-4 h-full flex flex-col justify-between">
                <div>
                    <button onClick={closeModal} className="bg-transparent text-black border p-2 mt-2">
                        x
                    </button>
                    <h2 className="text-2xl text-black text-center font-bold mb-4">Carrinho</h2>
                    <ul className="flex-1 overflow-y-auto">
                        {cartItems.map((item) => (
                            <li key={item.id} className="flex text-black justify-between items-center border-b py-2">
                                <span>{item.title}</span>
                                <div className="flex items-center">
                                    <span className="mr-4">${item.price.toFixed(2)}</span>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        Remover
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-4 text-black text-3xl font-bold">Total: ${totalAmount.toFixed(2)}</div>
            </div>
        </div>
    );
};