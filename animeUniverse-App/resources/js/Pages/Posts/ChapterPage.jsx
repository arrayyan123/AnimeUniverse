import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from "flowbite-react";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import { Head } from '@inertiajs/react';
import AlertOne from '@/Components/Alert/AlertOne';

const URL_SECON = 'https://api.mangadex.org';

const ChapterPage = ({ chapterId }) => {
    const [chapterImageUrls, setChapterImageUrls] = useState([]);
    const [scanlationGroupId, setScanlationGroupId] = useState(null);

    useEffect(() => {
        const fetchChapterImages = async () => {
            try {
                const resp = await axios.get(`${URL_SECON}/chapter/${chapterId}`);
                const chapterData = resp.data.data;

                const scanlationGroup = chapterData.relationships.find(rel => rel.type === 'scanlation_group');
                if (scanlationGroup) {
                    setScanlationGroupId(scanlationGroup.id);
                }

                const chapterResp = await axios.get(`${URL_SECON}/at-home/server/${chapterId}`);
                const { baseUrl, chapter } = chapterResp.data;
                const imageUrls = chapter.data.map(filename => `${baseUrl}/data/${chapter.hash}/${filename}`);
                
                setChapterImageUrls(imageUrls);
            } catch (error) {
                console.error('Error fetching chapter images:', error);
            }
        };

        fetchChapterImages();
    }, [chapterId]);

    const [isAlertVisible, setIsAlertVisible] = useState(false);

    useEffect(() => {
      setIsAlertVisible(true);
    }, []);

    const closeAlert = () => {
      setIsAlertVisible(false);
    };

    return (
        <div className="container mx-auto py-8 p-3">
            <Head title="Chapter" />
            {isAlertVisible && <AlertOne message="Pada halaman Chapter perlu di ingat kembali untuk judul manga yang sedang dibaca" onClose={closeAlert} />}
            <h1 className="text-2xl font-bold mb-4">Chapter {chapterId}</h1>
            {scanlationGroupId && (
                <div>
                    <h2>Scanlation Group ID: {scanlationGroupId}</h2>
                </div>
            )}
            {chapterImageUrls.length > 0 ? (
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
                    {chapterImageUrls.map((imageUrl, index) => (
                        <SwiperSlide key={index}>
                          <div className='md:mx-[270px]'>
                            <img src={imageUrl} alt={`Page ${index + 1}`} className="md:h-screen md:m-20 object-cover" />
                          </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div>Loading images...</div>
            )}
            <a href="/" className='md:mx-0 mx-[120px]'><Button color="blue">Back To Home</Button></a>
        </div>
    );
};

export default ChapterPage;
