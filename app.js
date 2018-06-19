/*In this assignment you are going to create a website to maintain shopping lists and the grocery items. You will use a server side templating engine (Mustache) or any other to implement the website. The following features needs to be implemented
- A user should be able to enter shopping lists
- A user should be able to view all the shopping lists
- A user should be able to delete the shopping list
- A user should be able to view grocery items of a particular shopping list
- A user should be able to add items to a particular shopping list
- A user should be able to delete grocery items

HARDMODE:
- On the view all shopping list screen user should be able to view the count of grocery items.
- Add registration, login to the app allowing user to persist information based on their credentials.
*/

//Dependencies
  //setup express
    const express = require('express')
    const app = express()


  //setting up pg-promise bluebird
    const promise = require('bluebird')
    var options = {
      promiseLib: promise
      }

    var pgp = require('pg-promise')(options)
    var connectionString = 'postgres://localhost:5432/shoppinglist'
    var db = pgp(connectionString)

  //setup body-parser
    const bodyParser = require('body-parser')
    app.use(bodyParser,urlencoded({extended: false}))

  //setting up mustache
    const mustacheExpress = require('mustache-express')
    app.engine('mustache', mustacheExpress())
    //define where views are located
    app.set('views', './viewList')

  //items on list
  let listNames = []
  let listItems = []

  app.get('/',function(req,res){


    res.render('index',)
  })

app.post('/newList',function(req,res){
  console.log("x")
  let shoppingList = req.body.shoppingList
  let groceryItem = req.body.groceryItem
  listItems.push(groceryItem)
  listNames.push(shoppingList)
  db.none('INSERT INTO listNames(shoppingListId, list)')
  //when passing in views does it need {key: {key:value}}?
  res.render('viewList', {listName: shoppingList, groceryItem: groceryItem})
})



  //posted from input on index.mustache
  app.post('/addItem',function(req,res){
    //

    let priority = req.body.priority

    //taskNum=todos[todos.length-1]
    taskNum = todos.length+1


    todos.push({number: taskNum, task: title, hiLow: priority})
    console.log(todos)

    //send this to index.mustache
    res.render('index',{todoList : todos})
  })


    // send this to todos.mustache
    //res.render('todos',{todoList : todos})

  app.post('/todos2',function(req,res){

    let deleteNum = req.body.deleteNum
    let deleteNumIndex = deleteNum-1

    //take deleteNum out of todos array
    todos.splice(deleteNum-1, 1)
    todos.forEach(function(item){
      console.log(`This is listItems after deleting ${item.number}`)
    })

    for (x = deleteNumIndex; x< todos.length; x++){
      todos[x].number -= 1
      console.log(todos[x].number)
      }
    todos.forEach(function(item){
      console.log(`This is listItems after deleting ${item.number}`)
    })
    //can chose index.mustache or todos.mustache to render
    res.render('viewList.mustache',{listItems : data})
  })


  app.listen(3000, () => console.log('Example app listening on port 3000!'))
