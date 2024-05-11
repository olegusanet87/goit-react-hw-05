import { Suspense } from 'react';
import Loader from '../Loader/Loader';
import Navigation from '../Navigation/Navigation';

export default function Layout({ children }) {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </div>
  );
}
