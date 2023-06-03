import { useEffect, useRef, useState } from 'react';
import styles from "../styles/about.module.css"
import { useRouter } from 'next/router';

const AboutPage = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const router = useRouter();

    const [thumbnailData, setThumbnailData] = useState<string | null>(null);

    const handleCanvasClick = () => {
        // リダイレクト先のURLを設定
        const redirectUrl = 'http://localhost:3001'; // ご自身のリダイレクト先のURLに置き換えてください
        router.push(redirectUrl);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const videoElement = videoRef.current;
                if (videoElement) {
                    videoElement.src = fileReader.result as string;
                }
            };
            fileReader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const videoElement = videoRef.current;
        const canvasElement = canvasRef.current;

        const generateThumbnail = () => {
            if (videoElement && canvasElement) {
                const context = canvasElement.getContext('2d');
                context?.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
                const thumbnailDataURL = canvasElement.toDataURL('image/png');
                setThumbnailData(thumbnailDataURL);
            }
        };

        if (videoElement && canvasElement) {
            videoElement.addEventListener('loadedmetadata', () => {
                videoElement.currentTime = 0;
            });

            videoElement.addEventListener('seeked', generateThumbnail);
        }

        return () => {
            if (videoElement && canvasElement) {
                videoElement.removeEventListener('loadedmetadata', () => {
                    videoElement.currentTime = 0;
                });

                videoElement.removeEventListener('seeked', generateThumbnail);
            }
        };
    }, []);

    return (
        <div className={styles.container}>
            <input type="file" accept="video/*" onChange={handleFileChange} />
            {thumbnailData && <img src={thumbnailData} alt="Thumbnail" onClick={handleCanvasClick} />}
            <video className={styles.video} ref={videoRef} controls>
                <source src="" type="video/mp4" />
            </video>
            <canvas ref={canvasRef} width={320} height={240} style={{ display: 'none' }} />
        </div>
    );
};

export default AboutPage;
