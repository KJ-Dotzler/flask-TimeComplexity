document.addEventListener("DOMContentLoaded", async() => {
    const dropdown = document.getElementById("complex");
    const complexName = document.getElementById("complexName");
    const complexTime = document.getElementById("complexTime");
    const complexDescription = document.getElementById("complexDescription");
    const ctx = document.getElementById("complexChart").getContext("2d");

    const response = await fetch("/data");
    const data = await response.json();
    const complexArr = data.algorithms;

 

    complexArr.forEach(cpx => {
        const option = document.createElement("option");
        option.value = cpx.name;
        option.textContent = cpx.name;
        dropdown.appendChild(option);
    });
    const chart = new Chart(ctx, {
        type : "line",
        data : {
            labels : Array.from({length: 10}, (_,i) => i + 1),
            datasets: []
        },
        options: {
            responsive: true,
            scales: {
                y: {beginAtZero: true, title: {display: true, text: "Operations"}},
                x: {title: {display: true, text: 'Input Size (n)'}}
            }
        }
    })

    dropdown.addEventListener('change', (e) => {
        const selected = complexArr.find(a => a.name === e.target.value);
        complexName.textContent = selected.name;
        complexTime.innerHTML = `Time Complexity: <strong>${selected.complexity}</strong>`;
        complexDescription.innerHTML = `${selected.description}`;

        const growth = simulateComplexity(selected.complexity);
        chart.data.datasets = [{
            label: selected.name,
            data: growth,
            borderColor: '#36a2eb',
            tension: 0.2
        }];
        chart.update();
    });
});

function simulateComplexity(type){
    const nVals = Array.from({length: 10}, (_,i) => i + 1);
    switch (type) {
        case 'O(1)': return nVals.map(() => 1);
        case 'O(log n)': return nVals.map(n => Math.log2(n));
        case 'O(n)': return nVals.map(n => n);
        case 'O(n log n)': return nVals.map(n => n * Math.log2(n));
        case 'O(n^2)': return nVals.map(n => n * n);
        default: return nVals.map(() => 0);
    }
}