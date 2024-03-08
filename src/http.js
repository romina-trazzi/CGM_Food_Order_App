//  Get request function
export async function fetchMeals() {
    
    const response = await fetch('http://localhost:3000/meals');
    const data = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch meals. Check the URL address');
    }

    return data
}