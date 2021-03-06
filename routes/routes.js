const path = require("path")
const fs = require("fs");

module.exports = app =>{
	
    // Default Routes
    app.get('/', (req, res) =>{
		res.sendFile(path.join(__dirname, "../Develop/public/index.html"))
	});

    app.get('/index', (req, res) =>{
		res.sendFile(path.join(__dirname, "../Develop/public/index.html"))
	});

    app.get('/notes', (req, res) =>{
		res.sendFile(path.join(__dirname, "../Develop/public/notes.html"))
	});

    // View Notes
    app.get("/api/notes", (req, res) => {
        console.log("Getting Notes");
        let data = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
        res.json(data);
      
    });

      app.post("/api/notes", (req, res) => {

        const newNote = req.body;
  
        console.log("\n\nPOST request - New Note : " + JSON.stringify(newNote));
    
        let data = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
        console.log(data);

        data.push(newNote);
    
        fs.writeFileSync("./Develop/db/db.json", JSON.stringify(data));
    
        console.log("Added Note");
    
        res.json(data);
      });

      app.delete(`/api/notes/:id`, (reqrequest, res) => {

        let noteId = req.params.id.toString();
    
        console.log(`\nDELETE note request for noteId: ${noteId}`);
    

        let data = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
        console.log(data);

        const newData = data.filter((note) => note.id.toString() !== noteId);
        console.log(newData)

        res.json(newData);
      });

}