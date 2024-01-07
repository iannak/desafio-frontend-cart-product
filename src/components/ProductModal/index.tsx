'use client'
import { ProductData } from '@/app/(product-routes)/products/productTypes';
import React from 'react';
import Modal from 'react-modal';
import { Label } from "@/components/ui/label"

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  selectedProduct: ProductData | null;
}

export default function ProductModal({ isOpen, closeModal, selectedProduct }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg"
      overlayClassName="fixed inset-0 bg-black opacity-50"
    >
      {selectedProduct && (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Editando Produto</h2>
          <Label className="block mb-2">Título: {selectedProduct.title}</Label>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={closeModal}
          >
            Fechar
          </button>
        </div>
      )}
    </Modal>
  );
};
