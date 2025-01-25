import store from '@/store';
import { defineDataLoader, definePageConfig, useData } from 'ice';
import { lazy, useEffect } from 'react';

const TextComponent = lazy(() => import('@/components/text'));

interface DataSource {
  name: string;
}

interface IndexProps {
  isAdmin: boolean;
  dataSource: Array<DataSource>;
}

export default function IndexPage({ isAdmin = true, dataSource = [{ name: 'hello' }] }: IndexProps) {
  const data = useData();
  const [userState, userDispatchers] = store.useModel('user');

  useEffect(() => {
    userDispatchers.getUserInfo();
  }, []);

  return (
    <>
      <main className="container mx-auto flex flex-col gap-6 p-8">
        <h1 className="font-bold text-4xl">Sup doodds</h1>

        <TextComponent />

        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}

        <hr className="border-spacing-0.5 border-gray-300" />
        <h2 className="font-semibold text-3xl">Store</h2>
        <span>{userState.id}</span>
        <span>{userState.name}</span>

        <hr className="border-spacing-0.5 border-gray-300" />
        <h2 className="font-semibold text-3xl">JSX Plus</h2>
        <div x-if={isAdmin}>admin</div>
        <div x-else>guest</div>
        <div x-for={(item in dataSource)}>
          <span key={item.name}>{item.name}</span>
        </div>
      </main>
    </>
  );
}

export const pageConfig = definePageConfig(() => ({
  meta: [
    {
      name: 'title',
      value: 'Something cool',
    },
    {
      name: 'description',
      value: 'This becomes the nice preview on search results.',
    },
  ],
}));

export const dataLoader = defineDataLoader(async (ctx) => {
  console.log(ctx.pathname);
  console.log(ctx.query);

  const data = await fetch('https://localhost:3000/api/users');
  return await data.json();
});
