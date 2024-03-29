//  Get request function (fetch total meals)
export async function fetchMeals() {
    
    const response = await fetch('http://localhost:3000/meals');
    const data = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch meals. Check the error message');
    }

    return data
}

// Get request function (fetch total user orders)
export async function fetchUserOrder() {
    const response = await fetch('http://localhost:3000/orders');
    const data = await response.json();

    if (!response.ok) {
        throw new Error(response.status + ' ' + response.statusText);
    } 

    return data;
}


// Post request function (how to save an order)
export async function sendUserOrder(items, customerData) {
   
    const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({order: {items: items, customer: customerData}})
    });

    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to send user meals.');
    }

    return resData.message;
}





