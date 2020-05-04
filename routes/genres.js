/* TOP MUSIC
 * Genres
 * ~
 */

const express = require("express");
const router = express.Router();
const data = require("../data");
const genreData = data.genres;

router.get("/:id", async (req, res) => {
  try {
    const genre = await genreData.getGenre(req.params.id);
    res.json(genre);
  } catch (error) {
    res.status(404).json({ message: "Genre not found" });
  }
});

router.get("/", async (req, res) => {
  try {
    const genreList = await genreData.getAll();
    res.json(genreList);
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/", async (req, res) => {
  let genreInfo = req.body;
  if (!genreInfo) {
    res.status(400).json({error: 'You must provide data to create an genre'});
    return;
  }
  if (!genreInfo.genreName) {
    res.status(400).json({error: 'You must provide an genre name'});
    return;
  }
  try {
    const newGenre = await genreData.addGenre( genreInfo.genreName );
    res.json(newGenre);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
  let genreInfo = req.body;
  if (!genreInfo) {
    res.status(400).json({error: 'You must provide data to update a genre'});
    return;
  }
  if (!genreInfo.genreName) {
    res.status(400).json({error: 'You must provide an genre name'});
    return;
  }
  try {
    await genreData.getGenre(req.params.id);
  } catch (error) {
    res.status(404).json({error: 'Genre not found'});
    return;
  }
  try {
    const updatedGenre = await genreData.updateGenre(req.params.id, genreInfo);
    res.json(updatedGenre);
  } catch (error) {
    res.sendStatus(500);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await genreData.getGenre(req.params.id);
  } catch (error) {
    res.status(404).json({error: 'Genre not found'});
    return;
  }
  try {
    await genreData.removeGenre(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
