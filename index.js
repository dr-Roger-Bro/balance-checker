import express from "express";
import "dotenv/config";
import { ethers } from "ethers";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded( {extended: true} ));

const provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`);

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/balance", async (req, res) => {
    //console.log(req.query);
    try {
        const balance = await provider.getBalance(req.query.address);
        res.render("index.ejs", { balance: ethers.formatEther(balance) });
    } catch (error) {
        console.log(error);
        res.render("index.ejs", { error: error.message });
    }
})

app.listen(port, () => {
    console.log(`Server up on port ${port}`);
})



/*

// Connect to the Ethereum network
const provider = new ethers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/IsL4eIHlALDB94wnIve38Q5R9oNPOE05");

// Get block by number
const address = "danieledellacorte.eth";

const balance = await provider.getBalance(address);

console.log(`Balance of ${address} = ${ethers.formatEther(balance)}`);

*/