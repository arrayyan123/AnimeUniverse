import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MangaDetail from '../../Pages/Posts/MangaDetail';


const BASE_URL = '/api/mangadex-proxy';

function Hero() {
    const [mangaData, setMangaData] = useState(null);
    const [selectedMangaId, setSelectedMangaId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get(`${BASE_URL}`, {
                    headers: {
                        'User-Agent': 'MyMangaApp/1.0'
                    }
                });
                setMangaData(resp.data);
            } catch (error) {
                console.error('Error fetching manga data:', error);
            }
        };

        fetchData();
    }, []);

    const handleMangaClick = (mangaId) => {
        setSelectedMangaId(mangaId);    
    };

    return (
        <div className='mt-[0px] bg-white'>
            {selectedMangaId ? (
                <MangaDetail mangaId={selectedMangaId} />
            ) : (
                <div className='flex flex-wrap mx-20 py-[100px] items-center justify-center gap-4'>
                    {mangaData && mangaData.data && mangaData.data.map((manga) => (
                        <div key={manga.id} className='shadow-lg scale-100 hover:scale-110 transition-all ease-in-out w-[240px] h-[420px] overflow-hidden flex flex-col items-center justify-center'>
                            {/* <p className="text-black text-[12px]">{manga.attributes.description?.en}</p> */}
                            {manga.relationships &&
                                manga.relationships.length > 0 &&
                                manga.relationships.map((relationship) =>
                                    relationship.type === 'cover_art' ? (
                                        <CoverImage key={relationship.id} coverArtId={relationship.id} mangaId={manga.id} />
                                    ) : null
                            )}
                            <h1 className="text-[12px] text-center cursor-pointer text-black overflow-hidden truncate" onClick={() => handleMangaClick(manga.id)}>{manga.attributes.title?.en}</h1>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const CoverImage = ({ coverArtId, mangaId }) => {
    const [coverFileName, setCoverFileName] = useState(null);
    const [currentTime, setCurrentTime] = useState(Date.now()); 

    useEffect(() => {
        const fetchCoverFileName = async () => {
            try {
                const coverResponse = await axios.get(`/api/cover/${coverArtId}`, {
                    headers: {
                        'User-Agent': 'MyMangaApp/1.0'
                    }
                });
                const imageUrl = coverResponse.data.imageUrl;
                setCoverFileName(imageUrl);
            } catch (error) {
                console.error('Error fetching cover data:', error);
            }
        };

        fetchCoverFileName();
    }, [coverArtId]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return coverFileName ? (
        <img src={`https://uploads.mangadex.org/covers/${mangaId}/${coverFileName}?t=${currentTime}.jpg`} alt="Manga Cover" className="w-[200px] h-[340px] object-cover" />
    ) : (
        <div>Loading cover...</div>
    );
};

export default Hero;
