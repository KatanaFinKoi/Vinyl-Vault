import  express  from "express";

const router = express.Router();

router.get("/album/:albumTitle", async (req, res) => {
    const response = await fetch(`https://api.deezer.com/search/album?q=${encodeURIComponent(req.params.albumTitle)}`);
    const data = await response.json();
    console.log(data);
    res.json(data);
});

export { router as deezerRouter }