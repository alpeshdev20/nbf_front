"use client";

//* Importing Components
import React, { useState } from 'react';

//*css
import Style from "@/components/FaqCard/FaqCard.module.css";

//* Icons
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";



//* Interface
interface FaqCardInterface {
    title: string;
    content: string;
    id: number;
    isOpen: boolean;
    onToggle: () => void;
}



const FaqCard: React.FC<FaqCardInterface> = ({ title, content, id, isOpen, onToggle }) => {
    return (
        <div className={Style.faq_card} key={id}>
            <div className={Style.faq_card_header}>
                <p>{title}</p>
                <span onClick={onToggle}>{isOpen ? <FaMinus /> : <FaPlus />}</span>
            </div>

            <div className={`${Style.faq_card_body} ${isOpen ? Style.faq_show : ''}`}>
                <p>{content}</p>
            </div>
        </div>
    );
};

export default FaqCard