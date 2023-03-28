const smallcups = document.querySelectorAll('.small-cups')
const bigwater = document.querySelector('.big-water')
const mls = document.querySelectorAll('.ml')
const meta = document.querySelector('.metaDiaria')
const restante = document.querySelector(`.restante`)


smallcups.forEach((cup, idx) => {
    cup.addEventListener('click', () => {
        copoCheio(idx)
        copao()
    })

})

function copoCheio(idx) {
    if (smallcups[idx].classList.contains(`filled`) && !smallcups[idx + 1].classList.contains(`filled`)) {
        idx--
        bigwater.style.height = `${(idx + 1) * 9.7}%`
        updateCounterMenos(((idx + 1) * 10))
    }
    smallcups.forEach((cup, idx2) => {
        if (idx2 <= idx) {
            cup.classList.add(`filled`)
            bigwater.style.height = `${(idx + 1) * 9.95}%`
            mls[idx2].style.color = `rgb(3, 169, 244)`
            updateCounter(((idx + 1) * 10))
        } else {
            cup.classList.remove(`filled`)
            mls[idx2].style.color = `black`
        }

    })
    updateCounterMenos(((idx + 1) * 10))
}

function copao() {
    const fullcups = document.querySelectorAll('.small-cups.filled').length
    const totalcups = document.querySelectorAll('.small-cups').length
    const div = (fullcups * 10) / totalcups
    const div2 = range.value * 10 - parseFloat(div * range.value).toFixed(1)
    const div3 = div2 / 10
    if (fullcups < totalcups) {
        restante.innerHTML = `${div3}L<br>Restantes`
        restante.style.color = `white`
    } else if (fullcups === totalcups) {
        restante.innerHTML = `Meta diária alcançada!`
    }

}

// const updateCounter = (numeroAtual, numeroNovo) => {
//     let n1 = +numeroAtual
//     let n2 = +numeroNovo
//     const intervalo = setInterval(()=>{

//         if(n1 <= n2){
//             bigwater.nextElementSibling.innerText = `${n1++}%`
//         }else{
//             clearInterval(intervalo)
//         }
//     },20)
// }


const updateCounter = (numeroNovo) => {
    let n1 = parseInt(bigwater.nextElementSibling.innerText)
    let n2 = +numeroNovo
    const intervalo = setInterval(() => {

        if (n1 <= n2) {
            bigwater.nextElementSibling.innerText = `${n1++}%`
        } else {
            clearInterval(intervalo)
        }
    }, 20)
}

const updateCounterMenos = (numeroNovo) => {
    let n4 = parseInt(bigwater.nextElementSibling.innerText)
    let n3 = +numeroNovo
    console.log(n3, n4)
    const intervalo = setInterval(() => {

        if (n4 >= n3) {
            bigwater.nextElementSibling.innerText = `${n4--}%`
        } else {
            clearInterval(intervalo)
        }
    }, 20)
}


const
    range = document.getElementById('range'),
    rangeV = document.getElementById('rangeV'),
    setValue = () => {
        const
            newValue = Number((range.value - range.min) * 100 / (range.max - range.min)),
            newPosition = 10 - (newValue * 0.2);
        rangeV.innerHTML = `<span>${range.value}</span>`;
        rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
        meta.innerText = `Meta Diária: ${range.value}L`
        restante.innerHTML = `${range.value}L<br>Restantes`
        mls.forEach(ml => {
            quantidade = range.value * 100
            ml.innerText = `${quantidade}ml`
            ml.style.color = 'black'
        })
        smallcups.forEach(cup => {
            cup.classList.remove('filled')
        })
        bigwater.style.height = `0%`
        bigwater.nextElementSibling.innerText = '0%'
    };
document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener('input', setValue);