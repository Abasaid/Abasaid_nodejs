//require the necessary modules//
import http from "http"
import fetch from "node-fetch"
//create the server//
const server = http.createServer((req, res)=> {
    const url = req.url
    let tableData = "<table border='1'><tr><th>Name</th><th>Height</th><th>Birth_year</th><th>Gender</th><th>Url</th></tr>"
    if(url === '/'){
        res.write("<h1>Welcome to My Home Page</h1>")
        res.end('<img src=https://dummyimage.com/600x400/2688ff/fff.png&text=Home+IMG>')
    }
    if(url === '/message'){
        res.write("Message Page")
        res.end()
    }
    if(url === '/list'){
        fetch('https://swapi.dev/api/people')
        .then(res => res.json())
        .then(data => {
            createData(data);
            res.write(tableData)
            res.end()
        })
        
    }
    else {
        res.write("<h1>404 Error Page not found</h1>")
        res.end()
    }
    function createData(data){
        data.results.forEach(element => {
            tableData+=`<tr><td>${element.name}</td><td>${element.height}</td><td>${element.birth_year}</td><td>${element.gender}</td><td>${element.url}</td></tr>`

        })
        tableData+= `</table>`
    }
}).listen(8070,console.log("Server is running on port 8070"))