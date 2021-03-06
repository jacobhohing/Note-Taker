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
        let data = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
        res.json(data);
      
    });

      app.post("/api/notes", (req, res) => {

        const newNote = req.body;
        console.log("\n\nPOST request - New Note : " + JSON.stringify(newNote));
    
        let data = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
        data.push(newNote);
    
        fs.writeFileSync("./Develop/db/db.json", JSON.stringify(data));
        res.json(data);
      });

      app.delete(`/api/notes/:id`, (req, res) => {

        let noteId = req.params.id.toString();
    
        let data = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));

        const newData = data.filter((note) => note.id.toString() !== noteId);
        fs.writeFileSync("./Develop/db/db.json", JSON.stringify(newData));

        res.json(newData);
      });

}