const input = document.querySelector(".input");
const select = document.querySelector(".select");
const button = document.querySelector(".buscar");
const span = document.querySelector(".resultado");
const canvas = document.querySelector(".grafico");
const url = "https://mindicador.cl/";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${day}/${month}/${year};`;
};

//Get - metodo para traer información//
//Post - esto lo hacemos para escribir información//
//Put - lo usamos para editar información//
//Delete - usamos para eliminar información//

let myChart = null;

function renderGrafico(_data) {}
console.log(data);
const config = {
  type: "line",
  data: {
    labels: data.map((elem) => formatDate(new Date(elem.fecha))),
    datasets: [
      {
        label: "Ultimos 10 días",
        backgroundColor: "red",
        data: data.map((elem) => elem.valor),
      },
    ],
  },
};
canvas.style.backgroundColor = "white";
if (myChart) {
  myChart.destroy();
}
myChart = new Chart(canvas, config);

async function buscarCotizacion() {
  try {
    const cantidad = input.value;
    const moneda = select.value;
    const fetching = await fetch(`${url}/${moneda}`);
    const data = await fetching.json();
    return data;
  } catch (error) {
    console.log(error);
    span.innerHTML = "Ocurrio un error";
  }
}
button.addEventListener("click", async () => {
  span.innerHTML = `
  Cargando...
  `;
  const result = await buscarCotizacion();
  const serie = result.serie;
  const lastValue = serie[0].valor;
  const data = serie.slice(0, 10).reverse();
  span.innerHTML = `
La cotización del día es $${lastValue}
`;
  renderGrafico(data);
});
