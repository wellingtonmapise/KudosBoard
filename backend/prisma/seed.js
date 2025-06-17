const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const board1 = await prisma.board.create({
    data: {
      title: 'Board 1',
      description: 'This is the first board',
      category: 'Category A',
      gif: 'https://example.com/gif1.gif',
      author: 'Author 1',
      cards: {
        create: [
          {
            title: 'Card 1',
            description: 'This is the first card on board 1',
            gif: 'https://example.com/card1.gif',
            author: 'Author 1',
          },
          {
            title: 'Card 2',
            description: 'This is the second card on board 1',
            gif: 'https://example.com/card2.gif',
            author: 'Author 2',
          },
        ],
      },
    },
  });

  const board2 = await prisma.board.create({
    data: {
      title: 'Board 2',
      description: 'This is the second board',
      category: 'Category B',
      gif: 'https://example.com/gif2.gif',
      author: 'Author 2',
      cards: {
        create: [
          {
            title: 'Card 3',
            description: 'This is the first card on board 2',
            gif: 'https://example.com/card3.gif',
            author: 'Author 3',
          },
        ],
      },
    },
  });

  console.log({ board1, board2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });