const express = require('express')
const bodyParser = require('body-parser')
const fs = require("fs")
const jsonParser = express.json()


const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// Обьект адресов
app.get("/api/addresses", (req, res) => {

  let content = fs.readFileSync("addresses.json", "utf8")
  let addresses = JSON.parse(content)
  res.send(addresses)
});

// Адрес по id
app.get("/api/addresses/:id", (req, res) => {

  let id = req.params.id
  let content = fs.readFileSync("addresses.json", "utf8")
  let addresses = JSON.parse(content)
  let address

  for (let i = 0; i < addresses.length; i++) {
    if (addresses[i].id == id) {
      address = addresses[i]
      break
    }
  }

  if (address) {
    res.send(address)
  } else {
    res.status(404).send("Address is not")
  }

});

// Адреса по городу или полному адресу
app.get("/api/addressesSearch", (req, res) => {
  let filters = req.query
  let content = fs.readFileSync("addresses.json", "utf8")
  let addresses = JSON.parse(content)
  const filteredUsers = addresses.filter(address => {
    let isValid = true;
    for (key in filters) {
      isValid = isValid && address[key].includes(filters[key])
    }
    return isValid
  })
  res.send(filteredUsers)
});

// Сохранить адрес
app.post("/api/addresses", jsonParser, (req, res) => {

  if (!req.body) res.sendStatus(400)

  let city = req.body.city
  let fullAddress = req.body.fullAddress
  let width = req.body.width
  let height = req.body.height
  let widthHeight = [parseFloat(width), parseFloat(height)]
  let address = { city, fullAddress, width, height, widthHeight }

  let data = fs.readFileSync("addresses.json", "utf8")
  let addresses = JSON.parse(data)

  let id = Math.max(...addresses.map((address) => address.id))

  if (Number.isFinite(id)) {
    address.id = id + 1
  } else {
    address.id = 1
  }
  if (city && fullAddress && width && height && address) {
    addresses.push(address);
    data = JSON.stringify(addresses);
    fs.writeFileSync("addresses.json", data);
    res.send(address);
  } else {
    res.status(404).send("Нужно заполнить все поля!")
  }
})

// Удалить адрес
app.delete("/api/addresses/:id", function (req, res) {

  let id = req.params.id
  let data = fs.readFileSync("addresses.json", "utf8")
  let addresses = JSON.parse(data)
  let index = -1

  for (let i = 0; i < addresses.length; i++) {
    if (addresses[i].id == id) {
      index = i
      break
    }
  }

  if (index > -1) {
    let address = addresses.splice(index, 1)[0]

    let data = JSON.stringify(addresses)
    fs.writeFileSync("addresses.json", data)
    res.send(address)
  }
  else {
    res.status(404).send("Адрес не найдет по Id")
  }
});

// Изменить адрес
app.put("/api/addresses", jsonParser, function (req, res) {

  if (!req.body) res.status(400).send("Failed to change")

  let city = req.body.city
  let addressId = req.body.id
  let fullAddress = req.body.fullAddress
  let width = req.body.width
  let height = req.body.height
  let widthHeight = [parseFloat(width), parseFloat(height)]

  let data = fs.readFileSync("addresses.json", "utf8")
  let addresses = JSON.parse(data)
  let address;

  for (let i = 0; i < addresses.length; i++) {
    if (addresses[i].id == addressId) {
      address = addresses[i]
      break
    }
  }

  if (address) {
    address.city = city
    address.fullAddress = fullAddress
    address.width = width
    address.height = height
    address.widthHeight = widthHeight
    let data = JSON.stringify(addresses)
    fs.writeFileSync("addresses.json", data)
    res.send(address)
  }
  else {
    res.status(404).send(address)
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`))