import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      clerkId: 'clerk_12345',
      email: 'user1@example.com',
      firstname: 'John',
      lastname: 'Doe',
      subscription: {
        create: {
          name: 'Pro Plan',
          plan: 'PRO',
          active: true,
        },
      },
      integrations: {
        create: [
          {
            name: 'INSTAGRAM',
            token: 'instagram_token_1',
            expiresAt: new Date('2024-12-31'),
            instagramId: 'insta_12345',
          },
        ],
      },
      automations: {
        create: [
          {
            name: 'Automation 1',
            active: true,
            listener: {
              create: {
                listener: 'MESSAGE',
                prompt: 'Reply to messages automatically',
              },
            },
            keywords: {
              create: [
                { word: 'keyword1' },
                { word: 'keyword2' },
              ],
            },
            triggers: {
              create: [
                { type: 'TYPE1', triggerValue: 'value1' },
                { type: 'TYPE2', triggerValue: 'value2' },
              ],
            },
            posts: {
              create: [
                {
                  mediaType: 'IMAGE',
                  media: 'https://example.com/image1.jpg',
                  caption: 'First post caption',
                },
                {
                  mediaType: 'VIDEO',
                  media: 'https://example.com/video1.mp4',
                  caption: 'Second post caption',
                },
              ],
            },
            dms: {
              create: [
                {
                  senderId: 'user_1',
                  reciever: 'user_2',
                  message: 'Hello!',
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('Seed data created:', { user1 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
