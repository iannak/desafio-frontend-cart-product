'use client'

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ value, onChange }) => {
  const formatCurrency = (inputValue: string) => {
    const numericValue = inputValue.replace(/[^0-9.]/g, '');
    const floatValue = parseFloat(numericValue);

    if (!isNaN(floatValue)) {
      return floatValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    return '';
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formattedValue = formatCurrency(inputValue);
    onChange(formattedValue);
  };

  return (
    <input
      className="h-12 rounded-md p-2 text-white bg-transparent border border-gray-300 w-full"
      type="text"
      value={value}
      onChange={handleInputChange}
    />
  );
};

export default function ProductForm() {
  const [productData, setProductData] = useState({
    productName: '',
    price: '',
    description: '',
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newValue = name === 'price' ? formatCurrency(value) : value;
    setProductData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    const floatValue = parseFloat(numericValue);

    if (!isNaN(floatValue)) {
      return floatValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    return '';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const apiUrl = 'https://fakestoreapi.com/products';

    try {
      const requestBody = {
        title: productData.productName,
        price: parseFloat(productData.price.replace(/[^\d.]/g, '')),
        description: productData.description
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const json = await response.json();
        console.log('Produto cadastrado:', json);

        toast.success('Produto cadastrado com sucesso!', {
          position: 'bottom-right',
          autoClose: 3000,
        });

        const storedProductList = localStorage.getItem('productList');
        const productList = storedProductList ? JSON.parse(storedProductList) : [];
        localStorage.setItem('productList', JSON.stringify([...productList, json]));

        setProductData({
          productName: '',
          price: '',
          description: ''
        });

        setTimeout(() => {
          router.push('/products-list');
        }, 3000);
      } else {
        console.error('Erro ao cadastrar produto:', response.statusText);

        toast.error('Erro ao cadastrar produto. Tente novamente.', {
          position: 'bottom-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Erro de rede:', error);

      toast.error('Erro de rede. Verifique sua conexão e tente novamente.', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="product-form-container px-10 py-10">
      <h1 className='flex justify-center items-center mt-4'>Cadastro de Produtos</h1>
      <form onSubmit={handleSubmit} className="product-form">
        <Label>
          Nome do Produto:
          <Input
            className="h-12 rounded-md p-2 text-white bg-transparent border border-gray-300 w-full"
            type="text"
            name="productName"
            value={productData.productName}
            onChange={handleChange}
          />
        </Label>
        <br />
        <Label>
          Preço:
          <CurrencyInput
            value={productData.price}
            onChange={(formattedValue) => setProductData((prevData) => ({ ...prevData, price: formattedValue }))}
          />
        </Label>
        <br />
        <Label>
          Descrição:
          <textarea
            className="h-12 rounded-md p-2 text-white bg-transparent border border-gray-300 w-full"
            name="description"
            value={productData.description}
            onChange={handleChange}
          />
        </Label>
        <br />
        <Button className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-md mt-4" type="submit">Cadastrar Produto</Button>
      </form>
      <ToastContainer />
    </div>
  );
};
