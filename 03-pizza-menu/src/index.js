import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}
function Header() {
  return (
    <header className="header">
      <h1>FAST REACT PIZZA CO.</h1>
    </header>
  );
}
function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {pizzaData.length > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {/* We use the map method to iterate over each pizza in the array */}
            {pizzaData.map((pizza) => (
              <Pizza dataObj={pizza} key={pizza.name} />
            ))}
            {/* <Pizza
          photoSrc="pizzas/focaccia.jpg"
          pizzaName="Focaccia"
          ingredients="Bread with italian olive oil and rosemary"
          price={6}
          />
          <Pizza
            photoSrc="pizzas/margherita.jpg"
            pizzaName="Pizza Margherita"
            ingredients="Tomato and mozarella"
            price={10}
          /> */}
          </ul>
        </>
      ) : (
        <p>We're still working on our menu, Please come back later.</p>
      )}
    </main>
  );
}

function Pizza({ dataObj }) {
  return (
    <li className="pizza">
      <img src={dataObj.photoName} alt={dataObj.name} />
      <div>
        <h3>{dataObj.name}</h3>
        <p>{dataObj.ingredients}</p>
        <span>{dataObj.price + "$"}</span>
      </div>
    </li>
  );
}
function Footer() {
  const hour = new Date().getHours();
  const openHour = 5;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour < closeHour;
  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHourRef={closeHour} />
      ) : (
        <p>
          We're happy to welcom you between {openHour}:00 and {closeHour}:00.{" "}
        </p>
      )}
    </footer>
  );
}
function Order({ closeHourRef }) {
  return (
    <div className="order">
      <p>
        We're open until {closeHourRef}:00.
        <br /> Come visit us or order online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
