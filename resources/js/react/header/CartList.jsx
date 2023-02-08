import React, { useEffect, useRef, useState } from "react";
import useScrollLock from "../../../../my/myCustomHooks/useScrollLock";
import { useCartItemsState } from "../ListsContext";
import InCartItem from "./InCartItem";
import data from "../data.json";

import useClickOutSide from "../../my/myCustomHooks/useClickOutSide";
export default ({ openCart, setOpenCart }) => {
    const ele = useRef(null);
    const cardContainer = useRef(null);
    const { cartItem, setCartItem } = useCartItemsState();

    useClickOutSide(
        ele,
        () => {
            if (openCart) {
                setOpenCart(false);
            }
        },
        {},
        [openCart]
    );
    useEffect(() => {
        setCartItem(() => {
            return JSON.parse(localStorage.getItem("cart"));
        });
    }, [openCart, JSON.parse(localStorage.getItem("cart")).length]);
    useScrollLock(openCart);
    return (
        <>
            <section
                ref={ele}
                key="cartList"
                className={`${
                    openCart
                        ? "clipCartMenuEnd pointer-events-auto"
                        : "clipCartMenuStart pointer-events-none"
                }  
     fixed  top-0  right-0 h-screen w-full max-w-[400px]
      divide-y-2 divide-x-0 divide-solid divide-slate-300 bg-white/20 shadow backdrop-blur-[40px] transition-[clip-path] duration-1000 `}
            >
                <h2 className=" bg- w-full p-4 capitalize shadow  ">
                    shopping cart
                </h2>

                <div
                    ref={cardContainer}
                    className=" remove_scroll_bar flex h-2/3 flex-col gap-4 overflow-y-scroll p-4 "
                >
                    {cartItem &&
                        data.map((item) => {
                            return cartItem.map((inCart, index) => {
                                if (inCart.id == item.id) {
                                    return (
                                        <>
                                            <InCartItem
                                                info={item}
                                                index={index}
                                                key={index}
                                                setCartItem={setCartItem}
                                            />
                                        </>
                                    );
                                }
                            });
                        })}
                </div>

                <div className=" h-full w-full bg-slate-400/30 backdrop-blur-[40px]">
                    <h3 className=" capitalize">total price :</h3>
                </div>
            </section>
        </>
    );
};
