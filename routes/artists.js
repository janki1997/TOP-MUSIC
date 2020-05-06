/* TOP MUSIC
 * Artists
 * ~
 */

const express = require("express");
const router = express.Router();
const data = require("../data");
const artistData = data.artists;

router.get("/:id", async (req, res) => {
  try {
    const artist = await artistData.getArtistById(req.params.id);
    res.json(artist);
  } catch (error) {
    res.status(404).json({ message: "Artist not found" });
  }
});

router.get("/", async (req, res) => {
  try {
    const artistList = await artistData.getAll();
    res.json(artistList);
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/", async (req, res) => {
  let artistInfo = req.body;

  if (!artistInfo) {
    res.status(400).json({error: 'You must provide data to create an artist'});
    return;
  }

  if (!artistInfo.artistName) {
    res.status(400).json({error: 'You must provide an artist name'});
    return;
  }

  if (!artistInfo.artistMembers) {
    res.status(400).json({error: 'You must provide artist members'});
    return;
  }

  if (!artistInfo.yearFormed) {
    res.status(400).json({error: 'You must provide the year the artist was formed'});
    return;
  }

  if (!artistInfo.genres) {
    res.status(400).json({error: 'You must provide genres describing the artist'});
    return;
  }

  if (!artistInfo.recordLabel) {
    res.status(400).json({error: 'You must provide a record label for the artist'});
    return;
  }

  try {
    const newArtist = await artistData.addArtist(
        artistinfo.artistName, 
        artistInfo.artistMembers, 
        artistInfo.yearFormed, 
        artistInfo.genres, 
        artistInfo.recordLabel, 
        []
    );
    res.json(newArtist);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
  let artistInfo = req.body;

  if (!artistInfo) {
    res.status(400).json({error: 'You must provide data to update an artist'});
    return;
  }

  if (!artistInfo.artistName) {
    res.status(400).json({error: 'You must provide an artist name'});
    return;
  }

  if (!artistInfo.artistMembers) {
    res.status(400).json({error: 'You must provide at least one artist member'});
    return;
  }

  if (!artistInfo.yearFormed) {
    res.status(400).json({error: 'You must provide the year the artist was formed'});
    return;
  }

  if (!artistInfo.genres) {
    res.status(400).json({error: 'You must provide genres describing the artist'});
    return;
  }

  if (!artistInfo.recordLabel) {
    res.status(400).json({error: 'You must provide a record label for the artist'});
    return;
  }

  try {
    await artistData.getArtist(req.params.id);
  } catch (error) {
    res.status(404).json({error: 'Artist not found'});
    return;
  }
  try {
    const updatedArtist = await artistData.updateArtist(req.params.id, artistInfo);
    res.json(updatedArtist);
  } catch (error) {
    res.sendStatus(500);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await artistData.getArtist(req.params.id);
  } catch (error) {
    res.status(404).json({error: 'Artist not found'});
    return;
  }

  try {
    await artistData.removeArtist(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
