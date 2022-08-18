const router = require('express').Router();
const { valid } = require('joi');
const { db } = require('../config');
const { validateData } = require('../middleware/dataValidation');

router.get('/', async (req, res) => {
  const data = [];
  try {
    const dbres = await db.get();
    dbres.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    data.sort((a, b) => (a.name > b.name ? 1 : -1));
    res.status(200).json({ success: true, msg: 'Data retrieved', data });
  } catch (err) {
    console.log('/plates GET route error', err);
    res.status(400).json({ success: false, msg: 'Unexpected error' });
  }
});

router.post('/', validateData, async (req, res) => {
  try {
    let docExists = false;
    const getData = await db.get();
    getData.forEach((doc) => {
      if (doc.data().plate === req.body.plate) {
        docExists = true;
      }
    });
    if (docExists) {
      res
        .status(200)
        .json({ success: false, msg: 'This plate number is occupied' });
      return;
    }
    const dbres = await db.add({ ...req.body });
    const inserteddata = await dbres.get();

    res.status(200).json({
      success: true,
      msg: 'Data inserted',
      data: { id: inserteddata.id, ...inserteddata.data() },
    });
  } catch (err) {
    console.log('/plates POST route error', err);
    res.status(400).json({ success: false, msg: 'Unexpected error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.doc(req.params.id).delete();
    res.status(200).json({ success: true, msg: 'Plate deleted' });
  } catch (err) {
    console.log('/plates DELETE route error', err);
    res.status(400).json({ success: false, msg: 'Unexpected error' });
  }
});

router.put('/', validateData, async (req, res) => {
  const { id, ...rest } = req.body;
  try {
    await db.doc(id).update({ ...rest });
    res.status(200).json({ success: true, msg: 'Plate updated' });
  } catch (err) {
    console.log('/plates PUT route error', err);
    res.status(400).json({ success: false, msg: 'Unexpected error' });
  }
});

module.exports = {
  plateRoutes: router,
};
