import React from 'react';

import SafeView from '../../components/SafeView';
import Navbar from '../../components/Navbar';
import RouteContent from '../../components/RouteContent';
import Header from './Header';

export default function MainPage() {
  return (
    <SafeView>
      <Navbar />

      <div className="flex flex-col gap-2 w-full h-full overflow-auto">
        <Header />
        <RouteContent />
      </div>
    </SafeView>
  );
}
