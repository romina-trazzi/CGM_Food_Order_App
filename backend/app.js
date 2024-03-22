import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/meals", async (req, res) => {
  try {
    const meals = await fs.readFile("./data/available-meals.json", "utf8");
    res.json(JSON.parse(meals));
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/orders", async (req, res) => {
  const orderData = req.body.order;

  if (
    orderData === null ||
    orderData.items === null ||
    orderData.items.length === 0
  ) {
    return res.status(400).json({ message: "Missing data." });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes("@") ||
    orderData.customer.fullName === null ||
    orderData.customer.fullName.trim() === "" ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === "" ||
    orderData.customer.postalCode === null ||
    orderData.customer.postalCode.trim() === "" ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ""
  ) {
    return res.status(400).json({
      message:
        "Missing data: Email, name, street, postal code or city is missing.",
    });
  }

  try {
    const newOrder = {
      ...orderData,
      id: (Math.random() * 1000).toString(),
    };

    // Read and pars data .js --> .json
    const orders = await fs.readFile("./data/orders.json", "utf8");
    const allOrders = JSON.parse(orders);

  
    // Add new order
    allOrders.push(newOrder);

    // Write data on order.json
    await fs.writeFile("./data/orders.json", JSON.stringify(allOrders));
    res.status(201).json({ message: "Order created!" });
  
  
  } catch (error) {
    console.error("Errore durante l'operazione di scrittura del file:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

app.get("/orders", async (req, res) => {
  try {
    const orders = await fs.readFile("./data/orders.json", "utf8");
    res.json(JSON.parse(orders));
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(3000);



























  

   
