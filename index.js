document.getElementById("cocomoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const kloc = parseFloat(document.getElementById("kloc").value);
    const factor = parseFloat(document.getElementById("factor").value);
    const salary = parseFloat(document.getElementById("salary").value);
    const mode = document.getElementById("mode").value;
    const inputValue = parseFloat(document.getElementById("inputValue").value);

    if (kloc <= 0 || factor <= 0 || salary <= 0 || inputValue <= 0) {
        document.getElementById("results").innerText = "Todos los valores deben ser positivos y mayores a 0.";
        return;
    }

    const effort = 2.4 * Math.pow(kloc, 1.05) * factor;
    let duration, programmers;

    if (mode === "programmers") {
        programmers = inputValue;
        duration = effort / programmers;
    } else {
        duration = inputValue;
        programmers = effort / duration;
    }

    let totalCost = 0;
    let currentSalary = salary;
    let months = Math.ceil(duration);

    for (let i = 0; i < months; i++) {
        if (i % 12 === 0 && i !== 0) currentSalary *= 1.05;
        totalCost += programmers * currentSalary;
    }

    document.getElementById("results").innerHTML = `
        <p> <strong>Esfuerzo estimado:</strong> ${effort.toFixed(2)} persona-meses</p>
        <p> <strong>Duración:</strong> ${duration.toFixed(2)} meses</p>
        <p> <strong>Número de programadores:</strong> ${programmers.toFixed(2)}</p>
        <p> <strong>Costo total estimado:</strong> $${totalCost.toFixed(2)}</p>
    `;
});