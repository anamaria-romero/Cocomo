document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cocomoForm");
  const results = document.getElementById("results");

  const effortResult = document.getElementById("effortResult");
  const durationResult = document.getElementById("durationResult");
  const teamSizeResult = document.getElementById("teamSizeResult");
  const productivityResult = document.getElementById("productivityResult");
  const salaryDisplay = document.getElementById("salaryDisplay");
  const totalCostResult = document.getElementById("totalCostResult");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const kloc = parseFloat(document.getElementById("kloc").value);
    const teamSizeInput = document.getElementById("teamSize").value.trim();
    const durationInput = document.getElementById("duration").value.trim();
    const monthlySalary = parseFloat(document.getElementById("monthlySalary").value);

    const factors = [
      "rely", "data", "cplx", "time", "stor", "virt", "turn",
      "acap", "aexp", "pcap", "vexp", "lexp", "modp", "tool", "sced"
    ];
    let eaf = 1;

    factors.forEach(id => {
      const value = parseFloat(document.getElementById(id).value);
      if (!isNaN(value)) {
        eaf *= value;
      }
    });
    

    const a = 2.4;
    const b = 1.05;
    const c = 2.5;
    const d = 0.38;

    const effort = a * Math.pow(kloc, b) * eaf;

    let duration, teamSize;

    if (teamSizeInput && durationInput) {
      alert("Por favor, llena solo uno: tamaño de equipo o duración, no ambos.");
      return;
    }

    if (teamSizeInput) {
      teamSize = parseFloat(teamSizeInput);
      duration = effort / teamSize;
    } else if (durationInput) {
      duration = parseFloat(durationInput);
      teamSize = effort / duration;
    } else {
      duration = c * Math.pow(effort, d);
      teamSize = effort / duration;
    }

    const productivity = kloc / effort;

    let totalCost = 0;
    const yearlyCosts = [];
    let remainingEffort = effort;
    let currentYear = 1;
    let monthlyCost = monthlySalary * teamSize;

    while (remainingEffort > 0) {
      let months = Math.min(12, remainingEffort / teamSize);
      const yearlyCost = months * monthlyCost;
      yearlyCosts.push({ year: currentYear, cost: yearlyCost });
      totalCost += yearlyCost;
      remainingEffort -= months * teamSize;
      monthlyCost *= 1.05;
      currentYear++;
    }

    effortResult.textContent = `${effort.toFixed(2)} persona-meses`;
    durationResult.textContent = `${duration.toFixed(2)} meses`;
    teamSizeResult.textContent = `${teamSize.toFixed(2)} personas`;
    productivityResult.textContent = `${productivity.toFixed(2)} KLOC/persona-mes`;
    salaryDisplay.textContent = `$${monthlySalary.toFixed(2)}`;
    totalCostResult.textContent = `$${totalCost.toFixed(2)}`;

    results.classList.remove("hidden");

    const effortAnalysis = document.getElementById("effortAnalysis");
    const costByYear = document.getElementById("costByYear");
    effortAnalysis.innerHTML = yearlyCosts.map(y =>
      `<div>Año ${y.year}: ${(y.cost / monthlySalary).toFixed(2)} persona-meses</div>`
    ).join("");

    costByYear.innerHTML = yearlyCosts.map(y =>
      `<div>Año ${y.year}: $${y.cost.toFixed(2)}</div>`
    ).join("");
  });
});