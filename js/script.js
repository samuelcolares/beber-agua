
const Main = {
    init: function () {
        this.cacheSelectors()
        this.bindEvents()
    },
    cacheSelectors: function () {
        this.smallcups = document.querySelectorAll('.small-cups')
        this.bigwater = document.querySelector('.big-water')
        this.mls = document.querySelectorAll('.ml')
        this.meta = document.querySelector('.metaDiaria')
        this.restante = document.querySelector(`.restante`)
        this.range = document.getElementById('range')
        this.rangeV = document.getElementById('rangeV')
    },
    bindEvents: function () {
        document.addEventListener("DOMContentLoaded", this.Events.setValue.bind(this));
        this.smallcups.forEach((cup, idx) => {
            const handleClick = this.Events.copoCheio.bind(this, idx);
            cup.addEventListener(`click`, handleClick);
            cup.addEventListener('click', this.Events.copao.bind(this))
          });

        this.range.addEventListener('input', this.Events.setValue.bind(this));
    },
    updateCounter: function (numeroNovo) {
        let n1 = parseInt(this.bigwater.nextElementSibling.innerText)
        let n2 = +numeroNovo
        const intervalo = setInterval(() => {

            if (n1 <= n2) {
                this.bigwater.nextElementSibling.innerText = `${n1++}%`
            } else {
                clearInterval(intervalo)
            }
        }, 20)
    },
    updateCounterMenos: function (numeroNovo) {
        let n4 = parseInt(this.bigwater.nextElementSibling.innerText)
        let n3 = +numeroNovo
        console.log(n3, n4)
        const intervalo = setInterval(() => {

            if (n4 >= n3) {
                this.bigwater.nextElementSibling.innerText = `${n4--}%`
            } else {
                clearInterval(intervalo)
            }
        }, 20)
    },
    Events: {
        copoCheio: function (idx) {
            if (this.smallcups[idx].classList.contains(`filled`) && !this.smallcups[idx + 1].classList.contains(`filled`)) {
                idx--
                this.bigwater.style.height = `${(idx + 1) * 9.7}%`
                this.updateCounterMenos(((idx + 1) * 10))
            }
            this.smallcups.forEach((cup, idx2) => {
                if (idx2 <= idx) {
                    cup.classList.add(`filled`)
                    this.bigwater.style.height = `${(idx + 1) * 9.95}%`
                    this.mls[idx2].style.color = `rgb(3, 169, 244)`
                    this.updateCounter(((idx + 1) * 10))
                } else {
                    cup.classList.remove(`filled`)
                    this.mls[idx2].style.color = `black`
                }

            })
            this.updateCounterMenos(((idx + 1) * 10))
        },
        copao: function () {
            const fullcups = document.querySelectorAll('.small-cups.filled').length
            const totalcups = document.querySelectorAll('.small-cups').length
            const div = (fullcups * 10) / totalcups
            const div2 = this.range.value * 10 - parseFloat(div * this.range.value).toFixed(1)
            const div3 = div2 / 10
            if (fullcups < totalcups) {
                this.restante.innerHTML = `${div3}L<br>Restantes`
                this.restante.style.color = `white`
            } else if (fullcups === totalcups) {
                this.restante.innerHTML = `Meta diária alcançada!`
            }
        },
        setValue: function () {
            const newValue = Number((this.range.value - this.range.min) * 100 / (this.range.max - this.range.min))
            const newPosition = 10 - (newValue * 0.2)
            this.rangeV.innerHTML = `<span>${this.range.value}</span>`;
            this.rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
            this.meta.innerText = `Meta Diária: ${this.range.value}L`
            this.restante.innerHTML = `${this.range.value}L<br>Restantes`
            this.mls.forEach(ml => {
                quantidade = this.range.value * 100
                ml.innerText = `${quantidade}ml`
                ml.style.color = 'black'
            })
            this.smallcups.forEach(cup => {
                cup.classList.remove('filled')
            })
            this.bigwater.style.height = `0%`
            this.bigwater.nextElementSibling.innerText = '0%'
        }
    }
}

Main.init()