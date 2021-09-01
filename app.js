
const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const uuid = require("uuid");
const path = require("path");


const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const notes = JSON.parse(fs.readFileSync(`${__dirname}/db/db.json`));

app.get("/api/notes", (req, res)=>{

  res.status(200).json({
    status: "succsess",
    result:notes.length,
    data: {
        allNotes: notes
    }
})
});


app.post("/api/notes",function(req,res){

    console.log(req.body);
    const newNote = req.body;
    newNote.id = uuid.v4();
    const test = newNote.id
    // console.log(test)
    const newNoteObject= Object.assign({id: test}, req.body);
    // console.log(newNoteObject)
    notes.push(newNoteObject);
    // console.log(notes);

    fs.writeFile(
        `${__dirname}/db/db.json`,
        JSON.stringify(notes),
        (err) => {
            res.status(201).json({
                status:"success",
                data: {
                    notes: notes
                }
            });
        }
);

});


app.delete("/api/notes/:id", (req,res)=>{

  console.log(req.params.id);

    const deleteNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFile(
        `${__dirname}/db/db.json`,
        JSON.stringify(deleteNote),
        (err) => {
            res.json({
                status:"success",
                data: {
                    remenatsNotes: deleteNote
                }
            });
        }
);

})


app.get("/", (req, res)=>{
  res.send("hi kaka")
})

app.get("/notes", (req, res)=>{
  // res.sendFile(path.join(__dirname, "/notes.html"))
  res.sendFile(__dirname + "/public/notes.html");
});


app.listen(3000, function(req, res){
  console.log("Server is up and runing on port 3000")
})
