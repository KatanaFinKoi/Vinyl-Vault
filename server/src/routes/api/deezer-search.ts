// import  express  from "express";

// const router = express.Router();

// router.get("/album/:albumTitle", async (req, res) => {
//     const response = await fetch(`https://api.deezer.com/search/album?q=${encodeURIComponent(req.params.albumTitle)}`);
//     const data = await response.json();
//     console.log(data);
//     res.json(data);
// });

// export { router as deezerRouter }

import express from "express";

const router = express.Router();

const fetchWithRetries = async (url: string, retries: number = 3, delay: number = 1000): Promise<any> => {
  let attempt = 0;
  while (attempt < retries) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching from Deezer: ${response.statusText}`);
      }
      return await response.json();  // Return the data if successful
    } catch (error) {
      attempt++;
      console.error(`Attempt ${attempt} failed: ${(error as Error).message}`);
      if (attempt < retries) {
        console.log(`Retrying in ${delay * attempt} ms...`);
        await new Promise(resolve => setTimeout(resolve, delay * attempt)); // Exponential backoff
      } else {
        throw new Error('Max retries reached. Please try again later.');
      }
    }
  }
};

router.get("/album/:albumTitle", async (req, res) => {
  try {
    const albumTitle = encodeURIComponent(req.params.albumTitle);
    const data = await fetchWithRetries(`https://api.deezer.com/search/album?q=${albumTitle}`);
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(502).json({ error: (error as Error).message });
  }
});

export { router as deezerRouter };
