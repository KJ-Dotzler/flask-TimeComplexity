document.addEventListener('DOMContentLoaded', async() => {
    const algoList = document.getElementById('algoList');
    const chartToggle = document.getElementById('scaleToggle')
    const algoName = document.getElementById('algoName');
    const algoExplanation = document.getElementById('algoExplanation');
    const algoChart = document.getElementById('algoChart').getContext('2d');
    const algoCode = document.getElementById('algoCode');

    const response = await fetch('/algo-data');
    const data = await response.json();
    const algoArr = data.algorithms;

    algoArr.forEach(algo => {
        const item = document.createElement('option');
        item.value = algo.name;
        item.textContent = algo.name;
        algoList.appendChild(item);
    });

    const chart = new Chart(algoChart, {
        type:'line',
        data:{
            labels:Array.from({length : 10}, (_,i) => i + 1),
            datasets : []
        },
        options:{
            responsive: true,
            scales: {
                y: {
                    type: 'logarithmic',
                    beginAtZero: false,
                    title:{display: true, text: 'Operations'},
                    ticks: {
                        callback: function(value){
                            return Number(value.toString());
                        }
                    }
                    },
                x: {title:{display:true, text:'Input(n)'}}
            }
        }
    })

    algoList.addEventListener('change', (e) => {
        const selected = algoArr.find(a => a.name === e.target.value);
        algoName.textContent = `${selected.name} complexity: ${selected.complexity.worst} (worst time)`;
        algoExplanation.textContent = selected.explanation;
        algoCode.innerHTML = `${selected.code}`;
        
        const bestGrow = simGrowth(selected.complexity.best);
        const avgGrow = simGrowth(selected.complexity.average);
        const badGrow = simGrowth(selected.complexity.worst);
        chart.data.datasets = [
            {
            label: `${selected.name} (Best Case)`,
            data: bestGrow,
            borderColor: '#4caf50',
            tension: 0.2
            },
            {
            label: `${selected.name} (Average Case)`,
            data: avgGrow,
            borderColor: '#36a2eb',
            tension: 0.2
            },
            {
            label: `${selected.name} (Worst Case)`,
            data: badGrow, 
            borderColor: '#f44336',
            tension: 0.2
            }
        ];
        chart.update();
        
    });

    chartToggle.addEventListener('change', (e) => {
        chart.options.scales.y.type = e.target.checked ? 'logarithmic' : 'linear';
        chart.update();
    });

});

function simGrowth(complexity){
    const nVals = Array.from({length: 10}, (_,i) => i + 1);
    switch(complexity){
        case 'O(1)' : return nVals.map(() => 1);
        case 'O(n)' : return nVals.map(n => n);
        case 'O(log n)' : return nVals.map(n => Math.log2(n));
        case 'O(n log n)' : return nVals.map(n => n * Math.log2(n));
        case 'O(n^2)' : return nVals.map(n => n * n);
        case 'O(E)' : return nVals.map(n => n * 1.5);//need to get the math to map 
        case 'O(V + E)' : return nVals.map(n => n * 2);
        case 'O(V + E log V)' : return nVals.map(() => 0);
        case 'O(V^2)' : nVals.map(n => n * n * 1.2);
        default: nVals.map(() => 0);
    }
}