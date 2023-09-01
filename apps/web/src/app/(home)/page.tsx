import prisma from '@/lib/prisma';

export default async function Page() {
  const users = await prisma.user.findMany();
  return (
    <div>
      {users.map((user) => (
        <p key={user.id}>{user.email}</p>
      ))}
      <p>hello</p>
    </div>
  );
}
