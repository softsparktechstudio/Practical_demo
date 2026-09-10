const API_URL = 'https://jsonplaceholder.typicode.com/posts/1'; // Mock Endpoint
const container = document.getElementById("container");

// 1. Fetching Data
async function fetchData() {
    const res = await fetch(API_URL);
    const data = await res.json();
    // Simulate an array based on the fetched data ID
    return [50, 10, 80, 30, 90, 20].map(n => n + (data.id * 5));
}

// 2. The Sorting Logic (This is what they must write!)
async function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                render(arr);
                await new Promise(r => setTimeout(r, 300)); // Animation speed
            }
        }
    }
    return arr;
}

// 3. Rendering
// Updated Render function with label support
function render(arr) {
    container.innerHTML = "";
    arr.forEach(val => {
        const bar = document.createElement("div");
        
        // Bar styling
        bar.style.height = `${val * 2}px`; // Scaled for better visibility
        bar.style.width = "40px";
        bar.style.margin = "5px";
        bar.style.backgroundColor = "teal";
        bar.style.color = "white";
        bar.style.display = "flex";
        bar.style.alignItems = "flex-end";
        bar.style.justifyContent = "center";
        bar.style.paddingBottom = "5px";
        bar.style.fontSize = "12px";
        bar.style.fontWeight = "bold";

        // ADDED: Display the value as text inside the bar
        bar.innerText = val;

        container.appendChild(bar);
    });
}
// 4. Orchestration (The "Live" API flow)
document.getElementById("startBtn").addEventListener("click", async () => {
    const data = await fetchData();
    const sorted = await bubbleSort(data);
    
    // POST request to simulate submission
    const submit = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({ result: sorted, status: 'complete' }),
        headers: { 'Content-type': 'application/json' }
    });
    const result = await submit.json();
    console.log("Task Submitted to Server:", result);
});