import './App.css';
import { Suspense } from 'react';
import { NextUIProvider, Progress } from '@nextui-org/react';
import { Toaster } from 'react-hot-toast';
import { useSnapshot } from 'valtio';
import MainApp from './MainApp';
import Picker from './pages/picker/Picker';
import { appStore } from './store/app-2.store';

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page');

  const { __loaded } = useSnapshot(appStore);

  if (!__loaded) {
    return (
      <NextUIProvider className="h-[100vh] flex flex-col w-[100-vw] items-center justify-center">
        <Progress isIndeterminate size="sm" className="p-8" />
      </NextUIProvider>
    );
  }

  return (
    <NextUIProvider className="h-[100vh] flex flex-col">
      <Suspense>
        <Toaster
          position="bottom-left"
          toastOptions={{
            style: {
              backgroundColor: '#27272A',
              color: '#FAFAFA',
            },
          }}
        />
        {page === 'picker' && <Picker />}
        {!page && <MainApp />}
      </Suspense>
    </NextUIProvider>
  );
}
