const lista = document.getElementById("countries-list");
const paises = async ()=>{
    try{
        const response = await fetch ("https://restcountries.com/v3/all")
        if(!response.ok){
            throw new Error ("error");
        }
        
        const paisesjson = await response.json();

        const datapaises = paisesjson.map(pais =>({
            name: pais.name.common,
            flag: pais.flags[0],
            capital: pais.capital,
            population: pais.population.toLocaleString(),
            drivingSide: pais.car.side,
        }))

        .sort((a, b) => a.name.localeCompare(b.name));

        lista.innerHTML =`<div class="contenedor"> ${datapaises.map(country =>`
            <div class="country">
                <h2>${country.name}</h2>
                <img class="imagen" src="${country.flag}"
                data-capital="${country.capital}"
                data-population="${country.population}"
                data-drivingSide="${country.drivingSide}">
            </div>`).join("")}
            </div>`;

        document.querySelectorAll(".imagen").forEach(img =>{
            img.addEventListener("click", (event) =>{
                const img = event.target;

        const ventana = document.createElement("div");
        ventana.classList.add("ventana");
        ventana.innerHTML =`
        <div class="vcontenido">
            <p>Capital:${img.dataset.capital} </p>
            <p>Población:${img.dataset.population} </p>
            <p>Lado de conducción: ${img.dataset.drivingSide}}</p>
            <button class="cierre">Cerrar</button>
        </div>`

        document.body.appendChild(ventana);

        ventana.querySelector(".cierre").addEventListener("click", () =>{
            ventana.remove();
        })
     })

        
    })
    } catch(error) {
        console.log("error");
    }
};

paises()






