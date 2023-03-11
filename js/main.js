const message = document.querySelector(".message")
const add = document.querySelector(".submit")
const todo = document.querySelector(".outpLi")
const sort = document.querySelector(".sort")
const dellAll = document.querySelector(".dellAll")
let messArr = []

// save to local storage
if (localStorage.getItem("message")) {
   messArr = JSON.parse(localStorage.getItem("message"))
   displayMessage()
}
//////////////

// add task
add.addEventListener("click", function (event) {
   event.preventDefault()

   // check
   if (message.value === "") {
      return alert("write a task")
   }
   let messObj = {
      id: Date.now(),
      message: message.value,
      status: false
   }
   messArr.unshift(messObj)
   message.value = ""
   message.focus()
   displayMessage()
})
// display task
function displayMessage() {
   let displayMessage = ""
   messArr.forEach(function (item, i) {
      displayMessage +=
         `<li id ="${item.id}"class="${item.status === true ? "outpLiTrue" : "outpLiFalse"}" >
         <span>${item.message}</span>
         <div class="outpBTN">
         <input class="complite" data-action="complite" type="button" value="V">
         <input class="delete" data-action="delete" type="button" value="X">
         </div>`
      todo.innerHTML = displayMessage
      saveLS()
   })
}
//////////////

// sort task
sort.addEventListener('click', function (event) {
   event.preventDefault()
   messArr.sort((a, b) => {
      return (a.status) - (b.status)
   })
   displayMessage()
   saveLS()
})
//////////////

// delete all task
dellAll.addEventListener('click', function () {
   let dellEl = todo.querySelectorAll("li")
   dellEl.forEach(el => el.remove())
   messArr = []
   saveLS()
})
//////////////



// complite task
todo.addEventListener("click", compliteMessage)
function compliteMessage(event) {
   if (event.target.dataset.action === "complite") {
      const parNode = event.target.closest("li")
      const id = Number(parNode.id)
      const mess = messArr.find(mess => {
         if (mess.id === id) { return true }
      })
      mess.status = !mess.status
      parNode.removeAttribute('class')
      if (mess.status) {
         parNode.classList.toggle("outpLiTrue")
      }
      else parNode.classList.toggle("outpLiFalse")
      saveLS()
   }
}
//////////////

// delete task
todo.addEventListener("click", deleteMessage)

function deleteMessage(event) {
   if (event.target.dataset.action === "delete") {
      const parNode = event.target.closest("li")
      const id = Number(parNode.id)
      const index = messArr.findIndex(index => {
         if (index.id === id) { return true }
      })
      messArr.splice(index, 1)
      parNode.remove()
      saveLS()
   }
}
//////////////

// save task to LS
function saveLS() {
   localStorage.setItem("message", JSON.stringify(messArr))
}
