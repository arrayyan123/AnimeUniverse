import Hero from '@/Components/Home/Hero';
import Navbar from '@/Components/Navbar/Navbar';
import React, { useState } from 'react';
import MangaDetail from './MangaDetail';
import Footer from '@/Components/Footer/Footer';
import Banner from '@/Components/Home/Banner';
import { Head } from '@inertiajs/react';
import Collection from '@/Components/Home/Collection';

function Home() {
  const [selectedMangaId, setSelectedMangaId] = useState(null);

  return (
    <div>
      <Head title="Home" />
      <Navbar setSelectedMangaId={setSelectedMangaId} />
      <Collection></Collection>
      {selectedMangaId ? (
        <MangaDetail mangaId={selectedMangaId} />
      ) : (
        <Hero setSelectedMangaId={setSelectedMangaId} />
      )}
      <Banner></Banner>
      <Footer></Footer>
    </div>
  );
}

export default Home;
