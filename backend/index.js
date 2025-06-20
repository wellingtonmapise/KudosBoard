const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('./generated/prisma');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})


//route for getting all boards
app.get('/boards', async (req, res) => {
    const { search, category } = req.query;
    try {
        const boards = await prisma.board.findMany({
            where: {
                AND: [
                    search ? {
                        title:
                        {
                            contains: search,
                            mode: 'insensitive',
                        },
                    }
                        : {},
                    category && category !== 'Recent' ? { category } : {},
                ],
            },
            orderBy: category === 'Recent' ? { createdAt: 'desc' } : undefined,
            take: category === 'Recent' ? 6 : undefined,
            include: { cards: true }
        });
        res.json(boards);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch boards' })
    }
});


//route for creating a new board
app.post('/boards', async (req, res) => {
    const { title, category, author } = req.body;
    const defaultGif = 'https://picsum.photos/200/300?random=1'
    if (!title || !category) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const newBoard = await prisma.board.create({
            data: {
                title,
                category,
                gif: defaultGif,
                author
            },
        });
        res.status(201).json(newBoard);

    }
    catch (error) {
        console.error('Error creating board:', error);
        res.status(500).json({ error: 'Could not create board' });

    }
});


//delete boards and its cards
app.delete('/boards/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const cards = await prisma.card.findMany({
            where: { boardId: id },
            select: { id: true }
        });
        if (cards.length > 0) {
            const cardIds = cards.map(card => card.id);
            await prisma.comment.deleteMany({
                where: {
                    cardId: { in: cardIds }
                }
            });
        }
        await prisma.card.deleteMany({
            where: {
                boardId: id
            }
        });
        await prisma.board.delete({
            where: { id }
        });

        res.status(200).json({ success: 'deleted data successfully' })
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ error: 'Failed to delete board' });
    }
});

//get all cards for a board
app.get('/boards/:id/cards', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        res.status(400).json({ error: 'Invalid board ID' });
        return;
    }
    try {
        const cards = await prisma.card.findMany({
            where: {
                boardId: id,
            },
        });
        res.json(cards);
    }
    catch (error) {
        console.error('error', error)
        res.status(500).json({ error: 'Failed to fetch cards' })
    }
});


//create a card for a board
app.post('/boards/:id/cards', async (req, res) => {
    const { title, description, gif, author } = req.body;
    const boardId = parseInt(req.params.id);
    if (!title || !description || !gif) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const boardExists = await prisma.board.findUnique({
            where: { id: boardId }
        });
        if (!boardExists) {
            return res.status(404).json({ error: 'Board not found' });
        }
        const newCard = await prisma.card.create({
            data: { title, description, gif, author, boardId }
        });
        res.status(201).json(newCard);
    } catch (error) {
        console.error('card error', error);
        res.status(500).json({ error: 'Could not create card' });
    }
});


//delete card
app.delete('/cards/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid card ID' });
    }

    try {
        const cardExists = await prisma.card.findUnique({
            where: { id }
        });

        if (!cardExists) {
            return res.status(404).json({ error: 'Card not found' });
        }
        await prisma.comment.deleteMany({
            where: { cardId: id }
        });
        const deletedCard = await prisma.card.delete({
            where: { id }
        });
        res.json(deletedCard);
    } catch (error) {
        console.error('deleting error', error);
        res.status(500).json({ error: 'Failed to delete card' });
    }
});

//upvote a card
app.patch('/cards/:id/upvote', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const updated = await prisma.card.update({
            where: { id },
            data: { upvotes: { increment: 1 } }
        });
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to upvote card' })
    }
})

//route for pinned
app.put('/cards/:id/pinned', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const cardExists = await prisma.card.findUnique({
            where: { id } });

        if (!cardExists) {
            return res.status(404).json({ error: 'Card not found' });
        }

        const updated = await prisma.card.update({
            where: { id },
            data: { pinned: !cardExists.pinned}
        });
        res.json(updated);}

        catch (error) {
            console.error('error', error)
            res.status(500).json({ error: 'Failed to pin card' });
        }
})

//route for getting comments
app.get('/cards/:id/comments', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        res.status(400).json({ error: 'Invalid card ID' });
        return;
    }
    try {
        const comments = await prisma.comment.findMany({
            where: {
                cardId: id,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json(comments);
    } catch (error) {
        console.error('error', error);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

//route for creating a comment

app.post('/cards/:id/comments', async (req, res) => {
    const id = parseInt(req.params.id);
    const { author, body } = req.body;
    if (!body) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const cardExists = await prisma.card.findUnique({
            where: { id }
        });
        if (!cardExists) {
            return res.status(404).json({ error: 'Card not found' });
        }
        const newComment = await prisma.comment.create({
            data: { author, body, cardId: id }
        });
        res.status(201).json(newComment);
        }
        catch (error) {
            console.error('error', error);
            res.status(500).json({ error: 'Could not create comment' });
        }
    });
