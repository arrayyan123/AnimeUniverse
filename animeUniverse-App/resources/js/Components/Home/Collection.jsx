import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MangaDetail from '../../Pages/Posts/MangaDetail';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Keyboard, Pagination, Navigation } from 'swiper/modules';

const BASE_URL = '/api/mangadex-proxy';

function Collection() {
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
                <div className='mx-0 py-[0px]'>
                    {mangaData && mangaData.data && (
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={30}
                            keyboard={{
                            enabled: true,
                            }}
                            pagination={{
                            clickable: true,
                            }}
                            navigation={true}
                            modules={[Keyboard, Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {mangaData.data.map((manga) => (
                                <SwiperSlide key={manga.id}>
                                    <div className='relative shadow-lg transition-all ease-in-out w-full h-screen overflow-hidden'>
                                        {manga.relationships &&
                                            manga.relationships.length > 0 &&
                                            manga.relationships.map((relationship) =>
                                                relationship.type === 'cover_art' ? (
                                                    <CoverImage key={relationship.id} coverArtId={relationship.id} mangaId={manga.id} />
                                                ) : null
                                        )}
                                        <div className='absolute bottom-0 w-full h-full md:pt-[25%] pt-[70%] text-center cursor-pointer text-white bg-black bg-opacity-50 px-20'>
                                            <h1 className="font-extrabold text-[30px] " onClick={() => handleMangaClick(manga.id)}>
                                                {manga.attributes.title?.en}
                                            </h1>
                                            <p className="text-white text-[20px] truncate">{manga.attributes.description?.en}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
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
        <img src={`https://uploads.mangadex.dev/covers/${mangaId}/${coverFileName}?t=${currentTime}.jpg`} alt="Manga Cover" className="w-full h-full object-cover object-center" />

    ) : (
        <div>Loading cover...</div>
    );
};

export default Collection;
