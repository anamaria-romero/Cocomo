document.getElementById("showProject").addEventListener("click", function() {
    document.getElementById("presentation").style.display = "none"; 
    document.getElementById("project").style.display = "block"; 
});

document.getElementById("cocomoForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const kloc = parseFloat(document.getElementById("kloc").value);
    const rely = parseFloat(document.getElementById("rely").value);
    const aexp = parseFloat(document.getElementById("aexp").value);
    const tool = parseFloat(document.getElementById("tool").value);
    const salary = parseFloat(document.getElementById("salary").value);
    const devs = parseFloat(document.getElementById("devs").value);
    const months = parseFloat(document.getElementById("months").value);
  
    const a = 2.4, b = 1.05, c = 2.5, d = 0.38;
    const m = rely * aexp * tool;
  
    const E = a * Math.pow(kloc, b) * m;
    const T = c * Math.pow(E, d);
    const P = E / T;
  
    let costo = 0;
    let años = Math.ceil(T / 12);
    for (let i = 0; i < años; i++) {
      const aumento = Math.pow(1.05, i);
      const meses = i < años - 1 ? 12 : T % 12 || 12;
      costo += P * salary * aumento * meses;
    }
  
    let interpretacion = `
      <strong>Esfuerzo estimado:</strong> ${E.toFixed(2)} persona-meses<br/>
      <strong>Duración estimada:</strong> ${T.toFixed(2)} meses<br/>
      <strong>Personas necesarias:</strong> ${P.toFixed(2)}<br/>
      <strong>Costo estimado:</strong> $${costo.toFixed(2)}<br/>
    `;
  
    if (!isNaN(devs)) {
      const tiempoConDevs = E / devs;
      interpretacion += `<strong>Con ${devs} desarrolladores:</strong> ${tiempoConDevs.toFixed(2)} meses<br/>`;
    }
  
    if (!isNaN(months)) {
      const personasConTiempo = E / months;
      interpretacion += `<strong>Para terminar en ${months} meses:</strong> se requieren ${personasConTiempo.toFixed(2)} personas<br/>`;
    }
  
    document.getElementById("results").innerHTML = interpretacion;
  });
  