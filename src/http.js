//  Get request function
export async function fetchMeals() {
    
    const response = await fetch('http://localhost:3000/meals');
    const data = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch meals. Check the URL address');
    }

    return data
}


// Put request function (how to save orders)
export async function sendUserOrder(customerData, items) {

    const response = await fetch('http://localhost:3000/orders', 
    
    // Oggetto di configurazione della richiesta in uscita
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            order: {
                items: items,
                customer: customerData
            }
        })
    });

    const resData = await response.json();

    // Se la risposta non è ok => throw new Error
    if (!response.ok) {
        throw new Error('Failed to send user meals.');
    }

    // Messaggio di riuscita del salvataggio
    return resData.message
}

export async function fetchOrderMeals() {
    
    const response = await fetch('http://localhost:3000/orders');
    const data = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch meals. Check the URL address');
    }

    return data
}


