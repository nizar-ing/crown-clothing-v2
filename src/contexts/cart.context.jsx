import {createContext, useState, useEffect} from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    if(existingCartItem){
        return ( cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
            { ...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        ));
    }
    return ([ ...cartItems, {
        ...productToAdd,
        quantity: 1
    }]);
};

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);
    if(existingCartItem){
        if(existingCartItem.quantity === 1) {
            return (cartItems.filter((cartItem) => cartItem.id !== productToRemove.id));
        }
        return ( cartItems.map((cartItem) => cartItem.id === productToRemove.id ?
            { ...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
        ));
    }
    return (cartItems);
};

const CartContext = createContext({
    toggleCart: false,
    setToggleCart: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

const CartProvider = ({children}) => {
    const [toggleCart, setToggleCart] =useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem['price']) , 0);
        setCartTotal(newTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (productToRemove) => {
         setCartItems(removeCartItem(cartItems, productToRemove));
    };
    const clearItemFromCart = (cartItem) => {
        setCartItems(cartItems.filter((item) => item.id !== cartItem.id));
    };

    const value = {cartCount, cartTotal, cartItems, toggleCart, setToggleCart, addItemToCart, removeItemFromCart, clearItemFromCart };
    return (<CartContext.Provider value={value}>{children}</CartContext.Provider>);
};

export {CartContext, CartProvider};
