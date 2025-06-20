const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  const board1 = await prisma.board.create({
    data: {
      title: "Board 1",
      category: "Category A",
      gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHdpZjB1OHhmeXAyaDRseDR3MzY3dXZkMTEzdnlvejFwcjRjbWN2MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ddZ2mYhxhh69wEpSVz/giphy.gif",
      author: "Author 1",
      cards: {
        create: [
          {
            title: "Card 1",
            description: "This is the first card on board 1",
            gif: "https://example.com/card1.gif",
            author: "Author 1",
            comments: {
              create: [
                {
                  body: "This is a great card!",
                  author: "Commenter 1"
                },
                {
                  body: "I agree!",
                  author: "Commenter 2"
                }
              ]
            }
          },
          {
            title: "Card 2",
            description: "This is the second card on board 1",
            gif: "https://example.com/card2.gif",
            author: "Author 2",
            comments: {
              create: [
                {
                  body: "This card is okay.",
                  author: "Commenter 3"
                }
              ]
            }
          }
        ]
      },
    },
  });

  const board2 = await prisma.board.create({
    data: {
      title: "Board 2",
      category: "Category B",
      gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHdpZjB1OHhmeXAyaDRseDR3MzY3dXZkMTEzdnlvejFwcjRjbWN2MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ddZ2mYhxhh69wEpSVz/giphy.gif",
      author: "Author 2",
      cards: {
        create: [
          {
            title: "Card 3",
            description: "This is the third card on board 2",
            gif: "https://example.com/card3.gif",
            author: "Author 3",
            comments: {
              create: [
                {
                  body: "This is another great card!",
                  author: "Commenter 4"
                },
                {
                  body: "I love this card!",
                  author: "Commenter 5"
                }
              ]
            }
          },
          {
            title: "Card 4",
            description: "This is the fourth card on board 2",
            gif: "https://example.com/card4.gif",
            author: "Author 4",
            comments: {
              create: [
                {
                  body: "This card is amazing!",
                  author: "Commenter 6"
                }
              ]
            }
          }
        ]
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
