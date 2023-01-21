const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagsData = await tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'taggedProducts' }],
    });
    res.status(500).json(tagsData)
  } catch (err) {
    res.status(500).json(err)

  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagsDataById = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'taggedProducts' }],
    });
    if (!tagsDataById) {
      res.status(404).json({ message: 'NO tag found with that id' });
      return;
    }
    res.status(200).json(tagsDataById);
  } catch (err) {
    res.status(500).json(err)

  }
});

router.post('/', async (req, res) => {
  try {
    const newTagData = await Tag.create();

    res.status(200).json(newTagData);
  } catch (err) {
    res.status(500).json(err)

  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await tag.update({
      tag_name: req.body.tag_name,
    }, {
      where: {
        id: req.params.id
      },
    });
    res.status(200).json(updatedTag)
  } catch (err) {
    res.status(500).json(err)

  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destory({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedTag) {
      res.status(404).json[{ message: 'No tag found with that id'}];
      return;
    }
    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(500).json(err)

  }
});

module.exports = router;
